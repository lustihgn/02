const papers = document.querySelectorAll(".paper");
let current = 0;

document.body.addEventListener("click", () => {
    if (current < papers.length) {
        papers[current].classList.add("flipped");
        current++;
    }
});
