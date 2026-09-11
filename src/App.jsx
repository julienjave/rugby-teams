import { useState } from 'react'
import { 
  Box,
  TextField, 
  FormControl, 
  Button, 
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography
} from '@mui/material'
import { 
  searchTeams,
  searchPlayer,
  searchLeagues
} from './database'
import './App.css'

function App() {
  const [filter, setFilter] = useState("location")
  const [searchValue, setSearchValue] = useState("")
  const [teamSelected, setTeamSelected] = useState(null)
  const [teams, setTeams] = useState(null)
  const [playerSelected, setPlayerSelected] = useState(null)
  const [players, setPlayers] = useState(null)
  const [leagueSelected, setLeagueSelected] = useState(null)
  const [leagues, setLeagues] = useState(null)

  const noSelection = !teamSelected && !playerSelected && !leagueSelected

  function resetStates() {
    setTeamSelected(null)
    setTeams(null)
    setPlayerSelected(null)
    setPlayers(null)
    setLeagueSelected(null)
    setLeagues(null)
  }

  async function search(e) {
    e.preventDefault()
    switch (filter) {
      case 'location':
        if (!searchValue.trim()) return
        resetStates()
        setTeams(await searchTeams(searchValue))
        break
      case 'player':
        if (!searchValue.trim()) return
        resetStates()
        setPlayers(await searchPlayer(searchValue))
        break
      case 'leagues':
        if (!searchValue.trim()) return
        resetStates()
        setLeagues(await searchLeagues(searchValue))
        break
    }
  }

  function handleFilter(e, newFilter) {
    setFilter(newFilter)
  }

  return (
    <>
      <main>
        <header>
          <h1>RugbyTeamsOPedia </h1>
          <p>All you want to know about your favorite Rugby teams is just a click away...</p>
          <span className='note'>(Note: Since this is using the free tier of the API we are limited at 10 results per query.)</span>
        </header>

        <Box id='search-section'
          sx={{ width: 0.75 }}
        >
            <ToggleButtonGroup
              color='primary'
              value={filter}
              exclusive
              onChange={handleFilter}
            >
              <ToggleButton value="location" sx={{ display: 'block' }}>
                <Typography>Teams</Typography>
                <Typography sx={{ fontSize: 10 }}>(by country)</Typography>
              </ToggleButton>
              <ToggleButton value="player" sx={{ display: 'block' }}>
                <Typography>Player</Typography>
                <Typography sx={{ fontSize: 10 }}>(by name)</Typography>
              </ToggleButton>
              <ToggleButton value="leagues" sx={{ display: 'block' }}>
                <Typography>Leagues</Typography>
                <Typography sx={{ fontSize: 10 }}>(by country)</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
            <TextField 
              id='search-bar'
              variant="filled"
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)}
              fullWidth
            />
            <Button 
              variant='contained' 
              onClick={search}
            >Search</Button>
        </Box>

        <section id='result-section'>
          {noSelection && teams && teams.length>0 && (
            <List>
              {teams.map((team) => (
                <ListItemButton key={team.idTeam} onClick={() => setTeamSelected(team)}>
                  <ListItemAvatar>
                    <Avatar alt={team.strTeam} src={team.strBadge} />
                  </ListItemAvatar>
                  <ListItemText>{team.strTeam}</ListItemText>
                </ListItemButton>
              ))}
            </List>
          )}
          {noSelection && players && players.length>0 && (
            <List>
              {players.map((person) => (
                <ListItemButton key={person.idPlayer} onClick={() => setPlayerSelected(person)}>
                  <ListItemAvatar>
                    <Avatar alt={person.strPlayer} src={person.strThumb} />
                  </ListItemAvatar>
                  <ListItemText>{person.strPlayer}</ListItemText>
                </ListItemButton>
              ))}
            </List>
          )}
          {noSelection && leagues && leagues.length>0 && (
            <List>
              {leagues.map((league) => (
                <ListItemButton key={league.idLeague} onClick={() => setLeagueSelected(league)}>
                  <ListItemAvatar>
                    <Avatar alt={league.strLeague} src={league.strBadge} />
                  </ListItemAvatar>
                  <ListItemText>{league.strLeague}</ListItemText>
                </ListItemButton>
              ))}
            </List>
          )}
        </section>
      </main>
    </>
  )
}

export default App
