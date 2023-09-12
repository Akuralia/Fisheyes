//Mettre le code JavaScript lié à la page photographer.html
"use strict";

import { displayPhotographerData } from "../factories/media.js";

// Get the id of the photographer from the url
const str = window.location.href;
const url = new URL(str);
const id = url.searchParams.get("id");

// Variables to be kept accessible in all the functions
let images = null;
let slideIndex = 0;

// DOM Elements
const filter = document.getElementById("filter");
const cardsContainer = document.getElementById("photographer-pictures");
const likes = document.querySelectorAll(".heart-likes");
const mediaModal = document.getElementById("media-modal");
const mediaSlides = document.getElementById("media-slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const closeModal = document.querySelector(".x-btn")
/**
 * Function for the initialisation of the page
 */
async function init() {
    const photographers = await fetch("./data/photographers.json")
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
    const photographer = await findPhotographerById(photographers);
    const likes = await totalLikes(photographer);

    displayPhotographerData(photographer, likes);
    sortMedia();
}

/**
 * Function to find the photographer by his ID
 * @param {string} photographers - Array whith all photographers
 */
async function findPhotographerById(photographers) {
    const photographer = photographers.photographers.find((p) => p.id == id);
    const photographerMedia = photographers.media.filter(
        (m) => m.photographerId == id
    );
    images = [...photographerMedia];
    const photographerDatas = { ...photographer, media: photographerMedia };
    return photographerDatas;
}

/**
 * Function to calculate the total number of likes
 * @param {string} photographer - Array of the photographer
 */
async function totalLikes(photographer) {
    const likes = photographer.media.reduce((acc, media) => {
        return acc + media.likes;
    }, 0);
    return likes;
}

/**
 * Function to increment likes
 * @param {boolean} e - Event click on the heart
 */
export function incrementLikes(e) {
    const button = e.target;
    const card = button.closest(".media");
    const likeCount = card.querySelector(".media-likes");
    if (!card.classList.contains("liked")) {
        let currentLikes = parseInt(likeCount.textContent);
        currentLikes++;
        likeCount.textContent = currentLikes;
        card.classList.add("liked");
    } else {
        let currentLikes = parseInt(likeCount.textContent);
        currentLikes--;
        likeCount.textContent = currentLikes;
        card.classList.remove("liked");
    }
}

// Evenet listener to filter the media
filter.addEventListener("change", sortMedia);

/**
 * Function to filter the medias of the photographer
 */
function sortMedia() {
    const selectedOption = filter.value;
    const cards = Array.from(cardsContainer.children);
    console.log(cards);

    if (selectedOption === "popularity") {
        cards.sort((a, b) => {
            const popularityA = a.querySelector(".media-likes").textContent;
            const popularityB = b.querySelector(".media-likes").textContent;
            return popularityB - popularityA;
        });
        cards.forEach((card) => cardsContainer.appendChild(card));
    } else if (selectedOption === "date") {
        cards.sort((a, b) => {
            const dateA = new Date(a.querySelector(".media-date").textContent);
            const dateB = new Date(b.querySelector(".media-date").textContent);
            return dateB - dateA;
        });
        cards.forEach((card) => cardsContainer.appendChild(card));
    } else if (selectedOption === "title") {
        cards.sort((a, b) => {
            const titleA = a.querySelector("h2").textContent;
            const titleB = b.querySelector("h2").textContent;
            return titleA.localeCompare(titleB);
        });

        cards.forEach((carte) => cardsContainer.appendChild(carte));
    }
}

/**
 * Function to launch the modal on click on a media
 * @param {boolean} e - Event click on the media to launch the modal or not
 */
export function openModal(e) {
    const mediaElement = e.target;
    const index = mediaElement.dataset.indexNumber;
    mediaModal.style.display = "block";
    showSlide(index);
}

/**
 * Function to close the modal
 */

function closeMediaModal() {
    mediaModal.style.display = "none";
}

/**
 * Function for the integration of the media in the modal
 * @param {string} index - Index of medias
 */
function showSlide(index) {
    const currentIndex = parseInt(index);
    const mediaObj = images[currentIndex];

    if (mediaObj.video) {
        mediaSlides.innerHTML = `
        <video src="assets/photographers/${mediaObj.photographerId}/${mediaObj.video}" alt="${mediaObj.title}" class="modal-video" controls="true">
        <figcaption>${mediaObj.title}</figcaption>
        `;
    } else {
        mediaSlides.innerHTML = `
        <img src="assets/photographers/${mediaObj.photographerId}/${mediaObj.image}" alt="${mediaObj.title}" class="modal-image">
        <figcaption>${mediaObj.title}</figcaption>
        `;
    }

    prevBtn.addEventListener("click", () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        showSlide(prevIndex);
    });

    nextBtn.addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % images.length;
        showSlide(nextIndex);
    });

    closeModal.addEventListener("click", closeMediaModal)

    document.addEventListener("keydown", (e) => {
        if(mediaModal.getAttribute("aria-hidden") === "false"){
            if(e.key === '37'){
            const prevIndex = (currentIndex - 1);
            showSlide(prevIndex);
            } else if (e.key === '39'){
                const nextIndex = (currentIndex + 1) % images.length;
                showSlide(nextIndex);
            }
        }
    });
}


init();
