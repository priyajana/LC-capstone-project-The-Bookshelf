/**
 * REFERENCES
 * https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
 */

import { useState } from "react"
import './Bookcard.css';
import { Link, useParams } from "react-router-dom";
import dummy from '../../assets/book.png';
import Custombutton from "../shared/Custombutton";


export default function BookCard({bookDetails}){

    const {id} = useParams();
    //console.log(id);
    
    //const original_genre = localStorage.getItem('genre');
   // console.log("Genre selected was---->"+original_genre);

    const[rentConfirm, setrentConfirm] = useState(false);
     const [message, setMessage] = useState('');
    const targetBook = bookDetails.items.filter((book)=>book.id===id);
   // const [message, setMessage] = useState('');
   //   {message && <p style={{color:"red",fontSize:"12px"}}>{message}</p>}
   //console.log(targetBook? targetBook[0].volumeInfo.title:'');

    const rentBook = async () => {
    
        const bookTitle = targetBook[0].volumeInfo.title;
       
        const userId = localStorage.getItem('userId');
        if (!userId) {
            setMessage("Please log in to rent a book.");
            return;
        }
        const bookData = {
            bookName: bookTitle,
            user: {"id": parseInt(userId)}
        };
        try {
            const response = await fetch('http://localhost:8080/rentals/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(bookData)
            });

            if (response.ok) {
               
                console.log("Book added to rentals successfully");
                setrentConfirm(true);
                
                
            } else if(response.status === 409) {
                const errorData = await response.text();
                setMessage(errorData || "Book already rented");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return(
        <div className="book-card">
         { !rentConfirm && 
            
                <div className="book-details">

                <h3>Book Details</h3>
                {targetBook[0].volumeInfo.imageLinks?
                  <img src={targetBook[0].volumeInfo.imageLinks.thumbnail} alt={targetBook[0].volumeInfo.title} title={targetBook[0].volumeInfo.title}/>:
                  <img src={dummy} alt={targetBook[0].volumeInfo.title} title={targetBook[0].volumeInfo.title}/>
                }
                <h4>Name : {targetBook? targetBook[0].volumeInfo.title:''} </h4>

                <h4>Author: {targetBook? targetBook[0].volumeInfo.authors:''}</h4>

                <h4>Year Published: {targetBook? targetBook[0].volumeInfo.publishedDate:''}</h4>

                <h4>Genre: {targetBook? targetBook[0].volumeInfo.categories[0]:''} </h4>

                <div className="rentorback">
                    <Custombutton onClick={rentBook} type="button" buttonname="Rent"/>
                    
                    <Link className="link-wrapper" key="back" to={`/`}><Custombutton buttonname="Back"/></Link><br/>
                    <p>{message && <span style={{color:"red",fontSize:"12px"}}>{message}</span>}</p>
                </div>
               </div> 

        }
        {rentConfirm &&
            <div className="rent-confirm">
            <h4>Book Added to your rentals!</h4>
            <Link className="link-wrapper" key="back" to={`/`}><span className="book-link">Back </span> </Link>
            </div>
        }
           
        </div>
    )
}