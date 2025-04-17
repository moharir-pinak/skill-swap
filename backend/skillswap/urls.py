from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from skills.views import SkillViewSet, UserSkillViewSet

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'user-skills', UserSkillViewSet, basename='user-skill')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/users/', include('users.urls')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')),
] 