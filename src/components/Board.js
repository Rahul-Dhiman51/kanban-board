import React from 'react'
import { fetchTickets } from './apiFetch';
import { useState, useEffect, useRef } from "react";
import "./Board.css"
import slider from "../assets/sliders-solid.svg"
import down from "../assets/down-arrow-svgrepo-com.svg"
import Column from './Column';

const Board = () => {

    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [groupingOption, setGroupingOption] = useState(localStorage.getItem("groupingOption") || "status");
    const [sortingOption, setSortingOption] = useState(localStorage.getItem("sortingOption") || "priority");

    useEffect(() => {
        async function fetchData() {
            const data = await fetchTickets();
            setTickets(data.tickets);
            setUsers(data.users);
            // console.log(data.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("groupingOption", groupingOption);
      }, [groupingOption]);

      useEffect(() => {
        localStorage.setItem("sortingOption", sortingOption);
      }, [sortingOption]);

    const menuRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
                // console.log(menuRef.current);
            }
        }
        document.addEventListener("mousedown", handler);
    })



    const groupTicketsByOption = (tickets, option) => {
        const groupedTickets = {};

        tickets.forEach((ticket) => {
            const key = option === "status" ? ticket.status : option === "user" ? ticket.userId : ticket.priority;
            if (!groupedTickets[key]) {
                groupedTickets[key] = [];
            }
            groupedTickets[key].push(ticket);
        })

        return groupedTickets;
    }

    const sortTicketsByOption = (groupedTickets, option) => {
        const sortedTickets = {};
        Object.keys(groupedTickets).forEach((groupTitle) => {
            const group = groupedTickets[groupTitle];

            sortedTickets[groupTitle] = option === "priority" ? group.sort((a, b) => b.priority - a.priority) : group.sort((a, b) => a.title.localeCompare(b.title));
        })
        // console.log(sortedTickets)
        return sortedTickets;
    }

    const groupedTickets = groupTicketsByOption(tickets, groupingOption);
    const sortedTickets = sortTicketsByOption(groupedTickets, sortingOption);

    // const [selectedOption, setSelectedOption] = useState('');

    // const handleOptionChange = (event) => {
    //     setSelectedOption(event.target.value);
    // };

    return (
        <div className="kanban-board">
            <div className="board-container" ref={menuRef}>
                <button className="button-4 menu-trigger" style={{ top: "18px", left: "50px", position: "absolute" }} onClick={() => { setOpen(!open) }} role="button"><img src={slider} alt="" style={{ width: "10px" }} /> Display <img src={down} alt="" style={{ width: "10px" }} /></button>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} style={{ position: "absolute" }}>
                    <ul>
                        <li className='dropdownItem'>
                            <h3>Grouping</h3>
                            <select className="button-4 menu-trigger" style={{left: "70px",top: "7px",position: "relative",padding: "2px",height: "30px"}} value={groupingOption} onChange={(e) => { setGroupingOption(e.target.value) }}>
                                <option className="button-4" style={{fontSize: "12px"}} value="status">Status</option>
                                <option className="button-4" style={{fontSize: "12px"}} value="user">User</option>
                                <option className="button-4" style={{fontSize: "12px"}} value="priority">Priority</option>
                            </select>
                        </li>
                        <li className='dropdownItem'>
                            <h3> Ordering </h3>
                            <select className="button-4 menu-trigger" style={{left: "73px",top: "7px",position: "relative",padding: "2px",height: "30px"}} value={sortingOption} onChange={(e) => { setSortingOption(e.target.value) }}>
                                <option className="button-4" style={{fontSize: "12px"}} value="priority">Priority</option>
                                <option className="button-4" style={{fontSize: "12px"}} value="title">Title</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="board-columns">
                {Object.keys(sortedTickets).map((groupTitle) => (
                    <Column
                        key={groupTitle}
                        title={groupTitle}
                        tickets={sortedTickets[groupTitle]}
                        users = {users}
                        groupingOption = {groupingOption}
                    />
                ))}
            </div>
        </div>
    )
}

export default Board