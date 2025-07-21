


import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.css';



export default function Register(){
   
    const navigate = useNavigate();
   const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeat_password: ''
  });

   const [message, setMessage] = useState('');
   const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  function validateForm(data){
        const errors = {};

        if (!data.username.trim()) {
            errors.username = 'Username is required';
        } else if (data.username.length < 4) {
            errors.username = 'Username must be at least 4 characters long';
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (!data.password) {
            errors.password = 'Password is required';
        } 

        if (!data.repeat_password) {
            errors.repeat_password = 'Repeat Password is required';
        }

        return errors;
    }
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
        const errorList = Object.values(errors).join(' | ');
      setMessage(errorList);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('User registered successfully!');
        setFormData({ username: '', email: '', password: '', repeat_password: '' });

        // Optionally, redirect to login page or clear form
         // Optional: Delay before redirect
        setTimeout(() => {
          navigate('/login');   // Redirect to login page
        }, 2000);  // 2-second delay to show message
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

    return(
   <div className="register-container">
   <form onSubmit={handleSubmit}>
        <div className="reg_container">
            <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    
                    <label><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="username" id="username" value={formData.username} onChange={handleChange} required/>

                    <label ><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" value={formData.email} onChange={handleChange} required/>

                    <label ><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="psw" value={formData.password} onChange={handleChange} required/>

                    <label ><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="repeat_password" id="psw-repeat" value={formData.repeat_password} onChange={handleChange} required/>

                    <button type="submit" className="registerbtn">Register</button>
                    {message && <p style={{ color: 'green' }}>{message}</p>}
                <div className="container signin">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
                </div>
        </form>
        
 </div>
    )
}