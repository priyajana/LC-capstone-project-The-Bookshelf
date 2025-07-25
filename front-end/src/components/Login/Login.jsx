

import './Login.css';
import Custombutton from "../shared/Custombutton";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomMsg    from '../shared/CustomMsg';

// This component handles the login functionality for the application
// It allows users to enter their email and password, validates the input, and submits the data
export default function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });


    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Function to validate form data
    // This function checks if the form data meets the required criteria
    function validateForm(data){
        const errors = {};

      
        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

       
        if (!data.password) {
            errors.password = 'Password is required';
        }

        return errors;
    }
        
    // Function to handle form submission
    // This function will be called when the form is submitted
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
               
                const data = await response.json();
                localStorage.setItem('token', data.token); 
               // console.log(data.user['id']);
                localStorage.setItem('userId',data.user['id']);
                localStorage.setItem('userName',data.user['name']);
                // Optional: Delay before redirect
                setTimeout(() => {
                    navigate('/')
                }); 

            } else if (response.status === 401) {
                const errorData = await response.text();
                // Handle unauthorized access
                setErrors({server: errorData.message || 'Invalid email or password' });
            }
        } catch (error) {
            console.error('Error:', error.message);
            setErrors({ ...errors, server: 'An error occurred while logging in.' });
        }
    }
    };

    return (
        <div className="login-container">

      <form onSubmit={handleSubmit}> 
       <div className="login-ctr">
       <h1>Login</h1>
       
            <label ><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email"  onChange={handleChange} required/>
            {errors.email && (
                        <CustomMsg className="error-message" message={errors.email} customStyle={{ color: 'red' }} />
                        )}
            
            <label ><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password"   onChange={handleChange} required/>
             {errors.password && (
                        <CustomMsg className="error-message" message={errors.password} customStyle={{ color: 'red' }} />
                        )}
            <div className='button_div'>
            <button className="loginbtn" type="submit">Login</button>
            <Link className="link-wrapper" key="back" to={`/`}><Custombutton className="cancelbtn"  buttonname="Cancel"/></Link>
             <CustomMsg message={errors.server} customStyle={{ color: 'red' }} />
            </div>
          </div>
            
    
        </form> 
    </div>
)

}