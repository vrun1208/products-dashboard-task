import React from 'react';
import { Button, Paper, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../context/authContext';
//import DashBoard from './dashboard';
import Navbar from './navBar';

const Login = () => {
    const { user } = useAuth();
  const history = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      history('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
      <Container component="main" maxWidth="sm">
          <Paper elevation={4} sx={{ height: '200px' , display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, marginTop: 10 }}>
              <Typography component="h1" variant="h5">
                  Product dashboard (assignment)
              </Typography>
              {user ? (
                    <Navbar />
              ) : (
                  <>
                      <Button variant="contained" color="primary" onClick={handleGoogleLogin} sx={{ marginTop: 6 }}>
                          Login with Google
                      </Button>
                  </>
              )}
          </Paper>
      </Container>
  );
};

export default Login;
