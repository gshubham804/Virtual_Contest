import './App.css';
import ChallengeDetails from './Components/Challenge Details Page/ChallengeDetails';
import CreateChallenges from './Components/Create Challenges/CreateChallenges';
import { ListPage } from './Components/List Page/ListPage';
import Navbar from './Components/Navbar/Navbar';
import React, { useState } from "react";
import EditChallenges from './Components/Edit Challenges Details/EditChallenges';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import DeleteModal from './Components/Challenge Details Page/DeleteModal';

function App() {
  const [childData, setChildData] = useState([]);
  return (
    <>
    <Router>
    <Navbar/>  
    <Routes>
    <Route exact path='/' element={<ListPage setChildData={setChildData}/>}/> 
    <Route exact path='/edit' element={<EditChallenges data={childData}/>}/>
    <Route exact path='/createchallenge' element={<CreateChallenges/>}/>
    <Route exact path='/challengedetails' element={<ChallengeDetails data={childData}/>}/> 
    </Routes>
    </Router>
    </>
  );
}

export default App;
