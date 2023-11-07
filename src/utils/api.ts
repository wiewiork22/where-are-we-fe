import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import fakeEmployees from './FakeEmployees.json';
import { Employee } from '../models/Employee';
import { EmployeeForm } from '../models/Employee';

export const getEmployees = async (): Promise<Employee[]> => {
  const response: Employee[] = fakeEmployees;
  return response;
};

export const useAddNewEmployee = () => {
  return useMutation(addNewEmployee);
};

const addNewEmployee = async (employeeData: EmployeeForm) => {
  return await axios.post(`link`, employeeData);
};

export const useEmployeeLogin = () => {
  return useMutation(loginEmployee);
};
const loginEmployee = async (variables: { email: string; password: string }): Promise<string> => {
  const { email, password } = variables;

  const response = await axios.post(`http://localhost:8080/auth/log-in`, { email, password });
  const { data } = response;

  if (data.token) {
    return data.token;
  } else {
    throw new Error('LACK OF JWT.');
  }
};

export const useDeleteEmployee = () => {
  const mutation = useMutation((id: string) => axios.delete(`http://localhost:8080/employees/${id}`));

  return mutation;
};
export const useEditEmployee = () => {
  return useMutation(editEmployee);
};

const editEmployee = async (employee: Employee) => {
  const { id, ...data } = employee;
  return await axios.put<Employee>(`http://localhost:8080/employees/${id}`, data);
};
