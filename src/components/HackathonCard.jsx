import React from "react";
import "../Styles/HackathonCard.css";
import { Link } from "react-router-dom";

// const hackathon_url = 'https://script.google.com/macros/s/AKfycbwl5PJp8hDfarVc5s0hHU0Lws42aAEPtam2oedJZQX4b-fZOM7Oq0gSzzSUFpqXIMnv/exec';

const HackathonCard = ({hackathons}) =>{
  // console.log("hackathons:", hackathons)
return (
  <>
  <div className="card card2">
  {/* <Link to={hackathons.link} target="_blank"> */}
    <h6 className="hackathon_title text-xl font-bold">{hackathons.title}</h6>
    <img src={hackathons.img} className="w-[100%]" alt="img" />
    <p className="para_description tracking-tighter">{hackathons.description}</p>
    <p className="para_registration"> <span className="font-bold hackathon_date">Deadline :</span> {hackathons.deadline}</p>
    <p className="para_registration"> <span className="mode font-bold">Mode :</span> {hackathons.mode}</p>
    <button className="rounded-[10px] ml-[30%] border-none px-[14px] py-[8px] bg-blue-800 mt-[20px]">
      <Link to={hackathons.link}>Register Now</Link>
    </button>
  {/* </Link> */}
  </div>
    </>
);
}

export default HackathonCard;