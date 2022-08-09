import { useState, useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid} from '@mui/material';


function StudentView() {
  const [students, setStudents] = useState([])
  useEffect(()=>{
    async function getAllStudent(){
      try {
        const students = await axios.get("http://127.0.0.1:8000/api/book_list/")
        console.log(students.data)
        setStudents(students.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllStudent()
  }, [])
  return (
    <div className="App">
    <Typography gutterBottom variant="h5"  sx={{mx:5,mt:5}} component="div">
              Book List
            </Typography>
     {
       students.map((student, i)=>{
         return (
          <Card  sx={{maxWidth: 800, mt: 3, mb: 2, mx: 5 }}>
          <CardContent>
           <h2 key={i}>{i+1}) {student.book_name}</h2>
           <Typography variant="body2" color="text.secondary">
        </Typography>
      </CardContent>
    </Card>
         )
       })
     }
    </div>
  );
}

export default StudentView;
