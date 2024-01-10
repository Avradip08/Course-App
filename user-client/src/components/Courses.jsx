import axios from "axios";
import { Button, Card, Typography } from "@mui/material"; 
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function Courses(){
    const [courses,setCourses] = useState([])
    const init = async () => {
        const res = await axios.get(`${BASE_URL}/courses`,{
            headers:{
                Authorization : 'Bearer ' + localStorage.getItem('token')
            }
        })
        setCourses(res.data.courses);
    }
    useEffect(
        ()=>{
            init();
        }, []
    )
    return (
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {
                courses.map(course=>{
                   return <ViewCourse course={course} />
                })
            }
        </div>
    )
}

function ViewCourse({course}){
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        <img src={course.imageLink} style={{width: 300}} ></img>
        <div style={{display: "flex", flexDirection: 'column', justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={
                ()=>{
                    navigate("/course/" + course._id)
                }
            }>
                View Details
            </Button>
            <br/>
            <Button variant="contained" size="large">
                Add to Cart
            </Button>
        </div>
    </Card>
}