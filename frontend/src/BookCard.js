import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Box } from '@mui/material';

function BookCard({ title, author, rating }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={`https://via.placeholder.com/150?text=${title}`}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {author}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Rating name="read-only" value={rating} readOnly />
          <Typography variant="body2" sx={{ ml: 1 }}>{rating} / 5</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BookCard;
