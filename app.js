document.addEventListener("DOMContentLoaded", () => {
  board();
  cardGenerator();
});

const state = {
  firstCard: null,
  secondCard: null,
  lockBoard: false,
  matches: 0,
};

const cardData = [
  { imgSrc: "./images/Ace.jpg", name: "Ace" },
  { imgSrc: "./images/gojo.jpg", name: "Gojo" },
  { imgSrc: "./images/goku.jpg", name: "Goku" },
  { imgSrc: "./images/kakashi.jpg", name: "Kakashi" },
  { imgSrc: "./images/law.jpg", name: "Law" },
  { imgSrc: "./images/luffy.jpg", name: "Luffy" },
  { imgSrc: "./images/shanks.jpg", name: "Shanks" },
  { imgSrc: "./images/sukuna.jpg", name: "Sukuna" },
  { imgSrc: "./images/uppermoon.jpg", name: "Upper Moon" },
];

const totalPairs = cardData.length;

const board = () => {
  const resetButton = document.querySelector("#reset-button");
  const matches = document.querySelector(".matches");

  if (matches) {
    matches.textContent = `0/${totalPairs}`;
  }

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      state.firstCard = null;
      state.secondCard = null;
      state.lockBoard = false;
      state.matches = 0;
      if (matches) {
        matches.textContent = `0/${totalPairs}`;
      }
      cardGenerator();
    });
  }
};

const checkForMatch = () => {
  const isMatch = state.firstCard.dataset.name === state.secondCard.dataset.name;

  if (isMatch) {
    state.firstCard.classList.add("matched");
    state.secondCard.classList.add("matched");
    state.firstCard.style.pointerEvents = "none";
    state.secondCard.style.pointerEvents = "none";
    state.matches += 1;

    const matches = document.querySelector(".matches");
    if (matches) {
      matches.textContent = `${state.matches}/${totalPairs}`;
    }

    state.firstCard = null;
    state.secondCard = null;
    state.lockBoard = false;
    return;
  }

  setTimeout(() => {
    state.firstCard.classList.remove("flipped");
    state.secondCard.classList.remove("flipped");
    state.firstCard = null;
    state.secondCard = null;
    state.lockBoard = false;
  }, 700);
};

const cardGenerator = () => {
  const section = document.querySelector("section");
  if (!section) return;

  const deck = [...cardData, ...cardData]
    .map((item, index) => ({ ...item, id: `${item.name}-${index}` }))
    .sort(() => Math.random() - 0.5);

  section.innerHTML = "";

  deck.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = item.name;
    card.id = item.id;

    const face = document.createElement("img");
    face.classList.add("face");
    face.src = item.imgSrc;
    face.alt = item.name;

    const back = document.createElement("div");
    back.classList.add("back");

    card.appendChild(face);
    card.appendChild(back);
    section.appendChild(card);

    card.addEventListener("click", () => {
      if (state.lockBoard || card === state.firstCard || card.classList.contains("flipped")) {
        return;
      }

      card.classList.add("flipped");

      if (!state.firstCard) {
        state.firstCard = card;
        return;
      }

      state.secondCard = card;
      state.lockBoard = true;
      checkForMatch();
    });
  });
};