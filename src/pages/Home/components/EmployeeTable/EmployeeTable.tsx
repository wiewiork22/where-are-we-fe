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
import { useState } from 'react';
import { Button } from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

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
  const [sort, setSort] = useState({ keyToSort: 'id', direction: 'ASC' });
  const auth = useAuth();
  const columnNames = [
    { header: 'Full name', value: 'fullName' },
    { header: 'Department', value: 'department' },
    { header: 'Squad', value: 'squad' },
    { header: 'Location', value: 'address.street' },
  ];

  function handleHeaderClick(value: string) {
    if (sort.keyToSort === value) {
      if (sort.direction === 'ASC') {
        setSort({
          keyToSort: value,
          direction: 'DESC',
        });
      } else {
        setSort({
          keyToSort: 'id',
          direction: 'ASC',
        });
      }
    } else {
      setSort({
        keyToSort: value,
        direction: 'ASC',
      });
    }
  }

  const sortedEmployees = employees.slice();
  function getSortedEmployees() {
    if (sort.direction === 'ASC') {
      return sortedEmployees.sort((a, b) => {
        const aVal = getNestedValue(a, sort.keyToSort);
        const bVal = getNestedValue(b, sort.keyToSort);

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return aVal.localeCompare(bVal, undefined, { sensitivity: 'base' });
        }
        return String(aVal).localeCompare(String(bVal), undefined, { sensitivity: 'base' });
      });
    } else {
      return sortedEmployees.sort((a, b) => {
        const aVal = getNestedValue(a, sort.keyToSort);
        const bVal = getNestedValue(b, sort.keyToSort);

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return bVal.localeCompare(aVal, undefined, { sensitivity: 'base' });
        }
        return String(bVal).localeCompare(String(aVal), undefined, { sensitivity: 'base' });
      });
    }
  }

  function getNestedValue(obj, key) {
    return key.split('.').reduce((acc, cur) => acc && acc[cur], obj);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnNames.map((columnName, index) => (
              <StyledTableHeader key={index + columnName.header}>
                <Button
                  onClick={() => handleHeaderClick(columnName.value)}
                  sx={{
                    color: 'text.primary',
                    height: '100%',
                    justifyContent: 'flex-start',
                  }}
                  fullWidth
                >
                  {columnName.header}
                  {sort.keyToSort === columnName.value && sort.direction === 'ASC' && <KeyboardDoubleArrowDownIcon />}
                  {sort.keyToSort === columnName.value && sort.direction === 'DESC' && <KeyboardDoubleArrowUpIcon />}
                </Button>
              </StyledTableHeader>
            ))}
            {auth?.userRoles.includes('ADMIN') && (
              <StyledTableHeader>
                <Button
                  sx={{
                    color: 'text.primary',
                    height: '100%',
                    justifyContent: 'flex-start',
                  }}
                  fullWidth
                >
                  Action
                </Button>
              </StyledTableHeader>
            )}
          </TableRow>
        </TableHead>
        <AnimatePresence>
          <TableBody>
            {getSortedEmployees().map((employee) => (
              <EmployeeTableRow employee={employee} key={employee.id} />
            ))}
          </TableBody>
        </AnimatePresence>
      </Table>
    </TableContainer>
  );
}

export default EmployeeTable;
