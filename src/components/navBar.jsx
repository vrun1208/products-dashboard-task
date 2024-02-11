import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/authContext';
import { signOut } from 'firebase/auth'; // Import the signOut function from firebase
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
//import DashBoard from './dashboard';
import ProductCrud from './crudOperations';

const Navbar = () => {
  const { user } = useAuth();
  const history = useNavigate();

 //signOut when user leaves window or close tab
  useEffect(() => {
    const handleUnload = () => {
      if (user) {
        signOut(auth);
      }
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [user]);

  //signOut
  const handleLogout = async () => {
    try {
      await signOut(auth);
        history('/');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'left', fontWeight: 'bolder'}}>
          Product Dashboard
        </Typography>
        {user && (
          <div>
            <Typography variant="body1" sx={{ margin: 1 }}>
              {user.displayName}
            </Typography>
            <Typography variant="body1" sx={{ margin: 1 }}>
              {user.email}
            </Typography>
            <Button variant='contained' onClick={handleLogout} sx={{ margin: 1 }}>
              Logout
            </Button>
          </div>
        )}  
      </Toolbar>
    </AppBar>
    <ProductCrud />
    </>
  );
};

export default Navbar;
