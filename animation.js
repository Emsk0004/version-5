window.addEventListener("load", sidenVises);

// Opretter vaiabler
let point;
let liv;
let mySpeed;

// Const
const zombie1 = document.querySelector("#zombie_container");
const zombie2 = document.querySelector("#zombie_container1");
const zombie3 = document.querySelector("#zombie_container2");
const mand1 = document.querySelector("#mand_container");
const mand2 = document.querySelector("#mand_container1");

function sidenVises() {
  console.log("sidenVises");
  // Skjul andre skærme

  document.querySelector("#game_over").classList.add("skjul");
  document.querySelector("#level_complete").classList.add("skjul");

  // Vis start skærm
  document.querySelector("#start").classList.remove("skjul");

  // Gør startknap klikbar
  document.querySelector("#start_knap").addEventListener("click", startSpillet);
}

function startSpillet() {
  console.log("startSpillet");

  // Skjul andre skærme

  document.querySelector("#game_over").classList.add("skjul");
  document.querySelector("#level_complete").classList.add("skjul");
  document.querySelector("#start").classList.add("skjul");

  // Nulstil point og liv
  point = 0;
  liv = 3;

  //Nulstil mySpeed
  mySpeed = 1;

  // Skriv point og liv ud
  document.querySelector("#score_board").textContent = "Point = " + point;
  document.querySelector("#liv1").classList.remove("gray");
  document.querySelector("#liv2").classList.remove("gray");
  document.querySelector("#liv3").classList.remove("gray");

  // Start timer-animation
  document.querySelector("#time_sprite").classList.add("time");

  // Timer er færdig
  document.querySelector("#time_sprite").addEventListener("animationend", stopSpillet);

  // Drop-animationer + Random position og random delay og speed

  zombie1.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4), "speed" + mySpeed);
  zombie2.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4), "speed" + mySpeed);
  zombie3.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4), "speed" + mySpeed);
  mand1.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4), "speed" + mySpeed);
  // INGEN DELAY PÅ DEN ENE MAND
  mand2.classList.add("drop", "pos" + nyRand(6), "speed" + mySpeed);

  // Gør begge elementer klikbare
  zombie1.addEventListener("mousedown", zombieClickHandler);
  zombie2.addEventListener("mousedown", zombieClickHandler);
  zombie3.addEventListener("mousedown", zombieClickHandler);
  mand1.addEventListener("mousedown", mandClickHandler);
  mand2.addEventListener("mousedown", mandClickHandler);

  // Lyt efter drop-animation på zombie kørt en gang
  zombie1.addEventListener("animationiteration", ZombieDropReset);
  zombie2.addEventListener("animationiteration", ZombieDropReset);
  zombie3.addEventListener("animationiteration", ZombieDropReset);
  mand1.addEventListener("animationiteration", MandDropReset);
  mand2.addEventListener("animationiteration", MandDropReset);
}

function zombieClickHandler() {
  console.log("zombieClickHandler");

  console.log(this);

  // Fjern dobbelt klik
  this.removeEventListener("mousedown", zombieClickHandler);

  // frys drop animation
  this.classList.add("frys");

  // Få 1 point
  point++;

  // Skriv point ud
  document.querySelector("#score_board").textContent = "Point = " + point;

  // Afspil god lyd

  // Undersøg om points er 2 eller derover, hvis den er det sæt speed til 2

  // på 5 points skal speed blive 3

  if (point >= 5) {
    // hvis det er sandt
    mySpeed = 3;
  } else if (point >= 2) {
    // hvis det er sandt
    mySpeed = 2;
  }

  // Start forsvind-animation

  this.firstElementChild.classList.add("forsvind");

  //Lyt efter forsvind-animation færdig
  this.addEventListener("animationend", ZombieClickReset);
}

function ZombieClickReset() {
  console.log("ZombieClickReset");

  // Nulstil klasserne på zombien for at fjerne forsvind-animation og tidligere position
  this.classList = ""; // Fjern alle klasser
  this.firstElementChild.classList = ""; // Fjern forsvind-effekt på sprite

  // Tving reflow for at nulstille animationen
  this.offsetWidth;

  // Tilføj klasserne igen med nye positioner og delay + speed, så zombien starter sin animation forfra
  this.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4), "speed" + mySpeed);

  // Gør zombien klikbar igen
  this.addEventListener("mousedown", zombieClickHandler);
}

function ZombieDropReset() {
  console.log("ZombieDropReset");

  // Skriv liv ud
  document.querySelector("#liv" + liv).classList.add("gray");

  // Vis element igen
  // Ny random position

  // Genstart drop-animation

  this.firstElementChild.classList = "";
  this.addEventListener("mousedown", zombieClickHandler);

  this.classList = ""; // Nulstil alle klasser
  this.offsetWidth; // Tving reflow for at nulstille animationen
  this.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4), "speed" + mySpeed); // Tilføj klasser igen

  // Mist et liv
  liv--;

  // Tjek om der er liv tilbage
  if (liv <= 0) {
    console.log("Ikke flere liv");
    stopSpillet();
  }
}

function mandClickHandler() {
  console.log("mandClickHandler");

  // Fjern dobbelt klik
  this.removeEventListener("mousedown", mandClickHandler);

  // Frys drop animation
  this.classList.add("frys");

  // Mist et point
  point--;

  // Skriv point ud
  document.querySelector("#score_board").textContent = "Point = " + point;

  // Afspil dårlig lyd
  // Start forsvind-animation
  this.firstElementChild.classList.add("zoom_in");

  //Lyt efter forsvind-animation færdig
  this.addEventListener("animationend", MandClickReset);
}

function MandClickReset() {
  console.log("MandClickReset");

  // Vis element igen
  // Ny random position

  // Genstart drop-animation

  // Fjern alle klasser for at nulstille animation og position
  this.classList = ""; // Nulstil klasser på manden
  this.firstElementChild.classList = ""; // Nulstil eventuelle animationer på sprite

  // Tving reflow for at sikre, at klassen nulstilles
  this.offsetWidth;

  // Tilføj klasserne igen med ny tilfældig position + delay + speed.
  this.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4), "speed" + mySpeed);

  // Gør manden klikbar igen
  this.addEventListener("mousedown", mandClickHandler);
}

function MandDropReset() {
  console.log("MandDropReset");

  // Vis element igen
  // Ny random position

  // Genstart drop-animation

  this.firstElementChild.classList = "";
  this.addEventListener("mousedown", mandClickHandler);

  this.classList = ""; // Nulstil alle klasser
  this.offsetWidth; // Tving reflow for at nulstille animationen
  this.classList.add("drop", "pos" + nyRand(6), "delay" + nyRand(4), "speed" + mySpeed); // Tilføj klasser igen
}

function stopSpillet() {
  console.log("stopSpillet");

  // Fjern timer
  document.querySelector("#time_sprite").classList.remove("time");
  // document.querySelector("#time_sprite").addEventListener("animationend", stopSpillet);

  // Fjern alle animationer og fjern alle eventListerner-ere på zombie
  zombie1.classList = "";
  zombie1.firstElementChild.classList = "";
  zombie1.removeEventListener("animationiteration", ZombieDropReset);
  zombie1.removeEventListener("mousedown", zombieClickHandler);
  zombie1.removeEventListener("animationend", ZombieClickReset);

  zombie2.classList = "";
  zombie2.firstElementChild.classList = "";
  zombie2.removeEventListener("animationiteration", ZombieDropReset);
  zombie2.removeEventListener("mousedown", zombieClickHandler);
  zombie2.removeEventListener("animationend", ZombieClickReset);

  zombie3.classList = "";
  zombie3.firstElementChild.classList = "";
  zombie3.removeEventListener("animationiteration", ZombieDropReset);
  zombie3.removeEventListener("mousedown", zombieClickHandler);
  zombie3.removeEventListener("animationend", ZombieClickReset);

  // Fjern alle animationer og fjern alle eventListerner-ere på mand
  mand1.classList = "";
  mand1.firstElementChild.classList = "";
  mand1.removeEventListener("animationiteration", MandDropReset);
  mand1.removeEventListener("mousedown", mandClickHandler);
  mand1.removeEventListener("animationend", MandClickReset);

  mand2.classList = "";
  mand2.firstElementChild.classList = "";
  mand2.removeEventListener("animationiteration", MandDropReset);
  mand2.removeEventListener("mousedown", mandClickHandler);
  mand2.removeEventListener("animationend", MandClickReset);

  // Tjek om jeg har mere end 10 point

  if (liv <= 0) {
    gameOver();
  } else if (point >= 10) {
    levelComplete();
  }

  // // Tjek om jeg har liv tilbage
  // if (liv <= 0) {
  //   // Hvis det er sandt
  //   console.log("Ikke flere liv");
  //   stopSpillet();
  // }
}

function gameOver() {
  console.log("gameOver");

  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("skjul");
  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", startSpillet);
}

function levelComplete() {
  console.log("levelComplete");

  // Vis levelcomplete skærm
  document.querySelector("#level_complete").classList.remove("skjul");
  // Gør genstart2 klikbar
  document.querySelector("#genstart2").addEventListener("click", startSpillet);
}

function nyRand(max) {
  return Math.floor(Math.random() * max) + 1;
}
