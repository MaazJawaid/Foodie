import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setFoodItems } from '../redux/foodItemsAllSlicer/foodItemsAllSlice';

const UploadFoodItem = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const foodItems = useSelector(state => state.food.items);
    const dispatch = useDispatch();

    const [deleted, setDeleted] = useState(false); // Flag to track deletion
    const fileInputRef = useRef(null);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [foodItem, setFoodItem] = useState({
        name: '',
        price: '',
        rating: '',
        reviews: '',
        description: '',
        type: '',
        onSale: false,
        discount: '',
        discountPeriod: '',
        discountedPrice: '',
        image: null,
        quantityType: '',
        quantityUnit: '',
        discountValidUntil: ''
    });

    const quantityUnits = {
        Plate: ['1 Plate', '2 Plates', '3 Plates'],
        Weight: ['0.5 Kg', '1 Kg', '2 Kg'],
        Litre: ['0.5 Litres', '1 Litre', '2 Litres', '3 Litres'],
        Units: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        Pizza: ['Pan', 'Small', 'Regular', 'Medium', 'Large', 'Extra Large']
    };

    useEffect(() => {
        // Search for the item in foodItems using the provided id
        const item = foodItems.foodItems.find(item => item._id === id);

        // If the item is found, set the state with its data
        if (item) {
            setFoodItem({
                ...item,
                image: null // Clear image data as we don't want to display it
            });
        }
    }, [id, foodItems]);

    async function deleteFoodItem(id) {
        try {
            const response = await fetch(`http://localhost:3000/crud/admin/deleteitem/food/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                    // You may need to include additional headers like authorization token if required
                }
            });

            if (!response.ok) {
                // Handle non-OK response
                throw new Error('Failed to delete food item');
            }

            // Parse the response JSON
            const data = await response.json();

            // Check if the response contains data
            if (!data) {
                throw new Error('Empty response received');
            }

            console.log(data.message); // Log success message
        } catch (error) {
            console.error('Error deleting food item:', error);
        }
    }

    // const handleChange = (e) => {
    //     const { name, value, type, checked, files } = e.target;
    //     const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    //     if (name === 'price' || name === 'discount') {
    //         const discountedPrice = calculateDiscountedPrice(
    //             name === 'price' ? value : foodItem.price,
    //             name === 'discount' ? value : foodItem.discount
    //         );

    //         setFoodItem({
    //             ...foodItem,
    //             [name]: newValue,
    //             discountedPrice,
    //         });
    //     } else {
    //         setFoodItem({
    //             ...foodItem,
    //             [name]: newValue,
    //         });
    //     }

    //     // Clear error messages when user starts typing
    //     if (name === 'name') {
    //         setNameError(false);
    //     } else if (name === 'description') {
    //         setDescriptionError(false);
    //     }
    // };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const newValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

        if (name === 'price' || name === 'discount') {
            const discountedPrice = calculateDiscountedPrice(
                name === 'price' ? value : foodItem.price,
                name === 'discount' ? value : foodItem.discount
            );

            setFoodItem({
                ...foodItem,
                [name]: newValue,
                discountedPrice,
            });
        } else if (name === 'onSale') {
            // Clear discountValidUntil if onSale is false
            const discountValidUntil = checked ? calculateDiscountValidUntil(foodItem.discountPeriod) : null;

            setFoodItem({
                ...foodItem,
                [name]: checked,
                discountValidUntil,
            });
        } else if (name === 'discountPeriod') {
            // Update discountValidUntil based on discountPeriod
            const discountValidUntil = foodItem.onSale ? calculateDiscountValidUntil(value) : null;

            setFoodItem({
                ...foodItem,
                [name]: value,
                discountValidUntil,
            });
        } else {
            setFoodItem({
                ...foodItem,
                [name]: newValue,
            });
        }

        // Clear error messages when user starts typing
        if (name === 'name') {
            setNameError(false);
        } else if (name === 'description') {
            setDescriptionError(false);
        }
    };

    const calculateDiscountValidUntil = (discountPeriod) => {
        if (!discountPeriod) return null;

        const currentDate = new Date();
        let discountValidUntil = new Date(currentDate);

        switch (discountPeriod) {
            case '1 week':
                discountValidUntil.setDate(discountValidUntil.getDate() + 7);
                break;
            case '2 weeks':
                discountValidUntil.setDate(discountValidUntil.getDate() + 14);
                break;
            case '3 weeks':
                discountValidUntil.setDate(discountValidUntil.getDate() + 21);
                break;
            case '1 month':
                discountValidUntil.setMonth(discountValidUntil.getMonth() + 1);
                break;
            case '2 months':
                discountValidUntil.setMonth(discountValidUntil.getMonth() + 2);
                break;
            case '3 months':
                discountValidUntil.setMonth(discountValidUntil.getMonth() + 3);
                break;
            case '6 months':
                discountValidUntil.setMonth(discountValidUntil.getMonth() + 6);
                break;
            case '1 year':
                discountValidUntil.setFullYear(discountValidUntil.getFullYear() + 1);
                break;
            default:
                break;
        }

        return discountValidUntil;
    };

    const calculateDiscountedPrice = (price, discount) => {
        if (price && discount) {
            const discountAmount = (price * discount) / 100;
            const discountedPrice = price - discountAmount;
            return discountedPrice.toFixed(0);
        }
        return '';
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/get/food/items/all');
            dispatch(setFoodItems(response.data));
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteNow = async () => {
        const foodItemIdToDelete = id;
        deleteFoodItem(foodItemIdToDelete);
        setDeleted(true); // Set deleted flag to true
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the item has been deleted
        if (deleted) {
            console.log("Item has been deleted. Form submission cancelled.");
            fetchData();
            navigate('/admin/editItem')
            return;
        }

        // Perform length checks and display error messages
        if (foodItem.name.length < 3 || foodItem.name.length > 50) {
            setNameError(true);
            return;
        }

        if (foodItem.description.length < 30 || foodItem.description.length > 255) {
            setDescriptionError(true);
            return;
        }

        try {
            // Compare the updated form data with fetched data
            const itemInRedux = foodItems.foodItems.find(item => item._id === id);
            const updatedFields = {};
            let hasChanges = false;
            for (const key in foodItem) {
                if (foodItem[key] !== itemInRedux[key]) {
                    updatedFields[key] = foodItem[key];
                    hasChanges = true;
                }
            }

            if (!hasChanges) {
                console.log('No changes made');
                return;
            }

            // Make API call to update the item
            const response = await axios.put(`http://localhost:3000/crud/admin/updateitem/food/${id}`, updatedFields);

            // Handle success response
            console.log('Response:', response.data);

            // Reset the state to empty or default values
            setFoodItem({
                name: '',
                price: '',
                rating: '',
                reviews: '',
                description: '',
                type: '',
                onSale: false,
                discount: '',
                discountPeriod: '',
                discountedPrice: '',
                image: null,
                quantityType: '', 
                quantityUnit: '',
                discountValidUntil: ''

            });

            // Reset the file input value
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            fetchData()
            navigate('/admin/editItem')

        } catch (error) {
            // Handle error
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className='page bg-white max-w-[98.2vw] min-h-screen flex items-center'>
            <div className="md:w-[850px] mx-auto bg-gray-200 rounded-md p-6 shadow-md form md:mt-10 h-fit">
                <div className="heading flex justify-between w-full items-center mb-4">
                    <h1 className="text-2xl font-bold">Update Food Item</h1>
                    <button onClick={() => { navigate('/admin/editItem') }} className="bg-red-400 text-white py-1 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Back</button>
                </div>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="firstSection flex gap-4">
                        <div className="mb-4 w-full">
                            <label htmlFor="name" className="block font-medium mb-1">Name:</label>
                            <input type="text" id="name" name="name" value={foodItem.name} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" required />
                            {nameError ? <div className='errors text-red-500'>Name must be between 3 and 50 characters</div> : <div></div>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block font-medium mb-1">Price:</label>
                            <input type="number" id="price" name="price" value={foodItem.price} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rating" className="block font-medium mb-1">Rating:</label>
                            <input type="number" id="rating" name="rating" value={foodItem.rating} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className="secondSection flex gap-4">
                        <div className="mb-4 w-full">
                            <label htmlFor="description" className="block font-medium mb-1">Description:</label>
                            <textarea id="description" name="description" value={foodItem.description} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" required></textarea>
                            {descriptionError ? <div className='errors text-red-500'>Description must be between 30 and 255 characters</div> : <div></div>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="reviews" className="block font-medium mb-1">Reviews:</label>
                            <input type="number" id="reviews" name="reviews" value={foodItem.reviews} onChange={handleChange} className="w-full px-3 py-2 border h-16 outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" required />
                        </div>
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className='w-full'>
                            <label htmlFor="type" className="block font-medium mb-1">Type:</label>
                            <select id="type" name="type" value={foodItem.type} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" required>
                                <option value="">Select food type</option>
                                <option value="fast food">Fast Food</option>
                                <option value="chinese">Chinese</option>
                                <option value="desi delights">Desi Delights</option>
                                <option value="desserts">Desserts</option>
                            </select>
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="quantityType" className="block font-medium mb-1">Quantity Type:</label>
                            <select id="quantityType" name="quantityType" value={foodItem.quantityType} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" required>
                                <option value="">Select Quantity Type</option>
                                <option value="Plate">Plate</option>
                                <option value="Weight">Weight</option>
                                <option value="Litre">Litre</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Units">Units</option>
                            </select>
                        </div>
                        {foodItem.quantityType && (
                            <div className="mb-4 w-full">
                                <label htmlFor="quantityUnit" className="block font-medium mb-1">Quantity Unit:</label>
                                <select id="quantityUnit" name="quantityUnit" value={foodItem.quantityUnit} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" required>
                                    <option value="">Select Quantity Unit</option>
                                    {quantityUnits[foodItem.quantityType].map((unit, index) => (
                                        <option key={index} value={unit}>{unit}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="thirdSection flex gap-4">
                        <div className="mb-4 min-w-fit">
                            <label htmlFor="onSale" className="block font-medium mb-1">On Sale:</label>
                            <input type="checkbox" id="onSale" name="onSale" checked={foodItem.onSale} onChange={handleChange} className="mr-2" />
                        </div>
                        {foodItem.onSale && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="discount" className="block font-medium mb-1">Discount (%):</label>
                                    <input type="number" id="discount" name="discount" value={foodItem.discount} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="discountPeriod" className="block font-medium mb-1">Discount Period:</label>
                                    <select id="discountPeriod" name="discountPeriod" value={foodItem.discountPeriod} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500">
                                        <option value="">Select discount period</option>
                                        <option value="1 week">1 week</option>
                                        <option value="2 weeks">2 weeks</option>
                                        <option value="3 weeks">3 weeks</option>
                                        <option value="1 month">1 month</option>
                                        <option value="2 months">2 months</option>
                                        <option value="3 months">3 months</option>
                                        <option value="6 months">6 months</option>
                                        <option value="1 year">1 year</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="discountedPrice" className="block font-medium mb-1">Discounted Price:</label>
                                    <input type="number" id="discountedPrice" name="discountedPrice" value={foodItem.discountedPrice} onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block font-medium mb-1">Select Image if you want to Update:</label>
                        <input type="file" id="image" ref={fileInputRef} name="image" accept="image/*" onChange={handleChange} className="w-full px-3 py-2 border outline-indigo-300 outline outline-1 rounded-md focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="lower flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
                        <button onClick={deleteNow} className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadFoodItem;
