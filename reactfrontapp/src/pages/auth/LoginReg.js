import React from 'react'
import { Grid, Card, Tabs, Typography, Tab, Box } from '@mui/material';
import pic1 from '../../images/pic1.svg'
import { useState } from 'react';
import UserLogin from './UserLogin';
import Registration from './Registration';

const TabPanel = (props) => {
  const { children, value, index } = props;
  return (
    <div role='tabpanel' hidden={value !== index}>
      {
        value === index && (
          <Box>{children}</Box>
        )
      }
    </div>
  )
}


const LoginReg = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return <>
    <Grid container sx={{height:'90vh',mb:4,mt:1}}>
      <Grid item lg={7} sm={5} sx={{
        background:`url(${pic1})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        backgroundPosition:'center',
        display:{xs:'none',sm:'block'}

      }}>
      </Grid>
      <Grid item lg={5} sm={7} xs={12}>
        <Card sx={{width:'100%',height:'99.5%'}}>
          <Box>
            <Box sx={{borderBottom:1,borderColor:'divider'}}>
              <Tabs value={value} textColor='primary' indicatorColor='primary' onChange={handleChange}>
                <Tab label='Login' sx={{textTransform:'none',fontWeight:'bold'}}>

                </Tab>
                <Tab label='Registration' sx={{textTransform:'none',fontWeight:'bold'}}></Tab>
              </Tabs>
            </Box>
              <TabPanel value={value} index={0}>
                <UserLogin></UserLogin>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Registration></Registration>
              </TabPanel>
          </Box>
        </Card>
      </Grid>
    
    </Grid>
    </>;
};

export default LoginReg