import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import axios from 'axios';
import { BASE_URL } from "../config.js";
import { useNavigate } from 'react-router-dom';
export default function Signup(){
    const navigate = useNavigate()
    const setUser =  useSetRecoilState(userState)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(`${BASE_URL}/signup`,
        {
            username : username,
            password : password 
        })
        const data = res.data;
        localStorage.setItem('token',data.token);
        setUser({
            isLoading : false,
            userEmail : username
        })
        navigate("/courses");
        
      };
    
      return (
        <Container maxWidth="xs" style={{ marginTop: '50px' }}>
        <Card elevation={3} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
        <Typography variant="h5" gutterBottom style={{ color: '#2c3e50' }}>
          Signup
        </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
              <TextField
                type="text"
                name="username"
                label="Username or Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
                required
                style={{ backgroundColor: '#ecf0f1' }}
              />
              <TextField
                type="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
                required
                style={{ backgroundColor: '#ecf0f1' }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
                Submit
              </Button>
            </form>
            </CardContent>
            </Card>
        </Container>
      );
}