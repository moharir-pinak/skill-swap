import { useEffect } from 'react';
import { useSkillStore } from '../../stores/skillStore';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function UserSkillList() {
  const { userSkills, fetchUserSkills, deleteUserSkill, isLoading, error } = useSkillStore();

  useEffect(() => {
    fetchUserSkills();
  }, [fetchUserSkills]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      await deleteUserSkill(id);
    }
  };

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
        {userSkills.map((userSkill) => (
          <li key={userSkill.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-primary-600 truncate">
                      {userSkill.skill_name}
                    </p>
                    <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                      {userSkill.role}
                    </p>
                    <p className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {userSkill.proficiency_level}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {userSkill.years_of_experience} years of experience
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0 flex">
                  <button
                    type="button"
                    onClick={() => {/* TODO: Implement edit */}}
                    className="mr-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(userSkill.id)}
                    className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 