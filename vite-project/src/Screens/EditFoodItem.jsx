import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFoodItems } from '../redux/foodItemsAllSlicer/foodItemsAllSlice.js';
import { useNavigate } from 'react-router-dom';

const EditFoodItem = () => {
    const navigate = useNavigate();
    const [filteredItems, setFilteredItems] = useState([]);
    const dispatch = useDispatch();
    const foodItems = useSelector(state => state.food.items);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchFoodItems()).then(() => setLoading(false));
    }, [dispatch]);

    const [filters, setFilters] = useState({
        type: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'newest' // default value
    });

    const handleSortChange = (e) => {
        const { value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            sortBy: value
        }));
    };

    const handleMinPriceChange = (e) => {
        const { value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            minPrice: value
        }));
    };

    const handleMaxPriceChange = (e) => {
        const { value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            maxPrice: value
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Filter foodItems based on the filters object
        const filtered = foodItems.foodItems.filter(item => {
            // Filter by type
            if (filters.type && item.type !== filters.type) {
                return false;
            }

            // Filter by price range
            if (filters.minPrice && item.price < filters.minPrice) {
                return false;
            }
            if (filters.maxPrice && item.price > filters.maxPrice) {
                return false;
            }

            return true; // Include the item in the filtered list
        });

        // Sort the filtered items based on sortBy
        if (filters.sortBy === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (filters.sortBy === 'oldest') {
            filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        // Update the filteredItems state
        setFilteredItems(filtered);
    };

    const handleReset = () => {
        setFilters({
            type: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'newest'
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Determine whether to show filtered items or original food items
    const itemsToDisplay = filteredItems.length > 0 ? filteredItems : foodItems.foodItems;


    return (
        <div className='page bg-gray-200 flex justify-center items-center w-full sm:h-[92vh] h-[100vh] mt-8 sm:mt-0'>
            <div className='right bg-white w-full sm:w-4/5 h-4/5 -mt-10 rounded-xl flex shadow-xl'>
                <form className="innerLeft sm:w-1/4 w-2/5 bg-blue-200 rounded-s-xl flex flex-col">
                    <div className="mb-3 w-full p-4 flex flex-col gap-4">
                        <div className="foodType flex flex-col gap-2">
                            <label htmlFor="type" className="block font-medium mb-1 sm:text-base text-xs">Type:</label>
                            <select id="type" name="type" value={filters.type} onChange={handleInputChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500 sm:text-base text-xs" required>
                                <option value="" className='typeInfo sm:text-base text-xs'>Select</option>
                                <option value="fast food" className='typeInfo sm:text-base text-xs'>Fast Food</option>
                                <option value="chinese" className='typeInfo sm:text-base text-xs'>Chinese</option>
                                <option value="desi delights" className='typeInfo sm:text-base text-xs'>Desi Delights</option>
                                <option value="desserts" className='typeInfo sm:text-base text-xs'>Desserts</option>
                            </select>
                        </div>
                    </div>
                    <label htmlFor="type" className="block font-medium sm:text-base text-xs ml-3">Type:</label>
                    <div className="mb-3 flex flex-col md:flex-row p-4">
                        <input type="number" style={{ fontSize: '0.75rem' }} value={filters.minPrice} onChange={handleMinPriceChange} placeholder="Min Price" className="border border-gray-300 rounded-md sm:text-base text-xs py-2 px-4 mb-2 md:mb-0 md:mr-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                        <span className="mx-2 md:hidden self-center">-</span>
                        <input type="number" style={{ fontSize: '0.75rem' }} placeholder="Max Price" value={filters.maxPrice} onChange={handleMaxPriceChange} className="border border-gray-300 rounded-md sm:text-base text-xs py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <label htmlFor="type" className="block font-medium sm:text-base text-xs ml-3">Date Based:</label>
                    <div className="mb-3 flex flex-col md:flex-row p-3">
                        <select id="sort" value={filters.sortBy} onChange={handleSortChange} className="border border-gray-300 rounded-md sm:text-base text-xs py-2 px-4 mb-2 md:mb-0 md:mr-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="bg-blue-500 w-11/12 self-center mt-7 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 sm:text-base text-xs">Submit</button>
                    <button onClick={handleReset} className="bg-green-500 w-11/12 self-center mt-12 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 sm:text-base text-xs">Reset Filters</button>
                </form>
                <div className="innerRight w-3/4 flex flex-col items-center justify-center">
                    <div className="foodContainer w-11/12 h-[90%] bg-gray-200 rounded-xl shadow-xl">
                        <div className="bg-gray-100 z-10 rounded-xl">
                            <div className="container mx-auto">
                                <div className="flex flex-wrap justify-center h-[495px] sm:h-[395px] rounded-xl overflow-auto">
                                    <div className="flex flex-wrap justify-center" >
                                        {itemsToDisplay.map(food => (
                                            <div key={food._id} className="max-w-72 bg-white shadow-lg rounded-lg overflow-hidden m-4" onClick={() => navigate(`/admin/editItem/inprogress/${food._id}`)}>
                                                <img className="w-full h-44 object-cover object-center" src={food.imageUrl ? `http://localhost:3000/images/${food.imageUrl.split('\\').pop()}` : ''} alt={food.name} />
                                                <div className="p-4">
                                                    <h2 className="font-semibold text-gray-800 text-lg mb-2">{food.name}</h2>
                                                    <p className="text-gray-600 text-sm mb-2">{food.description}</p>
                                                    <div className="flex justify-between items-center">
                                                        <p className="text-gray-700 font-bold">{food.type}</p>
                                                        <p className={`text-sm ${food.onSale ? 'text-green-500' : 'text-gray-700'}`}>
                                                            {food.onSale ? `On Sale: ${food.discountedPrice} (was ${food.price})` : `$${food.price}`}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between items-center mt-2">
                                                        <p className="text-gray-700">Rating: {food.rating}</p>
                                                        <p className="text-gray-700">Reviews: {food.reviews}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditFoodItem
