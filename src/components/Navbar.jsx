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
            <div className="flex md:flex-col flex-row justify-between content-center items-center bg-transparent w-[100%] h-[100%]">
                <Link to={"https://dbrau.ac.in"} target="_blank">
                   <img className='ml-[5%] w-[90px] p-2 md:p-0 h-fit' src={logo} alt="Logo"/>
                </Link>
                {/* <p className='dyp_name'>Placement Portal</p> */}
                <div className='md:w-[25%] w-full flex gap-[5px] md:gap-[20px] justify-end md:justify-evenly mr-[3%] md:mr-[6%] items-center'> 
                    <p className='dyp_name1 px-3 py-1 text-[0.7rem] md:text-[1.3rem]' onClick={handleRedirectDashboard}><img className='w-[30px] h-[30px] p-[7px] md:p-[5px] cursor-pointer' src={user} alt="user"/>Dashboard</p>
                    <p className='dyp_name1  px-3 py-1 text-[0.7rem] md:text-[1.3rem]' onClick={handleRedirectLogin}><img src={compete} className='mr-[4px] md:mr-[6px] p-[2px] md:p-0 w-[25px] h-[25px]' alt="compete_icon"/> Hackathons</p>
                </div>
            </div>
        </div>
    )
}

export default Navbar