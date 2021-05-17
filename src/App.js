import logo from './logo.png';
import './App.css';
import { Grid, Typography, FormControl, InputLabel, Select, FormLabel, RadioGroup, Radio, FormControlLabel, TextField, MenuItem, CircularProgress, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { useState } from 'react';
import { yellow } from '@material-ui/core/colors';
import { getAllTeams, getAvailableLeagues, getTeamByLeagueId, getAnalysisInfo } from './httpRequests'
import AnalysisPlot from './AnalysisPlot'

function App() {

  const [searchTeam, setSearchTeam] = useState('')
  const [allTeams, setAllTeams] = useState(undefined)
  if (!allTeams) {
    getAllTeams().then((teams) => {
      setAllTeams(teams)
    })
  }

  const [currLeague, setCurrLeague] = useState('')
  const [leagues, setLeagues] = useState(undefined)
  if (!leagues) {
    getAvailableLeagues().then((leagues) => {
      setLeagues(leagues)
    })
  }

  const [currTeam, setCurrTeam] = useState('')
  const [teams, setTeams] = useState(undefined)

  const handleLeagueChange = (league) => {
    setCurrTeam('')
    setAnalysisInfo(undefined)
    setCurrLeague(league)
    getTeamByLeagueId(league).then((teams) => {
      setTeams(teams)
    })
  }

  const [analysisInfo, setAnalysisInfo] = useState(undefined)

  const handleTeamChange = (team) => {
    setCurrTeam(team)
    setAnalysisInfo(undefined)
  }

  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [criterion, setCriterion] = useState(undefined)

  

  const handleAnalyze = () => {
    if (currTeam && criterion) {
      getAnalysisInfo(currTeam, criterion).then((info) => {
        setAnalysisInfo(info)
      })
    }
  }

  return (
    allTeams && leagues ?
      <div className="App">
        <img src={logo} alt="Logo" className="Logo-image" />
        <Autocomplete
          className='SearchBar'
          id="free-solo-demo"
          freeSolo
          options={allTeams ? allTeams.map((team) => team['team_name']) : null}
          renderInput={(params) => (
            <TextField {...params} value={searchTeam} onChange={(event) => setSearchTeam(event.target.value)} label="Choose your team" margin="normal" variant="outlined" />
          )}
        />
        <div class="Texthead">or use Advanced search below</div>
        <hr class="Line"></hr>
        <Grid container spacing={3} direction="row" className="Main">
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={6} className="Firstrow">
            <Grid item xs={12} >
              1. Choose the league
            </Grid>
            <Grid item xs={12}>
              <Select
                value={currLeague}
                onChange={(event) => handleLeagueChange(event.target.value)}
              >
                {
                  leagues.map((league) => {
                    return (
                      <MenuItem value={league['league_id']} key={league['league_id']}>
                        <Grid container spacing={1}>
                          <Grid item>
                            <img src={league['league_logo']} style={{ width: '20px', height: '20px' }} />
                          </Grid>
                          <Grid item>
                            {`${league["league_name"]} (${league["country_name"]})`}
                          </Grid>
                        </Grid>
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </Grid>
            <Grid item xs={12}>
              2. Choose the team
            </Grid>
            <Grid item xs={12}>
              <Select
                disabled={currLeague ? false : true}
                value={currTeam}
                onChange={(event) => handleTeamChange(event.target.value)}
              >
                {
                  teams?.map((team) => {
                    return (
                      <MenuItem value={team['team_key']} key={team['team_key']}>
                        <Grid container spacing={1}>
                          <Grid item>
                            <img src={team['team_badge']} style={{ width: '20px', height: '20px' }} />
                          </Grid>
                          <Grid item>
                            {team['team_name']}
                          </Grid>
                        </Grid>
                      </MenuItem>
                    )
                  })
                }
              </Select>
            </Grid>
            <Grid item xs={12}>
              3. Choose the criteria to analyze
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={criterion} onChange={(event) => setCriterion(event.target.value)}>
                  <FormControlLabel value="scheme" control={<Radio />} label={<Typography style={{ fontFamily: 'Merriweather' }}>Success of schemes</Typography>} />
                  <FormControlLabel value="possesion" control={<Radio />} label={<Typography style={{ fontFamily: 'Merriweather' }}>Ball posession</Typography>} />
                  <FormControlLabel value="fouls" control={<Radio />} label={<Typography style={{ fontFamily: 'Merriweather' }}>Fouls</Typography>} />
                  <FormControlLabel value="shots" control={<Radio />} label={<Typography style={{ fontFamily: 'Merriweather' }}>Shots</Typography>} />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              4. Choose the dates
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <DatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <DatePicker
                    disableToolbar
                    margin="normal"
                    variant="inline"
                    id="date-picker-dialog"
                    label="End Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleAnalyze}>
                Аналіз
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {
              analysisInfo ?
                <AnalysisPlot info={analysisInfo} criterion={criterion}/>
              :
                'Please, choose team and criteria to see a chart with analysis!'
            }
          </Grid>
        </Grid>
        <div id="footer">
          OP Project, 2021
        <br></br>
        Creators: Vsevolod Archakov, Mykola Kryvyi, Mykhailo Mulko, Oleg Palka, Sergiy Khuharchuk
      </div>
      </div>
      :
      <CircularProgress />
  );
}

export default App;
