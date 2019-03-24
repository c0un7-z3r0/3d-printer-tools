import React, { useState, ReactElement, useEffect } from 'react';
import {
  Select,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  FormControl,
  TextField,
  Collapse,
  Button,
  CardActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
  OutlinedInput,
} from '@material-ui/core';
import { camelCase, kebabCase } from 'lodash';
import styles from './BeltDrivenSteps.module.scss';
const pixelWidth = require('string-pixel-width');

type IPreset = {
  description: string;
  value: number;
};

const motorStepAnglesPreset: IPreset[] = [
  { description: '1.8° (200 per revolution)', value: 200 },
  { description: '0.9° (400 per revolution)', value: 400 },
];

const driverMicroStepsPreset: IPreset[] = [
  { description: '1', value: 1 },
  { description: '1/2', value: 2 },
  { description: '1/4', value: 4 },
  { description: '1/8', value: 8 },
  { description: '1/16', value: 16 },
  { description: '1/32', value: 32 },
];

const pulleyToothCountPreset: IPreset[] = [
  { description: '8 teeth', value: 8 },
  { description: '16 teeth', value: 16 },
  { description: '20 teeth', value: 20 },
  { description: '25 teeth', value: 25 },
];

const beltPitchPreset: IPreset[] = [
  { description: '2mm Pitch (GT2)', value: 2 },
  { description: '2.5mm (T2.5)', value: 2.5 },
  { description: '3mm Pitch (GT2, HTD)', value: 3 },
  { description: '5mm Pitch (T5, GT2, HTD)', value: 5 },
];

function renderPreset(
  presetName: string,
  presets: IPreset[],
  currentPresetValue: string,
  setPresetValue: any
): ReactElement {
  const labelWidth = pixelWidth(presetName, { size: 16 });
  return (
    <FormControl variant="outlined" margin="normal" fullWidth>
      <InputLabel htmlFor={kebabCase(presetName)}>{presetName}</InputLabel>
      <Select
        className={styles.dropdownMinWidth}
        input={
          <OutlinedInput
            labelWidth={labelWidth}
            name={camelCase(presetName)}
            id={kebabCase(presetName)}
            key={kebabCase(presetName)}
          />
        }
        value={currentPresetValue}
        onChange={event => setPresetValue(event.target.value)}
      >
        {presets.map(preset => (
          <MenuItem key={preset.value.toString()} value={preset.value}>
            {preset.description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function renderCustom(customName: string, currentValue: string, setValue: any): ReactElement {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      id={kebabCase(customName)}
      type="number"
      label={customName}
      value={currentValue}
      onChange={el => setValue(el.currentTarget.value || '')}
    />
  );
}

function renderResult(calculatedNewSteps: string, calculatedResolution: string): ReactElement {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Steps/mm</TableCell>
          <TableCell>Resolution</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{calculatedNewSteps}</TableCell>
          <TableCell>{calculatedResolution} micron</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function BeltDrivenSteps() {
  const [motorStepAngle, setMotorStepAngle] = useState('200');
  const [driverMicroStepping, setDriverMicroStepping] = useState('16');
  const [beltPitch, setBeltPitch] = useState('2');
  const [pulleyToothCount, setPulleyToothCount] = useState('16');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [calculatedNewSteps, setCalculatedNewSteps] = useState('0');
  const [calculatedResolution, setCalculatedResolution] = useState('0');

  useEffect(() => {
    let newSteps = 0;
    let newResolution = 0;
    if (motorStepAngle && driverMicroStepping && beltPitch && pulleyToothCount) {
      newSteps =
        (parseFloat(motorStepAngle) * parseFloat(driverMicroStepping)) /
        (parseFloat(beltPitch) * parseFloat(pulleyToothCount));
      newResolution = (1 / newSteps) * 1000;
    }

    setCalculatedNewSteps(newSteps.toFixed(2));
    setCalculatedResolution(newResolution.toFixed(2));
  });

  return (
    <div>
      <Card className={styles.card}>
        <CardHeader title="Steps per millimeter - belt driven systems" />
        <CardActions>
          <Button color="primary" onClick={() => setShowAdvanced(!showAdvanced)}>
            {showAdvanced ? 'hide' : 'show'} advanced
          </Button>
        </CardActions>
        <CardContent>
          <Collapse in={!showAdvanced} timeout={1}>
            {renderPreset('Motor step angle', motorStepAnglesPreset, motorStepAngle, setMotorStepAngle)}
            {renderPreset('Driver microstepping', driverMicroStepsPreset, driverMicroStepping, setDriverMicroStepping)}
            {renderPreset('Belt Pitch', beltPitchPreset, beltPitch, setBeltPitch)}
            {renderPreset('Pulley Tooth Count', pulleyToothCountPreset, pulleyToothCount, setPulleyToothCount)}
          </Collapse>
          <Collapse in={showAdvanced} timeout={10}>
            {renderCustom('Motor step angle', motorStepAngle, setMotorStepAngle)}
            {renderCustom('Driver microstepping', driverMicroStepping, setDriverMicroStepping)}
            {renderCustom('Belt Pitch', beltPitch, setBeltPitch)}
            {renderCustom('Pulley Tooth Count', pulleyToothCount, setPulleyToothCount)}
          </Collapse>
          <Divider />
          {renderResult(calculatedNewSteps, calculatedResolution)}
        </CardContent>
      </Card>
    </div>
  );
}

export default BeltDrivenSteps;
