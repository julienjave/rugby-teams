const BASE = 'https://www.thesportsdb.com/api/v1/json/123'

export async function searchTeams(country) {
  const res = await fetch(`${BASE}/search_all_teams.php?s=Rugby&c=${encodeURIComponent(country)}`)
  const data = await res.json()
  return data.teams ?? []
}

export async function searchPlayer(name) {
  const res = await fetch(`${BASE}/searchplayers.php?p=${encodeURIComponent(name)}`)
  const data = await res.json()
  return data.player ?? []
}

export async function searchLeagues(country) {
  const res = await fetch(`${BASE}/search_all_leagues.php?c=${encodeURIComponent(country)}&s=Rugby`)
  const data = await res.json()
  return data.countries ?? []
}
