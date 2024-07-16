/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { dish } from '../../../backend/models/dishModel';

const Dashboard = () => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      axios.get('http://localhost:5555/dishes')
      .then((response) => {
        setDishes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }, []);
    
    const handleToggle = (id, currentStatus) => {
        axios.put(`http://localhost:5555/dishes/${id}`, { isPublished: !currentStatus })
            .then((response) => {
                setDishes(dishes.map(dish => dish._id === id ? { ...dish, isPublished: !currentStatus } : dish));
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    return (
        <div className='p-4 bg-gradient-to-r from-slate-950 to-slate-900 font-serif'>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl my-8 mx-auto text-white'>Dish-Dashboard</h1>
            </div>
            {loading ? (
                <Spinner className='items-center'/>
            ) : (
                <table className='w-full border-separate border-spacing-4'>
                    <thead className='bg-orange-700 text-white text-2xl'>
                        <tr>
                            <th className = 'border border-orange-700 rounded'>Sno</th>
                            <th className = 'border border-orange-700 rounded'>Dish</th>
                            <th className = 'border border-orange-700 rounded max-md:hidden'>Image</th>
                            <th className = 'border border-orange-700 rounded'>Published</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dishes.map((dish, index) => (
                        <tr key = {dish._id} className = 'h-8'>
                            <td className='rounded-md text-center w-5 text-white text-2xl'>
                            {index+1}
                            </td>
                            <td className='rounded-md text-center w-80 text-white text-2xl'>
                            {dish.dishName}
                            </td>
                            <td className='text-center max-md:hidden w-32 h-32'>
                            <img src = {dish.imageUrl} alt={dish.dishName} className="w-32 h-32 object-cover mx-auto rounded"/>
                            </td>
                            <td className='text-center w-3 h-5'>
                                <label className="group relative flex items-center justify-between p-2 ">
                                <input type="checkbox" className="hover: cursor-pointer peer absolute left-1/2 h-full w-full -translate-x-1/2 appearance-none rounded-md"
                                        checked={dish.isPublished}
                                        onChange={() => handleToggle(dish._id, dish.isPublished)}/>
                                <span className="ml-auto mr-auto flex h-10 w-16 flex-shrink-0 items-center rounded-full bg-orange-300 p-1 duration-300 ease-in-out after:h-8 after:w-8 after:rounded-full after:bg-white after:shadow-md after:duration-300 group-hover:after:translate-x-1 peer-checked:bg-orange-700 peer-checked:after:translate-x-6"></span>
                                </label>
                            </td>
                        </tr>
            ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Dashboard