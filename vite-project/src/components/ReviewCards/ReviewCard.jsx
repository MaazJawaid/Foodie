import React from 'react'
import starsImage from './src/stars.png'
import ProfileImage from './src/profile.jpg'
import './ReviewCard.css' // Import your CSS file

const ReviewCard = () => {
    const reviewContent = (
        <>
            <div className='reviewCard bg-white w-80 h-46 rounded-xl p-3'>
                <div className="first"><img src={starsImage} className='stars w-32' alt="stars" /></div>
                <div className="content mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, ratione quia doloribus maiores officiis vel.</div>
                <div className="lower flex gap-3 mt-2">
                    <img src={ProfileImage} className='profile w-12 h-12 object-cover rounded-full' alt="profile" />
                    <div className="right">
                        <div className="upperright font-semibold">Maaz Khan</div>
                        <div className="lowerRight text-sm">Lorem</div>
                    </div>
                </div>
            </div>

            <div className='reviewCard bg-white w-80 h-46 rounded-xl p-3'>
                <div className="first"><img src={starsImage} className='stars w-32' alt="stars" /></div>
                <div className="content mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, ratione quia doloribus maiores officiis vel.</div>
                <div className="lower flex gap-3 mt-2">
                    <img src={ProfileImage} className='profile w-12 h-12 object-cover rounded-full' alt="profile" />
                    <div className="right">
                        <div className="upperright font-semibold">Maaz Khan</div>
                        <div className="lowerRight text-sm">Lorem</div>
                    </div>
                </div>
            </div>

            <div className='reviewCard bg-white w-80 h-46 rounded-xl p-3'>
                <div className="first"><img src={starsImage} className='stars w-32' alt="stars" /></div>
                <div className="content mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, ratione quia doloribus maiores officiis vel.</div>
                <div className="lower flex gap-3 mt-2">
                    <img src={ProfileImage} className='profile w-12 h-12 object-cover rounded-full' alt="profile" />
                    <div className="right">
                        <div className="upperright font-semibold">Maaz Khan</div>
                        <div className="lowerRight text-sm">Lorem</div>
                    </div>
                </div>
            </div>

            <div className='reviewCard bg-white w-80 h-46 rounded-xl p-3'>
                <div className="first"><img src={starsImage} className='stars w-32' alt="stars" /></div>
                <div className="content mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, ratione quia doloribus maiores officiis vel.</div>
                <div className="lower flex gap-3 mt-2">
                    <img src={ProfileImage} className='profile w-12 h-12 object-cover rounded-full' alt="profile" />
                    <div className="right">
                        <div className="upperright font-semibold">Maaz Khan</div>
                        <div className="lowerRight text-sm">Lorem</div>
                    </div>
                </div>
            </div>

            <div className='reviewCard bg-white w-80 h-46 rounded-xl p-3'>
                <div className="first"><img src={starsImage} className='stars w-32' alt="stars" /></div>
                <div className="content mt-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, ratione quia doloribus maiores officiis vel.</div>
                <div className="lower flex gap-3 mt-2">
                    <img src={ProfileImage} className='profile w-12 h-12 object-cover rounded-full' alt="profile" />
                    <div className="right">
                        <div className="upperright font-semibold">Maaz Khan</div>
                        <div className="lowerRight text-sm">Lorem</div>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <div className="reviewContainer">
            <div className='reviewTrack'>
                {reviewContent}
                {reviewContent} {/* Duplicate the content for smooth looping */}
            </div>
        </div>
    )
}

export default ReviewCard
