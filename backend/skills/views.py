from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import Skill, UserSkill, Availability
from .serializers import (
    SkillSerializer,
    UserSkillSerializer,
    AvailabilitySerializer,
    UserSkillWithAvailabilitySerializer,
    UserSkillCreateSerializer
)

class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'description']

class UserSkillViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['role', 'proficiency_level']

    def get_queryset(self):
        return UserSkill.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return UserSkillCreateSerializer
        return UserSkillSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def teaching(self, request):
        queryset = self.get_queryset().filter(role='teacher')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def learning(self, request):
        queryset = self.get_queryset().filter(role='learner')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def matches(self, request):
        """
        Find potential skill matches where:
        - User's teaching skills match others' learning skills
        - User's learning skills match others' teaching skills
        """
        user_skills = UserSkill.objects.filter(user=request.user)
        teaching_skills = user_skills.filter(role='teacher').values_list('skill_id', flat=True)
        learning_skills = user_skills.filter(role='learner').values_list('skill_id', flat=True)

        matches = UserSkill.objects.filter(
            Q(skill_id__in=learning_skills, role='teacher') |
            Q(skill_id__in=teaching_skills, role='learner')
        ).exclude(user=request.user)

        serializer = UserSkillWithAvailabilitySerializer(matches, many=True)
        return Response(serializer.data)

class AvailabilityViewSet(viewsets.ModelViewSet):
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Availability.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def others(self, request):
        """Get availabilities for other users (for matching purposes)"""
        user_id = request.query_params.get('user_id')
        if user_id:
            queryset = Availability.objects.filter(user_id=user_id)
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"error": "user_id parameter is required"}, status=400) 