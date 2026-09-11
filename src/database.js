const BASE = 'https://www.thesportsdb.com/api/v1/json/123'

export const searchTeams = async (name) => {
  const res = await fetch(`${BASE}/searchteams.php?t=${encodeURIComponent(name)}`)
  const data = await res.json()
  return data.teams ?? []
}