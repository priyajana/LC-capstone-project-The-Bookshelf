export default function Custombutton({onClick, buttonname,value,type,customStyle,disabled}) {


    return(<>
        <button type={type} style={customStyle} disabled={disabled}className="custombutton" id="submitBtn" onClick={onClick} value={value} >{buttonname}</button>
    </>)
}