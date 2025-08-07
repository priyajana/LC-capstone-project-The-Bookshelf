


import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomMsg from '../shared/CustomMsg';

import './Register.css';

// This component handles the registration functionality for the application
// It allows users to enter their username, email, password, and repeat password, validates the input, and submits the data.

export default function Register(){
   
    const navigate = useNavigate();
   const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeat_password: ''
  });

   const [message, setMessage] = useState('');
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
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
        if (!data.repeat_password) {
            errors.repeat_password = 'Repeat Password is required';
        }
        else if (data.password !== data.repeat_password) {
            errors.repeat_password = 'Passwords do not match';
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
          // LOCAL URL->  http://localhost:8080/user/register
      const response = await fetch('https://ms87t1jqbe.execute-api.us-east-2.amazonaws.com/user/register', {
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
      }  else {
        
          const data = await response.json();
          setErrors({ server: data.message || 'Registration failed.' });
      }
    } catch (error) {
      //console.error('Error:', error);
      setErrors({ server: 'An error occurred during registration.' });
      return error;
    }
    }

    
  };

    return(
   <div className="register-container">
   <form onSubmit={handleSubmit}>
        <div className="reg_container">
            <h1>Registration</h1>
                    <p>Please fill in this form to create an account.</p>
                    
                    <label><b>Name</b></label>
                    <input type="text" placeholder="Enter Name" name="username" id="username" value={formData.username} onChange={handleChange} required/>
                    {errors.username && <CustomMsg message={errors.username} customStyle={{ color: 'red' }} />}

                    <label ><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" value={formData.email} onChange={handleChange} required/>
                    {errors.email && <CustomMsg message={errors.email} customStyle={{ color: 'red' }} />}

                    <label ><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="psw" value={formData.password} onChange={handleChange} required/>
                    {errors.password && <CustomMsg message={errors.password} customStyle={{ color: 'red' }} />}

                    <label ><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="repeat_password" id="psw-repeat" value={formData.repeat_password} onChange={handleChange} required/>
                    {errors.repeat_password && <CustomMsg message={errors.repeat_password} customStyle={{ color: 'red' }} />}

                    <button type="submit" className="registerbtn">Register</button>
                    {errors.server && <CustomMsg message={errors.server} customStyle={{ color: 'red' }} />}
                    {message && <CustomMsg message={message} customStyle={{ color: 'green' }} />}

                <div className="container signin">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
                </div>
        </form>
        
 </div>
    )
}