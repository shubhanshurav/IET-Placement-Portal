import React from 'react'
import '../Styles/Footer.css';
import logo from '../Assets/IET_logo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import youtube from '../Assets/youtube.png';
import facebook from '../Assets/facebook.png';
import twitter from '../Assets/twitter.png';
import instagram from '../Assets/instagram.png';
import { Link } from 'react-router-dom';

const Footer = () => {

    AOS.init({

        disable: false,
        startEvent: 'DOMContentLoaded',
        initClassName: 'aos-init',
        animatedClassName: 'aos-animate',
        useClassNames: false,
        disableMutationObserver: false,
        debounceDelay: 50,
        throttleDelay: 99,
    
    
    
        offset: 120,
        delay: 0,
        duration: 400,
        easing: 'ease',
        once: false,
        mirror: false,
        anchorPlacement: 'top-bottom',
    
      });

      

    return (
        <div className="bg-[#f3f4f5] w-[100%] py-6 flex justify-center items-center">
            <div className="w-[85%] flex justify-center flex-col md:flex-row items-center gap-4 pb-28 md:pb-0">
                <div className="footer_left gap-2">
                    <img src={logo} className='footer_logo' alt="footer_logo" data-aos="zoom-in" data-aos-duration="600"/>
                    <div className="footer_left_text" data-aos="zoom-in" data-aos-duration="600">
                        <p className='text-[15px] md:text-[20px] text-[#000] font-[700] m-0 w-[95%]'>Institute of Engineering and Technology, Agra</p>
                        <p className="college_text_footer text-[15px] md:text-[18px]">Accredited by NAAC with 'B++' Grade</p>
                    </div>
                </div>
                <div className="footer_right flex md:content-end content-start">
                    <div className="footer_right_text" data-aos="zoom-in" data-aos-duration="600">
                        <p className="text-[17px] md:text-[22px] font-[700] text-[#000] m-0" >Placement Portal</p>
                        <div className="social_links">
                            <Link to={"https://www.youtube.com/channel/"} target='_blank' className="footer_link">
                                <img src={youtube} className='footer_social_icon' alt="social_media_logo"/>
                            </Link>
                            <Link to={"https://www.facebook.com/"} target='_blank' className="footer_link">
                                <img src={facebook} className='footer_social_icon' alt="social_media_logo"/>
                            </Link>
                            <Link to={"https://www.instagram.com/"} target='_blank' className="footer_link">
                                <img src={instagram} className='footer_social_icon' alt="social_media_logo"/>
                            </Link>
                            <Link to={"https://twitter.com/"} target='_blank' className="footer_link1">
                                <img src={twitter} className='footer_social_icon1' alt="social_media_logo"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;