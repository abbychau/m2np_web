import React, { useGlobal } from 'reactn'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import './style.css';
export default () =>{
    return <ul>
    <li>
        <Link to="/">Home</Link>
    </li>
    <li>
        <Link to="/about">About</Link>
    </li>
    <li>
        <Link to="/users">Users</Link>
    </li>
    <li>
        <Link to="/timeline">Timeline</Link>
    </li>
</ul>
}