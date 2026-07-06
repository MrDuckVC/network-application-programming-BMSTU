import { MainPage } from "./pages/main/index.js";

import { ajax } from "./modules/ajax.js";
import { starshipUrls } from "./modules/starshipUrls.js";

window.ajax = ajax;
window.starshipUrls = starshipUrls;

const root = document.getElementById('root');
const mainPage = new MainPage(root);

mainPage.render();

document.getElementById('home-btn').addEventListener('click', (e) => {
    e.preventDefault();
    mainPage.render();
});
