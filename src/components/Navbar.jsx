import React from 'react';
import '../Styles/Navbar.css';
import logo from '../Assets/IET_logo.png';
import user from '../Assets/dashboard.png';
import { Link, useNavigate } from "react-router-dom";
import compete from '../Assets/hot.png';

const Navbar = () => {
    const navigate = useNavigate();
    const handleRedirectDashboard = ()=>{
        navigate('/dashboard');
    }
    const handleRedirectLogin = ()=>{
        navigate('/hackathons');
    }
    return (
        <div className="nav">
            <div className="nav_container">
                <Link to={"https://dbrau.ac.in"} target="_blank">
                   <img className='ml-[4%] w-[80px] h-fit' src={logo} alt="Logo"/>
                </Link>
                {/* <p className='dyp_name'>Placement Portal</p> */}
                <div className='nav_div'> 
                    <p className='dyp_name1' onClick={handleRedirectDashboard}><img className='navbar_user' src={user} alt="user"/>Dashboard</p>
                    <p className='dyp_name1' onClick={handleRedirectLogin}><img src={compete} className='compete_icon' alt="compete_icon"/> Hackathons</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar