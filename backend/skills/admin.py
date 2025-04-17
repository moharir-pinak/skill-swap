from django.contrib import admin
from .models import Skill, UserSkill, Availability

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'created_at')
    list_filter = ('category',)
    search_fields = ('name', 'description', 'category')
    ordering = ('name',)

@admin.register(UserSkill)
class UserSkillAdmin(admin.ModelAdmin):
    list_display = ('user', 'skill', 'role', 'proficiency_level', 'years_of_experience')
    list_filter = ('role', 'proficiency_level')
    search_fields = ('user__username', 'skill__name')
    ordering = ('-created_at',)

@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('user', 'day_of_week', 'start_time', 'end_time', 'is_recurring')
    list_filter = ('day_of_week', 'is_recurring')
    search_fields = ('user__username',)
    ordering = ('day_of_week', 'start_time') 