import './App.css';
import Navbar from './Pages/Navbar';
// import RoutePath from './Routes/RoutePath';
import { Navigate,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import HeadPage from './Pages/HeadPage';
import Inbox from './Pages/Inbox';
import Outbox from './Pages/Outbox';
import ReadMail from './Pages/ReadMail';
import LoginForm from './Login/LoginForm';
import Footer from './Layout/Footer';



 

function App() {
  const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
  return (
    <>
    <Navbar/>
   {/* <RoutePath/> */}
   <Routes>
   <Route path="/home" element={isLoggedIn ? (<HeadPage />) : 
          (<Navigate to="/" replace/>)}/>
      <Route path="/" element={<LoginForm/>}></Route>
      <Route path="/Outbox" element={<Outbox/>}></Route>
      <Route path="/Inbox" element={<Inbox/>}></Route>
      <Route path="/read" element={<ReadMail/>}></Route>
   </Routes>
   {/* <Footer/> */}
    </>
  );
}

export default App;
