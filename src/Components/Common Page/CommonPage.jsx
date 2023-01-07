import React from 'react'
import "./CommonPage.css"
import {Link} from 'react-router-dom'

export default function CommonPage() {
  return (
    <>
    <div className="CommonPage-main">
        <div className="CommonPage-main-first">
            <h1>Accelerate Innovation with Global AI Challenges</h1>
            <h3>Ai Challengesat DPhi simulate real-world problems. It is a
                great place to put your AI/Data Science skills to test
                on diverse datasets allowing you to foster learning
                through competitions.</h3>
    <button className='CommonPage-main-first-btn'><Link to="/createchallenge" style={{color:'black',textDecoration:'none' }}>
Create Challenge</Link></button>
        </div>
        <div className="CommonPage-main-second">
    <img src="https://dphi.tech/static/images/challenges/challenges_hero.png" alt=""/>
        </div>
    </div>
    </>
  )
}
