import { createNavbar, createFooter } from "./main-page";
import { Loader } from "@googlemaps/js-api-loader";

export function createContact() {
    const contentDiv = document.getElementById('content');
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.classList.add('contact-container');
    contentDiv.appendChild(container);
    createNavbar();
    const contactContent = document.createElement('div');
    contactContent.classList.add('contact-content');
    contactContent.setAttribute('id', 'page-content-container');
    container.appendChild(contactContent);
    const contactHeader = document.createElement('div');
    contactHeader.classList.add('contact-header');
    contactContent.appendChild(contactHeader);
    const contactHeaderH1 = document.createElement('h1');
    contactHeaderH1.innerText = 'Ristorante Ingozzarsi';
    contactHeader.appendChild(contactHeaderH1)
    const contactHeaderH3One = document.createElement('h3');
    contactHeaderH3One.innerText = '26 Passaic St, Trenton, NJ 08618';
    contactHeader.appendChild(contactHeaderH3One);
    const contactHeaderH3Two = document.createElement('h3');
    contactHeaderH3Two.innerText = '609-571-3230';
    contactHeader.appendChild(contactHeaderH3Two);
    const contactHeaderH3Three = document.createElement('h3');
    contactHeaderH3Three.innerText = 'Open Tues. - Sun. 11am to 10pm';
    contactHeader.appendChild(contactHeaderH3Three);

    const mapDiv = document.createElement('div');
    mapDiv.setAttribute('id', 'map');
    contactHeader.appendChild(mapDiv);
    const loader = new Loader({
        apiKey: "/////",
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

    const form = document.createElement('form');
    form.setAttribute('action', '#');
    form.setAttribute('method', 'post');
    contactContent.appendChild(form);
    const formH2 = document.createElement('h2');
    formH2.innerText = 'Contact Us:';
    form.appendChild(formH2);
    const formUl = document.createElement('ul');
    form.appendChild(formUl);

    const li1 = document.createElement('li');
    li1.classList.add('text-input');
    formUl.appendChild(li1);
    const li1Label = document.createElement('label');
    li1Label.setAttribute('for', 'name');
    li1Label.innerText = 'Name:';
    li1.appendChild(li1Label);
    const li1Input = document.createElement('input');
    li1Input.setAttribute('type', 'text');
    li1Input.setAttribute('id', 'name');
    li1Input.setAttribute('name', 'user_name');
    li1Input.required = true;
    li1.appendChild(li1Input);

    const li2 = document.createElement('li');
    li2.classList.add('text-input');
    formUl.appendChild(li2);
    const li2Label = document.createElement('label');
    li2Label.setAttribute('for', 'mail');
    li2Label.innerText = 'Email:';
    li2.appendChild(li2Label);
    const li2Input = document.createElement('input');
    li2Input.setAttribute('type', 'email');
    li2Input.setAttribute('id', 'mail');
    li2Input.setAttribute('name', 'user_email');
    li2Input.required = true;
    li2.appendChild(li2Input);

    const li3 = document.createElement('li');
    li3.classList.add('text-input');
    formUl.appendChild(li3);
    const li3Label = document.createElement('label');
    li3Label.setAttribute('for', 'msg');
    li3Label.innerText = 'Message:';
    li3.appendChild(li3Label);
    const li3Input = document.createElement('textarea');
    li3Input.setAttribute('cols', '30');
    li3Input.setAttribute('rows', '10');
    li3Input.setAttribute('id', 'msg');
    li3Input.setAttribute('name', 'user_message');
    li3Input.required = true;
    li3.appendChild(li3Input);

    const li4 = document.createElement('li');
    formUl.appendChild(li4);
    const li4Label = document.createElement('label');
    li4Label.setAttribute('for', 'privacy');
    li4Label.classList.add('checkbox-label');
    li4.appendChild(li4Label);
    const li4input = document.createElement('input');
    li4input.setAttribute('type', 'checkbox');
    li4input.setAttribute('id', 'privacy');
    li4input.setAttribute('name', 'privacy');
    li4input.setAttribute('value', 'agree');
    li4input.classList.add('checkbox-input');
    li4input.required = true;
    li4Label.appendChild(li4input);
    const li4LabelSpan = document.createElement('span');
    li4LabelSpan.innerText = 'Agree to our privacy policy and use/sale of personal data.';
    li4Label.appendChild(li4LabelSpan);

    const li5 = document.createElement('li');
    formUl.appendChild(li5);
    const li5Label = document.createElement('label');
    li5Label.setAttribute('for', 'maillist');
    li5Label.classList.add('checkbox-label');
    li5.appendChild(li5Label);
    const li5input = document.createElement('input');
    li5input.setAttribute('type', 'checkbox');
    li5input.setAttribute('id', 'maillist');
    li5input.setAttribute('name', 'maillist');
    li5input.setAttribute('value', 'agree');
    li5input.classList.add('checkbox-input');
    li5Label.appendChild(li5input);
    const li5LabelSpan = document.createElement('span');
    li5LabelSpan.innerText = 'Recieve emails about new dishes and specials.';
    li5Label.appendChild(li5LabelSpan);

    const li6 = document.createElement('li');
    formUl.appendChild(li6);
    const li6Label = document.createElement('label');
    li6Label.setAttribute('for', 'rants');
    li6Label.classList.add('checkbox-label');
    li6.appendChild(li6Label);
    const li6input = document.createElement('input');
    li6input.setAttribute('type', 'checkbox');
    li6input.setAttribute('id', 'rants');
    li6input.setAttribute('name', 'rants');
    li6input.setAttribute('value', 'agree');
    li6input.classList.add('checkbox-input');
    li6input.checked = true;
    li6Label.appendChild(li6input);
    const li6LabelSpan = document.createElement('span');
    li6LabelSpan.innerText = 'Recieve "Randal\'s Rants" emails from our executive chef.';
    li6Label.appendChild(li6LabelSpan);

    const li7 = document.createElement('li');
    li7.classList.add('form-button');
    formUl.appendChild(li7);
    const li7button = document.createElement('button');
    li7button.setAttribute('type', 'submit');
    li7button.innerText = 'Submit';
    li7.appendChild(li7button);


    createFooter();
}