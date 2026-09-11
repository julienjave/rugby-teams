import { useState } from 'react'
import { 
  TextField, 
  FormControl, 
  Button, 
  List,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material'
import { searchTeams } from './database'
import './App.css'

function App() {
  const [searchValue, setSearchValue] = useState("")
  const [teamSelected, setTeamSelected] = useState(null)
  const [teams, setTeams] = useState(null)

  async function search(e) {
    e.preventDefault()
    if (!searchValue.trim()) return
    setTeamSelected(null)
    setTeams(await searchTeams(searchValue))
  }

  return (
    <>
      <main>
        <header>
          <h1>RugbyTeamsOPedia </h1>
          <p>All you want to know about your favorite Rugby teams is just a click away...</p>
        </header>

        <section id='search-section'>
            <TextField 
              variant="filled"
              value={searchValue} 
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button 
              variant='contained' 
              onClick={search}
            >Search</Button>
        </section>

        <section id='result-section'>
          {!teamSelected && teams && teams.length>0 && (
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
        </section>
      </main>
    </>
  )
}

export default App
