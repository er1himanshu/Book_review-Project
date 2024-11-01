import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Rating, Typography, Alert } from '@mui/material';

const ReviewForm = ({ bookId, onReviewSubmitted }) => {
    const [reviewerName, setReviewerName] = useState('');
    const [rating, setRating] = useState(1); // Default rating
    const [reviewText, setReviewText] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState(''); // State for confirmation message
    const [isSuccess, setIsSuccess] = useState(null); // To track success or failure

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/reviews/`, {
                book: bookId,
                reviewer_name: reviewerName,
                rating,
                review_text: reviewText,
            });
            console.log('Review submitted:', response.data);
            onReviewSubmitted(); // Callback to refresh reviews
            setIsSuccess(true); // Set success state
            setConfirmationMessage('Review submitted successfully!'); // Set confirmation message
            // Clear the form after submission
            setReviewerName('');
            setReviewText('');
            setRating(1);
        } catch (error) {
            console.error('Error submitting review:', error);
            setIsSuccess(false); // Set failure state
            setConfirmationMessage('Failed to submit review. Please try again.'); // Set error message
        }
    };

    return (
        <Box 
            component="form" 
            onSubmit={handleSubmit} 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2, 
                mt: 3, 
                width: '100%' 
            }}
        >
            <Typography variant="h5" gutterBottom>
                Submit Your Review
            </Typography>
            
            {/* Reviewer Name Input */}
            <TextField
                label="Reviewer Name"
                variant="outlined"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
                fullWidth
            />

            {/* Rating Input */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography component="legend">Rating:</Typography>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                    precision={1}
                />
            </Box>

            {/* Review Text Input */}
            <TextField
                label="Review"
                variant="outlined"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                multiline
                rows={4}
                required
                fullWidth
            />

            {/* Submit Button */}
            <Button variant="contained" color="primary" type="submit" fullWidth>
                Submit Review
            </Button>

            {/* Confirmation Message */}
            {confirmationMessage && (
                <Alert severity={isSuccess ? 'success' : 'error'} sx={{ mt: 2 }}>
                    {confirmationMessage}
                </Alert>
            )}
        </Box>
    );
};

export default ReviewForm;
