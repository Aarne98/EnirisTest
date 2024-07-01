import {Link, Outlet } from "react-router-dom";
import { Suspense } from "react";

export default function Root() {

  return ( 
  <div className="App">
    <h1>Device manager</h1>
    <Link to="/devices">Go to list</Link><br></br>
    <Link to="/edit-devices">Go to control</Link>
                <Outlet />
    </div>
    )
      }