import React, { useState, useEffect } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

const AdminPanel = () => {
  const [transData, setTransData] = useState([]);
  const [latestData, setlatestData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let finalData = []
        const response = await axios.get('http://localhost:3000/get/order/details/admin');
        const newData = response.data.orderItemData.map(element => ({
          name: element.date,
          value: element.subTotal,
        }));

        // Reduce the data to sum the values by date
        const groupedData = newData.reduce((acc, item) => {
          if (!acc[item.name]) {
            acc[item.name] = 0;
          }
          acc[item.name] += item.value;
          return acc;
        }, {});

        // Convert the grouped data to an array of objects
        const result = Object.keys(groupedData).map(date => ({
          name: date,
          value: groupedData[date]
        }));

        setTransData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const dates = transData.map(item => {
      const [day, month, year] = item.name.split('/').map(Number);
      return [year, month, day, item.name, item.value];
    });

    setlatestData(dates)
  }, [transData]);

  return (
    <div className="admin-panel flex flex-col items-center bg-gray-200 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Sales Data</h1>
      <div className="chart-container w-full max-w-4xl h-80">
        <ResponsiveContainer>
          <BarChart data={transData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminPanel;
