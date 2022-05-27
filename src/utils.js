import { createNavbar, createFooter, createMain } from "./main-page";
import { createAbout } from "./about-page";
import { createMenu, addAntipasto, addSoupSalad, addPizzaPasta, addMeatSeafood, addDessert } from "./menu-page";
import { createContact } from "./contact-page";

export function clearContainer() {
    const container = document.getElementById('container');
    container.remove();
}

export function navbarListen() {
    const navbarHome = document.getElementById('home-nav-button');
    const navbarMenu = document.getElementById('menu-nav-button');
    const navbarAbout = document.getElementById('about-nav-button');
    const navbarContact = document.getElementById('contact-nav-button');

    navbarHome.addEventListener('click', e => {
        clearContainer();
        createMain();
        navbarListen();
    })
    navbarMenu.addEventListener('click', e => {
        clearContainer();
        createMenu();
        navbarListen();
        menuSelectorListen();
    })
    navbarAbout.addEventListener('click', e => {
        clearContainer();
        createAbout();
        navbarListen();
    })
    navbarContact.addEventListener('click', e => {
        clearContainer();
        createContact();
        navbarListen();
    })


};

export function clearMenuDisplay() {
    const menuDisplay = document.getElementById('menu-display');
    menuDisplay.remove()
}

export function menuSelectorListen() {
    const antipasto = document.getElementById('antipasto');
    const soupSalad = document.getElementById('soup-salad');
    const pizzaPasta = document.getElementById('pizza-pasta');
    const meatSeafood = document.getElementById('meat-seafood');
    const deserts = document.getElementById('desserts');

    antipasto.addEventListener('click', e => {
        clearMenuDisplay()
        addAntipasto();
        menuSelectorListen();
    })

    soupSalad.addEventListener('click', e => {
        clearMenuDisplay()
        addSoupSalad();
        menuSelectorListen();
    })

    pizzaPasta.addEventListener('click', e => {
        clearMenuDisplay()
        addPizzaPasta();
        menuSelectorListen();
    })

    meatSeafood.addEventListener('click', e => {
        clearMenuDisplay()
        addMeatSeafood();
        menuSelectorListen();
    })

    deserts.addEventListener('click', e => {
        clearMenuDisplay()
        addDessert();
        menuSelectorListen();
    })

    
}