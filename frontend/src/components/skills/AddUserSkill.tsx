import { useState } from 'react';
import { useSkillStore } from '../../stores/skillStore';

type Role = 'LEARNER' | 'TEACHER' | 'BOTH';
type ProficiencyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

interface AddUserSkillProps {
  skillId: number;
  onSuccess: () => void;
}

export default function AddUserSkill({ skillId, onSuccess }: AddUserSkillProps) {
  const [role, setRole] = useState<Role>('LEARNER');
  const [proficiencyLevel, setProficiencyLevel] = useState<ProficiencyLevel>('BEGINNER');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const { addUserSkill } = useSkillStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUserSkill({
        role,
        proficiency_level: proficiencyLevel,
        years_of_experience: yearsOfExperience,
        skill: skillId,
      });
      onSuccess();
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="LEARNER">Learner</option>
          <option value="TEACHER">Teacher</option>
          <option value="BOTH">Both</option>
        </select>
      </div>

      <div>
        <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700">
          Proficiency Level
        </label>
        <select
          id="proficiency"
          value={proficiencyLevel}
          onChange={(e) => setProficiencyLevel(e.target.value as ProficiencyLevel)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
          <option value="EXPERT">Expert</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <input
          type="number"
          id="experience"
          min="0"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        Add Skill
      </button>
    </form>
  );
} 