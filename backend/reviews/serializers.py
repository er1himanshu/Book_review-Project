from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book, Review

# Book Serializer
class BookSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(read_only=True)  

    class Meta:
        model = Book
        fields = '__all__'  

# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password']) 
        user.save()
        return user
