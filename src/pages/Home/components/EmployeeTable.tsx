import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../../../utils/api.ts';
import Employee from '../../../models/Employee.ts';
import { styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const sharedStyles = {
  field: {
    color: '#555555',
    fontSize: 'small',
  },
  fullName: {
    color: '#0e0053',
    fontSize: 'medium',
  },
};

const StyledTableHeader = styled(TableCell)(sharedStyles.field);

const StyledFieldTableCell = styled(TableCell)(sharedStyles.field);

const StyledFullName = styled('span')(sharedStyles.fullName);

const StyledField = styled('span')(sharedStyles.field);

function EmployeeTable() {
  //TODO handle error
  const { isLoading, data } = useQuery(['employees'], () => api.getEmployees());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const employees: Employee[] = data ?? [];

  const columnNames = ['Full name', 'Department', 'Squad', 'Location'];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnNames.map((columnName, index) => (
              <StyledTableHeader key={index + columnName}>{columnName}</StyledTableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <StyledFullName>{employee.fullName}</StyledFullName> <br />
                <StyledField>{employee.position}</StyledField>
              </TableCell>
              <StyledFieldTableCell>{employee.department}</StyledFieldTableCell>
              <StyledFieldTableCell>{employee.squad ?? '-'}</StyledFieldTableCell>
              <StyledFieldTableCell>{employee.address}</StyledFieldTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;
