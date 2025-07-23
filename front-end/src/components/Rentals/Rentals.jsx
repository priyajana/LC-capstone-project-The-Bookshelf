import {  useState, useEffect } from "react";
import Custombutton from "../shared/Custombutton";
import  './../Rentals/Rentals.css';
import { Link } from "react-router-dom";

export default function Rentals() {

    
    const [rentalBooks, setRentalBooks] = useState([]);
    const userId = localStorage.getItem('userId');
    
    async function fetchRentals(userId)
  {
                
          try {
            const response = await fetch(`http://localhost:8080/rentals/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
               
                const data = await response.json();
                console.log("Fetched rentals:", data);

                return data.map(item => ({ id: item.id, bookName: item.bookName }));


            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }

  }
   useEffect(()=>{

       fetchRentals(userId).then(data=>{ 
        
        setRentalBooks(data);   
    });
        
   },[]);

const deleteRental = async (e) => {
    let rentalId = parseInt(e.target.value);
    console.log("Deleting rental:", rentalId);
    try {
        const response = await fetch(`http://localhost:8080/rentals/delete/${rentalId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            setRentalBooks(prevBooks => prevBooks.filter(book => book.id !== rentalId));
            console.log("Rental deleted successfully");
        } else {
            const errorData = await response.json();
            console.error('Error deleting rental:', errorData);
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
}

   return(
    <div className="rentals">
            <div className="rentalItems">
            {
                rentalBooks && rentalBooks.length > 0? 
                        <table className="rentals-table">
                            <thead>
                                <tr>
                                    <th >
                                        Book Name
                                    </th>
                                    <th>
                                        Review
                                    </th>
                                    <th>
                                        Options
                                    </th>
                                    </tr>
                            </thead>
                            <tbody>
                            {
                                rentalBooks.map((item,index)=>( 
                                    <tr key={item.id}>
                                        <td>{index+1}.&nbsp;{item.bookName}</td>
                                        
                                        <td style={{textAlign: 'center'}}><Link style={{color:'rgb(88, 17, 17)'}} to={`/review/${item.bookName}`}> Review</Link></td>
                                        <td style={{textAlign: 'center'}}><Custombutton type="button" customStyle={{margin:'10px'}} buttonname="delete" value = {item.id} onClick={deleteRental}/></td>
                                    </tr>
                                ))
                            } 
                            </tbody>     
                        </table>
                
                    :<h4>No rental books.</h4>
            }      
           <Link className="link-wrapper" key="back" to={`/`}>Back</Link>   
            </div>
    </div>
    )
}