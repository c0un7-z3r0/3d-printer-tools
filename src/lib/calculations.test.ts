import { calculateBeltSteps, calculateExtruderSteps } from './calculations';

// @ts-ignore
export default undefined; //fixes ts error that every file needs an export

describe('calculations', function () {
    describe('calculateExtruderSteps', function () {
        test.each`
   wantedLength | actualLength | currentSteps | newSteps
   ${100}       | ${90}        | ${100}       | ${'111.11'}
   ${100}       | ${100}       | ${100}       | ${'100.00'}
   ${120}       | ${20.91}     | ${100}       | ${'573.89'}
   ${'120'}     | ${'20.91'}   | ${'100'}     | ${'573.89'}
   ${120}       | ${'20.91'}   | ${'100'}     | ${'573.89'}
   ${120}       | ${20.91}     | ${100}       | ${'573.89'}
   ${undefined} | ${20.91}     | ${100}       | ${'0.00'}
   ${120}       | ${undefined} | ${100}       | ${'0.00'}
   ${100}       | ${20.91}     | ${undefined} | ${'0.00'}
   `('returns $newSteps steps/mm if the expected length is $wantedLength mm ' +
            'and the extruded length is $actualLength mm with the current steps being $currentSteps steps/mm',
            ({ wantedLength, actualLength, currentSteps, newSteps }) => {
                expect(calculateExtruderSteps(wantedLength, actualLength, currentSteps)).toBe(newSteps);
            });
    });
    describe('calculateBeltSteps', function () {
        test.each`
   motorStepAngle | driverMicroStepping | beltPitch   | pulleyToothCount | expectedSteps | expectedResolution
   ${200}         | ${16}               | ${2}        | ${16}            | ${'100.00'}   | ${'10.00'}
   ${400}         | ${16}               | ${2}        | ${16}            | ${'200.00'}   | ${'5.00'}
   ${200}         | ${1}                | ${2}        | ${16}            | ${'6.25'}     | ${'160.00'}
   ${200}         | ${32}               | ${2}        | ${16}            | ${'200.00'}   | ${'5.00'}
   ${'200'}       | ${'32'}             | ${'2.5'}    | ${'16'}          | ${'160.00'}   | ${'6.25'}
   ${200}         | ${'32'}             | ${'2.5'}    | ${'16'}          | ${'160.00'}   | ${'6.25'}
   ${'200'}       | ${32}               | ${'2.5'}    | ${'16'}          | ${'160.00'}   | ${'6.25'}
   ${'200'}       | ${'32'}             | ${2.5}      | ${'16'}          | ${'160.00'}   | ${'6.25'}
   ${'200'}       | ${'32'}             | ${'2.5'}    | ${16}            | ${'160.00'}   | ${'6.25'}
   ${undefined}   | ${'32'}             | ${'2.5'}    | ${'16'}          | ${'0.00'}     | ${'0.00'}
   ${'200'}       | ${undefined}        | ${'2.5'}    | ${'16'}          | ${'0.00'}     | ${'0.00'}
   ${'200'}       | ${'32'}             | ${undefined}| ${'16'}          | ${'0.00'}     | ${'0.00'}
   ${'200'}       | ${'32'}             | ${'2.5'}    | ${undefined}     | ${'0.00'}     | ${'0.00'}
   `('returns $expectedSteps steps/mm and a resolution of $expectedResolution if the motor micro steps are ' +
            '$motorStepAngle, the driver micro steps are set to $driverMicroStepping, belt pitch of ' +
            '$beltPitch and a pulley tooth count of $pulleyToothCount',
            ({ motorStepAngle, driverMicroStepping, beltPitch, pulleyToothCount, expectedSteps, expectedResolution }) => {
                const result = calculateBeltSteps(motorStepAngle, driverMicroStepping, beltPitch, pulleyToothCount);
                expect(result.steps).toBe(expectedSteps);
                expect(result.resolution).toBe(expectedResolution);
            });
    });
});


