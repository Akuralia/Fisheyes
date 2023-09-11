"use strict";
import { incrementLikes } from "../pages/photographer.js";
import { openModal } from "../pages/photographer.js";

export function displayPhotographerData(photographer, likes) {
    const photographerHeader = document.querySelector(".photographer-banner");
    const photographerPriceLike = document.getElementById(
        "price-like-container"
    );

    const photographerName = document.createElement("h1");
    photographerName.textContent = photographer.name;
    const locationContainer = document.createElement("div");
    locationContainer.classList.add("photographer-infos");
    const photographerLocation = document.createElement("span");
    photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
    const photographerTagline = document.createElement("p");
    photographerTagline.textContent = photographer.tagline;
    const photographerImage = document.createElement("img");
    photographerImage.setAttribute(
        "src",
        `assets/photographers/${photographer.portrait}`
    );
    photographerImage.setAttribute("alt", `Portrait de ${photographer.name}`);
    photographerImage.classList.add("photographer-image");

    const photographerPrice = document.createElement("p");
    photographerPrice.textContent = `${photographer.price}€/jour`;
    photographerPrice.classList.add("photographer-price");
    const photographerLikesContainer = document.createElement("div");
    photographerLikesContainer.classList.add("likes-container");
    const photographerLikes = document.createElement("span");
    photographerLikes.textContent = likes;
    photographerLikes.classList.add("photographer-likes");
    const likeHeart = document.createElement("i");
    likeHeart.classList.add("fas", "fa-heart", "media-heart");

    locationContainer.appendChild(photographerName);
    locationContainer.appendChild(photographerLocation);
    locationContainer.appendChild(photographerTagline);
    photographerHeader.appendChild(locationContainer);
    photographerHeader.appendChild(photographerImage);
    photographerPriceLike.appendChild(photographerLikesContainer);
    photographerLikesContainer.appendChild(photographerLikes);
    photographerLikesContainer.appendChild(likeHeart);
    photographerPriceLike.appendChild(photographerPrice);

    photographer.media.forEach((media, index) => {
        const picturesContainer = document.getElementById(
            "photographer-pictures"
        );
        const mediaContainer = document.createElement("div");
        mediaContainer.classList.add("media");

        const mediaElement = media.video
            ? document.createElement("video")
            : document.createElement("img");
        mediaElement.addEventListener("click", openModal);

        if (media.video) {
            mediaElement.setAttribute(
                "src",
                `assets/photographers/${photographer.id}/${media.video}`
            );
            mediaElement.setAttribute("type", "video/mp4");
            mediaElement.setAttribute("alt", media.title);
            mediaElement.classList.add("media-video");
            mediaElement.setAttribute("controls", true);
            mediaElement.setAttribute("data-index-number", `${index}`);
        } else {
            mediaElement.setAttribute(
                "src",
                `assets/photographers/${photographer.id}/${media.image}`
            );
            mediaElement.setAttribute("alt", media.title);
            mediaElement.classList.add("media-image");
            mediaElement.setAttribute("data-index-number", `${index}`);
        }
        
        const infosContainer = document.createElement("div");
        infosContainer.classList.add("media-infos");
        const mediaTitle = document.createElement("h2");
        mediaTitle.textContent = media.title;

        const likesContainer = document.createElement("div");
        likesContainer.classList.add("likes");
        const mediaLikes = document.createElement("p");
        mediaLikes.textContent = media.likes;
        mediaLikes.classList.add("media-likes");

        const mediaHeart = document.createElement("i");
        mediaHeart.classList.add("fas", "fa-heart", "media-heart");
        mediaHeart.addEventListener("click", incrementLikes);

        const date = document.createElement("p");
        date.textContent = media.date;
        date.classList.add("media-date", "hidden");

        picturesContainer.appendChild(mediaContainer);
        mediaContainer.appendChild(mediaElement);
        mediaContainer.appendChild(infosContainer);
        infosContainer.appendChild(mediaTitle);
        infosContainer.appendChild(likesContainer);
        infosContainer.appendChild(date);
        likesContainer.appendChild(mediaLikes);
        likesContainer.appendChild(mediaHeart);
    });
}
