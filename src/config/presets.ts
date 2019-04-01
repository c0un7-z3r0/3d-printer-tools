export type IPreset = {
    description: string;
    value: number;
};

export const motorStepAnglesPreset: IPreset[] = [
    { description: '1.8° (200 per revolution)', value: 200 },
    { description: '0.9° (400 per revolution)', value: 400 },
];

export const driverMicroStepsPreset: IPreset[] = [
    { description: '1', value: 1 },
    { description: '1/2', value: 2 },
    { description: '1/4', value: 4 },
    { description: '1/8', value: 8 },
    { description: '1/16', value: 16 },
    { description: '1/32', value: 32 },
];

export const pulleyToothCountPreset: IPreset[] = [
    { description: '8 teeth', value: 8 },
    { description: '16 teeth', value: 16 },
    { description: '20 teeth', value: 20 },
    { description: '25 teeth', value: 25 },
];

export const beltPitchPreset: IPreset[] = [
    { description: '2mm Pitch (GT2)', value: 2 },
    { description: '2.5mm (T2.5)', value: 2.5 },
    { description: '3mm Pitch (GT2, HTD)', value: 3 },
    { description: '5mm Pitch (T5, GT2, HTD)', value: 5 },
];
