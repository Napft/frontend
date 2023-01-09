import React from 'react';
import './About.css';
import Avatar from '../assets/avatar.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <section id = 'home'>
        <Footer></Footer>
        <div className='home-text' data-aos="fade-down">
            <strong>Hello, it's us</strong>
            <br/>
            <h1>Taking you on a Digital Journey</h1>
            <p>A Non-Fungible Token is a unique and non-interchangeable digital item stored on a blockchain. NFTs can be any file, from a photo, video, audio, etc. Once you’re done, you can resell it, and the creator gets paid every time a transaction is made.
                <br></br>
                <br></br>
Blockchain Creative Labs (BCL) partnered with The Masked Singer to launch The MaskVerse, a community for fans to buy, sell and trade unique digital collectibles. Those who hold ultra-rare NFTs get access to real-world prizes and an exclusive Discord.
                <br></br>
                <br></br>
                In Web3’s 360 ecosystem everyone can be a creator who, ultimately, can produce and collect digital goods and have a stake in content.
            </p>
        </div>

        <div className='home-img' data-aos="fade-up">
            <div className='img-box' >
                <img src={Avatar} alt='Avatar'/>

                <h2>NapFT<br/> <span> Let's dive into Digital Art </span></h2>

                <div className='social'>
                  <a href='https://www.instagram.com/invites/contact/?i=kod6v5d1uzo2&utm_content=pbge72p'>
                  <i class="fa-brands fa-instagram"></i>
                  </a>

                  <a href='#!'>
                    <i className="fa-brands fa-facebook" width='18'></i>
                  </a>
                </div>

                
                <a href='#!' className='hire-me'>Rate Us</a>
            </div>
        </div>
        
        <Header></Header>
    </section>

  )
}

export default About

