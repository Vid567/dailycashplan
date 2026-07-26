# DailyCashPlan — Master Project Document

_Last updated: 26 July 2026_

## Purpose
DailyCashPlan helps people who feel overwhelmed by money see their income, expenses and debts clearly on one page and take a practical next step.

## Target user
People who:
- do not know where their money goes;
- struggle to budget consistently;
- have debt or recurring overdrafts;
- want clarity without a complicated account or subscription.

## Official source of truth
- Repository: `Vid567/dailycashplan`
- Live branch: `main`
- Safe working branches: feature or maintenance branches
- Live entry file: `index.html`
- Project documentation: `/docs`

`main` must always remain deployable. Changes are prepared and checked on a separate branch before merging.

## Current MVP scope
- Homepage with a clear DailyCashPlan explanation
- Direct access to the product
- Beta signup flow
- Google Sheets storage for beta signups
- Mobile-first experience
- Local browser storage for financial data
- Microsoft Clarity and analytics tracking where configured

## Out of scope for the current beta
- User accounts
- Bank connections
- Cloud storage of financial data
- Paid subscriptions
- Complex financial advice
- Multi-user household accounts

## Current priority
1. Confirm one complete user flow from homepage to product and beta signup.
2. Test all links, buttons, forms and mobile layouts.
3. Reduce launch-blocking bugs as far as reasonably possible.
4. Prepare for the first 50 beta testers.
5. Collect structured feedback and improve only after evidence.

## Definition of launch-ready
DailyCashPlan is ready for 50 beta testers when:
- all primary buttons work;
- the app loads correctly on mobile and desktop;
- signup data reaches the correct Google Sheet;
- no financial data unexpectedly leaves the device;
- privacy and beta wording are clear;
- there are no known critical or high-severity bugs;
- the complete flow has been tested in a fresh browser session.

## Working rules
1. Read this file before making project changes.
2. Update the relevant documentation before or with the code change.
3. Never edit `main` directly for substantial changes.
4. Test the changed flow before merging.
5. Record meaningful changes in `docs/08_Changelog.md`.
6. Record lasting product or technical decisions in `docs/09_Decisions.md`.
7. Move obsolete material to `/archive`; do not silently delete useful history.

## Documentation index
- [Project vision](docs/00_Project_Vision.md)
- [Product specification](docs/01_Product_Specification.md)
- [User flow](docs/02_User_Flow.md)
- [Launch checklist](docs/03_Launch_Checklist.md)
- [Test plan](docs/04_Test_Plan.md)
- [Marketing](docs/05_Marketing.md)
- [Beta feedback](docs/06_Beta_Feedback.md)
- [Known issues](docs/07_Known_Issues.md)
- [Changelog](docs/08_Changelog.md)
- [Decisions](docs/09_Decisions.md)

## Next action
Complete the launch-readiness review using `docs/03_Launch_Checklist.md` and `docs/04_Test_Plan.md`.