    import * as React from 'react';
    import AppBar from '@mui/material/AppBar';
    import Box from '@mui/material/Box';
    import Toolbar from '@mui/material/Toolbar';
    import Typography from '@mui/material/Typography';
    import Button from '@mui/material/Button';
    import IconButton from '@mui/material/IconButton';
    import MenuIcon from '@mui/icons-material/Menu';
    import {  Badge } from '@mui/material';
    import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
    import {useNavigate} from 'react-router-dom'
import { userEmailState } from '../store/selectors/userEmail';
import { userLoadingState } from '../store/selectors/isUserLoading';
import { useSetRecoilState,useRecoilValue } from 'recoil';
import { userState } from '../store/atoms/user';
import { useState } from 'react';

    export default function Appbar(){
        const navigate = useNavigate();
        const userEmail = useRecoilValue(userEmailState);
        const userLoading = useRecoilValue(userLoadingState);
        const setUser = useSetRecoilState(userState);
        const [cartItems, setCartItems] = useState([]);

        if(userLoading){
            return <>Loading....</>
        }
        if(userEmail){
        return (
            <Box >
            <AppBar position="fixed">
                <Toolbar>
                <Button
                    size="medium"
                    edge="start"
                    color="inherit" 
                    onClick={() => {
                        navigate("/")
                    }}   
                >
                    Coursera
                </Button>
                <Button 
                    variant="h6" 
                    component="div" sx={{ flexGrow: 1 }} 
                    onClick={() => {
                                navigate("/courses")
                }}> 
                    Courses
                </Button>
                <Button 
                variant="h6" 
                component="div" 
                sx={{ flexGrow: 1 }}
                onClick={()=>{
                    navigate("/purchasedCourses")
                }}>
                    Purchased Courses
                </Button>
                <IconButton color="inherit" onClick={()=>{}}>
                <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
                </Badge>
                </IconButton>
                <Button color="inherit"
                onClick={() => {
                    localStorage.setItem("token", null);
                    setUser({
                        isLoading: false,
                        userEmail: null
                    })
                    navigate("/");
                }} 
                >
                    Logout
                </Button>
                </Toolbar>
            </AppBar>
            </Box>
        );
        }else{
            return (
                <Box >
                <AppBar position="fixed">
                    <Toolbar>
                    <Button
                        size="medium"
                        edge="start"
                        color="inherit" 
                        onClick={() => {
                            navigate("/")
                        }}   
                    >
                        Coursera
                    </Button>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button color="inherit"
                    onClick={()=>{
                        navigate("/login")
                    }}
                    >
                        Login
                    </Button>
                                /
                    <Button color="inherit"
                    onClick={()=>{
                        navigate("/signup")
                    }}>
                        Signup
                    </Button>
                    </Toolbar>
                </AppBar>
                </Box>
            )
        }
    }