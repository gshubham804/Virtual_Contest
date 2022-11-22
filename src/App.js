import './App.css';
import ChallengeDetails from './Components/Challenge Details Page/ChallengeDetails';
import CommonPage from './Components/Common Page/CommonPage';
import CreateChallenges from './Components/Create Challenges/CreateChallenges';
import { ListPage } from './Components/List Page/ListPage';
import Navbar from './Components/Navbar/Navbar';
import React, { useState } from "react";

function App() {
  const [childData, setChildData] = useState("");
  return (
    <>
    <Navbar/> 
    <CommonPage/>
    <ListPage setChildData={setChildData}/> 
    <ChallengeDetails data={childData} />
    {/* <CreateChallenges/> */}
    </>
  );
}

export default App;
