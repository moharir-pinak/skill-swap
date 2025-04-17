from django.db import models
from django.conf import settings
from users.models import User

class Skill(models.Model):
    """
    Represents a skill that can be taught or learned.
    """
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class UserSkill(models.Model):
    """
    Represents a user's relationship with a skill (teaching or learning).
    """
    ROLE_CHOICES = [
        ('LEARNER', 'Learner'),
        ('TEACHER', 'Teacher'),
        ('BOTH', 'Both'),
    ]
    
    PROFICIENCY_CHOICES = [
        ('BEGINNER', 'Beginner'),
        ('INTERMEDIATE', 'Intermediate'),
        ('ADVANCED', 'Advanced'),
        ('EXPERT', 'Expert'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skills')
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name='user_skills')
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    proficiency_level = models.CharField(max_length=12, choices=PROFICIENCY_CHOICES)
    years_of_experience = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.skill.name} ({self.role})"

    class Meta:
        unique_together = ['user', 'skill']
        ordering = ['-created_at']

class Availability(models.Model):
    """
    Represents a user's availability for teaching or learning.
    """
    DAYS_OF_WEEK = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    day_of_week = models.IntegerField(choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_recurring = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'day_of_week', 'start_time', 'end_time']
        ordering = ['day_of_week', 'start_time']

    def __str__(self):
        return f"{self.user.username} - {self.get_day_of_week_display()} ({self.start_time} - {self.end_time})"

    def clean(self):
        from django.core.exceptions import ValidationError
        if self.start_time >= self.end_time:
            raise ValidationError("End time must be after start time") 