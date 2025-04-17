import { useState } from 'react';
import SkillList from './SkillList';
import UserSkillList from './UserSkillList';
import AddUserSkill from './AddUserSkill';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function SkillManagement() {
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  const handleAddSkill = (skillId: number) => {
    setSelectedSkillId(skillId);
    setIsAddSkillModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddSkillModalOpen(false);
    setSelectedSkillId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">My Skills</h2>
        <UserSkillList />
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">Available Skills</h2>
        <SkillList onAddSkill={handleAddSkill} />
      </div>

      <Dialog
        open={isAddSkillModalOpen}
        onClose={handleCloseModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Add Skill
              </Dialog.Title>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {selectedSkillId && (
              <AddUserSkill
                skillId={selectedSkillId}
                onClose={handleCloseModal}
              />
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 