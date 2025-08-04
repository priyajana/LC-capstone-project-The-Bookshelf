/**
 * REFERENCES
 * https://stackoverflow.com/questions/69176120/div-appear-and-disappear-onclick-in-react-js
 * https://stackoverflow.com/questions/41233176/how-to-limit-text-of-span
 * https://stackoverflow.com/questions/6085354/pass-lots-of-data-from-a-single-anchor-tag
 */


import { Link } from "react-router-dom";
import dummy from '../../assets/book.png';

import './Home.css';
import {  useEffect, useState } from "react";


export default function Home({bookList,setBookList,fetchBooks,genres, startIndex,setStartIndex}){
   
   //console.log("Start index===",startIndex);

 
    // using state to keep track of genre selection
    const [selectedGenre,setGenre] =  useState(localStorage.getItem('genre',''));
    

     
    // The below useeffect is for updating the page with new list of books as the user clicks on page or changes genre.
    // This useeffect will get triggered each time there is change to the genre or startindex state variable.
    
   useEffect(()=>
         {
           
           const savedGenre = selectedGenre || localStorage.getItem('genre') || genres[0];
           //console.log({startIndex});
           fetchBooks(savedGenre,startIndex).then(data=>{ setBookList(data);});
           
         if(!localStorage.getItem("genre")){localStorage.setItem('genre', genres[0]);}
       },[selectedGenre,startIndex]);
       
    

    // To set the selected genre and fetchbooks
    function handleChange(e)
    {
      
        let new_genre = e.target.value;
        // let index = 0;
        setGenre(new_genre);
        setStartIndex(0);
        localStorage.setItem('genre',new_genre);
       // console.log("Genre Changed"+localStorage.getItem('genre'));
        //fetchBooks(new_genre,index).then(data=>{ return setBookList(data);});      
        
    }

    function changePage(e){
        let index =  e.target.getAttribute('data-index');
        //console.log("click page---->"+index);
        setStartIndex(index);
       // fetchBooks(selectedGenre,index).then(data=>{ return setBookList(data);}); 
    }
    return(
    <div className ="home-container">
        <div className="genre-div">
            <label>Select a genre to list books:
                    <span>
                            <select onChange={handleChange} value={selectedGenre}>
                                    
                                        {genres.map((genre)=>(<option key={genre} value={genre}>{genre}</option>))}
                                
                            </select>
                    </span>
            </label>
          </div>
          <div className="books-parent">

           { 
            bookList && bookList.items.map((book,index)=>{
                //console.log(book.id);
                return <div className="book-child" key={index}>
                        <Link className="link-wrapper" to={`/details/${book.id}`}>
                                { 
                                    
                                    book.volumeInfo.imageLinks?
                                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} title={book.volumeInfo.title}/>:
                                    <img src={dummy} alt={book.volumeInfo.title} title={book.volumeInfo.title}/>
                                    
                                }
                                
                                <span className="book-link">{book.volumeInfo.title} </span>   
                            </Link>
                    </div>
                    })
           }
            {   
           <div className="pagination">
           <a href="#" onClick={changePage} data-index="0">1</a>
           <a href="#" onClick={changePage} data-index="1">2</a>  
           <a href="#" onClick={changePage} data-index="2">3</a>  
           <a href="#" onClick={changePage} data-index="3">4</a>  
           <a href="#" onClick={changePage} data-index="4">5</a>                     
           </div>     
            }
          </div>
    </div>
    )
}