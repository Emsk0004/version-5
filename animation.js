window.addEventListener("load", sidenVises);

// Opretter vaiabler
let point;
let liv;

// Const
const zombie1 = document.querySelector("#zombie_container");
const mand1 = document.querySelector("#mand_container");

function sidenVises() {
  console.log("sidenVises");
  // Skjul andre skærme
  // Vis start skærm
  // Gør startknap klikbar
  startSpillet(); //HUSK AT SLETTE DETTE TIL SIDST; DET ER KUN FORDI DER INGEN START KNAP ER
}

function startSpillet() {
  console.log("startSpillet");

  // Skjul andre skærme
  // Nulstil point og liv
  point = 0;
  liv = 3;

  // Skriv point og liv ud
  document.querySelector("#score_board").textContent = "Point = " + point;
  document.querySelector("#liv1").classList.remove("gray");
  document.querySelector("#liv2").classList.remove("gray");
  document.querySelector("#liv3").classList.remove("gray");

  // Start timer-animation
  document.querySelector("#time_sprite").classList.add("time");

  // Timer er færdig
  document.querySelector("#time_sprite").addEventListener("animationend", MandClickReset);

  // Drop-animationer + Random position og random delay

  zombie1.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4));
  // INGEN DELAY PÅ MANDEN
  mand1.classList.add("drop", "pos" + nyRand(6));

  // Start drop-animationer på elementer
  zombie1.classList.add("drop");
  mand1.classList.add("drop");

  // Gør begge elementer klikbare
  zombie1.addEventListener("mousedown", zombieClickHandler);
  mand1.addEventListener("mousedown", mandClickHandler);

  // Lyt efter drop-animation på zombie kørt en gang
  zombie1.addEventListener("animationiteration", ZombieDropReset);
  mand1.addEventListener("animationiteration", MandDropReset);

  // Lyt efter timer-animation er færdig
}

function zombieClickHandler() {
  console.log("zombieClickHandler");

  // Fjern dobbelt klik
  zombie1.removeEventListener("mousedown", zombieClickHandler);

  // frys drop animation
  zombie1.classList.add("frys");

  // Få 1 point
  point++;

  // Skriv point ud
  document.querySelector("#score_board").textContent = "Point = " + point;

  // Afspil god lyd
  // Start forsvind-animation

  document.querySelector("#zombie_sprite").classList.add("forsvind");

  //Lyt efter forsvind-animation færdig
  zombie1.addEventListener("animationend", ZombieClickReset);
}

function ZombieClickReset() {
  console.log("ZombieClickReset");

  // Nulstil klasserne på zombien for at fjerne forsvind-animation og tidligere position
  zombie1.classList = ""; // Fjern alle klasser
  document.querySelector("#zombie_sprite").classList = ""; // Fjern forsvind-effekt på sprite

  // Tving reflow for at nulstille animationen
  zombie1.offsetWidth;

  // Tilføj klasserne igen med nye positioner og delay, så zombien starter sin animation forfra
  zombie1.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4));

  // Gør zombien klikbar igen
  zombie1.addEventListener("mousedown", zombieClickHandler);
}

function ZombieDropReset() {
  console.log("ZombieDropReset");

  // Skriv liv ud
  document.querySelector("#liv" + liv).classList.add("gray");

  // Mist et liv
  liv--;

  // Vis element igen
  // Ny random position

  // Genstart drop-animation

  document.querySelector("#zombie_sprite").classList = "";
  zombie1.addEventListener("mousedown", zombieClickHandler);

  zombie1.classList = ""; // Nulstil alle klasser
  zombie1.offsetWidth; // Tving reflow for at nulstille animationen
  zombie1.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4)); // Tilføj klasser igen

  // Tjek om der er liv tilbage
}

function mandClickHandler() {
  console.log("mandClickHandler");

  // Fjern dobbelt klik
  mand1.removeEventListener("mousedown", mandClickHandler);

  // Frys drop animation
  mand1.classList.add("frys");

  // Mist et point
  point--;

  // Skriv point ud
  document.querySelector("#score_board").textContent = "Point = " + point;

  // Afspil dårlig lyd
  // Start forsvind-animation
  document.querySelector("#mand_sprite").classList.add("zoom_in");

  //Lyt efter forsvind-animation færdig
  mand1.addEventListener("animationend", MandClickReset);
}

function MandClickReset() {
  console.log("MandClickReset");

  // Vis element igen
  // Ny random position

  // Genstart drop-animation

  // Fjern alle klasser for at nulstille animation og position
  mand1.classList = ""; // Nulstil klasser på manden
  document.querySelector("#mand_sprite").classList = ""; // Nulstil eventuelle animationer på sprite

  // Tving reflow for at sikre, at klassen nulstilles
  mand1.offsetWidth;

  // Tilføj klasserne igen med ny tilfældig position
  mand1.classList.add("drop", "pos" + nyRand(6));

  // Gør manden klikbar igen
  mand1.addEventListener("mousedown", mandClickHandler);

  // Tjek om der er liv tilbage
}

function MandDropReset() {
  console.log("MandDropReset");

  // Vis element igen
  // Ny random position

  // Genstart drop-animation

  document.querySelector("#mand_sprite").classList = "";
  zombie1.addEventListener("mousedown", mandClickHandler);

  mand1.classList = ""; // Nulstil alle klasser
  mand1.offsetWidth; // Tving reflow for at nulstille animationen
  mand1.classList.add("drop", "pos" + nyRand(6)); // Tilføj klasser igen
}

function stopSpillet() {
  console.log("stopSpillet");

  // Fjern alle animationer
  // Fjern alle eventListerner-ere

  // Tjek om jeg har mere end 10 point
  // Tjek om jeg har liv tilbage
}

function gameOver() {
  console.log("gameOver");

  // Vis gameover skærm

  // Gør genstart klikbar
}

function levelComplete() {
  console.log("levelComplete");

  // Vis levelcomplete skærm

  // Gør genstart klikbar
}

function nyRand(max) {
  return Math.floor(Math.random() * max) + 1;
}
