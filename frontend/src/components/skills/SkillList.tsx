import { useEffect } from 'react';
import { useSkillStore } from '../../stores/skillStore';
import { PlusIcon } from '@heroicons/react/24/outline';

interface SkillListProps {
  onAddSkill: (skillId: number) => void;
}

export default function SkillList({ onAddSkill }: SkillListProps) {
  const { skills, fetchSkills, isLoading, error } = useSkillStore();

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{error}</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {skills.map((skill) => (
          <li key={skill.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-primary-600 truncate">
                    {skill.name}
                  </p>
                  <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                    {skill.category}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => onAddSkill(skill.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add to My Skills
                  </button>
                </div>
              </div>
              {skill.description && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{skill.description}</p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 