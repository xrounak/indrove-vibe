import React from 'react';
import styled from 'styled-components';

const Contact = () => {
    return (
        <StyledWrapper>
            <div className="parent">
                <div className="card">
                    <div className="logo">
                        <span className="circle circle1" />
                        <span className="circle circle2" />
                        <span className="circle circle3" />
                        <span className="circle circle4" />
                        <span className="circle circle5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" className="svg" stroke="#111" strokeWidth="4">
                                <path d="M17 20L6 32l11 12" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M47 20l11 12-11 12" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M36 16l-8 32" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>


                        </span>
                    </div>
                    <div className="glass" />
                    <div className="content">
                        <span className="title">Connect with Rounak</span>
                        <span className="text">
                            I am a full stack developer and a freelancer.
                        </span>
                    </div>
                    <div className="bottom">
                        <div className="social-buttons-container">
                            <button className="social-button social-button1" onClick={() => window.open("https://www.instagram.com/unknowngmr02", "_blank")}>
                                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" className="svg">
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9 114.9-51.3 114.9-114.9S287.7 141 224.1 141zm0 189.6c-41.3 0-74.7-33.4-74.7-74.7s33.4-74.7 74.7-74.7 74.7 33.4 74.7 74.7-33.4 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 12-26.9 26.9-26.9 26.9 12 26.9 26.9zm76.1 27.2c-.9-19.6-5.1-37-17.1-53.2-12-16.2-28.1-27.3-47.3-34.9C343.3 48 287.6 46.2 224.1 46.2s-119.3 1.8-157.9 29.2C47 80.2 30.9 91.3 18.9 107.5c-12 16.2-16.2 33.6-17.1 53.2C.4 198.7 0 218.6 0 256s.4 57.3 1.8 95.3c.9 19.6 5.1 37 17.1 53.2 12 16.2 28.1 27.3 47.3 34.9 38.6 27.4 94.3 29.2 157.9 29.2s119.3-1.8 157.9-29.2c19.2-7.6 35.3-18.7 47.3-34.9 12-16.2 16.2-33.6 17.1-53.2 1.3-38 1.8-57.9 1.8-95.3s-.4-57.3-1.8-95.3zM398.8 388c-7.8 19.6-22.9 34.6-42.5 42.5-29.5 11.8-99.4 9.1-132.2 9.1s-102.7 2.6-132.2-9.1c-19.6-7.8-34.6-22.9-42.5-42.5-11.8-29.5-9.1-99.4-9.1-132.2s-2.6-102.7 9.1-132.2c7.8-19.6 22.9-34.6 42.5-42.5 29.5-11.8 99.4-9.1 132.2-9.1s102.7-2.6 132.2 9.1c19.6 7.8 34.6 22.9 42.5 42.5 11.8 29.5 9.1 99.4 9.1 132.2s2.7 102.7-9.1 132.2z" />
                                </svg>
                            </button>

                            <button className="social-button social-button2" onClick={() => window.open("https://www.linkedin.com/in/rounak-kumar-unknown/", "_blank")}>
                                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" className="svg">
                                    <path d="M100.28 448H7.4V148.9h92.88zm-46.44-340C24.6 108 0 83.4 0 53.9 0 24.6 24.6 0 53.9 0c29.4 0 53.9 24.6 53.9 53.9 0 29.4-24.5 53.9-53.9 53.9zM447.9 448h-92.4V302.4c0-34.7-12.4-58.4-43.4-58.4-23.7 0-37.8 16-44 31.4-2.3 5.5-2.9 13.1-2.9 20.7V448h-92.4s1.2-270.2 0-297.1h92.4v42.1c-0.2 0.3-0.5 0.7-0.7 1h0.7v-1c12.3-19 34.2-46.1 83.4-46.1 60.9 0 106.6 39.7 106.6 125.1V448z" />
                                </svg>
                            </button>
                            <button className="social-button social-button3" onClick={() => window.open("https://mail.google.com/mail/u/0/#inbox?compose=new&to=rounakkumar13005@gmail.com", "_blank")}>
                                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="svg">
                                    <path d="M502.3 190.8 327.4 338c-27.5 23.7-68.2 23.9-96 0L9.7 190.8C3.8 185.4 0 177.9 0 170V464c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V170c0-7.9-3.8-15.4-9.7-20.2zM464 64H48C21.5 64 0 85.5 0 112v12.2l256 220.4L512 124.2V112c0-26.5-21.5-48-48-48z" />
                                </svg>
                            </button>

                        </div>
                        <div className="view-more">
                            <button className="view-more-button" onClick={() => window.open("https://github.com/xrounak", "_blank")}>View more</button>
                            <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </div>
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}
const StyledWrapper = styled.div`
  .parent {
    width: 290px;
    height: 300px;
    perspective: 1000px;
  }

  .card {
    height: 100%;
    border-radius: 50px;
    background: linear-gradient(135deg, #0e0e0e 0%, #1a1a1a 100%);
    transition: all 0.5s ease-in-out;
    transform-style: preserve-3d;
    box-shadow: rgba(0, 255, 214, 0.05) 40px 50px 25px -40px, rgba(0, 255, 214, 0.15) 0px 25px 25px -5px;
  }

  .glass {
    transform-style: preserve-3d;
    position: absolute;
    inset: 8px;
    border-radius: 55px;
    border-top-right-radius: 100%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.15) 100%);
    transform: translate3d(0px, 0px, 25px);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s ease-in-out;
  }

  .content {
    padding: 100px 60px 0px 30px;
    transform: translate3d(0, 0, 26px);
  }

  .content .title {
    display: block;
    color: #00ffd5;
    font-weight: 900;
    font-size: 20px;
  }

  .content .text {
    display: block;
    color: #cccccc;
    font-size: 15px;
    margin-top: 20px;
  }

  .bottom {
    padding: 10px 12px;
    transform-style: preserve-3d;
    position: absolute;
    bottom: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transform: translate3d(0, 0, 26px);
  }

  .bottom .view-more {
    display: flex;
    align-items: center;
    width: 40%;
    justify-content: flex-end;
    transition: all 0.2s ease-in-out;
  }

  .bottom .view-more:hover {
    transform: translate3d(0, 0, 10px);
  }

  .bottom .view-more .view-more-button {
    background: none;
    border: none;
    color: #00ffc3;
    font-weight: bolder;
    font-size: 12px;
  }

  .bottom .view-more .svg {
    fill: none;
    stroke: #00ffc3;
    stroke-width: 3px;
    max-height: 15px;
  }

  .bottom .social-buttons-container {
    display: flex;
    gap: 10px;
    transform-style: preserve-3d;
  }

  .bottom .social-buttons-container .social-button {
    width: 30px;
    aspect-ratio: 1;
    padding: 5px;
    background: #ffffff;
    border-radius: 50%;
    border: none;
    display: grid;
    place-content: center;
    box-shadow: rgba(0, 255, 214, 0.4) 0px 7px 5px -5px;
  }

  .bottom .social-buttons-container .social-button .svg {
    width: 15px;
    fill:rgb(8, 139, 108);
  }

  .bottom .social-buttons-container .social-button:hover {
    background: #00ffc3;
  }

  .bottom .social-buttons-container .social-button:hover .svg {
    fill: black;
  }

  .bottom .social-buttons-container .social-button:active {
    background: #ffffff;
  }

  .bottom .social-buttons-container .social-button:active .svg {
    fill: #00e68a;
  }

  .logo {
    position: absolute;
    right: 0;
    top: 0;
    transform-style: preserve-3d;
  }

  .logo .circle {
    display: block;
    position: absolute;
    aspect-ratio: 1;
    border-radius: 50%;
    top: 0;
    right: 0;
    box-shadow: rgba(0, 255, 214, 0.1) -10px 10px 20px 0px;
    backdrop-filter: blur(5px);
    background: rgba(0, 255, 214, 0.1);
    transition: all 0.5s ease-in-out;
  }

  .logo .circle1 {
    width: 170px;
    transform: translate3d(0, 0, 20px);
    top: 8px;
    right: 8px;
  }

  .logo .circle2 {
    width: 140px;
    transform: translate3d(0, 0, 40px);
    top: 10px;
    right: 10px;
    transition-delay: 0.4s;
  }

  .logo .circle3 {
    width: 110px;
    transform: translate3d(0, 0, 60px);
    top: 17px;
    right: 17px;
    transition-delay: 0.8s;
  }

  .logo .circle4 {
    width: 80px;
    transform: translate3d(0, 0, 80px);
    top: 23px;
    right: 23px;
    transition-delay: 1.2s;
  }

  .logo .circle5 {
    width: 50px;
    transform: translate3d(0, 0, 100px);
    top: 30px;
    right: 30px;
    display: grid;
    place-content: center;
    transition-delay: 1.6s;
  }

  .logo .circle5 .svg {
    width: 20px;
    fill: #00ffd5;
  }

  .parent:hover .card {
    transform: rotate3d(1, 1, 0, 30deg);
    box-shadow: rgba(0, 255, 214, 0.2) 30px 50px 25px -40px, rgba(0, 255, 214, 0.1) 0px 25px 30px 0px;
  }

  .parent:hover .card .bottom .social-buttons-container .social-button {
    transform: translate3d(0, 0, 50px);
    box-shadow: rgba(0, 255, 214, 0.2) -5px 20px 10px 0px;
  }

  .parent:hover .card .logo .circle2 {
    transform: translate3d(0, 0, 60px);
  }

  .parent:hover .card .logo .circle3 {
    transform: translate3d(0, 0, 80px);
  }

  .parent:hover .card .logo .circle4 {
    transform: translate3d(0, 0, 100px);
  }

  .parent:hover .card .logo .circle5 {
    transform: translate3d(0, 0, 120px);
  }
`;


export default Contact;