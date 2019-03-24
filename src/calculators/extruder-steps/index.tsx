import React, { useState, useEffect } from 'react';
import { TextField, Card, CardContent, CardHeader, Typography, Divider } from '@material-ui/core';
import styles from './ExtruderSteps.module.scss'; // Import css modules stylesheet as styles

export default function ExtruderSteps() {
  const shouldBeFullWidth = true; // useMediaQuery('(max-width:1000px)');
  const [currentSteps, setCurrentSteps] = useState('');
  const [wantedLength, setWantedLength] = useState('');
  const [actualLength, setActualLength] = useState('');
  const [calculated, setCalculated] = useState('0');

  useEffect(() => {
    let newSteps = 0;
    if (wantedLength && actualLength && currentSteps) {
      newSteps = (parseFloat(wantedLength) / parseFloat(actualLength)) * parseFloat(currentSteps);
    }
    setCalculated(newSteps.toFixed(2) || '0.00');
  }, [actualLength, currentSteps, wantedLength]);

  return (
    <div>
      <Card className={styles.card}>
        <CardHeader title="Extruder Steps" />
        <CardContent>
          <TextField
            margin="normal"
            fullWidth={shouldBeFullWidth}
            id="wanted-length"
            type="number"
            label="Wanted length"
            value={wantedLength}
            variant="outlined"
            onChange={el => setWantedLength(el.currentTarget.value || '')}
          />
          <TextField
            margin="normal"
            fullWidth={shouldBeFullWidth}
            id="actual-length"
            type="text"
            label="Actual length"
            value={actualLength}
            variant="outlined"
            onChange={el => setActualLength(el.currentTarget.value || '')}
          />
          <TextField
            margin="normal"
            fullWidth={shouldBeFullWidth}
            id="current-steps"
            type="text"
            label="Current Steps/mm"
            value={currentSteps}
            variant="outlined"
            onChange={el => setCurrentSteps(el.currentTarget.value || '')}
          />
          <Divider />
          <Card className={styles.card}>
            <CardContent>
              <Typography align="center" variant="h5">
                M92 E{calculated}
              </Typography>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
