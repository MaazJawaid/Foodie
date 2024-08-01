import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'

import foodImage from '../assets/Home/food.png'
import MenuCard from '../components/MenuCard/MenuCard.jsx'
import ReviewCard from '../components/ReviewCards/ReviewCard.jsx'
import SupportPage from './SupportPage.jsx'

// Process Statements that are not being used now
import Cards from '../components/SpecialCards/Cards.jsx'
import ArrivalCard from '../components/ArrivalCards/ArrivalCard.jsx'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='home min-h-screen flex flex-col'>
      <div className="justCover hidden sm:block w-[98.9vw] absolute h-12 bg-gray-200 z-10 top-13 left-0"></div>
      <div className="first bg-gray-200 w-full h-[450px] flex mt-12">
        <div className="leftMain w-3/5 flex flex-col justify-between p-7">
          <div className="headingMain font-bold text-3xl">Good Food Makes Good Health!</div>
          <div className="para text-[13px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam illum quisquam labore sit blanditiis ipsa eius aliquam placeat, minus a voluptas provident dolor nostrum totam libero iure numquam culpa soluta?</div>
          <div className="bookings flex gap-3">
            <button className='orderNow cursor-pointer min-w-fit bg-red-500 p-1 rounded-md text-white hover:bg-red-900 transition-all duration-500' onClick={() => {navigate('/products')}}>Order Now</button>
            <button className='bookTable cursor-pointer min-w-fit outline outline-1 p-1 outline-red-500 rounded-md hover:bg-red-300 transition-all duration-500' onClick={() => {navigate('/service')}}>Book a Table</button>
          </div>
        </div>
        <div className="rightMain w-2/5 flex items-center justify-center">
          <img src={foodImage} alt='Food Image' className='foodImage rounded-md w-4/5 max-h-[80%] object-cover'></img>
        </div>
      </div>
      <div className="stats flex flex-col items-center">
        <div className="statsInfo absolute bg-red-400 sm:w-11/12 h-[20vh] rounded-md">
          <div className="innerContentStats h-full flex items-center justify-center gap-6">
            <div className="orderCompleted flex flex-col items-center">
              <div className="div text-white font-semibold text-base">125k+</div>
              <div className="div text-white font-semibold text-xs">Order Completed</div>
            </div>
            <div className="orderCompleted flex flex-col items-center">
              <div className="div text-white font-semibold text-base">80k+</div>
              <div className="div text-white font-semibold text-xs">Happy Customer</div>
            </div>
            <div className="orderCompleted flex flex-col items-center">
              <div className="div text-white font-semibold text-base">223k+</div>
              <div className="div text-white font-semibold text-xs">New Visitors</div>
            </div>
          </div>
        </div>
        <div className="whiteColor w-full h-[10vh] bg-gray-200"></div>
        <div className="greyColor w-full h-fit bg-white flex flex-col justify-center items-center"></div>
      </div>
      <div className="centerIt flex flex-col items-center">
        <div className="contentBelowStats w-3/4 mt-[20vh] flex flex-col items-center gap-7">
          <div className="headingMain font-bold text-3xl">Why Choose Us!</div>
          <div className="para text-[13px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam illum quisquam labore sit blanditiis ipsa.</div>
          <MenuCard category='fast food'/>
          <div className="headingMain font-bold text-3xl h-20">Our Desi Tarka</div>
        </div>
      </div>
      <div className="menuSection flex flex-col justify-center py-6">
        <MenuCard category='desi delights'/>
      </div>
      <div className="bestWishesSection flex flex-col items-center py-6">
        <div className="headingMain font-bold text-3xl h-20">Our Best Wishes</div>
        <div className="bestWishesContent w-fit">Lorem ipsum consectetur adipisicing</div>
        <div className="bestWishesContent w-fit">elit. Atque enim natus aperiam.</div>
        <MenuCard category='chinese'/>
      </div>
      <div className="bestWishesSection flex flex-col items-center py-6">
        <div className="headingMain font-bold text-3xl h-20">Our Sweet Arrivals</div>
        <div className="bestWishesContent w-fit">Lorem ipsum consectetur adipisicing</div>
        <div className="bestWishesContent w-fit">elit. Atque enim natus aperiam.</div>
        <MenuCard category='desserts'/>
      </div>
      <div className="headingMain font-bold text-3xl h-20 justify-center flex">Customer Reviews</div>
      <div className="bestWishesSection bg-gray-200 flex flex-wrap justify-center gap-3 items-center py-6">
        <ReviewCard />
      </div>
      <div className="chatWithUs flex justify-center items-center pb-8 -mt-12">
        <SupportPage />
      </div>
    </div>
  )
}

export default Home
