# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



1. Why did you choose the frontend stack you used?

I chose React (Vite) with Tailwind CSS because it provides a fast development experience and clean component-based architecture. Vite offers very fast startup and hot reload, which helped me iterate quickly. React makes it easy to manage UI state such as authentication status and issue updates, while Tailwind CSS allowed me to build a modern, responsive UI without writing custom CSS files. This stack is lightweight, scalable, and well-suited for real-world dashboards.

2. Explain your Firestore data structure ?

I used a single issues collection in Firestore.
Each document represents one issue and contains fields like:

title – issue title
description – issue details
priority – Low / Medium / High
status – Open / In Progress / Completed
createdBy – user UID
createdAt – timestamp

3. Explain how you handled similar issues (concurrent updates)

I handled similar or concurrent updates using Firestore’s real-time listeners (onSnapshot). Whenever an issue is created or updated, all connected clients automatically receive the latest data. Updates to status and priority are handled using updateDoc, which ensures only the specific field is changed without overwriting the entire document. This approach prevents data conflicts and keeps the UI always in sync.

4. What was confusing or challenging?

The most challenging part was Firestore security rules. Initially, write operations failed due to insufficient permissions even when the user was logged in. Understanding how request.auth works and aligning rules with authenticated access took some experimentation. Another challenge was managing auth state properly during page refreshes, which I solved using onAuthStateChanged.

5. What would you improve next?

Next, I would:
|-Add role-based access control (only issue creators can edit or delete)
|-Implement filters and sorting by priority and status
|-Improve UX with a Kanban-style board
|-Add pagination for large datasets
|-Enhance security rules for production readiness

