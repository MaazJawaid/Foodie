import React from 'react'
import './ArrivalCard.css'
import { useNavigate } from 'react-router-dom'

import Image from './src/Cheeseburger.png'
import ShareImage from './src/share.png'

const MenuCard = () => {
    const navigate = useNavigate();

    return (
        <div className='cardContainer max-w-[98vw] flex flex-wrap justify-center gap-x-3 gap-y-5 py-6'>
            <div className="card h-96 w-40 bg-white rounded-xl shadow-lg">
                <img src={Image} className='image rounded-t-xl'></img>
                <div className="lowerMain p-3">
                    <div className="firstLower">
                        <ul className='list flex items-center justify-between'>
                            <li className='heading font-semibold'>Burger</li>
                            <li><img src={ShareImage} className='shareImage w-5 cursor-pointer'></img></li>
                        </ul>
                    </div>
                    <div className="secondLower text-sm mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nobis?</div>
                    <div className="forthLower flex justify-center mt-8">
                        <button className='orderNow cursor-pointer min-w-fit bg-red-500 px-4 mt-2 py-1 rounded-md text-white text-sm' onClick={() => {navigate('/arriving')}}>Soon Available</button>
                    </div>
                </div>
            </div>


            <div className="card h-96 w-40 bg-white rounded-xl shadow-lg">
                <img src={Image} className='image rounded-t-xl'></img>
                <div className="lowerMain p-3">
                    <div className="firstLower">
                        <ul className='list flex items-center justify-between'>
                            <li className='heading font-semibold'>Burger</li>
                            <li><img src={ShareImage} className='shareImage w-5 cursor-pointer'></img></li>
                        </ul>
                    </div>
                    <div className="secondLower text-sm mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nobis?</div>
                    <div className="forthLower flex justify-center mt-8">
                        <button className='orderNow cursor-pointer min-w-fit bg-red-500 px-4 mt-2 py-1 rounded-md text-white text-sm' onClick={() => {navigate('/arriving')}}>Soon Available</button>
                    </div>
                </div>
            </div>
            <div className="card h-96 w-40 bg-white rounded-xl shadow-lg">
                <img src={Image} className='image rounded-t-xl'></img>
                <div className="lowerMain p-3">
                    <div className="firstLower">
                        <ul className='list flex items-center justify-between'>
                            <li className='heading font-semibold'>Burger</li>
                            <li><img src={ShareImage} className='shareImage w-5 cursor-pointer'></img></li>
                        </ul>
                    </div>
                    <div className="secondLower text-sm mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nobis?</div>
                    <div className="forthLower flex justify-center mt-8">
                        <button className='orderNow cursor-pointer min-w-fit bg-red-500 px-4 mt-2 py-1 rounded-md text-white text-sm' onClick={() => {navigate('/arriving')}}>Soon Available</button>
                    </div>
                </div>
            </div>
            <div className="card h-96 w-40 bg-white rounded-xl shadow-lg">
                <img src={Image} className='image rounded-t-xl'></img>
                <div className="lowerMain p-3">
                    <div className="firstLower">
                        <ul className='list flex items-center justify-between'>
                            <li className='heading font-semibold'>Burger</li>
                            <li><img src={ShareImage} className='shareImage w-5 cursor-pointer'></img></li>
                        </ul>
                    </div>
                    <div className="secondLower text-sm mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, nobis?</div>
                    <div className="forthLower flex justify-center mt-8">
                        <button className='orderNow cursor-pointer min-w-fit bg-red-500 px-4 mt-2 py-1 rounded-md text-white text-sm' onClick={() => {navigate('/arriving')}}>Soon Available</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MenuCard
