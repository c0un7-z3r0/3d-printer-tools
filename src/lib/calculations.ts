export function calculateExtruderSteps(
    wantedLength: string | number,
    actualLength: string | number,
    currentSteps: string | number,
): string {

    let newSteps = 0;
    if (wantedLength && actualLength && currentSteps) {
        const wanted = typeof (wantedLength) === 'string' ? parseFloat(wantedLength) : wantedLength;
        const actual = typeof (actualLength) === 'string' ? parseFloat(actualLength) : actualLength;
        const steps = typeof (currentSteps) === 'string' ? parseFloat(currentSteps) : currentSteps;
        newSteps = (wanted / actual) * steps;
    }
    return newSteps.toFixed(2);
}

export function calculateBeltSteps(
    motorStepAngle: number | string,
    driverMicroStepping: number | string,
    beltPitch: number | string,
    pulleyToothCount: number | string,
): { steps: string, resolution: string } {
    let newSteps = 0;
    let newResolution = 0;
    if (motorStepAngle && driverMicroStepping && beltPitch && pulleyToothCount) {
        const stepAngle = typeof (motorStepAngle) === 'string' ? parseFloat(motorStepAngle) : motorStepAngle;
        const microSteps = typeof (driverMicroStepping) === 'string' ? parseFloat(driverMicroStepping) : driverMicroStepping;
        const pitch = typeof (beltPitch) === 'string' ? parseFloat(beltPitch) : beltPitch;
        const toothCount = typeof (pulleyToothCount) === 'string' ? parseFloat(pulleyToothCount) : pulleyToothCount;

        newSteps = (stepAngle * microSteps) / (pitch * toothCount);
        newResolution = (1 / newSteps) * 1000;
    }
    return {
        steps: newSteps.toFixed(2),
        resolution: newResolution.toFixed(2),
    };

}
