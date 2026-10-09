import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

export interface UserData {
  hasCompletedOnboarding: boolean;
  situation: string; // student, part-time, salaried
  monthlyIncome: number;
  monthlyExpenses: number;
  upcomingCommitments: number;
  emergencySavings: number | null;
  mainGoal: string; // learn, habit, mutual-funds
  quizScores: Record<string, number>;
  lessonsCompleted: string[];
  goals: Goal[];
}

const defaultUserData: UserData = {
  hasCompletedOnboarding: false,
  situation: '',
  monthlyIncome: 0,
  monthlyExpenses: 0,
  upcomingCommitments: 0,
  emergencySavings: null,
  mainGoal: '',
  quizScores: {},
  lessonsCompleted: [],
  goals: [],
};

interface UserContextType extends UserData {
  updateUserData: (data: Partial<UserData>) => void;
  resetUserData: () => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  markLessonComplete: (lessonId: string) => void;
  saveQuizScore: (quizId: string, score: number) => void;
  calculateAvailableAmount: () => number;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = 'groww_firststep_user_data';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user data', e);
      }
    }
    return defaultUserData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...data }));
  };

  const resetUserData = () => {
    setUserData(defaultUserData);
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = { ...goal, id: Date.now().toString() };
    setUserData((prev) => ({ ...prev, goals: [...prev.goals, newGoal] }));
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setUserData((prev) => ({
      ...prev,
      goals: prev.goals.map((g) => (g.id === id ? { ...g, ...updates } : g)),
    }));
  };

  const deleteGoal = (id: string) => {
    setUserData((prev) => ({
      ...prev,
      goals: prev.goals.filter((g) => g.id !== id),
    }));
  };

  const markLessonComplete = (lessonId: string) => {
    setUserData((prev) => {
      if (prev.lessonsCompleted.includes(lessonId)) return prev;
      return { ...prev, lessonsCompleted: [...prev.lessonsCompleted, lessonId] };
    });
  };

  const saveQuizScore = (quizId: string, score: number) => {
    setUserData((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [quizId]: score },
    }));
  };

  const calculateAvailableAmount = () => {
    const { monthlyIncome, monthlyExpenses, upcomingCommitments } = userData;
    const available = monthlyIncome - monthlyExpenses - upcomingCommitments;
    return available > 0 ? available : 0;
  };

  return (
    <UserContext.Provider
      value={{
        ...userData,
        updateUserData,
        resetUserData,
        addGoal,
        updateGoal,
        deleteGoal,
        markLessonComplete,
        saveQuizScore,
        calculateAvailableAmount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
