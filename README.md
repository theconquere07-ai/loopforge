# Loopforge

> Build loops, not busywork.

Loopforge is an open-source command center for solo builders and small teams. It turns a messy idea backlog into one visible build loop: the objective you are moving now, the next decisions that matter, and the work you can deliberately leave for later.

## Why it exists

Most project tools optimize for collecting work. Loopforge is designed around momentum. The first release is a focused interface prototype with a production-minded component boundary, realistic workspace data, responsive behavior, and a visual language that makes progress feel tangible without becoming noisy.

## Run locally

```bash
npm install
npm run dev
```

The app is a Vite + React frontend and will be available at `http://localhost:3000`.

## Build for production

```bash
npm run build
npm run preview
```

## Project shape

- `src/main.jsx` — application composition, workspace data, and interaction state.
- `src/styles.css` — the Signal Workshop design system and responsive layout rules.
- `public/manus-routes.json` — route declaration used by the managed preview.
- `TODO.md` — delivery outcomes and future scope.

## Extension points

The first release intentionally keeps the data model in one place so it can be replaced cleanly by a persistence layer later. Suggested next boundaries:

1. Extract `workspaceData` into a typed domain module and add schema validation.
2. Add a database adapter for projects, loops, plan items, metrics, and activity records.
3. Add authentication and workspace switching without changing the dashboard composition.
4. Replace local interaction state with URL state or a server-backed command API.
5. Add keyboard shortcuts, command palette actions, and integrations as separate modules.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Small, focused pull requests are preferred. Please preserve accessible labels, responsive behavior, and the deliberate visual hierarchy when extending the interface.

## License

MIT. See [LICENSE](LICENSE).
