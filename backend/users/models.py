from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom user model for the Skill Swap application.
    Extends Django's AbstractUser to add additional fields.
    """
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    timezone = models.CharField(max_length=50, default='UTC')
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    streak_count = models.IntegerField(default=0)
    rating = models.FloatField(default=0.0)
    rank = models.CharField(max_length=50, default='Beginner')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location = models.CharField(max_length=100, blank=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users' 