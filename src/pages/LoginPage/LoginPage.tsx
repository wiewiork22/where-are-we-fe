import React, { useState } from 'react';
import { Box, CircularProgress, Container, InputAdornment, Modal, Stack, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Footer from './components/Footer.tsx';
import { SignInSeparator } from './components/SignInSeparator.tsx';
import Typography from '@mui/material/Typography';
import { StyledButtonRadius100 } from '../../components/buttons/CustomButton.ts';

const TextFieldInputProps = {
  style: { borderRadius: 8 },
};

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onTogglePasswordButtonClicked = () => {
    setIsPasswordShown((prevState) => !prevState);
  };

  const onForgotPasswordButtonClicked = () => {
    //TODO
  };

  const onSignInButtonClicked = () => {
    //TODO
  };

  const onSignInWithOrganizationButtonClicked = () => {
    //TODO
  };

  return (
    <>
      <Container sx={{ width: '400px', height: '100%' }} fixed>
        <Stack spacing="16px">
          <Typography color="primary" variant="h4" sx={{ textAlign: 'center' }}>
            Welcome to Devbridge Poland
          </Typography>

          <TextField
            label="Email address"
            variant="outlined"
            fullWidth
            placeholder="e.g., name@cognizant.com"
            type="email"
            value={email}
            onChange={onEmailChanged}
            InputProps={TextFieldInputProps}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type={isPasswordShown ? 'text' : 'password'}
            value={password}
            onChange={onPasswordChanged}
            InputProps={{
              ...TextFieldInputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onTogglePasswordButtonClicked} edge="end">
                    {isPasswordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'inline-block' }}>
            <StyledButtonRadius100
              sx={{ textDecoration: 'underline' }}
              variant="text"
              onClick={onForgotPasswordButtonClicked}
            >
              Forgot password?
            </StyledButtonRadius100>
          </Box>

          <StyledButtonRadius100 variant="contained" onClick={onSignInButtonClicked}>
            Sign in
          </StyledButtonRadius100>

          <SignInSeparator />

          <StyledButtonRadius100 variant="contained" onClick={onSignInWithOrganizationButtonClicked}>
            Sign in with Cognizant SSO
          </StyledButtonRadius100>
        </Stack>
      </Container>

      <Footer />

      <Modal
        /*TODO show modal when page is loading*/
        open={false}
        disableAutoFocus
        disableEnforceFocus
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <CircularProgress color="primary" size={80} thickness={5} />
        </div>
      </Modal>
    </>
  );
}

export default LoginPage;
