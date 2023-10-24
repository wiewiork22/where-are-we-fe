import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import EmployeeTableRow from './EmployeeTableRow';
import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../../utils/api';
import { Employee } from '../../../models/Employee';

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

function EmployeeTable() {
  //TODO handle error
  const { isLoading, data } = useQuery(['employees'], () => getEmployees());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const employees: Employee[] = data ?? [];

  const columnNames = ['Full name', 'Department', 'Squad', 'Location', 'Action'];

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
            <EmployeeTableRow key={employee.id} employee={employee} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;
