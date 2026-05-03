# marginalia

A simple book list app for tracking, organizing, and taking notes on your reading.

Link: https://sabrinagiroux.github.io/marginalia/

## Features

- Add and manage books
- Track reading status (e.g. want to read, reading, finished)
- Rate books
- Write notes per book
- Data stored locally (no account required)


## Prerequisites

Before running this project, make sure you have:

- [Bun (v1.0+)](https://bun.com/docs/installation)

## Getting Started

```bash
# install dependencies
bun install

# run dev server
bun run dev
```

## Tech Stack

- [Vite](https://vite.dev) - frontend build tool used for the React app
  - [Vitest](https://vitest.dev) - testing framework for Vite
- [Dexie.js](https://dexie.org) - wrapper for IndexedDB, used for database
- [React Router](https://reactrouter.com/home) - router for React
- [Bun](https://bun.com) - toolkit for Javascript and Typescript. Includes a package manager + test runner
