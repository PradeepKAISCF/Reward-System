import { BrowserRouter as Router} from "react-router-dom";
import React,{ useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { fetchAllQuestions } from "./actions/question";
import { fetchAllUsers } from "./actions/users";
import { getAllVideo } from "./actions/video";
import { requestForToken } from './firebase';
import { fcm } from "./actions/auth";
import Notification from "./Notificatiom/Notification";

function App() {

  const dispatch = useDispatch();
  var User = useSelector((state) => state.currentUserReducer);

  React.useEffect(()=>{
    requestForToken()
    const token = localStorage.getItem('key');
    if(User !== null){dispatch(fcm(token,User.result._id))}
  })

  const id = (JSON.parse(localStorage.getItem("Profile")))?.result?._id

  useEffect(() => {

    dispatch(fetchAllQuestions());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 760) {
      setSlideIn(false);
    }
  }, []);

  useEffect(() => {
    dispatch(getAllVideo())
  },[dispatch])

  const handleSlideIn = () => {
    if (window.innerWidth <= 760) {
      setSlideIn((state) => !state);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar handleSlideIn={handleSlideIn} />
        <Notification/>
        <AllRoutes slideIn={slideIn} handleSlideIn={handleSlideIn} />
      </Router>
    </div>
  );
}

export default App;
