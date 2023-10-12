import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyProfile from '../MyProfile/MyProfile.tsx';
import Home from '../Home/Home.tsx';
import { Box } from '@mui/material';
import LoginPage from '../LoginPage/LoginPage.tsx';
import NavBar from '../../components/NavBar/NavBar.tsx';
import * as React from 'react';
import SideBar from '../../components/SideBar/SideBar.tsx';
import { ROUTES } from '../../routes/routes.ts';
import PageNotFound from '../PageNotFound/PageNotFound.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ display: 'flex', backgroundColor: '#cfd1e1', minHeight: '100vh', minWidth: '100vw' }}>
        <BrowserRouter>
          <NavBar open={open} setOpen={setOpen} />
          <Box component={'main'}
               sx={{ display: 'flex', marginTop: '80px', flexGrow: 1 }}>
            <SideBar open={open} setOpen={setOpen} />
            <Box sx={{ flexGrow: 1, p: 7 }}>
              <Routes>

                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.MY_PROFILE} element={<MyProfile />} />
                <Route path={ROUTES.LOG_IN} element={<LoginPage />} />
                <Route path='/*' element={<PageNotFound />} />

              </Routes>
            </Box>
          </Box>

        </BrowserRouter>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
