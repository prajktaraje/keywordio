import { TextField,Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAddBookMutation } from '../services/userAuthApi';
import { NavLink, useNavigate } from 'react-router-dom';
import React from "react";
import { Link } from "react-router-dom";

const Home =()=> {

  const navigateToContacts = () => {
    navigate('/editdelete');
  };

  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [addBook, { isLoading }] = useAddBookMutation()

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    if(data.get('book_name')==""){
      navigate('/home')
    }
    else{
      const actualData = {
        book_name: data.get('book_name'),
      }
      const res = await addBook(actualData)
      if (res.data) {
        navigate('/editdelete')
      }
  
    }
  }


  return <>
   <Box textAlign='center' component='form' noValidate sx={{ mt: 1 }} id='addbook-form' onSubmit={handleSubmit}>
   <TextField margin='normal' required sx={{ width: 575,m:1,mb:4 }} id='book_name'  name='book_name' label='Enter Book Name.' />
      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5,mx:2 }}>Add</Button>
        <Button type='submit' onClick={navigateToContacts} variant='contained' sx={{ mt: 3, mb: 2, px: 5,mx:2 }}>Edit/Delete/View</Button>
      </Box>
    </Box>
   
  </>;
};

export default Home