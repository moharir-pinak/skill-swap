import { useState } from 'react';
import { useSkillStore } from '../../stores/skillStore';
import AddUserSkill from './AddUserSkill';

export default function SkillManagement() {
  const { skills, userSkills, deleteUserSkill } = useSkillStore();
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [showAddSkill, setShowAddSkill] = useState(false);

  const handleAddSkill = (skillId: number) => {
    setSelectedSkill(skillId);
    setShowAddSkill(true);
  };

  const handleCloseAddSkill = () => {
    setShowAddSkill(false);
    setSelectedSkill(null);
  };

  const handleSkillAdded = () => {
    handleCloseAddSkill();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Manage Skills</h2>
        <button
          onClick={() => setShowAddSkill(true)}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">{skill.name}</h3>
            <p className="mt-2 text-sm text-gray-500">{skill.description}</p>
            <div className="mt-4 flex justify-end space-x-2">
              {!userSkills.some((us) => us.skill === skill.id) ? (
                <button
                  onClick={() => handleAddSkill(skill.id)}
                  className="px-3 py-1 text-sm bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Add
                </button>
              ) : (
                <button
                  onClick={() => deleteUserSkill(skill.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddSkill && selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add Skill</h3>
              <button
                onClick={handleCloseAddSkill}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <AddUserSkill
              skillId={selectedSkill}
              onSuccess={handleSkillAdded}
            />
          </div>
        </div>
      )}
    </div>
  );
} 