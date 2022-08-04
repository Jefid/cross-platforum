import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <footer className="w-100% mt-auto bg-secondary p-4">
      <div id="contributers" className="container"> 
      Created By: 
      <a href='https://github.com/cannonel'rel="noreferrer" target="_blank"> Erika, </a> 
      <a href='https://github.com/Jefid'rel="noreferrer" target="_blank">Jefferson, </a>
      <a href='https://github.com/ppepin34'rel="noreferrer" target="_blank"> Phil, </a>
       and 
      <a href='https://github.com/rvacovsky'rel="noreferrer" target="_blank"> Roger </a>
      <br></br> &copy;2022</div>
    </footer>
  );
};

export default Footer;
