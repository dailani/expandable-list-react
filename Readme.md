# Expandable list challenge

This challenge requires you to expand on an existing component to implement new functionality.

## Setup

You find the following files:

- `App.tsx` - Main application
- `GeneralList.tsx` - Displays a simple list using bootstrap
- `LoadingArea.tsx` - Allows for loading animations
- `useApi.ts` - Contains logic to do API calls to Github

The App currenlty displays a list of Github Users.

## Preliminary Tasks

1. Understand the current setup and components.
2. To make sure you understand how the table and api config works, make the `login` column data a link which links to the user's profile page.

## Task

For the main task, implement a new functionality: Make each row of the table expandable on click.

The user should be able to click on each row, the row expands and shows a new component which can be customized through the `column` config of the table. If the user clicks again on the row, it collapses again.

In this expanded state, show more information about the user, for example their name, bio or public email address. You can get this data by calling ``. https://api.github.com/users/USERNAME For an example of the result, see `expandable-list-example.jpg` next to this file.

## Notes

- Don't spend much time on styling, functionality is more important than how it looks.
- Follow clean code guidelines and extract reusable logic into components/hooks.
- You are not required to write tests for this challenge.
- Upload the result to Github or work here on Codesandbox.
