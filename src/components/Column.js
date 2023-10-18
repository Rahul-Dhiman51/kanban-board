import React from "react";
import Card from "./Card";
import "./Column.css";
import high from "../assets/high-prior.svg"
import medium from "../assets/medium-prior.svg"
import low from "../assets/low-prior.svg"
import urgent from "../assets/urgent.svg"
import noprior from "../assets/dots.svg"
import circleEmpty from '../assets/circle-regular.svg'
import check from "../assets/circle-check-solid.svg"
import cancel from '../assets/circle-xmark-solid.svg'
import progress from '../assets/circle-half-stroke-solid.svg'

const Column = ({ title, tickets, users, groupingOption }) => {
  // console.log(title)
  function findUserName(userId) {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "User not found";
  }

  var name = "";
  var image = ""

  var statusImage = ""
  
  if (groupingOption === "user") {
    name = findUserName(title)
    title = name;
  }
  else if(groupingOption==="priority"){
    if(title==='0'){
      title = "No Priority"
      image = noprior
    }
    else if(title==='1'){
      title = "Low";
      image = low
    }
    else if(title==='2'){
      title = "Medium";
      image = medium
    }
    else if(title==='3'){
      title = "High";
      image = high
    }
    else if(title==='4'){
      title = "Urgent";
      image = urgent
    }
  }
  else if(groupingOption==="status"){
    if(title==="Done"){
    statusImage = check
  }
  else if(title==="Cancelled"){
    statusImage = cancel
  }
  else if(title==="Todo") {
    statusImage = circleEmpty
  }
  else if(title==="In progress"){
    statusImage = progress
  }

  }

  return (
    <div className="boardColumn">
      <h3 style={{ textAlign: "left", fontSize: "16px", position:"relative", left:"18px"}}>
      {groupingOption==="priority" ? <img src={image} alt="" style={{width:"20px"}} />: groupingOption==="status"? <img src={statusImage} alt="" style={{width:"20px"}} />:""} 
      &nbsp; {title} &nbsp; <span style={{ fontSize: "14px", color: "#7b7a7a" }}>{tickets.length}</span></h3>
      {tickets.map((ticket) => (
        <Card key={ticket.id} ticket={ticket} users={users} groupingOption={groupingOption} />
      ))}
    </div>
  );
};

export default Column;
