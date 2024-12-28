import { serverSupabaseUser, serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const queryObj = getQuery(event)
  const adminClient = serverSupabaseServiceRole(event)
  let query = adminClient.from('tokenCache').select('*').order('created_at', {ascending: false})

  for (let key in queryObj) {
    if (key === 'lineName') {
      query = query.eq('metadata->>name', queryObj[key])
    } else {
      query = query.eq(key, queryObj[key])
    }
  }

  const { data, error } = await query
  if (error) return { error }

  return data
})
