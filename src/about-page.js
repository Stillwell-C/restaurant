import { createFooter, createNavbar } from "./main-page";
import { Loader } from "@googlemaps/js-api-loader";
import diningArea from './img/dining-area.jpg';
import bigTony from './img/abdalla-m-uTaSlu2Jfsg-unsplash.jpg'

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
    const mapDiv = document.createElement('div');
    mapDiv.setAttribute('id', 'map');
    aboutHeader.appendChild(mapDiv);
    const loader = new Loader({
        apiKey: "AIzaSyDphUrDCc_FIRm97bUrejtUvW94nTHVCIc",
        version: "weekly",
        });
        
        let restPos = { lat: 40.2235464, lng: -74.7702636 };
        loader.load().then(() => {
        let map = new google.maps.Map(document.getElementById("map"), {
            center: restPos,
            zoom: 18,
        })
        let marker = new google.maps.Marker({
            position: restPos,
            map: map
        })
    });
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
}
