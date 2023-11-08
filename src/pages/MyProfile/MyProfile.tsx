import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Divider, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { StyledButtonRadius100 } from '../../components/buttons/CustomButton.ts';

const countries = ['Poland', 'Germany'];
const states = ['Kujawsko-Pomorskie', 'Pomorskie'];
const cities = ['Toruń', 'Gdańsk'];

function MyProfile() {
  const [fullName, setFullName] = useState('Mikołaj Kopernik');
  const [selectedDepartment, setSelectedDepartment] = useState('magic');
  const [selectedPosition, setSelectedPosition] = useState('position');
  const [selectedSquad, setSelectedSquad] = useState('Power Rangers');
  const [street, setStreet] = useState('Jurija Gagarina 11');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedState, setSelectedState] = useState(states[0]);
  const [postcode, setPostcode] = useState('87-100');

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
            <TextField disabled id="full-name" label="Full name" variant="outlined" fullWidth value={fullName} />
            <Grid container spacing={0} justifyContent={'space-between'} columns={30}>
              <Box sx={{ display: 'flex', flex: 1, gap: '16px' }}>
                <FormControl fullWidth>
                  <TextField disabled id="department-select" value={selectedDepartment} label="Department"></TextField>
                </FormControl>
                <FormControl fullWidth>
                  <TextField disabled id="position-select" value={selectedPosition} label="Position"></TextField>
                </FormControl>

                <TextField
                  id="squad"
                  label="Squad"
                  variant="outlined"
                  fullWidth
                  value={selectedSquad}
                  onChange={(event) => setSelectedSquad(event.target.value)}
                />
              </Box>
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
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
            <Box sx={{ display: 'flex', flex: 1, gap: '16px' }}>
              <FormControl fullWidth>
                <InputLabel id="city">City</InputLabel>
                <Select
                  labelId="city-select-label"
                  id="city-select"
                  value={selectedCity}
                  label="City"
                  onChange={(event) => setSelectedCity(event.target.value)}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="state">State / Province</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  value={selectedState}
                  label="State / Province"
                  onChange={(event) => setSelectedState(event.target.value)}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', flex: 1, gap: '16px' }}>
              <TextField
                id="postcode"
                label="Postcode"
                variant="outlined"
                fullWidth
                value={postcode}
                onChange={(event) => setPostcode(event.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel id="country">Country</InputLabel>
                <Select
                  labelId="country-select-label"
                  id="country-select"
                  value={selectedCountry}
                  label="Country"
                  onChange={(event) => setSelectedCountry(event.target.value)}
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: '20px', gap: '10px' }} justifyContent={'flex-end'}>
        <StyledButtonRadius100 variant="outlined" sx={{ width: '100px' }}>
          Cancel
        </StyledButtonRadius100>
        <StyledButtonRadius100 variant="contained" sx={{ width: '100px' }}>
          Save
        </StyledButtonRadius100>
      </Grid>
    </>
  );
}

export default MyProfile;
