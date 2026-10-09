# Groww FirstStep: Product Walkthrough

## How to Navigate the Product

1. **Start at Onboarding (`/onboarding`):**
   - New users are greeted with a 3-step wizard.
   - Step 1 asks for user situation.
   - Step 2 calculates their estimated investable amount using their income and expenses. This highlights a core feature of FirstStep: contextualizing affordability before investing.
   - Step 3 captures their primary goal.

2. **The Dashboard (`/`):**
   - After onboarding, users land on the dashboard.
   - It prominently displays their "Estimated Investable Amount" to remind them of their budget.
   - A readiness checklist acts as a gamified to-do list (Complete Financial Check, Understand SIPs, Set a Goal, Take Quiz).

3. **Learning Center (`/learn`):**
   - A modular learning environment with short, punchy lessons.
   - Once all lessons are read, users unlock the Beginner Quiz.
   - Completing the quiz updates their readiness checklist on the dashboard.

4. **SIP Simulator (`/simulator`):**
   - An interactive calculator with range sliders.
   - Allows users to visualize the power of compounding.
   - **Important Design Decision:** Prominent warnings are displayed to ensure users understand returns are hypothetical and not guaranteed.

5. **Mock Goals (`/goals`):**
   - Users can create custom financial goals (e.g., Emergency Fund).
   - They can track their progress using a visual progress bar.

6. **Mock Portfolio (`/portfolio`):**
   - Shows what a diversified portfolio looks like using dummy data.
   - Clearly labeled as an "Educational Demo".

7. **Settings (`/settings`):**
   - Displays saved preferences.
   - Allows users to completely wipe their demo data and restart the experience.

## Important Design Decisions
- **No Real Transactions:** To build trust, the app is explicitly a simulation. It removes the anxiety of losing real money during the learning phase.
- **Color Palette:** Used a modern `#00d09c` primary color, keeping the interface clean and bright.
- **Local Persistence:** Data is stored in `localStorage` through a centralized React Context (`UserContext`), ensuring state is maintained across refreshes without needing a backend.

## Known Limitations
- The investment discovery flow is simplified to the Mock Portfolio to prevent any confusion with real financial advice.
- The SIP calculator is illustrative and does not factor in real-world volatility or tax implications.
