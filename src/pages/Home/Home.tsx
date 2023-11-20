import { useEffect, useState } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { Employee } from '../../models/Employee';
import { Box, Card, Typography } from '@mui/material';
import FilterEmployeeComponents from './components/EmployeeTable/FilterEmployeeComponents.tsx';
import EmployeeMap from './components/EmployeeMap/EmployeeMap.tsx';
import { StyledButtonRadius100 } from '../../components/buttons/CustomButton.ts';
import AddIcon from '@mui/icons-material/Add';
import AddEmployee from './components/EmployeeTable/AddEmployee.tsx';
import EmployeeTable from './components/EmployeeTable/EmployeeTable.tsx';
import axiosConfig from '../../utils/axiosConfig.ts';
import { useGetEmployees } from '../../utils/api.ts';
import { useJsApiLoader } from '@react-google-maps/api';
import DesignConversationImage from '../../images/undraw_conversation_re_c26v.svg';

const apiKey = import.meta.env.VITE_MAP_API_KEY;
const googleMapsLibraries = ['places', 'marker', 'core'];

axiosConfig;

const ButtonStyle = {
  float: 'right',
  p: 1,
  pr: 3,
  pl: 3,
  mb: 3,
};

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useAuth();
  const isAdmin = auth?.userRoles.includes('ADMIN');

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const { data, isSuccess, refetch } = useGetEmployees();

  useEffect(() => {
    setFilteredEmployees(data ?? []);
  }, [data]);

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
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <Box>
          <Typography variant="h2" color="primary" sx={{ marginRight: '20px' }}>
            Hello, Szymon 👋
          </Typography>
          <Typography paragraph color="text.primary">
            Discover, connect and communicate with your colleagues nearby.
          </Typography>
          <FilterEmployeeComponents
            employees={data ?? []}
            onFiltered={(filteredEmployees) => {
              setFilteredEmployees(filteredEmployees);
            }}
          />
        </Box>
        <Box sx={{ maxWidth: '250px', maxHeight: '250px', overflow: 'hidden', ml: 'auto', mb: 3 }}>
          <img src={DesignConversationImage} alt="conversation" style={{ width: '100%' }} />
        </Box>
      </Box>

      <Card variant="outlined" sx={{ marginBottom: '50px' }}>
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
          {isLoaded && <AddEmployee isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refreshData={refetch} />}
        </Box>
      )}
      {isSuccess && isLoaded && <EmployeeTable employees={filteredEmployees} refreshData={refetch} />}
    </>
  );
}

export default Home;
