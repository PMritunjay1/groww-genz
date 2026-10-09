# Groww FirstStep: Prompts Used

This document records the key AI prompts utilized during the creation of this product concept. 

## Initial Prompt (Master Prompt)
*(The complete master prompt provided by the user is preserved here by reference as the source of truth for the product requirements. It outlined the goal, target audience, technical constraints, required features, design direction, and testing requirements for the Groww FirstStep case study.)*

## Prompt 1: Project Initialization
**Intent:** Scaffold the Vite project and install the exact required dependencies based on the user's non-negotiable tech stack preference.
**Command:** 
```bash
npx -y create-vite@latest ./ --template react-ts --no-interactive
npm install tailwindcss @tailwindcss/vite react-router-dom lucide-react recharts framer-motion clsx tailwind-merge
```

## Prompt 2: Core Routing & Context Setup
**Intent:** Set up React Router and the `UserContext` to handle local persistence of the onboarding flow, quiz scores, and goals without needing a real backend.
**Action:** Wrote `App.tsx` and `UserContext.tsx` to encapsulate the local storage logic.

## Prompt 3: Onboarding & Dashboard UI
**Intent:** Build the mobile-first "Financial Comfort Check" onboarding screen and the main dashboard that reflects the user's estimated investable amount.
**Action:** Wrote `Onboarding.tsx` and `Dashboard.tsx` utilizing Tailwind for responsive styling and the `calculateAvailableAmount` context function.

## Prompt 4: Learning & SIP Simulator Implementation
**Intent:** Create the contextual learning module, the interactive quiz, and the SIP simulator as per the requirement to allow users to "Learn by doing" without pressure.
**Action:** Wrote `Learn.tsx` (containing 4 lessons and a 3-question quiz) and `Simulator.tsx` using `recharts` for visual compounding feedback.

## Prompt 5: Mock Goals & Settings
**Intent:** Finalize the application by adding a goal tracker and a settings page to allow users to reset their demo data, adhering strictly to the privacy requirements.
**Action:** Wrote `Goals.tsx`, `Portfolio.tsx` (static demo portfolio), and `Settings.tsx` (includes the local storage reset function).

## Prompt 6: Test Configuration & Execution
**Intent:** Configure Vitest and React Testing Library to execute the required Functional tests automatically.
**Action:** Installed test dependencies, created `setupTests.ts` and `App.test.tsx` testing the comfort calculation and UI rendering, then executed `npx vitest run`.

## Prompt 7: Product Review & Refactoring
**Intent:** Act as a skeptical Senior PM, critique the product, find flaws (missing Emergency Savings input, disconnected Simulator data, empty dashboard state), and fix them.
**Action:** 
- Modified `Onboarding.tsx` to actually capture the optional `emergencySavings` field.
- Modified `Simulator.tsx` to pull the calculated available amount from the `UserContext` directly to personalize the SIP starting amount.
- Modified `Dashboard.tsx` to surface personalized goal messages and an "Emergency Fund Warning" if the user has insufficient savings.

## Prompt 8: Comprehensive QA Audit
**Intent:** Act as a Senior QA engineer to write and execute a full 16-test suite using React Testing Library, verify UI behavior, and fix uncovered a11y issues.
**Action:** Wrote `ComprehensiveQA.test.tsx`, fixed multiple element text-matching defects, resolved `window.confirm` mocking for testing, and added missing `id`/`htmlFor` labels in `Onboarding.tsx`.

## Prompt 9: Premium UI/UX Polish & Refactoring
**Intent:** Act as a Senior Product Designer to elevate the visual hierarchy, fix date validation bugs, clarify the SIP simulator risk disclaimers, and format lesson content.
**Action:** 
- Added a visual step-progress bar to `Onboarding.tsx` and improved step transition animations.
- Refactored `Learn.tsx` to map lesson content correctly over multiple paragraphs for improved readability and scanning.
- Re-styled the `Goals.tsx` copy (to distinguish Savings Goals from investments) and added a strict `min` date constraint so users cannot select target dates in the past.
- Hardened `Simulator.tsx` to use an educational 8% default rate (instead of 10%) and clearly display the parameters in the chart header.
