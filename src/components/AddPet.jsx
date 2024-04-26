import React, { useState, useEffect } from 'react';
import '../style/Admin.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const AddPet = () => {
    const navigate = useNavigate();
    const [pInput, setPinput] = useState({
        name: '',
        img: '',
        price: '',
        description: '',
        category: '',
        age: '',
        breed: ''
    })
    const userId = useSelector((state) => state.rootReducer.userdata._id)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/addproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ name: pInput.name, img: pInput.img, price: pInput.price, description: pInput.description, category: pInput.category, age: pInput.age, breed: pInput.breed, userId })
        })
        const data = await res.text();
        alert(data);
        navigate('/mypets');
    }
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'name') {
            setPinput((oldVal) => {
                return {
                    name: value,
                    img: oldVal.img,
                    price: oldVal.price,
                    description: oldVal.description,
                    category: oldVal.category,
                    age: oldVal.age,
                    breed: oldVal.breed,
                }
            })
        }
        else if (name === 'price') {
            setPinput((oldVal) => {
                return {
                    name: oldVal.name,
                    img: oldVal.img,
                    price: value,
                    description: oldVal.description,
                    category: oldVal.category,
                    age: oldVal.age,
                    breed: oldVal.breed,
                }
            })
        }
        else if (name === 'description') {
            setPinput((oldVal) => {
                return {
                    name: oldVal.name,
                    img: oldVal.img,
                    price: oldVal.price,
                    description: value,
                    category: oldVal.category,
                    age: oldVal.age,
                    breed: oldVal.breed,
                }
            })
        }
        else if (name === 'category') {
            setPinput((oldVal) => {
                return {
                    name: oldVal.name,
                    img: oldVal.img,
                    price: oldVal.price,
                    description: oldVal.description,
                    category: value,
                    age: oldVal.age,
                    breed: oldVal.breed,
                }
            })
        }
        else if (name === 'age') {
            setPinput((oldVal) => {
                return {
                    name: oldVal.name,
                    img: oldVal.img,
                    price: oldVal.price,
                    description: oldVal.description,
                    category: oldVal.category,
                    age: value,
                    breed: oldVal.breed,
                }
            })
        }
        else if (name === 'breed') {
            setPinput((oldVal) => {
                return {
                    name: oldVal.name,
                    img: oldVal.img,
                    price: oldVal.price,
                    description: oldVal.description,
                    category: oldVal.category,
                    age: oldVal.age,
                    breed: value,
                }
            })
        }
    }
    const handleImageInput = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setPinput((oldVal) => {
                return {
                    name: oldVal.name,
                    img: reader.result,
                    price: oldVal.price,
                    description: oldVal.description,
                    category: oldVal.category
                }
            })
        }
        reader.onerror = error => {
            console.log("Error", error);
        }
    }
    useEffect(() => {
    }, [pInput])

    return (
        <div className='admin-page'>
            <h2>Add Pet</h2>
            <form onSubmit={handleSubmit}>
                <div className="inp-part">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name='name' className='admin-input' value={pInput.name} onChange={handleInputChange} />
                </div>
                <div className="inp-part">
                    <label htmlFor="img">Img:</label>
                    <input type="file" accept='image/*' id='image-input' name='img' className='admin-input' onChange={handleImageInput} />
                </div>
                <div className="inp-part">
                    <label htmlFor="price">Price:</label>
                    <input type="number" name='price' className='admin-input' value={pInput.price} onChange={handleInputChange} />
                </div>
                <div className="inp-part">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name='description' className='admin-input' value={pInput.description} onChange={handleInputChange} />
                </div>
                <div className="inp-part">
                    <label htmlFor="category">Category:</label>
                    <input type="text" name='category' className='admin-input' value={pInput.category} onChange={handleInputChange} />
                </div>
                <div className="inp-part">
                    <label htmlFor="age">Age:</label>
                    <input type="text" name='age' className='admin-input' value={pInput.age} onChange={handleInputChange} />
                </div>
                <div className="inp-part">
                    <label htmlFor="breed">Breed:</label>
                    <input type="text" name='breed' className='admin-input' value={pInput.breed} onChange={handleInputChange} />
                </div>
                <button type='submit' className='admin-btn'>Add</button>
            </form>
        </div>
    )
}
