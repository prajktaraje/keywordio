import {AppBar,Box,Toolbar,Typography,Button} from '@mui/material';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return <>
   <Box sx={{flexGrow:1}}> 
   <AppBar position="static" color="primary">
    <Toolbar>
      <Typography variant='h4' component="div" sx={{flexGrow:1}}>
        Keywordio
      </Typography>
      <Button component={NavLink} to='student/' style={({ isActive }) => { return { backgroundColor: isActive ? '#103397' : '' } }} sx={{ color: 'white', textTransform: 'none'}}>StudentView</Button>

      <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#103397' : '' } }} sx={{ color: 'white', textTransform: 'none'}}>Login/Registration</Button>

    </Toolbar>

   </AppBar>
   </Box>
    </>;
};

export default Navbar