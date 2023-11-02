import NavBar from '../NavBar/NavBar.tsx';
import { Box } from '@mui/material';
import SideBar from '../SideBar/SideBar.tsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../../routes/routes.ts';
import Home from '../../pages/Home/Home.tsx';
import MyProfile from '../../pages/MyProfile/MyProfile.tsx';
import PageNotFound from '../../pages/PageNotFound/PageNotFound.tsx';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.tsx';

function ProtectedRoutes() {
  const [open, setOpen] = useState(false);

  const auth = useAuth();

  return (
    <>
      {!auth?.isLoggedIn ? (
        <Navigate to={ROUTES.LOG_IN} />
      ) : (
        <>
          <NavBar open={open} setOpen={setOpen} />
          <Box component={'main'} sx={{ display: 'flex', marginTop: '80px', flexGrow: 1 }}>
            <SideBar open={open} setOpen={setOpen} />
            <Box sx={{ flexGrow: 1, p: 7, pt: 3 }}>
              <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.MY_PROFILE} element={<MyProfile />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
export default ProtectedRoutes;
