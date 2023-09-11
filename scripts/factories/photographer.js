export function photographerTemplate(data) {
    const picture = `assets/photographers/${data.portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const link = document.createElement("a");
        link.href = `photographer.html?id=${data.id}`;
        link.setAttribute("aria-label", `Voir la page de ${data.name}`);
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        const h2 = document.createElement("h2");
        h2.textContent = data.name;
        const infos = document.createElement("div");
        infos.classList.add("photographers-infos");
        const country = document.createElement("h3");
        country.textContent = data.country;
        const tagline = document.createElement("p");
        tagline.textContent = data.tagline;
        const price = document.createElement("span");
        price.textContent = `${data.price}€/jour`;
        article.appendChild(link);
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(infos);
        infos.appendChild(country);
        infos.appendChild(tagline);
        infos.appendChild(price);

        return article;
    }
    return { getUserCardDOM };
}
