import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuCard from '../components/FullArrivalCard/Card'
import CircleImage from '../assets/MainMenu/icons8-circle-48.png'

const Product = () => {
  const [sideLowerBar, setSideLowerBar] = useState(false);
  const sideLowerBarRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideLowerBarRef.current && !sideLowerBarRef.current.contains(event.target)) {
        setSideLowerBar(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const handleNavigation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className='body sm:mt-0 mt-16 bg-gray-200 flex flex-col items-center justify-center'>
      <div className="mainHeading text-5xl py-6 font-semibold">Main Menu</div>
      <div className="smallMenu" onClick={() => { setSideLowerBar(true) }}><img src={CircleImage} className='image w-12 sm:hidden fixed bottom-3 right-3'></img></div>
      <ul className={`sideArea fixed bg-blue-400 bottom-14 ${sideLowerBar ? 'right-14' : '-right-96'} p-3 px-4 rounded-lg text-white outline outline-2 transition-all duration-300 ease-in-out`} ref={sideLowerBarRef}>
        <li className='elements outline outline-1 mb-3 px-4 py-1 rounded-xl' onClick={() => handleNavigation('fastFoodSection')}>Our New Arrivals</li>
      </ul>
      <div className="fastFoods flex flex-col" id="fastFoodSection">
        <div className="mid flex justify-between px-4">
          <button className='viewMore bg-blue-500 text-white w-64 h-14 self-center rounded-lg text-3xl'>Our New Arrivals</button>
        </div>
        <select class="filter bg-white w-fit px-4 py-1 rounded-lg mt-6 flex self-end mr-4" onchange="sortItems(this.value)">
          <option value="default" selected>Filters</option>
          <option value="priceHighToLow">Fast Foods</option>
          <option value="priceLowToHigh">Desi Delights</option>
          <option value="popularity">Chineese</option>
          <option value="deserts">Deserts</option>
        </select>
        <div className="menuSection flex flex-col justify-center bg-gray-200 pb-6">
          <MenuCard />
        </div>
        <button className='viewMore bg-orange-400 text-white w-56 h-10 self-center text-lg rounded-lg mb-12'>View More...</button>
      </div>
    </div>
  )
}

export default Product
