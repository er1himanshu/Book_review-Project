from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BookViewSet, ReviewViewSet, UserRegisterView, UserLoginView

router = DefaultRouter()
router.register(r'books', BookViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),  
    path('register/', UserRegisterView.as_view(), name='register'),  
    path('login/', UserLoginView.as_view(), name='login'),  
]
