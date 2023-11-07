import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import EmployeeTableRow from './EmployeeTableRow';
import { useAuth } from '../../../../components/auth/AuthContext.tsx';
import { Employee } from '../../../../models/Employee';

const sharedStyles = {
  field: {
    fontSize: 'small',
  },
  fullName: {
    fontSize: 'medium',
  },
};

const StyledTableHeader = styled(TableCell)(sharedStyles.field);

function EmployeeTable({ employees }: { employees: Employee[] }) {
  const auth = useAuth();
  const columnNames = auth?.userRoles.includes('ADMIN')
    ? ['Full name', 'Department', 'Squad', 'Location', 'Action']
    : ['Full name', 'Department', 'Squad', 'Location'];

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
