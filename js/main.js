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

    // Kontrollera formulärets obligatoriska fält
    if (fullnameInput.value.trim() === "") {
        errors.push("Du måste ange ditt fullständiga namn");
    }
    if (emailInput.value.trim() === "") {
        errors.push("Du måste ange din e-postadress");
    }
    if (phoneInput.value.trim() === "") {
        errors.push("Du måste ange ditt telefonnummer");
    }

    // Visa eventuella felmeddelanden
    displayErrors();

    // Returnera resultatet (true eller false) av valideringen
    if (errors.length === 0) {
        return true;
    } else {
        return false;
    }
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
    // Skapa ett objekt för studentkortet med information från formuläret
    const studentCard = {
        fullname: fullnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        font: fontSelect.value
    };
    
    // Uppdatera förhandsvisningen av studentkortet
    previewFullname.textContent = studentCard.fullname;
    previewEmail.textContent = studentCard.email;
    previewPhone.textContent = studentCard.phone;

    // Uppdatera font på förhandsvisningen
    previewElements.forEach(element => {
        element.style.fontFamily = studentCard.font;
    });
    
    // Lägg till studentkortet i historiken
    history.unshift(studentCard);

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("history", JSON.stringify(history));
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik och uppdatera history
    if (localStorage.getItem("history") !== null) {
        history = JSON.parse(localStorage.getItem("history"));
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    history.forEach(studentCard => {
        // Skapa element i DOM
        const articleEl = document.createElement("article");
        const fullnameEl = document.createElement("p");
        const emailEl = document.createElement("p");
        const phoneEl = document.createElement("p");
        const fontEl = document.createElement("p");

        // Skapa texten för studentkortet
        fullnameEl.textContent = `Namn: ${studentCard.fullname}`;
        emailEl.textContent = `Email: ${studentCard.email}`;
        phoneEl.textContent = `Telefon: ${studentCard.phone}`;
        fontEl.textContent = `Font: ${studentCard.font}`;

        // Lägg in texten i studentkortet
        articleEl.appendChild(fullnameEl);
        articleEl.appendChild(emailEl);
        articleEl.appendChild(phoneEl);
        articleEl.appendChild(fontEl);

        // Styling av studentkortet
        articleEl.style.border = "1px solid #ccc"
        articleEl.style.padding = "0 10px"
        articleEl.style.margin = "10px 0"

        // Visa studentkortet i historiken
        historySection.appendChild(articleEl);
    });
}


/**
 * Rensar formulär och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär
    fullnameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    fontSelect.value = "Georgia";

    // Rensa eventuella felmeddelanden
    errors = [];
    errorList.innerHTML = "";
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("history");

    // Uppdatera history och visningen på sidan
    history = [];
    renderHistory();
}


// Eventlyssnare

// När formuläret skickas
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validera inmatningen och skapa studentkort om valideringen lyckas
    if (validateForm()) {
        createStudentCard();
    }
    
})


// När användaren klickar på "Rensa"
clearButton.addEventListener("click", () => {
    clearForm();
})


// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", () => {
    deleteHistory();
})


// När sidan laddas
document.addEventListener("DOMContentLoaded", () => {
    // läs in och visa eventuell tidigare historik
    loadHistory();
    renderHistory();
})