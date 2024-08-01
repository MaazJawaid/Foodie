import React from 'react'
import './Cards.css'

import cookingImage from './src/cooking.png'
import seaFoodImage from './src/seafood.png'
import quickImage from './src/quick.png'
import freeShippingImage from './src/free-shipping.png'

const Cards = () => {
    return (
        <div className="specialityCards flex gap-[2vw] flex-wrap justify-center">
            <div className="specialCard bg-red-100 w-[35vw] h-[50vw] rounded-lg flex flex-col items-center justify-center gap-2">
                <img src={cookingImage} alt='Image' className='SpecialImage w-8'></img>
                <div className="heading font-semibold text-lg">Best Chef</div>
                <div className="contentSpecialCard w-3/4 text-xs">Lorem ipsum dolor sit amet consectetur. dolor sit amet sit sit amet consectetur.</div>
            </div>
            <div className="specialCard bg-red-100 w-[35vw] h-[50vw] rounded-lg flex flex-col items-center justify-center gap-2">
                <img src={quickImage} alt='Image' className='SpecialImage w-8'></img>
                <div className="heading font-semibold text-lg">Fast Delivery</div>
                <div className="contentSpecialCard w-3/4 text-xs">Lorem ipsum dolor sit amet consectetur. dolor sit amet sit sit amet consectetur.</div>
            </div>
            <div className="specialCard bg-red-100 w-[35vw] h-[50vw] rounded-lg flex flex-col items-center justify-center gap-2">
                <img src={seaFoodImage} alt='Image' className='SpecialImage w-8'></img>
                <div className="heading font-semibold text-lg">Fresh Food</div>
                <div className="contentSpecialCard w-3/4 text-xs">Lorem ipsum dolor sit amet consectetur. dolor sit amet sit sit amet consectetur.</div>
            </div>
            <div className="specialCard bg-red-100 w-[35vw] h-[50vw] rounded-lg flex flex-col items-center justify-center gap-2">
                <img src={freeShippingImage} alt='Image' className='SpecialImage w-8'></img>
                <div className="heading font-semibold text-lg">Free Delivery</div>
                <div className="contentSpecialCard w-3/4 text-xs">Lorem ipsum dolor sit amet consectetur. dolor sit amet sit sit amet consectetur.</div>
            </div>
        </div>
    )
}

export default Cards
