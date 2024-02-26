"use strict";

const chBoxy = document.querySelectorAll("input[type='checkbox']");
const celkem = document.querySelector(".celkem");
const btnSpocitat = document.querySelector(".btn-spocitat");
const kusy = document.querySelectorAll("input[type='number']");
const dny = document.querySelector("select");
const radia = document.querySelectorAll("input[name='cyklonosic']");
const kolikOchotenZaplatit = document.querySelector(".kolik-ochoten-zaplatit");
const vypisOchotenZaplatit = document.querySelector(".text-cena-ok");
const btnOdeslat = document.querySelector(".btn-odeslat");
const btnVynulovat = document.querySelector(".btn-vynulovat");
const email = document.querySelector(".input-email");

// proměnné
let suma = 0;
let pocetDni;
celkem.textContent = suma;

// Podmínka, pokud není zakliknuto, tak ks jsou šedé
for (let i = 0; i < chBoxy.length; i++) {
  chBoxy[i].addEventListener("click", function () {
    if (chBoxy[i].checked === true) {
      kusy[i].disabled = false;
      kusy[i].value = 1;
    } else {
      kusy[i].disabled = true;
      kusy[i].value = "";
    }
  });
}

// co se stane při stisknutí tlačítka Spočítat
btnSpocitat.addEventListener("click", function (e) {
  e.preventDefault();
  suma = 0;
  for (let i = 0; i < chBoxy.length; i++) {
    if (chBoxy[i].checked === true) {
      let druh = chBoxy[i].name;
      switch (druh) {
        case "horske": {
          suma += 500 * kusy[i].value * dny.value;
          break;
        }
        case "detske": {
          suma += 200 * kusy[i].value * dny.value;
          break;
        }
        case "silnicni": {
          suma += 1500 * kusy[i].value * dny.value;
          break;
        }
        case "gravel": {
          suma += 2500 * kusy[i].value * dny.value;
          break;
        }
        default:
          break;
      }
    }
  }

  // co se stane při kliknutí na tlačítko Vynulovat
  btnVynulovat.addEventListener("click", function () {
    window.location.reload();
  });

  // zjištění hodnody rádia + přepočet ceny o nosič
  for (let i = 0; i < radia.length; i++) {
    if (radia[i].checked) {
      let druh = radia[i].value;
      switch (druh) {
        case "stresni": {
          suma += suma * 0.05;
          break;
        }
        case "tazne": {
          suma += suma * 0.1;
          break;
        }
        default:
          break;
      }
    }
  }

  celkem.textContent = suma;
  if (suma == 0) {
    alert("Pro výpočet není vybráno žádné kolo.");
  }
});

// porovnání částky za objednávku s částkou ,kterou je uživatel ochoten zaplatit
kolikOchotenZaplatit.addEventListener("input", function (e) {
  if (e.target.value != 0 && suma > 0) {
    let cenaOchota = parseInt(e.target.value);
    if (cenaOchota >= suma) {
      vypisOchotenZaplatit.textContent =
        ":-) Hodnota objednávky je nižší popř. stejná než jste ochoten zaplatit.";
      vypisOchotenZaplatit.style.backgroundColor = "#1c501c";
      vypisOchotenZaplatit.style.color = "white";
    } else if (cenaOchota < suma) {
      vypisOchotenZaplatit.textContent =
        ":-/ Hodnota objednávky je vyšší než jste ochoten zaplatit.";
      vypisOchotenZaplatit.style.backgroundColor = "#971515";
      vypisOchotenZaplatit.style.color = "white";
    }
    celkem.textContent = suma;
  }
});

// tlačítko odeslat se stane aktivním pokud je zadán správně email
email.addEventListener("input", function () {
  if (email.value.length > 5 && email.value.indexOf("@") > 1 && suma != 0) {
    btnOdeslat.disabled = false;
  } else {
    btnOdeslat.disabled = true;
  }
});
