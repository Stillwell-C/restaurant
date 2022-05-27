export function createMain() {
    const contentDiv = document.getElementById('content');
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.classList.add('main-container');
    contentDiv.appendChild(container);
    createNavbar();
    const words = document.createElement('div');
    words.classList.add('words');
    words.setAttribute('id', 'page-content-container')
    container.appendChild(words);
    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = 'Ristorante Ingozzarsi'
    words.appendChild(name);
    const nameText = document.createElement('div');
    nameText.classList.add('name-text');
    nameText.innerText = 'New Jersey\'s finest Italian eatery'
    words.appendChild(nameText);
    createFooter();
}

export function createNavbar() {
    const container = document.getElementById('container');
    const navBar = document.createElement('div');
    navBar.setAttribute('id', 'navbar');
    container.appendChild(navBar);
    const navButtons = document.createElement('div');
    navButtons.classList.add('nav-buttons');
    navBar.appendChild(navButtons);
    const homeBtn = document.createElement('button');
    homeBtn.setAttribute('id', 'home-nav-button');
    homeBtn.innerText = 'Home';
    navButtons.appendChild(homeBtn);
    const menuBtn = document.createElement('button');
    menuBtn.setAttribute('id', 'menu-nav-button');
    menuBtn.innerText = 'Menu'
    navButtons.appendChild(menuBtn);
    const aboutBtn = document.createElement('button');
    aboutBtn.innerText = 'About'
    aboutBtn.setAttribute('id', 'about-nav-button');
    navButtons.appendChild(aboutBtn);
    const contactBtn = document.createElement('button');
    contactBtn.setAttribute('id', 'contact-nav-button');
    contactBtn.innerText = 'Contact'
    navButtons.appendChild(contactBtn);
}

export function createFooter() {
    const container = document.getElementById('container');
    const footer = document.createElement('div');
    footer.classList.add('footer');
    container.appendChild(footer);
    const footerText = document.createElement('p');
    footerText.innerText = 'Ristorante Ingozzarsi LLC © 2022 | All Rights Reserved';
    footer.appendChild(footerText);
}

