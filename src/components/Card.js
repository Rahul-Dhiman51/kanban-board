import React, { useState } from "react";
import { useEffect } from "react";
import './Card.css'; // Import your custom CSS file
import caution from '../assets/caution.svg'
import circle from '../assets/circle.svg'
import circleEmpty from '../assets/circle-regular.svg'
import check from "../assets/circle-check-solid.svg"
import cancel from '../assets/circle-xmark-solid.svg'
import progress from '../assets/circle-half-stroke-solid.svg'


function Card({ ticket, users, groupingOption }) {

  const [randomDarkColor,setRandomDarkColor] = useState("")
  
  useEffect(()=>{
    setRandomDarkColor(`hsl(${Math.floor(Math.random() * 360)}, 80%, ${Math.floor(Math.random() * 60) + 10}%)`)
  },[]);

  const { id, title, userId, tag, status } = ticket;
  // console.log(users);
  function findUserName(userId) {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "User not found";
  }

  const username = findUserName(userId);
  const nameParts = username.split(' ');
  var fullInitial = ''
  if (nameParts.length >= 1) {
    const firstNameInitial = nameParts[0][0];
    const lastNameInitial = nameParts.length > 1 ? nameParts[1][0] : '';
    fullInitial = firstNameInitial + lastNameInitial.toUpperCase();
    // console.log(fullInitial)
  }


  var statusImage = ""
  if(status==="Done"){
    statusImage = check
  }
  else if(status==="Cancelled"){
    statusImage = cancel
  }
  else if(status==="Todo") {
    statusImage = circleEmpty
  }
  else if(status==="In progress"){
    statusImage = progress
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-id" style={{ textAlign: "left", lineHeight: "1rem", margin: "1px", color: "#7b7a7a", height:"14px" }}>
        {id} <div className="initials" style={{ backgroundColor: randomDarkColor }}>{fullInitial}</div>
        </h3>
        <h3 className="card-id" style={{ textAlign: "left", margin: "1px 1px 4px 1px", lineHeight: "1rem" }}>
          {groupingOption!=="status"?<img src={statusImage} style={{width:"8px"}} alt="" />: ""} {title}
        </h3>
        <div className="card-text">
          <img src={caution} style={{ width: "20px", padding: "4px", border: "1px solid #d8cfcf", borderRadius:"25%"}} alt="" />
          <div className="tag">
            <img src={circle} style={{ width: "20px", position: "relative", top: "5px"}} alt="" /> {tag[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
