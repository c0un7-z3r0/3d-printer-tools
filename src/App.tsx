import React from 'react';
import './App.css';
import { Grid, Paper } from '@material-ui/core';
import ExtruderSteps from './calculators/extruder-steps';
import BeltDrivenSteps from './calculators/belt-driven-steps';

const App = () => {
  return (
    <Paper>
      <Grid container spacing={16}>
        <Grid item>
          <ExtruderSteps />
        </Grid>
        <Grid item>
          <BeltDrivenSteps />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default App;
