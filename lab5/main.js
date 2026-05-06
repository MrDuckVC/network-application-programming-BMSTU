import { MainPage } from "./pages/main/index.js";

const root = document.getElementById('root');
const mainPage = new MainPage(root);

mainPage.render();

document.getElementById('home-btn').addEventListener('click', (e) => {
    e.preventDefault();
    mainPage.render();
});
