import axios from 'axios';
import fakeEmployees from './FakeEmployees.json';
import Employee from '../models/Employee.ts';

const api = axios.create({
  //TODO replace with real api
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

const apiEndpoints = {
  getEmployees: async (): Promise<Employee[]> => {
    //TODO replace with real api
    const response: Employee[] = fakeEmployees;

    return response;
  },
};

export default apiEndpoints;