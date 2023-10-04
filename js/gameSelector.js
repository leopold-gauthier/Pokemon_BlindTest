export function gameSelector() {
    const shadowBox = document.querySelector("#shadow");
    const blurBox = document.querySelector("#blur");

    shadowBox.addEventListener("click", () => {
        pkmn_img.classList.add(".shadow");
    });

    blurBox.addEventListener("click", () => {
        pkmn_img.classList.add(".blur");
    });
}