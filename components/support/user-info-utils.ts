const msInYear = 31556952000;

export const onChangeAge = (event: any, value: number | number[], setValue): void => {
    setValue('age', value);
    const nowInSec = Date.now();
    if (typeof value === 'number') {
        const ageInSec = value * msInYear;
        const birthdayInSec = nowInSec - ageInSec;
        const birthdayChanged = new Date(birthdayInSec);
        setValue('dateOfBirth', birthdayChanged);
    }
};

export const onChangeDateOfBirth = (date: Date, setValue) => {
    setValue('dateOfBirth', date);
    const nowInSec = Date.now();
    const birthdayInSec = date.getTime();
    const ageChanged = Math.floor((nowInSec - birthdayInSec) / msInYear);
    setValue('age', ageChanged);
};