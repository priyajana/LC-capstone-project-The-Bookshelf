import React from 'react';
import './ratings.css';

// Ratings component to display star ratings
// This component can be used to allow users to rate a book or item

export default function Ratings({rating, onRatingChange,isEditing }) {

 
  const handleRatingChange = (event) => {
    const newRating = Number(event.target.value);
    
    onRatingChange(newRating);
  };
  return (
    <div className="rating">
   
    <input id="star-5" type="radio" name="rating" value="5"  checked={rating === 5} onChange={handleRatingChange} disabled={!isEditing} readOnly={!isEditing}/>
            <label htmlFor="star-5">★</label>
            <input id="star-4" type="radio" name="rating"  checked={rating === 4} value="4" onChange={handleRatingChange} disabled={!isEditing} readOnly={!isEditing}/>
            <label htmlFor="star-4">★</label>
            <input id="star-3" type="radio" name="rating" value="3"  checked={rating === 3} onChange={handleRatingChange} disabled={!isEditing} readOnly={!isEditing}/>
            <label htmlFor="star-3">★</label>
            <input id="star-2" type="radio" name="rating" value="2"  checked={rating === 2} onChange={handleRatingChange} disabled={!isEditing} readOnly={!isEditing}/>
            <label htmlFor="star-2">★</label>
            <input id="star-1" type="radio" name="rating" value="1"  checked={rating === 1} onChange={handleRatingChange} disabled={!isEditing} readOnly={!isEditing}/>
            <label htmlFor="star-1">★</label>
    </div>
  );
}