import './App.css';
import ChallengeDetails from './Components/Challenge Details Page/ChallengeDetails';
import CommonPage from './Components/Common Page/CommonPage';
import CreateChallenges from './Components/Create Challenges/CreateChallenges';
import { ListPage } from './Components/List Page/ListPage';
import Timer from './Components/List Page/Timer';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
    <>
    <Navbar/> 
    <ChallengeDetails/>
    {/* <CommonPage/> */}
    {/* <ListPage/>  */}
     {/* <Timer/> */}
    {/* <CreateChallenges/> */}
    </>
  );
}

export default App;
