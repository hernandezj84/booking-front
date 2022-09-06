import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Modal from "./components/Modal.vue";
const app = createApp(App).use(router);
app.component("wait-modal", Modal);
app.mount("#app");
