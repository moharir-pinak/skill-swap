from django.urls import path
from .views import (
    UserProfileView,
    UserListView,
    RegisterView,
)

app_name = 'users'

urlpatterns = [
    # User profile endpoints
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('list/', UserListView.as_view(), name='user-list'),
    path('register/', RegisterView.as_view(), name='register'),
] 