import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { StyledButtonRadius100 } from '../../components/buttons/CustomButton.ts';
import { Employee } from '../../models/Employee.ts';
import { useEditEmployee, useGetEmployeeById } from '../../utils/api.ts';
import { jwtDecode } from 'jwt-decode';
import CustomSnackbar from '../../components/snackbars/CustomSnackbar.tsx';

const inputFieldVariant = 'outlined';
const emptyEmployee: Employee = {
  fullName: '',
  position: '',
  squad: '',
  department: '',
  address: {
    street: '',
    city: '',
    state: '',
    postCode: '',
    country: '',
    lat: 0,
    lng: 0,
  },
  email: '',
  id: '',
};

function MyProfile() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [employeeData, setEmployeeData] = useState<Employee>(emptyEmployee);

  const decodedToken = jwtDecode(localStorage.getItem('token') ?? '');

  const { data, isLoading } = useGetEmployeeById(decodedToken.id);
  const { mutate: mutateEditEmployee, isSuccess } = useEditEmployee();

  useEffect(() => {
    setEmployeeData(data ?? emptyEmployee);
  }, [data]);

  const handleEmployeeChangeValue = (key: string, value: string) => {
    setEmployeeData((data) => ({ ...data, [key]: value }));
  };

  const handleAddressChangeValue = (key: string, value: string) => {
    setEmployeeData((data) => ({ ...data, address: { ...data.address, [key]: value } }));
  };
  const handleSaveEmployeeClick = () => {
    const editedEmployee: Employee = employeeData;
    mutateEditEmployee(editedEmployee, {
      onSuccess: () => {
        setShowSnackbar(true);
      },
      onError: () => {
        setShowSnackbar(true);
      },
    });
  };

  return (
    <Box sx={{ backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', p: 1 }}>
      <Box sx={{ pl: 4, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h3" color="primary">
          My profile
        </Typography>
        <Typography paragraph color="text.primary" sx={{ pb: '50px' }}>
          Edit your personal information, position and working address
        </Typography>
      </Box>
      <Divider />
      {isLoading ? (
        <>Loading..</>
      ) : (
        <Box sx={{ display: 'flex', pl: 3, pb: 3 }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', m: 1, pt: 1 }}>
            <Typography color="text.primary">Photo</Typography>
            <img src="src/images/logo.png" alt="logo" style={{ maxWidth: '180px' }} />
          </Box>
          <Box
            sx={{ flex: 3, backgroundColor: 'background.paper', display: 'flex', flexDirection: 'column', p: 1, pr: 4 }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                id="full-name"
                label="Full name"
                variant={inputFieldVariant}
                fullWidth
                sx={{ mb: 1, mr: 1 }}
                onChange={(e) => handleEmployeeChangeValue('fullName', e.target.value)}
                value={employeeData?.fullName}
              />
              <TextField
                disabled
                fullWidth
                value={employeeData?.email}
                label="Email"
                variant={inputFieldVariant}
                onChange={(e) => handleEmployeeChangeValue('email', e.target.value)}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                value={employeeData?.department}
                label="Department"
                variant={inputFieldVariant}
                sx={{ mr: 1 }}
                onChange={(e) => handleEmployeeChangeValue('department', e.target.value)}
              />
              <TextField
                fullWidth
                value={employeeData?.position}
                label="Position"
                variant={inputFieldVariant}
                sx={{ mr: 1 }}
                onChange={(e) => handleEmployeeChangeValue('position', e.target.value)}
              />
              <TextField
                fullWidth
                label="Squad"
                value={employeeData?.squad}
                variant={inputFieldVariant}
                onChange={(e) => handleEmployeeChangeValue('squad', e.target.value)}
              />
            </Box>
            <Divider sx={{ pt: 1 }} />
            <Typography color="text.primary" sx={{ pt: 2, pb: 2, pl: 1 }}>
              Address
            </Typography>
            <TextField
              value={employeeData?.address.street}
              label="Street Address"
              variant={inputFieldVariant}
              sx={{ mb: 1 }}
              onChange={(e) => handleAddressChangeValue('street', e.target.value)}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                value={employeeData?.address.country}
                label="Country"
                variant={inputFieldVariant}
                sx={{ mb: 1, mr: 1 }}
                onChange={(e) => handleAddressChangeValue('country', e.target.value)}
              />
              <TextField
                fullWidth
                value={employeeData?.address.city}
                label="City"
                variant={inputFieldVariant}
                sx={{ mb: 1 }}
                onChange={(e) => handleAddressChangeValue('city', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                value={employeeData?.address.state}
                fullWidth
                label="State / Province"
                variant={inputFieldVariant}
                sx={{ mb: 1, mr: 1 }}
                onChange={(e) => handleAddressChangeValue('state', e.target.value)}
              />
              <TextField
                value={employeeData?.address.postCode}
                fullWidth
                label="Post Code"
                variant={inputFieldVariant}
                onChange={(e) => handleAddressChangeValue('postCode', e.target.value)}
              />
            </Box>
            <Grid container spacing={2} sx={{ mt: '20px', gap: '10px' }} justifyContent={'flex-end'}>
              <StyledButtonRadius100
                variant="outlined"
                sx={{ width: '100px' }}
                onClick={() => {
                  setEmployeeData(data ?? emptyEmployee);
                }}
              >
                Cancel
              </StyledButtonRadius100>
              <StyledButtonRadius100 variant="contained" sx={{ width: '100px' }} onClick={handleSaveEmployeeClick}>
                Save
              </StyledButtonRadius100>
            </Grid>
          </Box>
        </Box>
      )}
      <CustomSnackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        status={isSuccess ? 'success' : 'error'}
        message={isSuccess ? 'Employee details updated' : 'Error updating employee details'}
      />
    </Box>
  );
}

export default MyProfile;
