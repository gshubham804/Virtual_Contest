import { React } from "react";
import "./ChallengeDetails.css";
import { ImStatsBars2 } from "react-icons/im";
import { MdTimer } from "react-icons/md";
import moment from "moment";
import {Link} from 'react-router-dom'
import DeleteModal from "./DeleteModal";
import { useState } from "react";

const ChallengeDetails = (props) => {
  const[isOpen,setIsOpen]= useState(true);

    const deleteHandler=()=>{
      setIsOpen(!isOpen)
    }

  return (
    <>
      <div className="challengeDetails-main">
        <div className="challengeDetails-first-div">
          <div className="challengeDetails-timer">
            <MdTimer className="timer-icon" />
            <h4 className="timer-icon-para">Starts on {moment(props.data.startdate).format("MMM Do YY")} 09:00 PM (Indian Standard Time)</h4>
          </div>
          <h1>{props.data.challengename}</h1>
          <p>{props.data.description}</p>
          <button>
            <ImStatsBars2 className="level-icon" />
            {props.data.level}
          </button>
        </div>
        <div className="challengeDetails-second-div">
          <div className="challengeDetails-second-first-section">
            <div className="challengeDetails-second-first-first-box">
              <h2>Overview</h2>
            </div>
            <div className="challengeDetails-second-first-second-box">
             <button className="challengeDetails-button-second"><Link to="/edit" style={{color: '#FFF',textDecoration:'none' }}>Edit</Link></button>
              <button onClick={deleteHandler} className="challengeDetails-button-third">Delete</button>
            </div>
          </div>
          <div className="challengeDetails-second-second-section">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Soluta
              quis, voluptate asperiores facilis laudantium corrupti vel, ullam
              itaque earum magni consectetur nemo nostrum repudiandae quaerat
              delectus sed qui numquam doloremque animi quibusdam dicta ducimus
              adipisci, dolorem nihil. Nesciunt temporibus, hic tempora
              necessitatibus aspernatur numquam deleniti distinctio voluptatibus
              quaerat aliquam culpa. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Tempore qui eos aliquam rerum voluptas! Quae aut
              officia nesciunt quidem itaque impedit distinctio, fuga ea quod
              minima alias, sapiente reiciendis quisquam commodi esse nisi ullam
              iure nobis possimus labore illo voluptatum quas! Magnam ipsa
              veritatis, doloribus at illo laborum autem, delectus voluptas
              incidunt dolores explicabo quis fugit quidem quaerat dicta id
              alias ullam est eos omnis voluptatibus modi praesentium. Itaque
              nihil aperiam cum minima? Dolorum harum corporis eum atque ab
              saepe dicta corrupti sit ipsam similique dignissimos dolorem
              repudiandae facilis quae delectus odio, asperiores vel tenetur
              eius molestias fugiat quis itaque. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Molestias voluptate aspernatur odit
              in voluptas distinctio, quaerat culpa mollitia repudiandae
              similique, nobis, natus laborum commodi ullam? Assumenda ratione
              vel autem placeat ad nostrum dicta impedit quis aut veniam esse
              repudiandae mollitia, nulla hic quam qui nemo laudantium deleniti
              dolor distinctio ipsum facilis error! Officiis voluptatibus
              recusandae soluta maiores? Aperiam odit reiciendis ullam at magnam
              magni facere, maiores molestiae. Libero, nam velit maiores
              cupiditate excepturi itaque minima vel. Doloremque dolor cumque
              illo soluta, minus delectus quod ut, incidunt, amet quo vitae
              error suscipit vero? Libero est nostrum fugiat reprehenderit culpa
              dicta quia autem consequuntur, cum, vel ab dolorem numquam minus?
              Repellendus at quisquam, quo quas culpa ea iusto natus quae quam
              distinctio nobis aperiam officiis! Aspernatur provident, error eos
              quo qui accusantium excepturi sapiente aliquam architecto facere
              ullam eaque numquam doloremque earum incidunt! Natus aperiam
              asperiores sed neque harum cupiditate tenetur, ullam ab
              consequatur culpa explicabo dolores impedit molestias maiores
              dicta assumenda consectetur? Id ducimus nulla laudantium, minima
              beatae perferendis magnam voluptatibus recusandae eveniet
              obcaecati vel tempore cum maiores inventore ab! Mollitia optio
              architecto adipisci, ut earum ipsa odit obcaecati aut expedita est
              voluptatem ducimus quaerat accusamus maxime aspernatur laudantium
              eum provident.
            </p>
          </div>
        </div>
      </div>
      {!isOpen && <DeleteModal data={props} />}
    </>
  );
};

export default ChallengeDetails;
