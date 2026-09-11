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
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone'
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import { DetailsCard } from './DetailsCard'
import './App.css'

const theme = createTheme({
  components: {
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.40),
          color: theme.palette.primary.main,
          border: 'none',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.5),
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          },
        }),
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: alpha('#fff', 0.40),
          borderRadius: '5px',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: alpha('#fff', 0.5),
          },
          '&.Mui-focused': {
            backgroundColor: alpha('#fff', 0.6),
          },
        }),
        input: {
          color: '#fff',
        },
      },
    },
  },
})

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

  function getSelection() {
    if (teamSelected) return teamSelected
    if (playerSelected) return playerSelected
    if (leagueSelected) return leagueSelected
  }

  function resetStates() {
    setTeamSelected(null)
    setTeams(null)
    setPlayerSelected(null)
    setPlayers(null)
    setLeagueSelected(null)
    setLeagues(null)
  }

  function resetSelected() {
    setTeamSelected(null)
    setPlayerSelected(null)
    setLeagueSelected(null)
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
    if (newFilter !== null) {
      setFilter(newFilter)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box sx={{ backgroundColor: "#ffffffed", borderRadius: "15px", padding: "0 20px 10px 20px", margin: "20px" }}>
          <h1>RugbyTeamsOPedia </h1>
          <p>All you want to know about your favorite Rugby teams is just a click away...</p>
          <span className='note'>(Note: Since this is using the free tier of the API we are limited at 10 results per query.)</span>
        </Box>

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

        <Box id='result-section'
          sx={{ width: 0.75 }}
        >
          {noSelection && teams && teams.length>0 && (
            <List sx={{ backgroundColor: "#ffffffed", borderRadius: "15px", width: 1 }}>
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
          {!noSelection && (
            <>
              <DetailsCard type={filter} entity={getSelection()}/>
              <Button 
                variant="contained" 
                startIcon={ <ArrowCircleLeftTwoToneIcon /> }
                sx={{ marginBottom: '30px' }}
                onClick={resetSelected} 
              >
                Back
              </Button>
            </>
          )}
        </Box>
      </main>
    </ThemeProvider>
  )
}

export default App
