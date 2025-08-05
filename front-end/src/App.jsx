import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css'

import Home from "./components/Home/Home";
import Footer from "./components/Footer";
import About from "./components/About/About";

import Header from "./components/Header";
import BookCard from "./components/Bookcard/BookCard";
import { useState,useEffect } from "react";
import Rentals from "./components/Rentals/Rentals";
import NewBookForm from "./components/Newbook/NewBookForm";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Review from "./components/Review/Review";
import PrivateRoute from "./components/shared/PrivateRoute";

const genres = ["Thriller", "Comedy", "Romance","Drama","Science","Dystopian","Psychology","Childrens"];
async function fetchBooks(subject, startIndex)
  {
                
        //https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=8
        //
        //https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=12
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&startIndex=${startIndex}&maxResults=12`)
         const data = await response.json();
         // console.log(response.status);
          return data;

  }

        
export default function App() {

  const [bookList, setBookList] = useState(null);
  const [startIndex,setStartIndex] = useState(0);
  const [rentalBooks,setRentals]= useState([]);

    
    useEffect(()=>
      {
        // Added for cases when the user clicks back button from the bookcard and navigates to the home page. this uses the local storage to save genre and fetch books based on its value.
      const savedGenre = localStorage.getItem('genre') || genres[0];
        fetchBooks(savedGenre,startIndex).then(data=>{ setBookList(data);});
       
             if(!localStorage.getItem("genre")){localStorage.setItem('genre', genres[0]);}
        
          }, [startIndex]);
     
   
          
    //bookList && console.log(bookList.items.length);

  return (
    <>
      
      <div className="App">
       
            <div className="page-layout">
              <Header/>
                       <Routes>
                              {/* Setting the path to display the Home component */}
                              <Route path="/" element={<Home bookList ={bookList} setBookList={setBookList} fetchBooks={fetchBooks} genres={genres} startIndex={startIndex} setStartIndex={setStartIndex}  />} />
                              <Route path="/genre/:genre" element={<Home bookList ={bookList} setBookList={setBookList} fetchBooks={fetchBooks} genres={genres}/> }/>
                              <Route path="/About" element={<About/>} />
                              <Route path="/rentals" element=
                                      {
                                        <PrivateRoute>
                                            <Rentals rentalBooks={rentalBooks} setRentals={setRentals} />

                                      </PrivateRoute>
                                      }/>
                              <Route path="/NewBookForm" element=
                                      {
                                        <PrivateRoute>
                                            <NewBookForm genres={genres} />
                                      </PrivateRoute>
                                      }/>
                                         
                              <Route path="/register" element={<Register/>} />
                              <Route path="/details/:id" element={<BookCard bookDetails={bookList} rentalBooks={rentalBooks} setRentals={setRentals}/>} />
                              <Route path="/review/:bookId" element=
                                      {
                                        <PrivateRoute>
                                          <Review bookDetails={bookList} />
                                      </PrivateRoute>
                                      }/>
                              <Route path="/login" element={<Login/>} />

                      </Routes>
                <Footer/>
            </div>
    
        
    
      </div>    
    </>
  )
}


