from django.contrib import admin
from .models import Book, Review

# Register the Book model
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'isbn', 'published_date', 'genre') 
# Register the Review model
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('book', 'reviewer_name', 'rating', 'review_text', 'review_date')  