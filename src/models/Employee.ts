export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
}

export interface EmployeeForm {
  fullName: string;
  position: string;
  squad: string | null;
  department: string;
  address: Address;
}
export interface Employee extends EmployeeForm {
  id: string;
}
