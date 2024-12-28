import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'
import _ from 'lodash'
import { createPublicClient, http} from 'viem'

export default defineEventHandler(async (event) => {
  const bodyOrigin = await readBody(event)
  const body = _.pick(bodyOrigin, [
    'tokenId',
    'tokenType',
    'itemId',
    'itemType',
    'cid',
    'network',
    'appaddress',
    'lockedContentRaw',
    'metadata',
  ])

  const user = await serverSupabaseUser(event)
  const adminClient = serverSupabaseServiceRole(event)

  const { network, appaddress, tokenId, itemId } = body
  const isExist = await adminClient.from('spotCache').select('*')
    .eq('tokenId', tokenId)
    .eq('itemId', itemId)
    .eq('appaddress', appaddress)
    .single()

  if (isExist.data) {
    throw new Error(`appaddress: ${appaddress}, tokenId ${tokenId}, itemId ${itemId} already exsit`)
  }
  
  const { data } = await adminClient.from('addressBind')
    .select('address')
    .eq('id', `${user.id}-${appaddress}`)
    .eq('network', network)
    .single()

  if (!data.address) {
    throw new Error('wallet address not binded!')
  }

  // check if the address is the owner of the token
  const contractInfo = getContractInfo('AIProtocol')
  const params = {
      address: appaddress,
      abi: contractInfo.abi,
      functionName: 'isTokenOwner',
      args: [tokenId, data.address],
  }
  const chain = chainsMap[network]
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })
  const isOwner = await publicClient.readContract(params)
  if (!isOwner) {
    throw new Error(`The address ${data.address} is not the owner of ${tokenId}`)
  }

  body['userAddress'] = data.address
  body['userId'] = user.id
  
  const insertRz = await adminClient.from('spotCache').insert(body).select()
  return insertRz
})
