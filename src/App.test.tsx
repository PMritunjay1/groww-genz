import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider, useUser } from './store/UserContext';
import Onboarding from './pages/Onboarding';

const TestComponent = () => {
  const { calculateAvailableAmount } = useUser();
  return <div data-testid="available-amount">{calculateAvailableAmount()}</div>;
};

describe('Financial Comfort Calculation', () => {
  it('calculates available amount correctly based on inputs', () => {
    // Set localStorage before rendering
    const testData = {
      monthlyIncome: 20000,
      monthlyExpenses: 8000,
      upcomingCommitments: 2000,
      hasCompletedOnboarding: false,
      situation: 'salaried',
      emergencySavings: 0,
      mainGoal: '',
      quizScores: {},
      lessonsCompleted: [],
      goals: []
    };
    localStorage.setItem('groww_firststep_user_data', JSON.stringify(testData));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('available-amount').textContent).toBe('10000');
  });

  it('renders onboarding screen correctly', () => {
    render(
      <BrowserRouter>
        <UserProvider>
          <Onboarding />
        </UserProvider>
      </BrowserRouter>
    );
    expect(screen.getByText(/Your Current Situation/i)).toBeTruthy();
  });
});
