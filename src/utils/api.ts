import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Employee } from '../models/Employee';
import { EmployeeForm } from '../models/Employee';
import { useQuery } from '@tanstack/react-query';

export const useGetEmployees = () => {
  return useQuery<Employee[], []>({
    queryKey: ['employees'],
    queryFn: getEmployees,
  });
};

export const getEmployees = async () => {
  return await axios.get<Employee[]>(`http://localhost:8080/employees`).then((res) => res.data);
};

export const useGetEmployeeById = (id: string) => {
  return useQuery<Employee, []>({
    queryKey: ['employees', id],
    queryFn: () => getEmployeeById(id),
  });
};

export const getEmployeeById = async (id: string) => {
  return await axios.get<Employee>(`http://localhost:8080/employees/${id}`).then((res) => res.data);
};

export const useAddNewEmployee = () => {
  return useMutation(addNewEmployee);
};

const addNewEmployee = async (employeeData: EmployeeForm) => {
  return await axios.post(`http://localhost:8080/employees`, employeeData);
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
  return await axios.put<EmployeeForm>(`http://localhost:8080/employees/${id}`, data);
};
