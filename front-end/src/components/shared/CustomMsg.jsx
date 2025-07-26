export default function CustomMsg({message,customStyle}) {
    return (
        <div  style={customStyle}>
           <p className="custom-message">{message}</p>
        </div>
    );
}