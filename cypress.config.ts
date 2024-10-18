import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "88keas",
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
