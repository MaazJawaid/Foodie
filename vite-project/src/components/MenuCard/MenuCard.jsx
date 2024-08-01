import React, { useEffect, useState } from 'react';
import './MenuCard.css';
import ShareImage from './src/share.png';
import star from './src/star.png'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchCartItemById } from '../../redux/cartSlicer/cartSlicer.js'
import { setImageUrls_1, setCategoryBasedItems_1 } from '../../redux/fullCartDataSlicer/fullCartDataSlice.js';


const MenuCard = (category) => {
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const { items, loading, error } = useSelector((state) => state.food);
    const [imageUrls, setImageUrls] = useState({});
    const [filteredItems, setFilteredItems] = useState([]);
    const [displayCount, setDisplayCount] = useState(4);
    const [selectedFilter, setSelectedFilter] = useState('popularity');
    const foodItemsArray = items.foodItems;
    const user = useSelector(state => state.login.user);
    const [categoryBasedItems, setCategoryBasedItems] = useState([]);
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.login.isAuthenticated);

    const getImage = async (url) => {
        const step1 = url.replace(/\\/g, '/');
        const modifiedString = step1.replace(/uploads/g, 'images');
        return `http://localhost:3000/${modifiedString}`;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false); // Hide the alert after 1 second
        }, 2000);

        return () => clearTimeout(timer);
    }, [showAlert]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchImages = async () => {
                const urls = await Promise.all(
                    foodItemsArray.map(async (item) => {
                        const imageUrl = await getImage(item.imageUrl);
                        return { [item._id]: imageUrl };
                    })
                );

                const urlMap = urls.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                setImageUrls(urlMap);
                dispatch(setImageUrls_1(urlMap));
            };

            if (foodItemsArray && foodItemsArray.length > 0) {
                fetchImages();
                dispatch(setCategoryBasedItems_1(foodItemsArray));

            }
        }, 10); // Delay of 0.001 seconds (1 milliseconds)

        return () => clearTimeout(timer);
    }, [foodItemsArray]);


    useEffect(() => {
        if (category && foodItemsArray) {
            const filtered = foodItemsArray.filter(item => item.type === category.category);
            setFilteredItems(filtered);
        }
    }, [category, foodItemsArray]);

    const handleViewMore = () => {
        // Increase the display count by 4 on each click
        setDisplayCount(prevCount => prevCount + 4);
    };

    useEffect(() => {
        if (filteredItems.length > 2) {
            sortItems(selectedFilter);
        }
    }, [selectedFilter, filteredItems]);

    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    const sortItems = (filter) => {
        let sortedItems = [...filteredItems];
        // Here make a state of all the sortedItems and make it available for other module
        // Name the state Item Data

        if (filter === 'priceHighToLow') {
            sortedItems.sort((a, b) => b.price - a.price);
        } else if (filter === 'priceLowToHigh') {
            sortedItems.sort((a, b) => a.price - b.price);
        } else if (filter === 'popularity') {
            sortedItems.sort((a, b) => b.reviews - a.reviews);
        }
        setCategoryBasedItems(sortedItems);
    };

    function timeUntilFutureDate(futureDateString) {
        // Parse the future date string into a Date object
        const futureDate = new Date(futureDateString);

        // Get the current date and time
        const currentDate = new Date();

        // Calculate the difference in milliseconds
        const differenceMs = futureDate - currentDate;

        // Convert milliseconds to days and hours
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const daysRemaining = Math.floor(differenceMs / millisecondsPerDay);
        const hoursRemaining = Math.floor((differenceMs % millisecondsPerDay) / (1000 * 60 * 60));

        // Construct the result message
        let result = "";
        if (daysRemaining > 0) {
            result += `${daysRemaining} Day${daysRemaining === 1 ? '' : 's'}`;
        }

        if (hoursRemaining > 0) {
            result += ` ${hoursRemaining} Hour${hoursRemaining === 1 ? '' : 's'}`;
        }

        if (daysRemaining === 0 && hoursRemaining === 0) {
            result = "Less than an hour";
        }

        return result.trim();
    }

    const addToCart = async (user, item_id) => {

        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        const email = user.email

        if (email && item_id && isAuthenticated) {
            const saveCartItem = async (itemId, email) => {
                try {
                    const response = await axios.post('http://localhost:3000/crud/cart/item', {
                        item_id: itemId,
                        email: email,
                        quantity: 1
                    });
                    setShowAlert(true)
                    dispatch(fetchCartItemById({ email: email }));
                    return response.data;
                } catch (error) {
                    console.error('Error saving cart item:', error);
                    throw error;
                }
            };
            saveCartItem(item_id, email)
        }
    }

    const showingAlert = () => {
        if (showAlert) {
            return `left-3`
        } else {
            return `-left-96`
        }
    }

    return (
        <div className='flex flex-col'>
            <div className="w-full flex justify-center">
                <div className={`fixed top-3 ${showingAlert()} transition-all duration-500 z-50 bg-blue-300 sm:px-20 sm:py-2 px-10 py-1 text-lg rounded-md sm:text-xl`}>Item Added To Cart!</div>
            </div>
            <select className="filter bg-red-200 w-fit px-4 py-1 rounded-lg mt-6 flex self-end mr-4 hover:bg-slate-200 transition-all duration-500" value={selectedFilter} onChange={handleFilterChange}>
                <option value="priceHighToLow">Price: Highest to Lowest</option>
                <option value="priceLowToHigh">Price: Lowest to Highest</option>
                <option value="popularity">Popularity</option>
            </select>
            <div className='cardContainer max-w-[98.9vw] flex flex-wrap justify-center gap-x-3 gap-y-5 py-6'>
                {!categoryBasedItems ? <>Loading...</> : categoryBasedItems.slice(0, displayCount).map((item) => (
                    <div key={item._id} className="card min-h-96 min-w-40 max-w-[90%] bg-white rounded-xl shadow-lg flex-wrap relative">
                        {item.discountedPrice ? <div className='absolute right-2 top-2 text-2xl font-semibold text-white bg-black px-2 rounded-xl'>{item.discountedPrice} Rs</div> : <></>}
                        {item.discountedPrice ? <div className='absolute left-2 top-2 text-xl font-semibold text-white bg-black px-2 rounded-xl'>{timeUntilFutureDate(item.discountValidUntil)}</div> : <></>}
                        <img src={imageUrls[item._id]} className='image rounded-t-xl object-cover h-64 w-full' alt={item.name} />
                        <div className="lowerMain p-3">
                            <div className="firstLower">
                                <ul className='list flex items-center justify-between'>
                                    <li className='heading font-semibold'>{item.name}</li>
                                    <li className='p-2 hover:bg-slate-700 rounded-full transition-all duration-500 cursor-pointer'><img src={ShareImage} className='shareImage w-5' alt="Share" /></li>
                                </ul>
                            </div>
                            <div className="secondLower text-sm mt-3">{item.description}</div>
                            <div className="thirdLower mt-3">
                                <ul className='third font-semibold flex justify-between text-xs'>
                                    {item.discountedPrice ? <li className='line-through'>Price: ${item.price}</li> : <li>Price: ${item.price}</li>}
                                    <li>Reviews: {item.reviews}</li>
                                    <li className='flex justify-center items-center gap-x-2'>{item.rating} <img className='w-4 h-4' src={star}></img></li>
                                </ul>
                            </div>
                            <div className="forthLower flex justify-center mt-3">
                                <button className='orderNow cursor-pointer min-w-fit bg-red-500 px-6 mt-2 py-1 rounded-md text-white text-sm hover:bg-red-800 transition-all duration-500' onClick={() => { addToCart(user, item._id) }}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button className='viewMore bg-orange-400 text-white w-56 h-10 self-center text-lg rounded-lg mb-12 hover:bg-yellow-800 transition-all duration-500' onClick={handleViewMore}>View More...</button>
        </div>
    );
};

export default MenuCard;
