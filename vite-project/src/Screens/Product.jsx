import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuCard from '../components/MenuCard/MenuCard'
import CircleImage from '../assets/MainMenu/icons8-circle-48.png'
import './Product.css'

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
      <div className="smallMenu" onClick={() => { setSideLowerBar(true) }}><img src={CircleImage} className='image w-12 fixed bottom-3 right-3 z-10'></img></div>
      <ul className={`sideArea fixed bg-blue-400 bottom-14 ${sideLowerBar ? 'right-14' : '-right-96'} p-3 px-4 rounded-lg text-white outline outline-2 z-20 transition-all duration-300 ease-in-out`} ref={sideLowerBarRef}>
        <li className='elements outline outline-1 mb-3 px-4 py-1 rounded-xl cursor-pointer hover:bg-slate-700 transition-all duration-500' onClick={() => handleNavigation('desiDelightsSection')}>Desi Delights</li>
        <li className='elements outline outline-1 mb-3 px-4 py-1 rounded-xl cursor-pointer hover:bg-slate-700 transition-all duration-500' onClick={() => handleNavigation('fastFoodSection')}>Fast Food</li>
        <li className='elements outline outline-1 mb-3 px-4 py-1 rounded-xl cursor-pointer hover:bg-slate-700 transition-all duration-500' onClick={() => handleNavigation('chineeseSection')}>Chineese</li>
        <li className='elements outline outline-1 px-4 py-1 rounded-xl cursor-pointer hover:bg-slate-700 transition-all duration-500' onClick={() => handleNavigation('desertsSection')}>Deserts</li>
      </ul>
      <div className="fastFoods flex flex-col" id="fastFoodSection">
        <div className="mid flex justify-between px-4">
          <button className='viewMore bg-blue-500 text-white w-56 h-14 self-center rounded-lg text-3xl'>Fast Food</button>

        </div>

        <div className="menuSection flex flex-col justify-center bg-gray-200 pb-6">
          <MenuCard category='fast food' />
        </div>
      </div>
      <div className="desiDelightsSection flex flex-col" id="desiDelightsSection">
        <div className="mid flex justify-between px-4">
          <button className='viewMore bg-blue-500 text-white w-56 h-14 self-center rounded-lg text-3xl'>Desi Delights</button>

        </div>

        <div className="menuSection flex flex-col justify-center bg-gray-200 pb-6">
          <MenuCard category='desi delights' />
        </div>
      </div>
      <div className="chineeseSection flex flex-col" id='chineeseSection'>
        <div className="mid flex justify-between px-4">
          <button className='viewMore bg-blue-500 text-white w-56 h-14 self-center rounded-lg text-3xl'>Chineese</button>

        </div>

        <div className="menuSection flex flex-col justify-center bg-gray-200 pb-6">
          <MenuCard category='chinese' />
        </div>
      </div>
      <div className="desertsSection flex flex-col" id='desertsSection'>
        <div className="mid flex justify-between px-4">
          <button className='viewMore bg-blue-500 text-white w-56 h-14 self-center rounded-lg text-3xl'>Deserts</button>

        </div>

        <div className="menuSection flex flex-col justify-center bg-gray-200 pb-6">
          <MenuCard category='desserts' />
        </div>
      </div>
    </div>
  )
}

export default Product
