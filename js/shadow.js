export function shadow() {
    const shadowBox = document.querySelector("#shadow");
    shadowBox.addEventListener("click", () => {
        pkmn_img.classList.add(".shadow");
    });
}