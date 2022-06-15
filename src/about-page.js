import { createFooter, createNavbar } from "./main-page";
import { Loader } from "@googlemaps/js-api-loader";
import diningArea from './img/dining-area.jpg';
import bigTony from './img/abdalla-m-uTaSlu2Jfsg-unsplash.jpg'
import mozParm from './img/chicken-2308650312.jpg'
import calamari from './img/dushanbe-serena-hotel.jpg'
import pizza from './img/main-qimg-ad38fef62b1b7156b19aeee7e96571d7-lq.jpeg'
import alfredo from './img/worst-pasta-ive-ever.jpg'
import lasagna from './img/same-bad-sauce-smothered.jpg'

export function createAbout() {
    const contentDiv = document.getElementById('content');
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.classList.add('about-container');
    contentDiv.appendChild(container);
    createNavbar();
    const aboutContent = document.createElement('div');
    aboutContent.classList.add('about-content');
    aboutContent.setAttribute('id', 'page-content-container')
    container.appendChild(aboutContent);
    const aboutHeader = document.createElement('div');
    aboutHeader.classList.add('about-header');
    aboutContent.appendChild(aboutHeader);
    const aboutHeaderH1 = document.createElement('h1');
    aboutHeaderH1.innerText = 'Ristorante Ingozzarsi on the Canal';
    aboutHeader.appendChild(aboutHeaderH1);
    const aboutHeaderH3 = document.createElement('h3');
    aboutHeaderH3.innerText = '26 Passaic St, Trenton, NJ 08618';
    aboutHeader.appendChild(aboutHeaderH3);
    const imgCarousel = document.createElement('div');
    imgCarousel.setAttribute('id', 'carousel');
    imgCarousel.classList.add('carousel');
    imgCarousel.setAttribute('aria-label', 'Photos of our wonderful grub')
    aboutHeader.appendChild(imgCarousel);
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('carousel-button');
    prevBtn.classList.add('prev');
    prevBtn.innerText = '⇽';
    imgCarousel.appendChild(prevBtn);
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('carousel-button');
    nextBtn.classList.add('next');
    nextBtn.innerText = '⇾';
    imgCarousel.appendChild(nextBtn);
    const navDiv = document.createElement('div')
    navDiv.classList.add('nav-div')
    imgCarousel.appendChild(navDiv)
    const navRadio1 = document.createElement('div')
    navRadio1.classList.add('img-nav-button')
    navDiv.appendChild(navRadio1)
    const navRadio2 = document.createElement('div')
    navRadio2.classList.add('img-nav-button')
    navDiv.appendChild(navRadio2)
    const navRadio3 = document.createElement('div')
    navRadio3.classList.add('img-nav-button')
    navDiv.appendChild(navRadio3)
    const navRadio4 = document.createElement('div')
    navRadio4.classList.add('img-nav-button')
    navDiv.appendChild(navRadio4)
    const navRadio5 = document.createElement('div')
    navRadio5.classList.add('img-nav-button')
    navRadio5.classList.add('active')
    navDiv.appendChild(navRadio5)

    const slidesList = document.createElement('ul');
    slidesList.classList.add('slides');
    imgCarousel.appendChild(slidesList);
    
    const slide1 = document.createElement('li');
    slide1.classList.add('slide');
    slidesList.appendChild(slide1);
    const slide1Img = document.createElement('img');
    slide1Img.classList.add('slide-img')
    slide1Img.setAttribute('src', mozParm);
    slide1Img.setAttribute('alt', 'Photo of our beautiful mozarella stick parm.');
    slide1.appendChild(slide1Img);

    const slide2 = document.createElement('li');
    slide2.classList.add('slide');
    slidesList.appendChild(slide2);
    const slide2Img = document.createElement('img');
    slide2Img.classList.add('slide-img')
    slide2Img.setAttribute('src', calamari);
    slide2Img.setAttribute('alt', 'Photo of our delectable calamari.');
    slide2.appendChild(slide2Img);

    const slide3 = document.createElement('li');
    slide3.classList.add('slide');
    slidesList.appendChild(slide3);
    const slide3Img = document.createElement('img');
    slide3Img.classList.add('slide-img')
    slide3Img.setAttribute('src', pizza);
    slide3Img.setAttribute('alt', 'Photo of our unrivaled pizza.');
    slide3.appendChild(slide3Img);

    const slide4 = document.createElement('li');
    slide4.classList.add('slide');
    slidesList.appendChild(slide4);
    const slide4Img = document.createElement('img');
    slide4Img.classList.add('slide-img')
    slide4Img.setAttribute('src', alfredo);
    slide4Img.setAttribute('alt', 'Photo of our wonderful alfredo pasta.');
    slide4.appendChild(slide4Img);

    const slide5 = document.createElement('li');
    slide5.classList.add('slide');
    slide5.classList.add('active');
    slidesList.appendChild(slide5);
    const slide5Img = document.createElement('img');
    slide5Img.classList.add('slide-img')
    slide5Img.setAttribute('src', lasagna);
    slide5Img.setAttribute('alt', 'Photo of our scrumptious lasagna.');
    slide5.appendChild(slide5Img);

    carouselBtnEvent(prevBtn);
    carouselBtnEvent(nextBtn);


    const restaurantInfo = document.createElement('div');
    restaurantInfo.classList.add('restaurant-info');
    aboutContent.appendChild(restaurantInfo);
    const restaurantPhoto = document.createElement('div');
    restaurantPhoto.classList.add('restaurant-photo');
    restaurantInfo.appendChild(restaurantPhoto);
    const restaurantInfoHeader = document.createElement('h2');
    restaurantInfoHeader.classList.add('rest-info-header');
    restaurantInfoHeader.innerText = 'Our Story';
    restaurantPhoto.appendChild(restaurantInfoHeader);
    const restaurantPhotoImg = document.createElement('img');
    // restaurantPhotoImg.setAttribute('src', '../src/img/dining-area.jpg');
    restaurantPhotoImg.src = diningArea;
    restaurantPhotoImg.setAttribute('alt', 'Beautiful photo of the interior of Ristorante Ingozzarsi');
    restaurantPhoto.appendChild(restaurantPhotoImg);
    const restaurantText = document.createElement('div');
    restaurantText.classList.add('restaurant-text');
    restaurantInfo.appendChild(restaurantText);
    const restaurantTextPara = document.createElement('p');
    restaurantTextPara.innerText = 'Ristorante Ingozzarsi first opened its doors in 1999 after principal owner and CEO Mike Hagerty earned a windfall from investments in pets.com. Ristorante Ingozzarsi is proud to have served the Trenton community for more than 20 years and looks forward to making lasting memories for each and every one of our guests.'
    restaurantText.appendChild(restaurantTextPara);
    const restaurantTextParaTwo = document.createElement('p');
    restaurantTextParaTwo.innerText = 'Smoke free environment since 2015.'
    restaurantText.appendChild(restaurantTextParaTwo);
    const chefInfo = document.createElement('div');
    chefInfo.classList.add('chef-info');
    aboutContent.appendChild(chefInfo);
    const chefPhoto = document.createElement('div');
    chefPhoto.classList.add('chef-photo');
    chefInfo.appendChild(chefPhoto);
    const chefPhotoImg = document.createElement('img');
    chefPhotoImg.src = bigTony;
    // chefPhotoImg.setAttribute('src', '../src/img/abdalla-m-uTaSlu2Jfsg-unsplash.jpg');
    chefPhotoImg.setAttribute('alt', 'Photo of executive chef Randal \'Big Tony\' Kowolski')
    chefPhoto.appendChild(chefPhotoImg);
    const chefText = document.createElement('div');
    chefText.classList.add('chef-text');
    chefInfo.appendChild(chefText);
    const chefTextH2 = document.createElement('h2');
    chefTextH2.innerText = 'Chef Randal "Big Tony" Kowolski';
    chefText.appendChild(chefTextH2);
    const chefTextP = document.createElement('p');
    chefTextP.innerText = 'Executive chef Randal A. Kowolski has studied under the master Italian chefs of the greater Trenton area for more than 20 years. His life journey has allowed him to explore the depths of Italian cuisine and emboldened him to experiment with the timeless culinary history. As Randal always says, \"When your here, you\'re a member of my family\"'
    chefText.appendChild(chefTextP);
    createFooter();
    
    advanceSlider();
}


function carouselBtnEvent(button) {
    button.addEventListener('click', () => {
        const offset = button.classList.contains('next') ? 1 : -1
        advanceSlider(offset);
    })
}

let timeoutId

function advanceSlider(offset = 1) {
    const slides = document.querySelector('.slides')
    const activeSlide = slides.querySelector('.active')
    const navButtonDiv = document.querySelector('.nav-div')
    const activeNavBtn = navButtonDiv.querySelector('.active')
    let newSlideIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newSlideIndex < 0) newSlideIndex = slides.children.length - 1
    if (newSlideIndex >= slides.children.length) newSlideIndex = 0

    slides.children[newSlideIndex].classList.add('active');
    activeSlide.classList.remove('active')

    navButtonDiv.children[newSlideIndex].classList.add('active')
    activeNavBtn.classList.remove('active')

    clearTimeout(timeoutId)
    timeoutId = setTimeout(advanceSlider, 5000)
}