from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, UserSkillViewSet, AvailabilityViewSet

router = DefaultRouter()
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'user-skills', UserSkillViewSet, basename='user-skill')
router.register(r'availability', AvailabilityViewSet, basename='availability')

app_name = 'skills'

urlpatterns = [
    path('', include(router.urls)),
] 