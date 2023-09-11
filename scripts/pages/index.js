import { photographerTemplate } from "../factories/photographer.js";

async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer-section"
    );

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const photographers = await fetch("./data/photographers.json")
        .then((response) => response.json())
        .then((data) => {
            return data.photographers;
        });
    displayData(photographers);
}

init();
