export default function CustomMsg({message,customStyle}) {
    return (
        <div className="custom-message" style={customStyle}>
           <p>{message}</p>
        </div>
    );
}