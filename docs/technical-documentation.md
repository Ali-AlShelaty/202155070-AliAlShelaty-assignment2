# Technical Documentation

## Starting point and changes
Assignment 1 supplied the single-page portfolio, two projects, theme toggle,
time-based greeting, contact form, and mobile menu. Assignment 2 preserves that
structure and styling while adding live search, category filters, result count,
and empty-state guidance. The missing profile image is replaced with initials.

## Implementation
HTML holds the project content; JavaScript does not duplicate the project data.
Each card has a data-category attribute. initProjectFilter() stores the active
category and combines it with a case-insensitive text query. A card is visible
only when both match. The hidden attribute removes unmatched cards from display
and accessibility navigation. A live region announces the count. Search controls
are revealed only after initialization; without JavaScript all projects remain visible.

initThemeToggle() validates the stored theme against light/dark, otherwise uses
the operating system preference. Storage reads and writes use try/catch so a
blocked localStorage does not prevent navigation or form initialization. The
theme remains usable for the current visit, with a friendly explanation.

initContactForm() prevents submission and trims input. Name and message must
contain text; email must match a basic address pattern. It uses form.elements
to avoid named-property collisions. Inline errors connect through aria-describedby;
aria-invalid identifies failures and focus moves to the first invalid field.
Valid submission resets the fields and displays a persistent confirmation.
No input is stored, transmitted, or logged. Email validation is basic, not proof
that an address exists.

initMobileNav() updates aria-expanded, closes on link selection, and supports
Escape with focus returned to the menu button. setGreeting() uses the visitor's
local time, and setYear() updates the footer.

## Layout and performance
CSS Grid/Flexbox, custom properties, and 768px/560px media queries provide
responsive styling. No external fonts, dependencies, APIs, or large images load.
Hover and success transitions are disabled for reduced-motion users.
Standard features target current Chrome, Edge, Firefox, and Safari; browser rendering has not been verified in this environment.

## Manual verification before submission
1. Choose Java: only Java Star Game appears. Choose Concepts: only the bus concept appears.
2. Search bus under All; then under Java. Check count and empty guidance; clear search and choose All.
3. Switch themes and reload. Block storage and confirm the theme still works and guidance appears.
4. Submit blank/whitespace fields and malformed email. Check messages and focus.
5. Submit valid values. Check reset and confirmation that nothing was sent.
6. At 375px width, open the menu; close by link and Escape. Check keyboard focus.
7. Check desktop/mobile widths, both themes, zoom, and reduced-motion preference.
8. Repeat in your other available browsers. Inspect console and network for failures.

## Limitations
No backend, messaging service, external API, or real project links are supplied.
The initials are a deliberate alternative to an unavailable photograph.

## Validation performed
JavaScript syntax passed node --check. HTML IDs are unique and local stylesheet/script references resolve. Automated browser execution was attempted, but the environment has no Chromium executable; interactive and visual checks remain to be performed using the checklist above.
