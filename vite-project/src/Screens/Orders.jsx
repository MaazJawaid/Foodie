import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Orders = () => {
  const user = useSelector(state => state.login.user)
  const [orders, setOrders] = useState([]);
  const [filterState, setFilterState] = useState('created');
  const [filterPrice, setFilterPrice] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        // Correct URL with query parameter
        const response = await axios.get('http://localhost:3000/get/order/details/user', {
          params: { email: user.email }
        });
        setOrders(response.data.orderItemData);
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, []);

  const filteredOrders = orders
    .filter(order => !filterState || order.state === filterState)
    .sort((a, b) => {
      if (filterPrice === 'up') return a.subTotal - b.subTotal;
      if (filterPrice === 'down') return b.subTotal - a.subTotal;
      return 0;
    });

  const getColor = (state) => {
    if (state === 'created') {
      return 'bg-[#ADD8E6]';
    } else if (state === 'fulfilled') {
      return 'bg-[#90EE90]';
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Orders</h1>

      <div className="flex flex-col md:flex-row justify-center mb-6 gap-4">
        <label className="flex flex-col">
          <span className="mb-1">Filter by State:</span>
          <select
            className="p-2 border rounded-md"
            value={filterState}
            onChange={e => setFilterState(e.target.value)}
          >
            <option value="">All</option>
            <option value="created">Created</option>
            <option value="fulfilled">Fulfilled</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Sort by Price:</span>
          <select
            className="p-2 border rounded-md"
            value={filterPrice}
            onChange={e => setFilterPrice(e.target.value)}
          >
            <option value="">None</option>
            <option value="up">Ascending</option>
            <option value="down">Descending</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOrders.map(order => (
          <div key={order._id} className={`${getColor(order.state)} p-6 rounded-lg shadow-md  hover:cursor-pointer hover:shadow-xl`}>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Time:</strong> {order.time}</p>
            <p><strong>State:</strong> {order.state}</p>
            <h4 className="font-bold mt-4">Order Items:</h4>
            <ul className="list-disc list-inside">
              {order.orderData.map(item => (
                <li key={item.item_id}>
                  {item.item_name} - Quantity: {item.itemQuantity}, Price: {item.itemPrice}
                </li>
              ))}
            </ul>
            <p className="font-bold mt-4">Subtotal: {order.subTotal}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
