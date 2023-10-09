import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyProfile from '../MyProfile/MyProfile.tsx';
import Home from '../Home/Home.tsx';
import { Box } from '@mui/material';
import LoginPage from '../LoginPage/LoginPage.tsx';
import NavBar from '../../components/NavBar/NavBar.tsx';
import * as React from 'react';
import SideBar from '../../components/SideBar/SideBar.tsx';

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#cfd1e1', minHeight: '100vh', minWidth: '100vw' }}>
      <BrowserRouter>
        <NavBar open={open} setOpen={setOpen} />
        <main style={{ display: 'flex', marginTop: '80px' }}>
          <SideBar open={open} setOpen={setOpen} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="log-in" element={<LoginPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Box>
  );
}
export default App;
