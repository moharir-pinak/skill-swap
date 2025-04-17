from rest_framework import serializers
from .models import Skill, UserSkill, Availability

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category', 'description']

class UserSkillSerializer(serializers.ModelSerializer):
    skill_name = serializers.CharField(source='skill.name', read_only=True)
    skill_category = serializers.CharField(source='skill.category', read_only=True)

    class Meta:
        model = UserSkill
        fields = [
            'id',
            'skill',
            'skill_name',
            'skill_category',
            'role',
            'proficiency_level',
            'years_of_experience',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['user']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class UserSkillCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkill
        fields = ['skill', 'role', 'proficiency_level', 'years_of_experience']

class AvailabilitySerializer(serializers.ModelSerializer):
    day_name = serializers.CharField(source='get_day_of_week_display', read_only=True)

    class Meta:
        model = Availability
        fields = [
            'id', 'user', 'day_of_week', 'day_name', 'start_time',
            'end_time', 'is_recurring', 'created_at', 'updated_at'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']

    def validate(self, data):
        if data['start_time'] >= data['end_time']:
            raise serializers.ValidationError(
                {"end_time": "End time must be after start time"}
            )
        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class UserSkillWithAvailabilitySerializer(UserSkillSerializer):
    availability = AvailabilitySerializer(
        source='user.availability_set',
        many=True,
        read_only=True
    )

    class Meta(UserSkillSerializer.Meta):
        fields = UserSkillSerializer.Meta.fields + ['availability'] 