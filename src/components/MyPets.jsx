import React, { useEffect, useState } from 'react';
import '../style/MyPets.css'
import { PetCard } from './Card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const MyPets = () => {
    const [mypets, setMypets] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const userId = useSelector((state) => state.rootReducer.userdata);
    const navigate = useNavigate();

    const getMyPets = async () => {
        try {
            const res = await fetch(`http://localhost:5000/getmypets?userid=${userId._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const data = await res.json();
            setMypets(data);
        } catch (error) {
            console.error('Error fetching pets:', error);
        } finally {
            setLoading(false); // Set loading state to false regardless of success or failure
        }
    }

    useEffect(() => {
        if (!userId) return; // Skip the fetch request if userId is not available

        getMyPets();
    }, [userId]);
    return (
        <div className='pets-page'>
            <h2>My Pets</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="orders">
                    {mypets.length === 0 ? <div>No Pets yet</div> : mypets.map((val, index) => (
                        <PetCard name={val.name} img={val.img} desc={val.description} price={val.price} key={val._id} />)
                    )}
                </div>)}
            <button className='add-pet-btn' onClick={() => { navigate('/addpet') }}>Add Pet</button>
        </div>
    )
}
