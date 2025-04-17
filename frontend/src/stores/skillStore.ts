import { create } from 'zustand';
import axios from 'axios';

interface Skill {
  id: number;
  name: string;
  category: string;
  description?: string;
}

interface UserSkill {
  id: number;
  skill: number;
  skill_name: string;
  skill_category: string;
  role: 'LEARNER' | 'TEACHER' | 'BOTH';
  proficiency_level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  years_of_experience: number;
  created_at: string;
  updated_at: string;
}

interface SkillStore {
  skills: Skill[];
  userSkills: UserSkill[];
  isLoading: boolean;
  error: string | null;
  fetchSkills: () => Promise<void>;
  fetchUserSkills: () => Promise<void>;
  addUserSkill: (data: Omit<UserSkill, 'id' | 'skill_name' | 'skill_category' | 'created_at' | 'updated_at'>) => Promise<void>;
  deleteUserSkill: (id: number) => Promise<void>;
}

export const useSkillStore = create<SkillStore>((set) => ({
  skills: [],
  userSkills: [],
  isLoading: false,
  error: null,

  fetchSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/api/skills/');
      set({ skills: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch skills',
        isLoading: false,
      });
    }
  },

  fetchUserSkills: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/api/user-skills/');
      set({ userSkills: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch user skills',
        isLoading: false,
      });
    }
  },

  addUserSkill: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post('/api/user-skills/', data);
      set((state) => ({
        userSkills: [...state.userSkills, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to add skill',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteUserSkill: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`/api/user-skills/${id}/`);
      set((state) => ({
        userSkills: state.userSkills.filter((skill) => skill.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete skill',
        isLoading: false,
      });
      throw error;
    }
  },
})); 