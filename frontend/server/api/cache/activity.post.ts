import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'
import _ from 'lodash'
import { createPublicClient, http} from 'viem'

export default defineEventHandler(async (event) => {
  const bodyOrigin = await readBody(event)
  const body = _.pick(bodyOrigin, [
    'tokenType',
    'tokenId',
    'lineTokenId',
    'lineName',
    'itemId',
    'network',
    'appaddress',
    'activityType',
    'metadata',
    'cid',
  ])

  const user = await serverSupabaseUser(event)
  const adminClient = serverSupabaseServiceRole(event)

  const { tokenType, lineTokenId, metadata, network, appaddress, tokenId, itemId, cid, activityType, lineName } = body
  if (!lineName) {
    const { data: lineTokenData } = await adminClient.from('tokenCache').select('*')
      .eq('tokenId', lineTokenId)
      .eq('appaddress', appaddress)
      .single()
    if (!lineTokenData) {
      throw new Error('line do not exist')
    }
    body['lineName'] = lineTokenData?.metadata?.name
  }
  
  const isExist = await adminClient.from('activityCache').select('*')
    .eq('tokenType', tokenType)
    .eq('activityType', activityType)
    .eq('lineTokenId', lineTokenId)
    .eq('tokenId', tokenId)
    .eq('itemId', itemId)
    .eq('cid', cid)
    .eq('appaddress', appaddress)
    .single()

  if (isExist.data) {
    throw new Error(`appaddress: ${appaddress}, tokenId ${tokenId}, itemId ${itemId}, cid ${cid} already exsit`)
  }
  
  const { data: addressData } = await adminClient.from('addressBind')
    .select('address')
    .eq('id', `${user.id}-${appaddress}`)
    .eq('network', network)
    .single()

  if (!addressData.address) {
    throw new Error(`wallet address not binded!`)
  }

  // let buyTokenId = metadata.randomLotteryTokenId
  const spotCacheDB = adminClient.from('spotCache')
  const { data } = await spotCacheDB.select()
      .eq('tokenId', lineTokenId)
      .eq('itemId', itemId)
      .eq('network', network)
    .single()

  let income = parseInt(data?.income || 0)
  switch (activityType) {
    case 'buyRandomLottery':
      income += parseInt(metadata.amount)
      break;
    case 'buySBT':
    case 'buyNFT':
      income += parseInt(metadata.amount) * parseInt(metadata.basicPrice)
      break;
    default:
      break;
  }

  if (data !== null) {
    await spotCacheDB.update({ income }).eq('id', data.id)
  }

  const contractInfo = getContractInfo('AIProtocol')
  const params = {
      address: appaddress,
      abi: contractInfo.abi,
      functionName: 'balanceOf',
      args: [addressData.address, tokenId],
  }

  const chain = chainsMap[network]
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  })
  const isOwnToken = await publicClient.readContract(params)
  if (!isOwnToken) {
    throw new Error(`The address ${addressData.address} do not owned token ${tokenId}`)
  }

  body['userAddress'] = addressData.address
  body['userId'] = user.id
  
  const insertRz = await adminClient.from('activityCache').insert(body).select()
  console.log(`====> insertRz :`, insertRz, body)
  return insertRz
})
