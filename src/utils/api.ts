import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import fakeEmployees from './FakeEmployees.json';
import { Employee } from '../models/Employee';
import { EmployeeForm } from '../models/Employee';

const api = axios.create({
  //TODO replace with real api
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

export const getEmployees = async (): Promise<Employee[]> => {
  const response: Employee[] = fakeEmployees;
  return response;
  return [];
};

export const useAddNewEmployee = () => {
  return useMutation(addNewEmployee);
};

const addNewEmployee = async (employeeData: EmployeeForm) => {
  return await axios.post(`link`, employeeData);
};
