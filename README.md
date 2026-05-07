# Frontend Mentor - Savings Tracker solution

This is a solution to the [Savings Tracker challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/savings-tracker). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

#### Goal Management

- Create a new savings goal with a name, target amount, and optional deadline
- Edit an existing goal to update its name, target amount, or deadline
- Delete a goal and see a confirmation modal before it's permanently removed
- See form validation messages if required fields are missing or invalid

#### Deposits

- Add a deposit to a goal with an amount and optional note
- See an error message when trying to add a deposit of $0 or less
- View the full deposit history for a goal, showing the note, date, and amount for each deposit

#### Dashboard

- View a summary showing total savings, number of active goals, and goals completed
- See a monthly deposits bar chart showing saving activity over time
- View all goals in a card grid with each goal's name, progress percentage, amount saved, target, and deadline
- See an empty state with a prompt to create a first goal when no goals exist
- See a completed state for goals that have reached their target

#### Filtering & Sorting

- Filter goals by status: all goals, in progress, completed, or not started
- Sort goals by recently added, deadline, progress, amount saved, or alphabetically

#### Goal Details

- View a goal's detail page showing progress percentage, remaining amount, a visual progress bar, and saved vs. target amounts
- See a different layout when a goal is 100% complete, showing a summary of total deposits and amount saved

#### UI & Accessibility

- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app using only their keyboard

### Links

- Solution URL: [https://github.com/EA-Gadgeter/savings-tracker-challenge](https://github.com/EA-Gadgeter/savings-tracker-challenge)
- Live Site URL: [https://ea-gadgeter.github.io/savings-tracker-challenge/](https://ea-gadgeter.github.io/savings-tracker-challenge/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Wouter](https://github.com/molefrog/wouter) - For routing 
- [React](https://reactjs.org/) - JS library
- [Zustand](https://zustand-demo.pmnd.rs/) - For state management

### What I learned
Really liked the implementation of the sort and filter panels,
there is no design for this for this in mobile layouts. So i come up with a solution of modal, that with just CSS transforms into the popup in bigger screens.

Also I think the chart is very cool, and its basically done with just CSS, no libraries or anything, never done its before, and AI give me good idea on how to do this, for next projects. Code is pretty big to put it here but can check **MonthlyDepositsChart.jsx** file for it.

### Continued development

Probably the last thing we can do is making this a fullstack app, probably using Astro.

### AI Collaboration

This time I tried not to leave everything to the AI; mainly, I asked it to handle the JSX code for the UI along with their CSS, so that I could focus on the interface and business logic.

For almost the entire project, I used Claude Sonnet 4.6 with GitHub Copilot Pro, working in high-level reasoning mode using the Zed editor the whole time; to be honest, it works quite well and recognises the Figma screenshots I give it to build the interface very accurately.

The AI also gave me the foundations to build the UI without dependencies, although to be honest, after that I still had to tweak the CSS quite a bit to make it look good and be responsive.

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)
