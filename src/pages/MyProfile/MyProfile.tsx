import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { useState } from 'react';

const departments = ['Operations', 'HR'];

function MyProfile() {
  const [department, setDepartment] = useState(departments[0]);

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value);
  };

  return (
    <>
      <Typography variant="h3" color="primary">
        My profile
      </Typography>
      <Typography paragraph color="text.primary" sx={{ pb: '50px' }}>
        Edit your personal information, position and working address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="caption" color="text.primary" component={'div'}>
            Photo
          </Typography>
          <img
            src="src/images/logo.png"
            alt="map"
            style={{
              maxWidth: '100%',
            }}
          />
        </Grid>
        <Grid item xs={9}>
          <Stack spacing={2}>
            <TextField
              id="full-name"
              label="Full name"
              variant="outlined"
              fullWidth
              disabled
              defaultValue={''}
              value={'Mikołaj Kopernik'}
            />
            <Grid container spacing={0} justifyContent={'space-between'} columns={30}>
              <Grid item xs={14}>
                <FormControl fullWidth>
                  <InputLabel id="department">Department</InputLabel>
                  <Select
                    disabled
                    labelId="department-select-label"
                    id="department-select"
                    value={department}
                    label="Department"
                    onChange={handleDepartmentChange}
                  >
                    {departments.map((dep) => (
                      <MenuItem value={dep}>{dep}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={14}>
                <TextField id="role" label="Role" variant="outlined" fullWidth value={'Accountant'} disabled />
              </Grid>
            </Grid>
            <Divider />
            <Typography variant="h6" color="text.primary">
              Address
            </Typography>
            <TextField
              id="street"
              label="Street address"
              variant="outlined"
              fullWidth
              value={'Jurija Gagarina 11'}
              disabled
              defaultValue={''}
            />
            <Grid container spacing={0} justifyContent={'space-between'} columns={30}>
              <Grid item xs={14}>
                <TextField
                  id="city"
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={'Toruń'}
                  defaultValue={''}
                  disabled
                />
              </Grid>
              <Grid item xs={14}>
                <TextField
                  id="state"
                  label="State / Province"
                  variant="outlined"
                  defaultValue={''}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
            <Grid container spacing={0} justifyContent={'space-between'} columns={30}>
              <Grid item xs={14}>
                <TextField
                  id="postcode"
                  label="Postcode"
                  variant="outlined"
                  fullWidth
                  defaultValue={''}
                  value={'87-100'}
                  disabled
                />
              </Grid>
              <Grid item xs={14}>
                <TextField
                  id="country"
                  label="Country"
                  variant="outlined"
                  fullWidth
                  defaultValue={''}
                  value={'Poland'}
                  disabled
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default MyProfile;
