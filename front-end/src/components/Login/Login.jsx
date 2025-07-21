

import './Login.css';
import Custombutton from "../shared/Custombutton";
import { Link } from "react-router-dom";
export default function Login() {

    
return (
  <div className = "login-container" >
 
      <form>     
       <div className="login-ctr">
       <h1>Login</h1>
       
            <label ><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required/>

            <label ><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required/>

            <div className='button_div'>
            <button className="loginbtn" type="submit">Login</button>
            <Link className="link-wrapper" key="back" to={`/`}><Custombutton className="cancelbtn"  buttonname="Cancel"/></Link>

            </div>
          </div>
            
    
        </form> 
    </div>
)

}