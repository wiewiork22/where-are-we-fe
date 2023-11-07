import { useEffect, useState } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../utils/api';
import { Employee } from '../../models/Employee';
import { Box, Card, Grid, Typography } from '@mui/material';
import FilterEmployeeComponents from './components/EmployeeTable/FilterEmployeeComponents.tsx';
import EmployeeMap from './components/EmployeeMap/EmployeeMap.tsx';
import { StyledButtonRadius100 } from '../../components/buttons/CustomButton.ts';
import AddIcon from '@mui/icons-material/Add';
import AddEmployee from './components/EmployeeTable/AddEmployee.tsx';
import EmployeeTable from './components/EmployeeTable/EmployeeTable.tsx';

const ButtonStyle = {
  float: 'right',
  p: 1,
  pr: 3,
  pl: 3,
};

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useAuth();
  const { data: employees, isSuccess } = useQuery(['employees'], () => getEmployees());
  const isAdmin = auth?.userRoles.includes('ADMIN');

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    setFilteredEmployees(employees ?? []);
    setAllEmployees(employees ?? []);
  }, [employees]);

  const handleModalOpenClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ display: 'flex', marginBottom: '50px' }}>
        <Grid item sx={{ flex: 1 }}>
          <Typography variant="h2" color="primary" style={{ marginBottom: '40px' }}>
            Hello, Javokhir
          </Typography>

          <Typography paragraph color="text.primary">
            Discover, connect and communicate with your colleagues nearby
          </Typography>
        </Grid>
        <Grid item sx={{ alignSelf: 'flex-end' }}>
          <FilterEmployeeComponents
            employees={allEmployees}
            onFiltered={(filteredEmployees) => {
              setFilteredEmployees(filteredEmployees);
            }}
          />
        </Grid>
      </Grid>

      <Card variant="outlined" sx={{ marginBottom: '50px' }}>
        {isSuccess && EmployeeMap(filteredEmployees)}
      </Card>

      <Box>
        {isAdmin && (
          <StyledButtonRadius100
            variant="contained"
            startIcon={<AddIcon />}
            sx={ButtonStyle}
            onClick={handleModalOpenClick}
          >
            Add employee
          </StyledButtonRadius100>
        )}
        <AddEmployee isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        {isSuccess && <EmployeeTable employees={filteredEmployees} />}
      </Box>
    </>
  );
}

export default Home;
