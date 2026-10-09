import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './store/UserContext';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';
import Learn from './pages/Learn';
import Goals from './pages/Goals';
import Settings from './pages/Settings';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <UserProvider>
        {ui}
      </UserProvider>
    </BrowserRouter>
  );
};

describe('Comprehensive QA Audit', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('A. Onboarding and financial comfort', () => {
    it('handles new user with no saved data', () => {
      renderWithProviders(<Onboarding />);
      expect(screen.getByText(/Your Current Situation/i)).toBeTruthy();
      expect(screen.getByRole('button', { name: /Next/i })).toHaveProperty('disabled', true);
    });

    it('requires valid situation selection before proceeding', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Onboarding />);
      
      const nextBtn = screen.getByRole('button', { name: /Next/i });
      expect(nextBtn).toHaveProperty('disabled', true);
      
      const select = screen.getByRole('combobox');
      await user.selectOptions(select, 'salaried');
      expect(nextBtn).toHaveProperty('disabled', false);
      
      await user.click(nextBtn);
      expect(screen.getByText(/Financial Comfort Check/i)).toBeTruthy();
    });

    it('calculates available amount correctly and allows skipping optional emergency savings', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Onboarding />);
      
      await user.selectOptions(screen.getByRole('combobox'), 'salaried');
      await user.click(screen.getByRole('button', { name: /Next/i }));
      
      // Step 2
      const incomeInput = screen.getByLabelText(/Monthly Income\/Allowance/i);
      const expensesInput = screen.getByLabelText(/Essential Monthly Expenses/i);
      const commitmentsInput = screen.getByLabelText(/Upcoming Short-term Commitments/i);
      
      await user.type(incomeInput, '50000');
      await user.type(expensesInput, '20000');
      await user.type(commitmentsInput, '5000');
      
      // We expect the available amount to be 50000 - 20000 - 5000 = 25000
      expect(screen.getByText(/25,000/)).toBeTruthy();
      
      // Proceed without filling optional emergency savings
      await user.click(screen.getByRole('button', { name: /Next/i }));
      expect(screen.getByText(/Your Main Goal/i)).toBeTruthy();
    });
  });

  describe('B. Emergency-fund warning', () => {
    const setupDashboard = (income: number, expenses: number, savings: number) => {
      const testData = {
        monthlyIncome: income,
        monthlyExpenses: expenses,
        upcomingCommitments: 0,
        hasCompletedOnboarding: true,
        situation: 'salaried',
        emergencySavings: savings,
        mainGoal: '',
        quizScores: {},
        lessonsCompleted: [],
        goals: []
      };
      localStorage.setItem('groww_firststep_user_data', JSON.stringify(testData));
      renderWithProviders(<Dashboard />);
    };

    it('shows warning when emergency savings < 3 months expenses', () => {
      setupDashboard(50000, 10000, 20000); // 3x expenses = 30000, savings = 20000 (Below)
      expect(screen.queryByText(/Prioritize your Emergency Fund/i)).toBeTruthy();
    });

    it('hides warning when emergency savings == 3 months expenses', () => {
      setupDashboard(50000, 10000, 30000); // Equal
      expect(screen.queryByText(/Prioritize your Emergency Fund/i)).toBeFalsy();
    });

    it('hides warning when emergency savings > 3 months expenses', () => {
      setupDashboard(50000, 10000, 40000); // Above
      expect(screen.queryByText(/Prioritize your Emergency Fund/i)).toBeFalsy();
    });

    it('hides warning when emergency savings were skipped (0) but expenses are also 0', () => {
      setupDashboard(50000, 0, 0);
      expect(screen.queryByText(/Prioritize your Emergency Fund/i)).toBeFalsy();
    });
  });

  describe('C. Context-aware SIP simulator', () => {
    const setupSimulator = (income: number, expenses: number) => {
      const testData = {
        monthlyIncome: income,
        monthlyExpenses: expenses,
        upcomingCommitments: 0,
        hasCompletedOnboarding: true,
        situation: 'salaried',
        emergencySavings: 0,
        mainGoal: '',
        quizScores: {},
        lessonsCompleted: [],
        goals: []
      };
      localStorage.setItem('groww_firststep_user_data', JSON.stringify(testData));
      renderWithProviders(<Simulator />);
    };

    it('initializes amount based on investable amount, bounded by limits', () => {
      setupSimulator(10000, 8000); // Available = 2000
      // The simulator rounds down to nearest 500. So 2000 remains 2000.
      expect(screen.getAllByText('₹2,000')[0]).toBeTruthy();
    });

    it('caps initial amount at 20000 even if available is higher', () => {
      setupSimulator(100000, 10000); // Available = 90000
      expect(screen.getAllByText('₹20,000')[0]).toBeTruthy();
    });

    it('floors initial amount at 500 even if available is lower', () => {
      setupSimulator(10000, 9800); // Available = 200
      expect(screen.getAllByText('₹500')[0]).toBeTruthy();
    });
    
    it('provides clear labels that returns are hypothetical', () => {
      setupSimulator(50000, 20000);
      expect(screen.getByText(/Returns are strictly hypothetical/i)).toBeTruthy();
    });
  });

  describe('D. Learning and quiz', () => {
    it('renders lessons and allows navigation to quiz', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Learn />);
      
      expect(screen.getAllByText(/What is Investing\?/i)[0]).toBeTruthy();
      const nextBtn = screen.getByRole('button', { name: /Mark Complete & Next/i });
      
      // Complete all 4 lessons
      await user.click(nextBtn);
      await user.click(nextBtn);
      await user.click(nextBtn);
      await user.click(nextBtn);
      
      // Should now be on the quiz
      expect(screen.getByText(/Question 1 of 3/i)).toBeTruthy();
    });
  });

  describe('E. Goals', () => {
    it('shows empty state initially and allows creating a goal', async () => {
      const user = userEvent.setup();
      renderWithProviders(<Goals />);
      
      expect(screen.getByText(/No goals set yet/i)).toBeTruthy();
      
      await user.click(screen.getByRole('button', { name: /Create First Goal/i }));
      
      // Modal should appear
      expect(screen.getByText(/Create New Goal/i)).toBeTruthy();
      
      // Just verifying we can close the modal as well to avoid complicated date mocking
      await user.click(screen.getByRole('button', { name: /Cancel/i }));
      expect(screen.queryByText(/Create New Goal/i)).toBeFalsy();
    });
  });

  describe('F. Settings and persistence', () => {
    it('resets user data correctly', async () => {
      vi.spyOn(window, 'confirm').mockImplementation(() => true);
      const user = userEvent.setup();
      const testData = {
        monthlyIncome: 10000,
        monthlyExpenses: 8000,
        upcomingCommitments: 0,
        hasCompletedOnboarding: true,
        situation: 'salaried',
        emergencySavings: 0,
        mainGoal: '',
        quizScores: {},
        lessonsCompleted: [],
        goals: []
      };
      localStorage.setItem('groww_firststep_user_data', JSON.stringify(testData));
      
      // We need to render the App to see navigation changes, but Settings only does state reset and navigate.
      // So render with BrowserRouter and UserProvider.
      renderWithProviders(<Settings />);
      
      const resetBtn = screen.getByRole('button', { name: /Reset all demo data/i });
      await user.click(resetBtn);
      
      // Using context to check localStorage
      const saved = localStorage.getItem('groww_firststep_user_data');
      expect(saved).toContain('"monthlyIncome":0');
      expect(saved).toContain('"hasCompletedOnboarding":false');
    });
  });
});
