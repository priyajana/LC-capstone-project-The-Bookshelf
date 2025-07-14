import { useState } from "react";
import Custombutton from "../shared/Custombutton";
import './../Newbook/Newbook.css';
import { Link } from "react-router-dom";


/**
 * 
 * REFERENCES
 * https://www.geeksforgeeks.org/how-to-perform-form-validation-in-react/
 */
export default function NewBookForm({genres}){

    const [formData, setFormData] = useState({
         name: "",
        email: "",
        author:"",
        bookname:""
    });
    const [errors, setErrors] = useState({});
    
    const[success,setsuccess] =useState(false);
  
    function handleChange(e){
         const { name, value } = e.target; 
          setFormData((prevData) => ({
                ...prevData,
                 [name]: value, // Update only the field that matches the input's name
                }));
       
        
     }
    function validateForm(data){
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Username is required';
        } else if (data.name.length < 4) {
            errors.name = 'Username must be at least 4 characters long';
        }

        if (!data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Email is invalid';
        }

        if (!data.bookname) {
            errors.password = 'Bookname is required';
        } 

        if (!data.author) {
            errors.author = 'Author name is required';
        }

        return errors;
    }
    function handleSubmit(e){
        e.preventDefault();
        const newErrors = validateForm(formData);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setsuccess(true);
           // console.log('Form submitted successfully!');
        } else {
           // console.log('Form submission failed due to validation errors.');
        }
    }

    function changeSuccess(){
        setsuccess(false);
    }
    return(
       
        <div className="new-book-container">
             {!success && 
            <form action="/submit" onSubmit={handleSubmit} method="post" className="newbookform">
               <fieldset className="contact">
                        <h3>Book not found? &nbsp;Send us a request!</h3>        
                       
                        <label >Your Name:</label>
                        <input type="text" id="name" name="name" onChange={handleChange}  placeholder="Enter your name" required/>
                        {errors.name && (
                        <span className="error-message">
                            {errors.name}
                        </span>
                        )}
                    
                        <label >Your Email:</label>
                        <input type="email" id="email" name="email" onChange={handleChange}  placeholder="Enter your email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required />

                        

                        <label >Name of the book:</label>
                        <input type="text" id="bookname" name="bookname" onChange={handleChange}  placeholder="Enter the book name" required/>
                        {errors.bookname && (
                        <span className="error-message">
                            {errors.bookname}
                        </span>
                        )}
                        

                        <label >Author Name:</label>
                        <input type="text" id="author" name="author" onChange={handleChange}  placeholder="Enter author name" required/>
                        {errors.author && (
                        <span className="error-message">
                            {errors.author}
                        </span>
                        )}

                        <label>What genre is it?</label>

                        <select name="genre" id="genre">
                                {genres.map((genre,index)=>(<option key={index} name={genre} value={genre}>{genre}</option>))}
                        </select>
                        <label >Genre different?</label>
                        <input type="text" id="diffgenre" name="diffgenre" placeholder="Enter the genre" />
                        <Custombutton buttonname={"Submit"} type={"submit"}/>
                        
                        
                </fieldset>
            </form>
            }
             {
                    success && 
                    <div className="success">
                        <span>Thank you for the request !</span>
                        <Link className="link-wrapper" key="back" to={"/NewBookForm"} onClick={changeSuccess}><span className="book-link">Back </span> </Link>
                     </div>
                    
                    
            }
            
         </div>
    )
}