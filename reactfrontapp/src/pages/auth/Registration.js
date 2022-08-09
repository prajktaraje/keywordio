import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../services/userAuthApi'


const Registration = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),

    }
    const res = await registerUser(actualData)
    console.log(res)
    if (res.data.error) {
      setServerError(res.data.error)
    }
    if (res.data) {
      navigate('/home')
    }
  }
  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
    <TextField margin='normal' sx={{ width: 575,m:1,mb:4 }} required id='name' name='name' label='Name' />
      <TextField margin='normal' sx={{ width: 575,m:1,mb:4 }} required id='email' type='email' name='email' label='Email Address' />
      <TextField margin='normal' sx={{ width: 575,m:1,mb:4 }} required id='password' name='password' label='Password' type='password' />
     
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Submit</Button>
      </Box>
    </Box>
  </>;
};

export default Registration;