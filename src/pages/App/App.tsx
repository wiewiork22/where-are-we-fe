import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import LoginPage from '../LoginPage/LoginPage.tsx';
import { ROUTES } from '../../routes/routes.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoutes from '../../components/ProtectedRoutes/ProtectedRoutes.tsx';
import { ColorModeProvider } from '../../components/ColorModeContex/ColorModeContex.tsx';

const queryClient = new QueryClient();

function App() {
  return (
    <ColorModeProvider>
      <QueryClientProvider client={queryClient}>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'background.default',
            height: '100%',
            width: '100%',
            minHeight: '100vh',
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path={ROUTES.LOG_IN} element={<LoginPage />} />
            </Routes>
            <ProtectedRoutes />
          </BrowserRouter>
        </Box>
      </QueryClientProvider>
    </ColorModeProvider>
  );
}

export default App;
