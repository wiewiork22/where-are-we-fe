import { Typography, Box, Button } from '@mui/material';
import EmployeeTable from './components/EmployeeTable.tsx';

import ModalAddEmployee from '../../components/AddEmployee/ModalAddEmployee.tsx';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

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

      <img
        src="src/images/map.png"
        alt="map"
        style={{
          maxWidth: '100%',
          marginBottom: '50px',
        }}
      />
      <Box>
        <Button variant="contained" startIcon={<AddIcon />} sx={ButtonStyle} onClick={handleModalOpenClick}>
          Add employee
        </Button>
        <ModalAddEmployee modalIsOpen={isModalOpen} setModalIsOpen={setIsModalOpen} />
        <EmployeeTable />
      </Box>
    </>
  );
}

export default Home;