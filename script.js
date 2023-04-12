const playBtn = document.getElementById("play");
const resetBtn = document.getElementById("reset");
const switcherBtns = document.querySelectorAll(".kana-switcher-item");
const testKanaDiv = document.getElementById("test-kana");
const romajiInputDiv = document.getElementById("romaji");
const previousRomajiInputDiv = document.getElementById("last-romaji");
const correctScoreDiv = document.getElementById("correct");
const incorrectScoreDiv = document.getElementById("incorrect");
let leaderBoardObj = {
      times: [],
      correctSores: [],
      incorrectScores: [],
      kanaType: [],
      addScore(time, correct, incorrect, kana) {
            this.times.push(time);
            this.correctSores.push(correct);
            this.incorrectScores.push(incorrect);
            this.kanaType.push(kana);
      },
};
//timer function
function alertIncorrect() {
      const modal = document.getElementById("incorrect-modal");
      modal.style.visibility = "visible";
      // modal.style.display = "block";
      // modal.style.position = "fixed";
      window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                  modal.style.visibility = "hidden";
                  // modal.style.display = "none";
            }
      });
}

function correctScoreSet(score = 0) {
      localStorage.setItem("correctScore", score);
      correctScoreDiv.textContent = score;
}
function incorrectScoreSet(score = 0) {
      localStorage.setItem("incorrectScore", score);
      incorrectScoreDiv.textContent = score;
}
function getCorrectScore() {
      return Number(localStorage.getItem("correctScore"));
}
function getIncorrectScore() {
      return Number(localStorage.getItem("incorrectScore"));
}
const katakana = {
      ア: "a",
      イ: "i",
      ウ: "u",
      エ: "e",
      オ: "o",
      カ: "ka",
      キ: "ki",
      ク: "ku",
      ケ: "ke",
      コ: "ko",
      サ: "sa",
      シ: "shi",
      ス: "su",
      セ: "se",
      ソ: "so",
      タ: "ta",
      チ: "chi",
      ツ: "tsu",
      テ: "te",
      ト: "to",
      ナ: "na",
      ニ: "ni",
      ヌ: "nu",
      ネ: "ne",
      ノ: "no",
      ラ: "ra",
      リ: "ri",
      ル: "ru",
      レ: "re",
      ハ: "ha",
      ヒ: "hi",
      フ: "fu",
      ヘ: "he",
      ホ: "ho",
      マ: "ma",
      ミ: "mi",
      ム: "mu",
      メ: "me",
      モ: "mo",
      ヤ: "ya",
      ユ: "yu",
      ヨ: "yo",
      ロ: "ro",
      ヲ: "wo",
      ン: "n",
};
const hiragana = {
      あ: "a",
      い: "i",
      う: "u",
      え: "e",
      お: "o",
      か: "ka",
      き: "ki",
      く: "ku",
      け: "ke",
      こ: "ko",
      さ: "sa",
      し: "shi",
      す: "su",
      せ: "se",
      そ: "so",
      た: "ta",
      ち: "chi",
      つ: "tsu",
      て: "te",
      と: "to",
      な: "na",
      に: "ni",
      ぬ: "nu",
      ね: "ne",
      の: "no",
      は: "ha",
      ひ: "hi",
      ふ: "fu",
      へ: "he",
      ほ: "ho",
      ま: "ma",
      み: "mi",
      む: "mu",
      め: "me",
      も: "mo",
      や: "ya",
      ゆ: "yu",
      よ: "yo",
      ら: "ra",
      り: "ri",
      る: "ru",
      れ: "re",
      ろ: "ro",
      を: "wo",
      ん: "n",
};
const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
].map((char) => char.toLowerCase());

function resetDOM() {
      romajiInputDiv.value = "";
      previousRomajiInputDiv.value = "";
      testKanaDiv.innerHTML = "&ThickSpace;";
      correctScoreSet();
      incorrectScoreSet();
}

resetDOM();

//Highlight which kana is tested
switcherBtns.forEach((btn) => {
      btn.classList.remove("active-kana");
      if (btn.id === localStorage.getItem("kana")) {
            btn.classList.add("active-kana");
      }
});

function gameType(type) {
      if (type === "both") {
            return { ...katakana, ...hiragana };
      }
      if (type === "hira") {
            return { ...hiragana };
      }
      if (type === "kata") {
            return { ...katakana };
      }
}

function game(type) {
      localStorage.setItem("kana", type);

      let kana = gameType(type);

      resetDOM();

      const randomKana = () => {
            return Object.keys(kana)[
                  Math.floor(Math.random() * Object.keys(kana).length)
            ];
      };

      const check = () => {
            const endCheck = () => {
                  return Object.keys(kana).length === 0;
            };
            let maxLength = () => {
                  console.log(String(kana[testKanaDiv.textContent]).length);
                  return String(kana[testKanaDiv.textContent]).length;
            };

            if (Object.keys(kana).length !== 0) {
                  // if (kana[romajiInputDiv.value] === testKanaDiv.textContent) {
                  if (kana[testKanaDiv.textContent] === romajiInputDiv.value) {
                        correctScoreSet(getCorrectScore() + 1);
                        previousRomajiInputDiv.value = `${
                              // kana[romajiInputDiv.value]
                              testKanaDiv.textContent
                        }   ${romajiInputDiv.value}`;

                        // delete kana[romajiInputDiv.value];
                        delete kana[testKanaDiv.textContent];
                        romajiInputDiv.value = "";
                        if (endCheck()) {
                              alert("game over");
                              window.location.reload();
                        }
                        testKanaDiv.textContent = randomKana();
                  }
                  if (romajiInputDiv.value.length === maxLength()) {
                        incorrectScoreSet(getIncorrectScore() + 1);
                        previousRomajiInputDiv.value = romajiInputDiv.value;
                        alertIncorrect();
                        romajiInputDiv.value = "";
                  }
            }
      };

      testKanaDiv.textContent = randomKana();

      document.addEventListener("keydown", (e) => {
            // check();
            if (e.key === "Backspace" && romajiInputDiv.value.length !== 0) {
                  romajiInputDiv.value = "";
            }
            if (alphabet.includes(e.key)) {
                  romajiInputDiv.value.length >= 3
                        ? (romajiInputDiv.value = e.key)
                        : (romajiInputDiv.value += e.key);
            }

            check();
      });
}

const startGame = () => {
      const gameType = document.querySelector(".active-kana").id;
      // playBtn.classList.remove("active-play");
      // playBtn.classList.add("inactive-play");
      // playBtn.disabled = true;
      playBtn.style.visibility = "invisible";
      playBtn.style.display = "none";
      document.querySelector("#instructions").remove();
      document.querySelector("main").focus();
      game(gameType);
};

playBtn.addEventListener("mousedown", startGame);

switcherBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
            switcherBtns.forEach((switcher) =>
                  switcher.classList.remove("active-kana")
            );
            e.target.classList.add("active-kana");
      });
});

resetBtn.addEventListener("click", () => {
      window.location.reload();
});

const startOnEnterPress = (e) => {
      const kanaSwitcherDiv = document.querySelector("#kana-switcher");
      const activeKana = kanaSwitcherDiv.querySelector(".active-kana");
      const activeKanaIndex = (() => {
            for (let i = 0; i < kanaSwitcherDiv.childElementCount; i++) {
                  if (kanaSwitcherDiv.children[i] === activeKana) {
                        return i;
                  }
            }
      })();
      const iIsNotNull = (index, num) => {
            index += num;
            if (index >= kanaSwitcherDiv.childElementCount) {
                  return 0;
            }
            if (index < 0) {
                  return kanaSwitcherDiv.childElementCount - 1;
            }
            return index;
      };
      if (e.key === "Enter") {
            startGame();
            document.removeEventListener("keydown", startOnEnterPress);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            let indexMod = 0;
            e.key === "ArrowLeft"
                  ? (indexMod = iIsNotNull(activeKanaIndex, -1))
                  : (indexMod = iIsNotNull(activeKanaIndex, 1));
            activeKana.classList.remove("active-kana");
            kanaSwitcherDiv.children[indexMod].classList.add("active-kana");
      }
};
document.addEventListener("keydown", startOnEnterPress);
document.addEventListener("keydown", (e) => {
      if (e.key === "q") {
            window.location.reload();
      }
});
