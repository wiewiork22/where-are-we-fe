export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  lat_lng: { lat: number; lng: number };
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
