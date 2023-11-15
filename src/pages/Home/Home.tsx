import { useEffect, useState } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { Employee } from '../../models/Employee';
import { Box, Card, Grid, Typography } from '@mui/material';
import FilterEmployeeComponents from './components/EmployeeTable/FilterEmployeeComponents.tsx';
import EmployeeMap from './components/EmployeeMap/EmployeeMap.tsx';
import { StyledButtonRadius100 } from '../../components/buttons/CustomButton.ts';
import AddIcon from '@mui/icons-material/Add';
import AddEmployee from './components/EmployeeTable/AddEmployee.tsx';
import EmployeeTable from './components/EmployeeTable/EmployeeTable.tsx';
import axiosConfig from '../../utils/axiosConfig.ts';
import { useGetEmployees } from '../../utils/api.ts';
import { useJsApiLoader } from '@react-google-maps/api';

const apiKey = import.meta.env.VITE_MAP_API_KEY;
const googleMapsLibraries = ['places'];

const ButtonStyle = {
  float: 'right',
  p: 1,
  pr: 3,
  pl: 3,
};

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useAuth();
  const isAdmin = auth?.userRoles.includes('ADMIN');

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const { data, isSuccess } = useGetEmployees();

  useEffect(() => {
    setFilteredEmployees(data ?? []);
  }, [data]);

  useEffect(() => {
    axiosConfig;
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    // @ts-ignore
    libraries: googleMapsLibraries,
  });

  const handleModalOpenClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', marginBottom: '50px' }}>
        <Grid item sx={{ flex: 1 }}>
          <Typography variant="h2" color="primary" style={{ marginBottom: '40px' }}>
            Hello, Szymon 👋
          </Typography>

          <Typography paragraph color="text.primary">
            Discover, connect and communicate with your colleagues nearby
          </Typography>
        </Grid>
        <Grid item sx={{ alignSelf: 'flex-end' }}>
          <FilterEmployeeComponents
            employees={data ?? []}
            onFiltered={(filteredEmployees) => {
              setFilteredEmployees(filteredEmployees);
            }}
          />
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ marginBottom: '50px' }}>
        {isSuccess && EmployeeMap(filteredEmployees)}
      </Card>

      {isAdmin && (
        <Box>
          <StyledButtonRadius100
            variant="contained"
            sx={ButtonStyle}
            onClick={handleModalOpenClick}
            disabled={!isLoaded}
            startIcon={isLoaded && <AddIcon />}
          >
            {isLoaded ? 'Add employee' : 'Loading...'}
          </StyledButtonRadius100>
          {isLoaded && <AddEmployee isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
        </Box>
      )}
      {isSuccess && isLoaded && <EmployeeTable employees={filteredEmployees} />}
    </>
  );
}

export default Home;
