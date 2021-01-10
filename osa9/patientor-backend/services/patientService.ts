/* eslint-disable @typescript-eslint/no-unsafe-return */
import patients from '../data/patients';
import { ShowablePatientEntry, PatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getShowableEntries = (): ShowablePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};


export default {
    getEntries,
    getShowableEntries,
};