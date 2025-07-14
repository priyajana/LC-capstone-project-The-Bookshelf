import book from '../../assets/icon-bookshelf.png';
import './About.css';

export default function About(){
    return(
    <div className="about-container">
        <h2>The BookShelf</h2>
            <p>Welcome to The Bookshelf <img src={book}/>  – your personal reading companion and the smart shelf for your literary life !</p>
            <p>At The Bookshelf, we believe that books have the power to inspire, connect, and transform. 
            Whether you're a passionate reader, a casual book lover, or someone rediscovering the joy of reading, our app is designed to make your reading journey more meaningful and organized.
            </p>
            <h2>Our Mission</h2>
            <p>To help readers explore, track, and share their reading experiences with ease – all in one beautifully designed space.</p>
            <h2>What We Offer</h2>
            <p>📚 Personalized Bookshelf – Organize your books by what you’ve read, what you’re reading, and what you want to read.</p>
            <p>♾️ Endless options – Access to books all around the world !</p> 
            <p>🤸 Own your book - Flexible rentals, complete control — rent any book and keep it for as long as you need !</p>
            <p>📱 Paperless - We’re committed to a paperless future — eBooks offer a smarter, more sustainable way to read.</p>
            <h2>Why We Built The Bookshelf</h2>

            <p>We were tired of juggling lists across apps, losing track of books we wanted to read, and missing out on thoughtful conversations around them.
             So we built The Bookshelf – a clean, intuitive app to bring all your reading needs together, whether you're flying solo or part of a book club.
            </p>
            <h2>Join Us</h2>

            <p>Thousands of readers are already building their dream bookshelf. Ready to take control of your reading life?</p>

            <p>Download the app. Start reading & Stay inspired !</p> 
    </div>
    )
}