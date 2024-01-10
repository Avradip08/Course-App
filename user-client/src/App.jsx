import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Appbar from './components/Appbar'
import Landing from './components/Landing'
import Courses from './components/Courses'
import Signin from './components/SIgnin'
import Signup from './components/Signup'
import PurchasedCourse from './components/PurchasedCourses'
import axios from "axios";
import {RecoilRoot, useSetRecoilState} from 'recoil'
import './App.css'
import { userState } from './store/atoms/user'
import { BASE_URL } from './config'
import { useEffect } from 'react'
import CourseInfo from './components/CourseInfo'


function App() {

  return (
    <RecoilRoot>
      <div style={{width: "100vw",
                height: "100vh",
                backgroundColor: "#eeeeee"}}
      >
      <Router>
        <Appbar/>
        <InitUser/>
        <Routes>
          <Route path={"/signup"} element={<Signup/>} />
          <Route path={"/login"} element={<Signin/>} />
          <Route path={"/courses"} element={<Courses/>}/>
          <Route path={"/course/:courseId"} element={<CourseInfo/>}/>
          <Route path={"/purchasedCourses"} element={<PurchasedCourse/>} />
          <Route path={"/"} element={<Landing/>} />
        </Routes>
      </Router>
      </div>
    </RecoilRoot>
  )
}

function InitUser(){
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try{
      const response = await axios.get(`${BASE_URL}/me`,{
          headers:{
            "Authorization" :"Bearer " + localStorage.getItem("token")
          }
        
      })

      if(response.data.username){
        setUser({
          isLoading:false,
          userEmail:response.data.username
        })
      }
      else{
        setUser({
          isLoading:false,
          userEmail:null
        })
      }
    }catch(e){
      setUser({
        isLoading:false,
        userEmail:null
      })
    }
  }

  useEffect(()=>{
    init();
  },[])
  
  return <></>
}

export default App
