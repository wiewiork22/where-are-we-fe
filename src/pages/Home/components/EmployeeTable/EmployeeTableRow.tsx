import { TableRow, TableCell, styled } from '@mui/material';
import { Employee } from '../../../../models/Employee';
import { useAuth } from '../../../../components/auth/AuthContext.tsx';
import { useTheme } from '@mui/material/styles';
import DeleteEmployee from '../DeleteEmployee.tsx';
import EditEmployee from './EditEmployee.tsx';

const sharedStyles = {
  field: {
    fontSize: 'small',
  },
  fullName: {
    fontSize: 'medium',
  },
};

const StyledFieldTableCell = styled(TableCell)(sharedStyles.field);

const StyledFullName = styled('span')(sharedStyles.fullName);

const StyledField = styled('span')(sharedStyles.field);

function EmployeeTableRow({ employee }: { employee: Employee }) {
  const auth = useAuth();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const isAdmin = auth?.userRoles.includes('ADMIN');

  const truncatedAddress =
    employee.address.streetAddress.length > 10
      ? employee.address.streetAddress.slice(0, 10) + '...'
      : employee.address.streetAddress;

  return (
    <TableRow key={employee.id}>
      <TableCell>
        <StyledFullName style={{ color: primaryColor }}>{employee.fullName}</StyledFullName> <br />
        <StyledField>{employee.position}</StyledField>
      </TableCell>
      <StyledFieldTableCell>{employee.department}</StyledFieldTableCell>
      <StyledFieldTableCell>{employee.squad ?? '-'}</StyledFieldTableCell>
      <StyledFieldTableCell>{truncatedAddress}</StyledFieldTableCell>
      {isAdmin && (
        <StyledFieldTableCell>
          <EditEmployee employee={employee} />
          <DeleteEmployee employeeId={employee.id} employeeFullName={employee.fullName} />
        </StyledFieldTableCell>
      )}
    </TableRow>
  );
}

export default EmployeeTableRow;
