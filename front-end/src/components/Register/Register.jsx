


import { Link } from "react-router-dom";


import './Register.css';



export default function Register(){
   
   
    return(
   <div className="register-container">
   <form action="/action_page.php">
        <div className="reg_container">
            <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" id="email" required/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" id="psw" required/>

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="psw-repeat" id="psw-repeat" required/>
                
                    <button type="submit" class="registerbtn">Register</button>
              
                <div class="container signin">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
                </div>
        </form>
 </div>
    )
}