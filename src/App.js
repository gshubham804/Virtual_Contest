import './App.css';
import ChallengeDetails from './Components/Challenge Details Page/ChallengeDetails';
import CommonPage from './Components/Common Page/CommonPage';
import CreateChallenges from './Components/Create Challenges/CreateChallenges';
import { ListPage } from './Components/List Page/ListPage';
import Navbar from './Components/Navbar/Navbar';
import React, { useState } from "react";
import EditChallenges from './Components/Edit Challenges Details/EditChallenges';

function App() {
  const [childData, setChildData] = useState("");
  return (
    <>
    <EditChallenges data={childData}/>
    {/* <Navbar/>  */}
    {/* <CommonPage/> */}
    <ListPage setChildData={setChildData}/> 
    <ChallengeDetails data={childData} />
    {/* <CreateChallenges/> */}
    </>
  );
}

export default App;
