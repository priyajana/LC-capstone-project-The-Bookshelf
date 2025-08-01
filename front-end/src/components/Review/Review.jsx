import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Custombutton from "../shared/Custombutton";
import { Link } from "react-router-dom";
import './Review.css';
import CustomMsg from "../shared/CustomMsg";
import Ratings from "../shared/Ratings";

export default function Review({ bookDetails }) {
    const {bookId} = useParams();
    const [message, setMessage] = useState("");

    const targetBook = bookDetails.items.filter((book) => book.id === bookId);
    const [reviewId, setReviewId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const[initialContent, setInitialContent] = useState("");
    const [content, setContent] = useState(initialContent);
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
   
    setRating(newRating);
  };

    const handleEditClick = () => {
        setIsEditing(true);
        setMessage(""); // clear message when editing starts
    };
    const handleCancelClick = () => {
    setIsEditing(false);
    setContent(initialContent); // reset to original if cancelled
  };

  const userId = localStorage.getItem('userId');

  async function fetchReview(userId, bookId) {
    try {
      const response = await fetch(`http://localhost:8080/reviews/${bookId}/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } 
       else if (response.status === 404) {
                return ;
            }
      else {
        const errorData = await response.json();
        console.error('Error getting reviews:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
    
  useEffect(() => {
    fetchReview(userId, targetBook[0]?.volumeInfo.title).then(data => {
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
                    bookName: targetBook[0]?.volumeInfo.title,
                    content: reviewText,
                    rating: rating
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
            } 
            else {
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
                                <p className="review_title">My Rating: </p><Ratings onRatingChange={handleRatingChange}/>
                              {/* <p>You selected: {rating} star{rating !== 1 ? 's' : ''}</p> */}
                               <span><Custombutton id="reviewBtn"  type="submit"  buttonname="Submit Review" customStyle={{margin:'20px', width: '120px' }} onClick={submitReview} />    
                                <Custombutton buttonname="Cancel" onClick={handleCancelClick} /></span>
                              <CustomMsg message={message} customStyle={{ color: 'green', padding: '10px' }} />
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
                             {message && <CustomMsg message={message} customStyle={{ color: 'green', padding: '10px' }} />}
                          </>
                        ) : (
                          <>
                            <p style={{ padding: '20px'}}>No review yet.</p>
                           <span><Custombutton buttonname="Add Review" onClick={() => setIsEditing(true)} />
                             <Link className="link-wrapper" key="back" to={`/rentals`}><Custombutton buttonname="Back" customStyle={{margin:'20px'}}/></Link></span> 
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
