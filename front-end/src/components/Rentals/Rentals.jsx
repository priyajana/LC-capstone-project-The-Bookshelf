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
            const response = await fetch(`http://localhost:8080/rentals/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
               
                const data = await response.json();
                console.log("Fetched rentals:", data);

                return data.map(item => item.bookName); // Assuming bookName is the field you want
                
                
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



   function deleteBook(e){
        let name = e.target.value;
        let oldArray = JSON.parse(localStorage.getItem("rentals"))||[];
        let newArray = oldArray.filter((item)=>item!=name && item!=null);
       // console.log("New---->"+newArray);
       localStorage.setItem("rentals",JSON.stringify(newArray));
       //setRentals(newArray);
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
                                        Options
                                    </th>
                                    </tr>
                            </thead>
                            <tbody>
                            {
                                rentalBooks.map((item,index)=>( 
                                    <tr key={item}>
                                        <td>{index+1}.&nbsp;{item}</td>
                                        <td><Custombutton type="button" style={{padding:'5px'}} buttonname="delete" value = {item} onClick={deleteBook}/></td>
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