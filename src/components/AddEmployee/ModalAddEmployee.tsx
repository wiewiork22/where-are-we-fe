import { Box, TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { cityOptions, countryOptions, departmentOptions, positionOptions } from '../../utils/OptionLists.ts';
import { EmployeeForm } from '../../models/Employee.ts';
import { AxiosResponse } from 'axios';
import { UseMutateFunction } from '@tanstack/react-query';

type ModalAddEmployeeProps = {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutate: UseMutateFunction<AxiosResponse<any, any>, unknown, EmployeeForm, unknown>;
  showSnackbar: () => void;
};

const customStyles = {
  margin: 'auto',
  padding: 5,
  width: '80vw',
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '160px',
    },
  },
};
const inputFieldVariant = 'outlined';

function ModalAddEmployee(props: ModalAddEmployeeProps) {
  const [employeeData, setEmployeeData] = useState({
    fullName: '',
    department: '',
    position: '',
    squad: '',
  });
  const [employeeAddressData, setEmployeeAddressData] = useState({
    streetAddress: '',
    city: '',
    state: '',
    postCode: '',
    country: '',
  });

  const isFilled: boolean =
    Object.values(employeeData).every((value) => value !== '') &&
    Object.values(employeeAddressData).every((value) => value !== '');
  const resetAllFields = () => {
    setEmployeeData({ fullName: '', department: '', position: '', squad: '' });
    setEmployeeAddressData({ streetAddress: '', city: '', state: '', postCode: '', country: '' });
  };
  const handleEmployeeChangeValue = (key: string, value: string) => {
    setEmployeeData((data) => ({ ...data, [key]: value }));
  };

  const handleAddressChangeValue = (key: string, value: string) => {
    setEmployeeAddressData((data) => ({ ...data, [key]: value }));
  };

  const handleAddNewEmployeeClick = () => {
    const newEmployee: EmployeeForm = { ...employeeData, address: { ...employeeAddressData } };
    props.mutate(newEmployee, {
      onSuccess: () => {
        props.showSnackbar();
        closeModal();
      },
      onError: () => {
        props.showSnackbar();
      },
      onSettled: () => {
        // loading
      },
    });
  };

  function closeModal() {
    resetAllFields();
    props.setModalIsOpen(false);
  }

  return (
    <>
      <Modal open={props.modalIsOpen} onClose={closeModal} sx={customStyles}>
        <Box sx={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', p: 1 }}>
          <Box sx={{ pl: 4, display: 'flex', flexDirection: 'column' }}>
            <Button
              onClick={closeModal}
              style={{
                marginLeft: 'auto',
                marginBottom: 'auto',
                cursor: 'pointer',
              }}
            >
              <CloseIcon style={{ color: '#555' }} />
            </Button>
            <Typography variant="h3">Add Employee</Typography>
          </Box>

          <Divider />
          <Box sx={{ display: 'flex', pl: 3, pb: 3 }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', m: 1, pt: 1 }}>
              <Typography>Photo</Typography>
              <img src="src/images/logo.png" alt="logo" style={{ maxWidth: '180px' }} />
              <Button fullWidth variant="contained" sx={{ p: 2, mt: 'auto' }} onClick={closeModal}>
                Cancel
              </Button>
            </Box>
            <Box sx={{ flex: 3, backgroundColor: 'white', display: 'flex', flexDirection: 'column', p: 1, pr: 4 }}>
              <TextField
                value={employeeData.fullName}
                label="Full name"
                variant={inputFieldVariant}
                sx={{ mb: 1 }}
                onChange={(e) => handleEmployeeChangeValue('fullName', e.target.value)}
              />

              <TextField
                value={employeeData.email}
                label="email"
                variant={inputFieldVariant}
                sx={{ mb: 1 }}
                onChange={(e) => handleEmployeeChangeValue('email', e.target.value)}
              />

              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl fullWidth sx={{ mr: 1 }}>
                  <InputLabel>Department</InputLabel>
                  <Select
                    value={employeeData.department}
                    variant={inputFieldVariant}
                    label="Department"
                    MenuProps={MenuProps}
                    onChange={(e) => handleEmployeeChangeValue('department', e.target.value)}
                  >
                    {departmentOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mr: 1 }}>
                  <InputLabel>Position</InputLabel>
                  <Select
                    value={employeeData.position}
                    variant={inputFieldVariant}
                    label="Position"
                    MenuProps={MenuProps}
                    onChange={(e) => handleEmployeeChangeValue('position', e.target.value)}
                  >
                    {positionOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Squad"
                  value={employeeData.squad}
                  variant={inputFieldVariant}
                  onChange={(e) => handleEmployeeChangeValue('squad', e.target.value)}
                />
              </Box>
              <Divider sx={{ pt: 1 }} />
              <Typography sx={{ pt: 2, pb: 2 }}>Address</Typography>
              <TextField
                value={employeeAddressData.streetAddress}
                label="Street Address"
                variant={inputFieldVariant}
                sx={{ mb: 1 }}
                onChange={(e) => handleAddressChangeValue('streetAddress', e.target.value)}
              />
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl fullWidth sx={{ mb: 1, mr: 1 }}>
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={employeeAddressData.country}
                    variant={inputFieldVariant}
                    label="Country"
                    MenuProps={MenuProps}
                    onChange={(e) => handleAddressChangeValue('country', e.target.value)}
                  >
                    {countryOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 1 }}>
                  <InputLabel>City</InputLabel>
                  <Select
                    value={employeeAddressData.city}
                    variant={inputFieldVariant}
                    label="City"
                    MenuProps={MenuProps}
                    onChange={(e) => handleAddressChangeValue('city', e.target.value)}
                  >
                    {cityOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              <Button variant="contained" disabled={!isFilled} sx={{ p: 2, mt: 1 }} onClick={handleAddNewEmployeeClick}>
                Add Employee
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ModalAddEmployee;
