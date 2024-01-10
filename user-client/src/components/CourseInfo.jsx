import { useRecoilState,useRecoilValue,useSetRecoilState } from "recoil"
import { cartState } from "../store/atoms/cart"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { courseState } from "../store/atoms/course";
import { courseDetails,courseLoadingState } from "../store/selectors/course";

export default function CourseInfo(){
    let { courseId } = useParams();
    const setCourse = useSetRecoilState(courseState);
    const courseLoading = useRecoilValue(courseLoadingState);
    const getCourse = () => {
        axios.get(`${BASE_URL}/course/${courseId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourse({isLoading: false, course: res.data.course});
        })
        .catch(e => {
            setCourse({isLoading: false, course: null});
        });
    }

    useEffect(() => {
        getCourse();
    }, []);

    console.log(courseLoading)
    
    if (courseLoading) {
        return <h1>Loading</h1>
    }
    
    return (
        <ViewCourse/>
    )
}

function ViewCourse(){
    
    const course = useRecoilValue(courseDetails);
    console.log(course);
    return(
        <h1>
            {course.title}
        </h1>
    )
}