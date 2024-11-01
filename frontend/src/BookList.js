import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchBooks = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/books/?page=${page}`);
            console.log('Fetched books:', response.data); // Log the fetched data

            const newBooks = response.data.results;

            setBooks(prevBooks => [
                ...prevBooks,
                ...newBooks.filter(newBook => !prevBooks.some(prevBook => prevBook.id === newBook.id)),
            ]);

            // Check if there are more pages available
            setHasMore(response.data.next !== null);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }, [page]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const loadMoreBooks = () => {
        if (hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    };

    return (
        <div>
            <h2>Book List</h2>
            <ul className="book-list">
                {books.map(book => (
                    <li key={book.id} className="book-item">
                        <Link to={`/books/${book.id}`} className="book-link">
                            <strong>{book.title}</strong>
                        </Link>
                        <p className="book-info">
                            by {book.author} | ISBN: {book.isbn} | Genre: {book.genre} | Published: {book.published_date}
                        </p>
                    </li>
                ))}
            </ul>
            {hasMore && (
                <button onClick={loadMoreBooks} className="load-more">
                    Load More
                </button>
            )}
        </div>
    );
};

export default BookList;
