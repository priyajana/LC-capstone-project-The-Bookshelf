

import './Login.css';
import Custombutton from "../shared/Custombutton";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Login() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                // Optional: Delay before redirect
                setTimeout(() => {
                    navigate('/')
                }, 2000);  // 2-second delay

            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="login-container">

      <form onSubmit={handleSubmit}> 
       <div className="login-ctr">
       <h1>Login</h1>
       
            <label ><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required value={formData.email} onChange={handleChange}/>

            <label ><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required value={formData.password} onChange={handleChange}/>

            <div className='button_div'>
            <button className="loginbtn" type="submit">Login</button>
            <Link className="link-wrapper" key="back" to={`/`}><Custombutton className="cancelbtn"  buttonname="Cancel"/></Link>
             {message && <p style={{ color: 'green' }}>{message}</p>}
            </div>
          </div>
            
    
        </form> 
    </div>
)

}