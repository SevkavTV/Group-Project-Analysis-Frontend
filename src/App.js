import logo from './logo.png';
import './App.css';
import { Grid, Typography, FormControl, InputLabel, Select, FormLabel, RadioGroup, Radio, FormControlLabel, TextField, MenuItem, CircularProgress, Button} from '@material-ui/core';
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

  const handleLeagueChange = (league, param) => {
    if(param === 'search'){
      setCurrTeam('')
      setAnalysisInfo(undefined)
      setCurrLeague(league['league_id'],)
      getTeamByLeagueId(league['league_id'],).then((teams) => {
        setTeams(teams)
      })
      handleTeamChange(league['team_id'], 'search')
    }else{
      setSearchTeam(undefined)
      setCurrTeam('')
      setAnalysisInfo(undefined)
      setCurrLeague(league)
      getTeamByLeagueId(league).then((teams) => {
        setTeams(teams)
      })
    }
  }

  const [analysisInfo, setAnalysisInfo] = useState(undefined)

  const handleTeamChange = (team, param) => {
    if(param === 'search'){
      setCurrTeam(team)
      setAnalysisInfo(undefined)
    }else{
      setSearchTeam(undefined)
      setCurrTeam(team)
      setAnalysisInfo(undefined)
    }
  }

  const [selectedStartDate, setSelectedStartDate] = useState(new Date(2015, 0, 1))

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const [selectedEndDate, setSelectedEndDate] = useState(new Date(2020, 11, 31))

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  const [criterion, setCriterion] = useState(undefined)

  

  const handleAnalyze = () => {
    if (currTeam && criterion) {
      let startDate = [
        selectedStartDate.getFullYear(),
        ('0' + (selectedStartDate.getMonth() + 1)).slice(-2),
        ('0' + selectedStartDate.getDate()).slice(-2)
      ].join('-');
      

      let endDate = [
        selectedEndDate.getFullYear(),
        ('0' + (selectedEndDate.getMonth() + 1)).slice(-2),
        ('0' + selectedEndDate.getDate()).slice(-2)
      ].join('-');

      getAnalysisInfo(currTeam, criterion, startDate, endDate).then((info) => {
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
          id="combo-box-demo"
          options={allTeams ? allTeams : null}
          getOptionLabel={(option) => option['team_name']}
          value={searchTeam}
          renderInput={(params) => <TextField {...params} label="Choose your team" variant="outlined" />}
          onChange={(event, value) => {
            if(value){
              setSearchTeam(value)
              handleLeagueChange(value, 'search');
            }
          }}
          renderOption={(option) => {
            return(
              <Grid container spacing={1}>
                <Grid item>
                  <img src={option['team_badge']} style={{ width: '20px', height: '20px' }} />
                </Grid>
                <Grid item>
                  {option['team_name']}
                </Grid>
              </Grid>
            )
          }}
        />
        <div class="Texthead">or use Advanced search below</div>
        <hr class="Line"></hr>
        <Grid container spacing={3} direction="row" className="Main">
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={3} className="Firstrow" style={{width: 200}}>
            <Grid item xs={12} >
              1. Choose the league
            </Grid>
            <Grid item xs={12}>
              <Select
                value={currLeague}
                onChange={(event) => handleLeagueChange(event.target.value, 'change')}
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
                onChange={(event) => handleTeamChange(event.target.value, 'change')}
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
              3. Choose the criteria
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
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Start Date"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
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
                    format="dd/MM/yyyy"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} className='Summary-button'>
              <Button variant='outlined' onClick={handleAnalyze} style={{textTransform: 'none', width: 170}}>
                <Typography style={{ fontFamily: 'Merriweather'}}>Analysis</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
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
