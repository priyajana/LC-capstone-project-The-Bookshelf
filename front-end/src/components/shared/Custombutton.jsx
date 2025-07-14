export default function Custombutton({onClick, buttonname,value,type}){


    return(<>
        <button type={type} className="custombutton" id="submitBtn" onClick={onClick} value={value} >{buttonname}</button>
    </>)
}