# Expense Chart

### screenshot

<img src="./docs/s.png"/>

## To Run Locally

- Clone the repository `git clone https://github.com/Ulrich-Tonmoy/expense-chart`.
- Open the project `expense-chart` in terminal or vscode.
- Run `npm i` in terminal to install dependency.
- Run `npm run dev` in terminal and open [http://localhost:3000/](http://localhost:3000/) in browser.

### Feedback:

- The fonts were not imported from any CDN, no webfonts were used, hence, the correct font won’t be visible on users' devices if they don’t have the font installed on it.
- on `index.css:22` the font name should usually be wrapped in quotation marks.
- Good thing that the data was imported from the json file directly, but the types.ts file contains static enum for Period, if json is updated, it won’t be updated automatically.
- The spelling is "Doughnut” btw, great that you utilized dynamic fraction for the number value in the center.
- The method “formatWithThousandSeparators” can be eliminated by utilizing “toLocaleString” native js method
- The chart was a mix of svg and div elements, if conic gradient is to be used, the svg was not needed, or the entire chart could be generated in svg, which would prevent the chart from being pixelated in high-resolution displays.

Well done on:

- Good css with vars
- Good git commits
- Organized readme file

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
