import logo from './logo.png';
import './App.css';
import SearchBar from 'material-ui-search-bar'
import { Grid, Typography, FormControl, InputLabel, Select, FormLabel, RadioGroup, Radio, FormControlLabel} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import { useState } from 'react';
import { yellow } from '@material-ui/core/colors';



function App() {
  
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="Logo-image"/>
      <SearchBar value='Type your team' className="SearchBar"/>
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
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
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
                <FormControlLabel value="female" control={<Radio />} label="Success of schemes" />
                <FormControlLabel value="male" control={<Radio />} label="Ball posession" />
                <FormControlLabel value="other" control={<Radio />} label="Fouls" />
                <FormControlLabel value="disabled" control={<Radio />} label="Shots" />
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
                  margin="normal"
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
  );
}

export default App;
