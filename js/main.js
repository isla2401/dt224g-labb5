"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Isac Larsson
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewElements = document.querySelectorAll(".card-info");
const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Rensa array med felmeddelanden
    errors = [];

    // Variabel som håller koll på om någon input är fel
    let validate = true;

    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value.trim() === "") {
        errors.push("Du måste ange ditt fullständiga namn");
        validate = false;
    }
    if (emailInput.value.trim() === "") {
        errors.push("Du måste ange din e-postadress");
        validate = false;
    }
    if (phoneInput.value.trim() === "") {
        errors.push("Du måste ange ditt telefonnummer");
        validate = false;
    }

    // Visa eventuella felmeddelanden
    if (validate === false) {
        displayErrors();
    }

    // Returnera resultatet (true eller false) av valideringen
    return validate;
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    errors.forEach(error => {
        const liEl = document.createElement("li");
        liEl.textContent = error;
        errorList.appendChild(liEl);
    });
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    const fullname = fullnameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const font = fontSelect.value;
    
    // Uppdatera information på studentkortet
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;

    // Ändra font på studentkortet
    previewElements.forEach(element => {
        element.style.fontFamily = font;
    });
    
    // Lägg till studentkortet i historiken

    // Spara och uppdatera historiken
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas
form.addEventListener("submit", (event) =>{
    event.preventDefault();

    // Validera inmatningen och skapa studentkort om valideringen lyckas
    if (validateForm()) {
        createStudentCard();
    }
    
})


// När användaren klickar på "Rensa"


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik