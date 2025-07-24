

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

 
    const [error, setError] = useState('');
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
               // console.log(data.user['id']);
                localStorage.setItem('userId',data.user['id']);
                localStorage.setItem('userName',data.user['name']);
                // Optional: Delay before redirect
                setTimeout(() => {
                    navigate('/')
                }); 

            } else if (response.status === 401) {
                const errorData = await response.text();
                setError(errorData.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError('An error occurred while logging in.');
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
             
             {error && <span style={{ color: 'red',fontSize: '15px' }}>{error}</span>}
            </div>
          </div>
            
    
        </form> 
    </div>
)

}