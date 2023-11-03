import { Box, Button, Card, Typography } from '@mui/material';
import EmployeeTable from './components/EmployeeTable.tsx';
import EmployeeMap from './components/EmployeeMap/EmployeeMap.tsx';

import AddEmployee from './components/AddEmployee.tsx';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getEmployees } from '../../utils/api.ts';

const ButtonStyle = {
  borderRadius: '50px',
  backgroundColor: '#000048',
  float: 'right',
  p: 1,
  pr: 3,
  pl: 3,
  '&:hover': {
    backgroundColor: '#1E005E',
  },
};

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: employees, isSuccess } = useQuery(['employees'], () => getEmployees());

  const handleModalOpenClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Typography variant="h2" color="#2A514B" style={{ paddingBottom: '40px' }}>
        This is the home page
      </Typography>

      <Typography paragraph style={{ paddingBottom: '50px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id interdum
        velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate eu
        scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
        lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur lorem. Velit sed
        ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
      </Typography>

      <Card variant="outlined" sx={{ marginBottom: '50px' }}>
        {isSuccess && EmployeeMap(employees)}
      </Card>

      <Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={ButtonStyle} onClick={handleModalOpenClick}>
          Add employee
        </Button>
        <AddEmployee isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        {isSuccess && EmployeeTable(employees)}
      </Box>
    </>
  );
}

export default Home;
