import { useEffect } from 'react';
import { useSkillStore } from '../stores/skillStore';
import SkillManagement from '../components/skills/SkillManagement';

export default function SkillsPage() {
  const { fetchSkills, fetchUserSkills } = useSkillStore();

  useEffect(() => {
    fetchSkills();
    fetchUserSkills();
  }, [fetchSkills, fetchUserSkills]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skills Management</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage your skills and find others to learn from or teach.
        </p>
      </div>

      <SkillManagement />
    </div>
  );
} 