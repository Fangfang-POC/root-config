import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";
import "./index.css";

const routes = constructRoutes(microfrontendLayout, {
  loaders: {
    busyLoader: `<div>Loading</div>`,
  },
  props: {
    a: 1,
    b: 2,
  },
});
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
