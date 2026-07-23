# Accessible Clinical Results Dashboard

[View the live dashboard](https://anusha-r-dev.github.io/accessible-clinical-dashboard/)

An accessible clinical results dashboard built with React and TypeScript. The
application demonstrates how laboratory data can be presented with clear
status indicators, preserved numeric precision, keyboard-friendly controls,
and responsive layouts.

> **Privacy note:** Every person, identifier, result, and clinical detail in
> this project is entirely synthetic. This project contains no employer code,
> internal APIs, proprietary components, or real patient information.

## Features

- Search results by test name, abbreviation, or laboratory panel
- Filter results by attention status
- Review abnormal findings with a persistent attention queue
- Select a result to inspect its value, reference range, trend, and history
- Explore exact historical values through an interactive keyboard-ready chart
- Preserve display precision independently from numeric values
- Communicate status through text and symbols—not color alone
- Responsive layout for desktop, tablet, and mobile screens
- Semantic landmarks, headings, table markup, labels, and live result counts
- Visible keyboard focus states, native controls, and a skip link
- Reduced-motion support

## Technology

- React 19
- TypeScript
- Vite
- CSS
- ESLint
- GitHub Actions

No component library or charting dependency is used. The interface and its
small trend visualizations are implemented with semantic HTML and CSS.

## Run locally

This project uses Node.js 22.

```bash
nvm use
npm install
npm run dev
```

Open the local URL printed by Vite.

## Quality checks

```bash
npm run lint
npm run build
```

`npm run lint` checks the source with ESLint. `npm run build` performs
TypeScript project checking and creates an optimized production bundle.

## Project structure

```text
src/
├── components/         # Focused, reusable interface components
├── data/
│   └── labResults.ts   # Synthetic results and display labels
├── hooks/
│   └── useReviewedResults.ts # Persistent review workflow
├── types/
│   └── clinical.ts     # Shared TypeScript domain types
├── App.tsx             # Application state and component composition
├── App.css             # Responsive component and layout styles
├── index.css           # Global defaults and reduced-motion behavior
└── main.tsx            # React application entry point
```

## Accessibility decisions

- A skip link lets keyboard users bypass repeated navigation.
- Native links, buttons, inputs, tables, headings, and definition lists retain
  built-in browser and assistive-technology behavior.
- Filter buttons expose their state with `aria-pressed`.
- Search-result counts are announced through a polite live region.
- Table row headers identify each result.
- Status text accompanies every status color.
- Decorative elements are hidden from assistive technology.
- Focus indicators meet the interface's visual contrast requirements.

## Disclaimer

This dashboard is an educational portfolio project and is not intended for
clinical use or medical decision-making.
