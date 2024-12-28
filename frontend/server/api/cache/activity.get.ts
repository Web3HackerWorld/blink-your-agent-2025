import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const queryObj = getQuery(event)
  const adminClient = serverSupabaseServiceRole(event)
  const publicFields = [
    'id',
    'tokenId',
    'lineTokenId',
    'lineName',
    'tokenType',
    'itemId',
    'metadata',
    'activityType',
    'cid',
    'network',
    'appaddress',
    'userAddress',
    'userId',
    'created_at',
  ]

  let query = adminClient
    .from('activityCache')
    .select(publicFields.join(','))
    .order('created_at', { ascending: false })

  for (let key in queryObj) {
    query = query.eq(key, queryObj[key])
  }
  // query = query.eq('metadata->>name', 'StarkEVM99')

  const { data, error } = await query
  if (error) return { error }

  return data
})
