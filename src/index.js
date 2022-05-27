import { createNavbar, createFooter, createMain } from "./main-page";
import { createAbout } from "./about-page";
import { createMenu, addAntipasto, addSoupSalad, addPizzaPasta, addMeatSeafood, addDessert } from "./menu-page";
import { createContact } from "./contact-page";
import { clearContainer, navbarListen } from "./utils"
import "./main.css"

createMain();
navbarListen();
