import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div id="contributers" className="container"> 
      Created By: 
      <a href='https://github.com/cannonel' target="_blank"> Erika, </a> 
      <a href='https://github.com/Jefid' target="_blank">Jefferson, </a>
      <a href='https://github.com/ppepin34' target="_blank"> Phil, </a>
       and 
      <a href='https://github.com/rvacovsky' target="_blank"> Roger </a>
      <br></br> &copy;2022</div>
    </footer>
  );
};

export default Footer;
