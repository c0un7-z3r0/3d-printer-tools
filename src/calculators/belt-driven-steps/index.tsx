import React, { ReactElement, useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@material-ui/core';
import { camelCase, kebabCase } from 'lodash';
import styles from './BeltDrivenSteps.module.scss';
import {
    beltPitchPreset,
    driverMicroStepsPreset,
    IPreset,
    motorStepAnglesPreset,
    pulleyToothCountPreset,
} from '../../config/presets';
import { calculateBeltSteps } from '../../lib/calculations';

const pixelWidth = require('string-pixel-width');


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
      const result = calculateBeltSteps(motorStepAngle, driverMicroStepping, beltPitch, pulleyToothCount);
      setCalculatedNewSteps(result.steps);
      setCalculatedResolution(result.resolution);
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
