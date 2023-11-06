import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  styled,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDeleteEmployee } from '../../../../utils/api';
import { Employee } from '../../../../models/Employee';
import { useAuth } from '../../../../components/auth/AuthContext.tsx';
import { useTheme } from '@mui/material/styles';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
  const auth = useAuth();
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const isAdmin = auth?.userRoles.includes('ADMIN');

  const isDropDownOpen = Boolean(anchorEl);

  const deleteEmployeeMutation = useDeleteEmployee();

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
          <IconButton aria-label="more" id="delete-button" onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MoreHorizIcon />
          </IconButton>

          <Menu
            disableScrollLock
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'delete-button',
            }}
            anchorEl={anchorEl}
            open={isDropDownOpen}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setIsDialogOpen(true);
                setAnchorEl(null);
              }}
            >
              Delete Employee
            </MenuItem>
          </Menu>
          <Dialog
            open={isDialogOpen}
            disableScrollLock
            disableEnforceFocus
            hideBackdrop
            onClose={() => setIsDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Delete Employee</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete {employee.fullName} employee profile? Profile will be deleted
                permanently and cannot be restored.
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  deleteEmployeeMutation.mutate(employee.id);
                  setIsDialogOpen(false);
                }}
                autoFocus
                color="error"
                variant="outlined"
              >
                Delete Employee
              </Button>
            </DialogActions>
          </Dialog>
        </StyledFieldTableCell>
      )}
    </TableRow>
  );
}

export default EmployeeTableRow;
