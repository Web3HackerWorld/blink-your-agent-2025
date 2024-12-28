import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  let queryObj = getQuery(event)

  let { page = 1, limit = 10 } = queryObj
  page = parseInt(page)
  if (page < 0) {
    page = 1
  }
  limit = parseInt(limit) || 10
  const start = (page - 1) * limit
  queryObj = _.omit(queryObj, ['page', 'limit'])

  const adminClient = serverSupabaseServiceRole(event)
  const publicFields = [
    'id',
    'tokenId',
    'tokenType',
    'itemId',
    'metadata',
    'itemType',
    'cid',
    'network',
    'appaddress',
    'userAddress',
    'userId',
    'income',
    'created_at'
    // DO NOT show this data to public!
    // 'lockedContentRaw'
  ]

  const db = adminClient.from('spotCache')
  let query = db.select(publicFields.join(',')).order('created_at', {ascending: false})

  let countQuery = db.select('', {count: 'exact', head: true})
  for (let key in queryObj) {
    if (key === 'lineName') {
      query = query.eq('metadata->>name', queryObj[key])
      countQuery = countQuery.eq('metadata->>name', queryObj[key])
    } else {
      query = query.eq(key, queryObj[key])
      countQuery = countQuery.eq(key, queryObj[key])
    }
  }

  const { count } = await countQuery
  const hasNextPage = Math.ceil(count / limit) > page
  query = query.range(start, start + limit - 1)

  const { data: items, error } = await query
  if (error) return { error }

  return {
    items,
    count,
    hasNextPage
  }
})