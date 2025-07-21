import { useState,useEffect } from "react";
import { Link } from "react-router-dom"

export default function Header(){
     const [menuOpen, setMenuOpen] = useState(false);

    const rentalList = JSON.parse(localStorage.getItem("rentals"));
    // Initialize from localStorage
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const interval = setInterval(() => {
            setIsLoggedIn(!!localStorage.getItem('token'));
        }, 500);  // check every 500ms

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rentals');

        setIsLoggedIn(false);       
    };


    return(
            <header className="header">
                
                    <ul className={`nav-links ${menuOpen? 'active':''}`}>
                        <li  key='home' ><Link className="headerlinks" to="/">Home</Link></li>
                        <li  key='about'><Link className="headerlinks" to="/About">About</Link></li>
                         
                        { isLoggedIn? (

                                <>
                                    <li key='newbook'><Link className="headerlinks"  to="/NewBookForm">Request a new book</Link></li>
                                    <li key="rentals"><Link className="mybooks"  to="/rentals">My Books ({rentalList? rentalList.length:0}) </Link></li>
                                    <li key="logout"><button className="mybooks" onClick={handleLogout}>Logout</button></li>
                               </>
                               )
                             : 
                        
                            (
                                <>
                                   <li  key="register" ><Link className="mybooks" to="/register">Register / Login</Link></li> 
                                    
                                </>
                            )
                         }
                        
                    </ul>
                    
                    
                    
                <div className="menu-toggle" onClick={() =>setMenuOpen(!menuOpen) }>
                        &#9776;
                </div>
            </header>
    )
}