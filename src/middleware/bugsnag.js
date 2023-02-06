import Bugsnag from "@bugsnag/js";
import BugsnagPluginVue from "@bugsnag/plugin-vue";
import Vue from "vue";

Bugsnag.start({
  apiKey: "2d355f75aaf43888da158e1ae699ef00",
  plugins: [new BugsnagPluginVue()],
});

Vue.config.errorHandler = function (err, vm, info) {
  // Trate o erro aqui
  vm, info;
  console.error(err);
  console.log(".......");
  Bugsnag.notify(new Error(err));
};

// function handleMidd() {
//   Bugsnag.notify(new Error("Test error"));
//   console.log(`middleware`);
// }
// handleMidd();

export default Bugsnag;
