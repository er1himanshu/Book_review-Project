from django.db import models
from django.core.exceptions import ValidationError
from django.db.models import Avg

class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=2, unique=True)  
    published_date = models.DateField()
    genre = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    def clean(self):
        if len(self.isbn) > 2:
            raise ValidationError('ISBN must be a maximum of 2 characters long')

    @property
    def average_rating(self):
        """Calculate the average rating for the book."""
        return self.reviews.aggregate(Avg('rating'))['rating__avg'] or 0 

class Review(models.Model):
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE)
    reviewer_name = models.CharField(max_length=255)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    review_text = models.TextField()
    review_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.reviewer_name

    def clean(self):
        if self.rating < 1 or self.rating > 5:
            raise ValidationError('Rating must be between 1 and 5')
