# Groww FirstStep: Evaluation Plan

## Overview
This evaluation plan outlines the manual and automated testing strategies to ensure Groww FirstStep meets the functional, user experience, and safety requirements specified in the product brief.

## A. Functional Tests

| Test ID | User Scenario | Expected Result |
|---------|---------------|-----------------|
| FT-01   | Submit valid onboarding form | User data is saved and user is redirected to the dashboard |
| FT-02   | Skip optional fields during onboarding | Onboarding completes successfully without errors |
| FT-03   | Enter invalid numeric inputs in onboarding | Form validation prevents submission and shows inline errors |
| FT-04   | Financial comfort calculation | Calculates available amount accurately based on Income - (Expenses + Commitments + Savings) |
| FT-05   | Modify SIP calculator inputs | Estimated future value and charts update dynamically and accurately |
| FT-06   | Complete beginner quiz | Answers are recorded, score is displayed, and state persists |
| FT-07   | Create a new goal | Goal appears in the goal tracking section with correct initial values |
| FT-08   | Edit and Delete a goal | Goal is updated correctly or removed entirely from the UI and local storage |
| FT-09   | App refresh behavior | User onboarding state, quiz scores, and goals persist after page reload |
| FT-10   | Reset demo data | All local storage is cleared and user is returned to the initial onboarding screen |

## B. User Experience Tests

| Test ID | User Scenario | Expected Result |
|---------|---------------|-----------------|
| UX-01   | Locate the learning center | A new user can easily navigate to the learning module from the dashboard |
| UX-02   | Complete beginner quiz flow | The quiz is accessible, readable, and provides immediate feedback |
| UX-03   | SIP Calculator usage | Users can intuitively adjust inputs and understand the graphical output |
| UX-04   | Mobile responsiveness | All screens render correctly and are fully usable on a mobile viewport |
| UX-05   | Emergency Fund Warning | The dashboard surfaces a warning if emergency savings are less than 3 months of expenses. |
| UX-06   | Connected Simulator | The SIP Simulator defaults to the user's estimated investable amount. |

## C. Safety and Trust Tests

| Test ID | User Scenario | Expected Result |
|---------|---------------|-----------------|
| ST-01   | Check for guaranteed returns | No screens promise guaranteed returns; hypothetical values are clearly labeled |
| ST-02   | Simulated investment action | Any mock investment action requires explicit confirmation and clearly states it is a demo |
| ST-03   | Sample data distinction | Mock holdings are explicitly labeled as sample data to prevent confusion with real assets |

## D. Technical Quality Tests

| Test ID | User Scenario | Expected Result |
|---------|---------------|-----------------|
| TQ-01   | Production build execution | `npm run build` succeeds without errors |
| TQ-02   | Console errors check | No material errors or warnings in the browser console during the primary user journey |
| TQ-03   | Accessibility (a11y) check | Forms have semantic labels, correct ARIA roles, and are keyboard accessible |
