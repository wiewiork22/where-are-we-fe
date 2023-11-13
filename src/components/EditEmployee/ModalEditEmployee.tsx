import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { Employee, EmployeeForm } from '../../models/Employee.ts';
import { AxiosResponse } from 'axios';
import { UseMutateFunction } from '@tanstack/react-query';

type ModalEditEmployeeProps = {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  mutate: UseMutateFunction<AxiosResponse<EmployeeForm, undefined>, unknown, Employee, unknown>;
  showSnackbar: () => void;
  employee: Employee;
};

const inputFieldVariant = 'outlined';

function ModalEditEmployee({ modalIsOpen, setModalIsOpen, mutate, showSnackbar, employee }: ModalEditEmployeeProps) {
  const [employeeData, setEmployeeData] = useState({
    fullName: employee.fullName,
    department: employee.department,
    position: employee.position,
    squad: employee.squad,
    email: employee.email,
  });
  const [employeeAddressData, setEmployeeAddressData] = useState(employee.address);

  const isFilled: boolean =
    Object.values(employeeData).every((value) => value !== '') &&
    Object.values(employeeAddressData).every((value) => value !== '');
  const resetAllFields = () => {
    setEmployeeData({
      fullName: employee.fullName,
      department: employee.department,
      position: employee.position,
      squad: employee.squad,
      email: employee.email,
    });
    setEmployeeAddressData(employee.address);
  };
  const handleEmployeeChangeValue = (key: string, value: string) => {
    setEmployeeData((data) => ({ ...data, [key]: value }));
  };

  const handleAddressChangeValue = (key: string, value: string) => {
    setEmployeeAddressData((data) => ({ ...data, [key]: value }));
  };

  const handleEditEmployeeClick = () => {
    const editedEmployee: Employee = { ...employeeData, address: { ...employeeAddressData }, id: employee.id };
    mutate(editedEmployee, {
      onSuccess: () => {
        showSnackbar();
        closeModal();
      },
      onError: () => {
        showSnackbar();
      },
    });
  };

  function closeModal() {
    resetAllFields();
    setModalIsOpen(false);
  }

  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      sx={{
        margin: 'auto',
        padding: 5,
        width: '80vw',
      }}
    >
      <Box sx={{ backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', p: 1 }}>
        <Box sx={{ pl: 4, display: 'flex', flexDirection: 'column' }}>
          <Button
            onClick={closeModal}
            sx={{
              marginLeft: 'auto',
              marginBottom: 'auto',
              cursor: 'pointer',
            }}
          >
            <CloseIcon sx={{ color: '#555' }} />
          </Button>
          <Typography variant="h3" color="text.primary">
            Edit employee details
          </Typography>
        </Box>

        <Divider />
        <Box sx={{ display: 'flex', pl: 3, pb: 3 }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', m: 1, pt: 1 }}>
            <Typography color="text.primary">Photo</Typography>
            <img src="src/images/logo.png" alt="logo" style={{ maxWidth: '180px' }} />
            <Button fullWidth variant="contained" sx={{ p: 2, mt: 'auto' }} onClick={closeModal}>
              Cancel
            </Button>
          </Box>
          <Box
            sx={{ flex: 3, backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', p: 1, pr: 4 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                value={employeeData.fullName}
                label="Full name"
                variant={inputFieldVariant}
                sx={{ mb: 1, mr: 1 }}
                onChange={(e) => handleEmployeeChangeValue('fullName', e.target.value)}
              />
              <TextField
                disabled
                fullWidth
                value={employeeData.email}
                label="Email"
                variant={inputFieldVariant}
                sx={{ mr: 1 }}
                onChange={(e) => handleEmployeeChangeValue('email', e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                value={employeeData.department}
                label="Department"
                variant={inputFieldVariant}
                sx={{ mr: 1 }}
                onChange={(e) => handleEmployeeChangeValue('department', e.target.value)}
              />
              <TextField
                fullWidth
                value={employeeData.position}
                label="Position"
                variant={inputFieldVariant}
                sx={{ mr: 1 }}
                onChange={(e) => handleEmployeeChangeValue('position', e.target.value)}
              />
              <TextField
                fullWidth
                label="Squad"
                value={employeeData.squad}
                variant={inputFieldVariant}
                onChange={(e) => handleEmployeeChangeValue('squad', e.target.value)}
              />
            </Box>
            <Divider sx={{ pt: 1 }} />
            <Typography color="text.primary" sx={{ pt: 2, pb: 2 }}>
              Address
            </Typography>
            <TextField
              value={employeeAddressData.street}
              label="Street Address"
              variant={inputFieldVariant}
              sx={{ mb: 1 }}
              onChange={(e) => handleAddressChangeValue('streetAddress', e.target.value)}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                value={employeeAddressData.country}
                label="Country"
                variant={inputFieldVariant}
                sx={{ mb: 1, mr: 1 }}
                onChange={(e) => handleAddressChangeValue('country', e.target.value)}
              />
              <TextField
                fullWidth
                value={employeeAddressData.city}
                label="City"
                variant={inputFieldVariant}
                sx={{ mb: 1 }}
                onChange={(e) => handleAddressChangeValue('city', e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                value={employeeAddressData.state}
                fullWidth
                label="State / Province"
                variant={inputFieldVariant}
                sx={{ mb: 1, mr: 1 }}
                onChange={(e) => handleAddressChangeValue('state', e.target.value)}
              />
              <TextField
                value={employeeAddressData.postCode}
                fullWidth
                label="Post Code"
                variant={inputFieldVariant}
                onChange={(e) => handleAddressChangeValue('postCode', e.target.value)}
              />
            </Box>
            <Button variant="contained" disabled={!isFilled} sx={{ p: 2, mt: 1 }} onClick={handleEditEmployeeClick}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalEditEmployee;
