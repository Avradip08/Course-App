import {useNavigate} from 'react-router-dom'
import { Container, Typography, Button } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import { userLoadingState } from '../store/selectors/isUserLoading';
export default function(){
    const navigate = useNavigate();
    const userEmail = useRecoilValue(userEmailState)
    const userLoading = useRecoilValue(userLoadingState)
    return (
        <div>
      <header style={{ backgroundColor: '#3498db', padding: '20px', textAlign: 'center', color: 'white' }}>
        <Typography variant="h3">Welcome to CourseApp</Typography>
        <Typography variant="subtitle1">Your gateway to online learning and skill development</Typography>
      </header>

      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#ecf0f1' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4">Unlock Your Potential with Our Courses</Typography>
          <Typography variant="body1">
            Choose from a variety of high-quality courses designed to enhance your skills and knowledge. Whether you're a beginner or an expert, there's something for everyone.
          </Typography>
          {!userLoading && !userEmail  && 
          <Button variant="contained" color="secondary" style={{ marginTop: '20px' }}
          onClick={()=>{
            navigate("/signup")
          }}>
            Get Started
          </Button>
          }
        </div>
      </Container>

      <footer style={{ backgroundColor: '#2c3e50', color: 'white', padding: '20px', textAlign: 'center' }}>
        <Typography variant="body2">&copy; 2024 CourseApp. All rights reserved.</Typography>
      </footer>
    </div>
      );
}