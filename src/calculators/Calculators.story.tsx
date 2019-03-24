import React from 'react';
import { storiesOf } from '@storybook/react';
import ExtruderSteps from './extruder-steps';
import BeltDrivenSteps from './belt-driven-steps';

storiesOf('Calculators', module).add('Extruder Steps', () => <ExtruderSteps />);
storiesOf('Calculators', module).add('Belt Driven Steps', () => <BeltDrivenSteps />);
