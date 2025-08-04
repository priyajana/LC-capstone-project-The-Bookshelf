import React, { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {


   const [isValid, setIsValid] = useState(null);
  

  useEffect(() => {
    async function checkToken() {
        const token = localStorage.getItem('token');
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
       // console.log("Validating token:", token);
        const res = await fetch('http://localhost:8080/user/validate', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsValid(res.ok);
        if (!res.ok) {
          localStorage.clear();
        }
      } catch (error) {
        setIsValid(false);
        //console.error('Error validating token:', error);
        localStorage.clear();
        return error;
      }
    }
    checkToken();
  }, []);

  if (isValid === null) {
    return <div>Loading...</div>; // or a spinner while validation runs
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}