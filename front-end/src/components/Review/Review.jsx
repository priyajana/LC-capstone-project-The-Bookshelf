import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Custombutton from "../shared/Custombutton";
import { Link } from "react-router-dom";
import './Review.css';
export default function Review({bookDetails}) {
    const {bookName} = useParams();
    const [message, setMessage] = useState("");
    const targetBook = bookDetails.items.filter((book)=>book.volumeInfo.title===bookName);
    const [reviewId, setReviewId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const[initialContent, setInitialContent] = useState("");
    const [content, setContent] = useState(initialContent);

    const handleEditClick = () => setIsEditing(true);
    const handleCancelClick = () => {
    setIsEditing(false);
    setContent(initialContent); // reset to original if cancelled
  };

  const userId = localStorage.getItem('userId');

  async function fetchReview(userId, bookName) {
    try {
      const response = await fetch(`http://localhost:8080/reviews/${bookName}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
    
  useEffect(() => {
    fetchReview(userId, bookName).then(data => {
      if (data) {
         console.log("Fetched review:", data);
          setInitialContent(data.content);
          setContent(data.content);
          setReviewId(data.id);
      }
    }); 
  },[]);
    async function submitReview()
  {
        const userId = localStorage.getItem('userId');
        const reviewText = content.trim();
        
        // If reviewId is present, update the existing review; otherwise, create a new one

        const url = reviewId ? `http://localhost:8080/reviews/update/${reviewId}` : `http://localhost:8080/reviews/add`;  
        const method = reviewId ? 'PUT' : 'POST';
                   
        
          try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    user: { id: userId },
                    bookName: bookName,
                    content: reviewText
                })
            });

            if (response.ok) {
               
                const data = await response.json();
                console.log("Review added successfully:", data);
                 
                setIsEditing(false);
                setReviewId(data.id); // capture or confirm ID
                setInitialContent(reviewText); // update initial content
                setContent(reviewText); // update current content    
                setMessage(reviewId ? "Review updated!" : "Review added!");
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                setMessage("Failed to add review.");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("An error occurred.");
        }

  }

    return (
        <div className="review">
          <div className="reviewItems">
           <h3 className="review_title">Review for: <span className="review_text">{targetBook[0]?.volumeInfo.title}</span></h3>
           <p className="review_title">Author: <span className="review_text">{targetBook[0]?.volumeInfo.authors?.join(', ')}</span></p>
           <p className="review_title">Description: <span className="review_text">{targetBook[0]?.volumeInfo.description || "No description available."}</span></p>
           {
            
            
            isEditing ? (
                            <>
                              <textarea
                                placeholder="Write your review here..." rows="5" cols="50" value={content} onChange={(e) => setContent(e.target.value)}></textarea><br />
                              
                               <span><Custombutton id="reviewBtn"  type="submit"  buttonname="Submit Review" customStyle={{margin:'20px', width: '120px' }} onClick={submitReview} />    
                             <Custombutton buttonname="Cancel" onClick={handleCancelClick} /></span>
                              {message && <p>{message}</p>}
                            </>
                     ) : (
                       <>
        {
          content ? (
                          <>
                          <p className="review_title">My review:</p>
                            <span className="review_text">{content}</span>
                             <span><Custombutton buttonname="Edit" customStyle={{margin:'auto'}} onClick={handleEditClick} />
                            
                            <Link className="link-wrapper" key="back" to={`/rentals`}><Custombutton buttonname="Back" customStyle={{margin:'20px'}}/></Link></span>
                          </>
                        ) : (
                          <>
                            <p>No review yet.</p>
                            <Custombutton buttonname="Add Review" onClick={() => setIsEditing(true)} />
                             <Link className="link-wrapper" key="back" to={`/rentals`}><Custombutton buttonname="Back" customStyle={{margin:'20px'}}/></Link>
                          </>
         )
          }
  </>
    )
  
     }
</div>
        </div>
    );
}
