import logo from './logo.png';
import './App.css';
import { Grid, Typography, FormControl, InputLabel, Select, FormLabel, RadioGroup, Radio, FormControlLabel, TextField, MenuItem, CircularProgress} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { useState } from 'react';
import { yellow } from '@material-ui/core/colors';
import { getAllTeams, getAvailableLeagues } from './httpRequests'


function App() {

  const [searchTeam, setSearchTeam] = useState('')
  const [allTeams, setAllTeams] = useState(undefined)
  if (!allTeams){
    getAllTeams().then((teams) => {
      setAllTeams(teams)
    })
  }

  const [currLeague, setCurrLeague] = useState('')
  const [leagues, setLeagues] = useState(undefined)
  if(!leagues){
    getAvailableLeagues().then((leagues) => {
      setLeagues(leagues)
    })
  }
  
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log(leagues)
  return (
    allTeams && leagues ?
    <div className="App">
      <img src={logo} alt="Logo" className="Logo-image"/>
      <Autocomplete
        className='SearchBars'
        id="free-solo-demo"
        freeSolo
        options={allTeams ? allTeams.map((team) => team['team_name']) : null}
        renderInput={(params) => (
          <TextField {...params} value={searchTeam} onChange={(event) => setSearchTeam(event.target.value)} label="Choose your team" margin="normal" variant="outlined" />
        )}
      />
      <div class = "Texthead">or use Advanced search below</div>
      <hr class = "Line"></hr>
      <Grid container spacing={3} direction="row" className = "Main">
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={6}  className = "Firstrow">
          <Grid item xs={12} >
            1. Choose the league 
          </Grid>
          <Grid item xs={12}>
            <Select
              native
              value={currLeague}
            >
              {
                  leagues.map((league) => {
                    <MenuItem value={league['league_name']}>
                      {league['league_name']}
                    </MenuItem>
                  })
              }  
            </Select>
          </Grid>
          <Grid item xs={12}>
            2. Choose the team
          </Grid>
          <Grid item xs={12}>
            <Select
              native
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </Select>
          </Grid>
          <Grid item xs={12}>
            3. Choose the criteria to analyze
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="gender1">
                <FormControlLabel value="female" control={<Radio />} label={<Typography style={{fontFamily: 'Merriweather'}}>Success of schemes</Typography>}/>
                <FormControlLabel value="male" control={<Radio />} label={<Typography style={{fontFamily: 'Merriweather'}}>Ball posession</Typography>} />
                <FormControlLabel value="other" control={<Radio />} label={<Typography style={{fontFamily: 'Merriweather'}}>Fouls</Typography>} />
                <FormControlLabel value="disabled" control={<Radio />} label={<Typography style={{fontFamily: 'Merriweather'}}>Shots</Typography>} />
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
          </Grid>
        <Grid item xs={4}>
          ТУТ БУИТ ГРАФИК
        </Grid>
      </Grid>
      <div id = "footer">
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
