import { TableCell, styled } from '@mui/material';
import { Employee } from '../../../../models/Employee';
import { useAuth } from '../../../../components/auth/AuthContext.tsx';
import { useTheme } from '@mui/material/styles';
import DeleteEmployee from '../DeleteEmployee.tsx';
import EditEmployee from './EditEmployee.tsx';
import { motion } from 'framer-motion';

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

function EmployeeTableRow({ employee, refreshData }: { employee: Employee; refreshData: () => void }) {
  const auth = useAuth();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const isAdmin = auth?.userRoles.includes('ADMIN');

  const truncatedAddress =
    employee.address.street.length > 20 ? employee.address.street.slice(0, 20) + '...' : employee.address.street;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <TableCell>
        <StyledFullName style={{ color: primaryColor }}>{employee.fullName}</StyledFullName> <br />
        <StyledField>{employee.position}</StyledField>
      </TableCell>
      <StyledFieldTableCell>{employee.department}</StyledFieldTableCell>
      <StyledFieldTableCell>{employee.squad ?? '-'}</StyledFieldTableCell>
      <StyledFieldTableCell>{truncatedAddress}</StyledFieldTableCell>
      {isAdmin && (
        <StyledFieldTableCell>
          <EditEmployee employee={employee} refreshData={refreshData} />
          <DeleteEmployee employeeId={employee.id} employeeFullName={employee.fullName} refreshData={refreshData} />
        </StyledFieldTableCell>
      )}
    </motion.tr>
  );
}

export default EmployeeTableRow;
