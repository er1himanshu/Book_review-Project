import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm'; // Import ReviewForm

const BookDetail = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]); // State to hold reviews

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookResponse = await axios.get(`http://127.0.0.1:8000/api/books/${id}/`);
                setBook(bookResponse.data);

                // Fetch reviews associated with this book
                const reviewsResponse = await axios.get(`http://127.0.0.1:8000/api/reviews/?book=${id}`);
                setReviews(reviewsResponse.data); // Ensure reviews are stored
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleReviewSubmitted = () => {
        // Refresh reviews after adding a new one
        axios.get(`http://127.0.0.1:8000/api/reviews/?book=${id}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('Error fetching updated reviews:', error);
            });
    };

    // Check if the book data is loaded
    if (!book) {
        return <div>Loading...</div>;
    }

    // Get the latest 2 reviews
    const latestReviews = reviews.slice(-2).reverse(); // Get last 2 reviews and reverse to display latest first

    return (
        <div>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Published Date:</strong> {book.published_date}</p>
            <p><strong>Average Rating:</strong> {book.average_rating.toFixed(2)} ⭐</p>
            <p><strong>Reviews:</strong></p>

            {/* Show the latest 2 reviews */}
            {latestReviews.length > 0 ? (
                <ul>
                    {latestReviews.map(review => (
                        <li key={review.id}>
                            <strong>{review.reviewer_name}</strong>: {review.review_text} (Rating: {review.rating})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>There are currently no reviews available for this book.</p>
            )}

            {/* Add Review Form */}
            <ReviewForm bookId={id} onReviewSubmitted={handleReviewSubmitted} />
        </div>
    );
};

export default BookDetail;
