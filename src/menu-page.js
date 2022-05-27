import { createNavbar, createFooter } from "./main-page";

export function createMenu() {
    const contentDiv = document.getElementById('content');
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.classList.add('menu-container');
    contentDiv.appendChild(container);
    createNavbar();
    const menuContent = document.createElement('div');
    menuContent.classList.add('menu-content');
    menuContent.setAttribute('id', 'page-content-container');
    container.appendChild(menuContent);
    const menuHeader = document.createElement('div');
    menuHeader.classList.add('menu-header');
    menuContent.appendChild(menuHeader);
    const menuHeaderH1 = document.createElement('h1');
    menuHeaderH1.innerText = 'Menu';
    menuHeader.appendChild(menuHeaderH1);
    const menuSelector = document.createElement('div');
    menuSelector.classList.add('menu-selector');
    menuContent.appendChild(menuSelector);
    const antipasto = document.createElement('button');
    antipasto.setAttribute('id', 'antipasto');
    antipasto.innerText = 'Antipasto';
    menuSelector.appendChild(antipasto);
    const soupSalad = document.createElement('button');
    soupSalad.setAttribute('id', 'soup-salad');
    soupSalad.innerText = 'Soup & Salad'
    menuSelector.appendChild(soupSalad);
    const pizzaPasta = document.createElement('button');
    pizzaPasta.setAttribute('id', 'pizza-pasta');
    pizzaPasta.innerText = 'Pizza & Pasta';
    menuSelector.appendChild(pizzaPasta);
    const meatSeafood = document.createElement('button');
    meatSeafood.setAttribute('id', 'meat-seafood');
    meatSeafood.innerText = 'Meat & Seafood';
    menuSelector.appendChild(meatSeafood);
    const deserts = document.createElement('button');
    deserts.setAttribute('id', 'desserts');
    deserts.innerText = 'Desserts';
    menuSelector.appendChild(deserts);
    const menuDisplayContainer = document.createElement('div');
    menuDisplayContainer.setAttribute('id', 'menu-display-container');
    menuContent.appendChild(menuDisplayContainer)
    addAntipasto();
    createFooter();
}

export function addAntipasto() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const antipastoTitle = document.createElement('h2');
    antipastoTitle.classList.add('menu-title');
    antipastoTitle.innerText = 'Antipasto';
    menuDisplay.appendChild(antipastoTitle);

    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'Mac & Cheese Poppers de Napoli';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Classic american mac and cheese prepared in an authentic fritto preparation from the city of Naples';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '8';
    menuItem1.appendChild(menuItem1P2);
    
    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'Prosciutto by the Pound';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'A heaping plate of prosciutto for you and your party to dine on. Served with crostini.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = 'market';
    menuItem2.appendChild(menuItem2P2);
    
    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = 'Oysters Randal';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'Our chef\'s take on the classic Oysters Rockerfeller. Voted Treton\'s best starter in 2017.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '11';
    menuItem3.appendChild(menuItem3P2);
    
    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Bang Bang Calarmari';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'Tender calamari rings dusted with parmesan and covered in a creamy and spicy sauce.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '10';
    menuItem4.appendChild(menuItem4P2);
    
    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuDisplay.appendChild(menuItem5);
    const menuItem5H2 = document.createElement('h2');
    menuItem5H2.innerText = 'Formaggio Fondue Fountain';
    menuItem5.appendChild(menuItem5H2);
    const menuItem5P1 = document.createElement('p');
    menuItem5P1.innerText = 'Fondue fountain loaded with jack cheese and served with all requisite accoutrements.';
    menuItem5.appendChild(menuItem5P1);
    const menuItem5P2 = document.createElement('p');
    menuItem5P2.innerText = '2 per minute';
    menuItem5.appendChild(menuItem5P2);


}


export function addSoupSalad() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const menuTitle = document.createElement('div');
    menuDisplay.appendChild(menuTitle);
    const menuTitleH2 = document.createElement('h2');
    menuTitleH2.classList.add('menu-title');
    menuTitleH2.innerText = 'Soup & Salad';
    menuTitle.appendChild(menuTitleH2);
    const menuTitleP1 = document.createElement('p');
    menuTitleP1.classList.add('menu-title-p')
    menuTitleP1.innerText = 'Dressings: Creamy Italian, Ranch, Thousand Island, Honey Mustard';
    menuTitle.appendChild(menuTitleP1);

    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'House Salad';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Iceberg lettuce, grape tomatoes, cucumbers, carrots. Choice of dressing';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '7.5';
    menuItem1.appendChild(menuItem1P2);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'Caesar Salad';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'Classic caesar salad topped with a heaping glob of caesar dressing made fresh everyday.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = '8';
    menuItem2.appendChild(menuItem2P2);

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = 'Tuscan Formaggio Salad';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'A selection cubbed cheeses tossed together with dressing of your choice.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '10';
    menuItem3.appendChild(menuItem3P2);

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Alfredo Soup Bread Bowl';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'Bread bowl baked each morning by our chefs. Filled with a delectable alfredo-based soup.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '11';
    menuItem4.appendChild(menuItem4P2);

    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuDisplay.appendChild(menuItem5);
    const menuItem5H2 = document.createElement('h2');
    menuItem5H2.innerText = 'Double Cream Lobster Bisque';
    menuItem5.appendChild(menuItem5H2);
    const menuItem5P1 = document.createElement('p');
    menuItem5P1.innerText = 'Creamy lobster bisque made from the world-famous Italian lobster variety langoustine.';
    menuItem5.appendChild(menuItem5P1);
    const menuItem5P2 = document.createElement('p');
    menuItem5P2.innerText = '10';
    menuItem5.appendChild(menuItem5P2);

    const menuItem6 = document.createElement('div');
    menuItem6.classList.add('menu-item');
    menuDisplay.appendChild(menuItem6);
    const menuItem6H2 = document.createElement('h2');
    menuItem6H2.innerText = 'Soup DuJour';
    menuItem6.appendChild(menuItem6H2);
    const menuItem6P1 = document.createElement('p');
    menuItem6P1.innerText = 'Hot or Cold \"Chef Randal\'s Whim\"';
    menuItem6.appendChild(menuItem6P1);
    const menuItem6P2 = document.createElement('p');
    menuItem6P2.innerText = 'market';
    menuItem6.appendChild(menuItem6P2);
}

export function addPizzaPasta() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const pizzaTitle = document.createElement('h2');
    pizzaTitle.classList.add('menu-title');
    pizzaTitle.innerText = 'Pizza';
    menuDisplay.appendChild(pizzaTitle);

    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'Sicilian Meat Lovers';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Thin crust pizza stacked high with a layer each of salami, pepperoni, ground beef, ground italian sausage, bacon, and sliced ham';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '21';
    menuItem1.appendChild(menuItem1P2);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'The Fisherman\'s Wife';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'Gorgonzola pizza topped with an entire octopus personally tenderized by our team of chefs.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = '19';
    menuItem2.appendChild(menuItem2P2);

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = 'Pizza alla Yorba Linda';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'Pizza topped with cottage cheese and sliced pineapple.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '17';
    menuItem3.appendChild(menuItem3P2);

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Quattro Fromaggi Pizza';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'Pizza topped with part-skim mozzarella, jack cheese, colby cheese, and Velveeta® cheese.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '16';
    menuItem4.appendChild(menuItem4P2);

    const pastaTitle = document.createElement('h2');
    pastaTitle.classList.add('menu-title');
    pastaTitle.classList.add('menu-item-top-space')
    pastaTitle.innerText = 'Pasta';
    menuDisplay.appendChild(pastaTitle);

    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuDisplay.appendChild(menuItem5);
    const menuItem5H2 = document.createElement('h2');
    menuItem5H2.innerText = 'Spaghetti with New Jersey\'s Biggest Meatballs';
    menuItem5.appendChild(menuItem5H2);
    const menuItem5P1 = document.createElement('p');
    menuItem5P1.innerText = 'Spaghetti with 3 large meatballs topped with tomato sauce. Same as our classic dish, just with a name change that reflects order from NJ Division of EEO/AA.';
    menuItem5.appendChild(menuItem5P1);
    const menuItem5P2 = document.createElement('p');
    menuItem5P2.innerText = '18';
    menuItem5.appendChild(menuItem5P2);

    const menuItem6 = document.createElement('div');
    menuItem6.classList.add('menu-item');
    menuDisplay.appendChild(menuItem6);
    const menuItem6H2 = document.createElement('h2');
    menuItem6H2.innerText = 'Mozzarella Stick Parmigiana';
    menuItem6.appendChild(menuItem6H2);
    const menuItem6P1 = document.createElement('p');
    menuItem6P1.innerText = 'A bed of mozzarela sticks topped with mozzarella cheese and served over spaghetti with tomato sauce.';
    menuItem6.appendChild(menuItem6P1);
    const menuItem6P2 = document.createElement('p');
    menuItem6P2.innerText = '16';
    menuItem6.appendChild(menuItem6P2);

    const menuItem7 = document.createElement('div');
    menuItem7.classList.add('menu-item');
    menuDisplay.appendChild(menuItem7);
    const menuItem7H2 = document.createElement('h2');
    menuItem7H2.innerText = 'Barbecue Chicken Lasagna';
    menuItem7.appendChild(menuItem7H2);
    const menuItem7P1 = document.createElement('p');
    menuItem7P1.innerText = 'A portion of our reknowned seven-layer lasagna made with layers of juicy chicken and barbecue sauce.';
    menuItem7.appendChild(menuItem7P1);
    const menuItem7P2 = document.createElement('p');
    menuItem7P2.innerText = '19';
    menuItem7.appendChild(menuItem7P2);

    const menuItem8 = document.createElement('div');
    menuItem8.classList.add('menu-item');
    menuDisplay.appendChild(menuItem8);
    const menuItem8H2 = document.createElement('h2');
    menuItem8H2.innerText = 'Spaghetti Napolitan (ナポリタン)';
    menuItem8.appendChild(menuItem8H2);
    const menuItem8P1 = document.createElement('p');
    menuItem8P1.innerText = 'A sumptuous treat from the far east. Green peppers, smoked sausage, and onions in a tomato ketchup based sauce.';
    menuItem8.appendChild(menuItem8P1);
    const menuItem8P2 = document.createElement('p');
    menuItem8P2.innerText = '17';
    menuItem8.appendChild(menuItem8P2);
}


export function addMeatSeafood() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const meatTitle = document.createElement('h2');
    meatTitle.classList.add('menu-title');
    meatTitle.innerText = 'Meat & Chicken Entrées';
    menuDisplay.appendChild(meatTitle);


    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'Carbonara Steak';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Thick-cut New York Strip cooked to your desired doneness. Cubbed and tossed in an egg based carbonara sauce.';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '26';
    menuItem1.appendChild(menuItem1P2);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'Italian Nachos';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'A generous plate of steak nachos topped with alfredo suace.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = '23';
    menuItem2.appendChild(menuItem2P2);

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = 'Sanguinaccio on a Bun';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'Two juicy saguinaccio suasages on fresh made hot dog buns.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '22';
    menuItem3.appendChild(menuItem3P2);

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Trippa alla Jersey';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'Our chef\'s take on the classic trippa alla Romana. Tripe slathered in a New Jersey style Sunday gravy.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '19';
    menuItem4.appendChild(menuItem4P2);

    const seafoodTitle = document.createElement('h2');
    seafoodTitle.classList.add('menu-title');
    seafoodTitle.classList.add('menu-item-top-space')
    seafoodTitle.innerText = 'Seafood';
    menuDisplay.appendChild(seafoodTitle);

    const menuItem5 = document.createElement('div');
    menuItem5.classList.add('menu-item');
    menuDisplay.appendChild(menuItem5);
    const menuItem5H2 = document.createElement('h2');
    menuItem5H2.innerText = 'Shrimp Fritto';
    menuItem5.appendChild(menuItem5H2);
    const menuItem5P1 = document.createElement('p');
    menuItem5P1.innerText = 'Fried shrimp covered in some of chef Randall\'s special sauce.';
    menuItem5.appendChild(menuItem5P1);
    const menuItem5P2 = document.createElement('p');
    menuItem5P2.innerText = '25';
    menuItem5.appendChild(menuItem5P2);

    const menuItem6 = document.createElement('div');
    menuItem6.classList.add('menu-item');
    menuDisplay.appendChild(menuItem6);
    const menuItem6H2 = document.createElement('h2');
    menuItem6H2.innerText = 'Losters Trenton';
    menuItem6.appendChild(menuItem6H2);
    const menuItem6P1 = document.createElement('p');
    menuItem6P1.innerText = 'Freshwater lobsters caught fresh in the very canal on which our restaurant sits. Steamed and served with a lemon butter sauce.';
    menuItem6.appendChild(menuItem6P1);
    const menuItem6P2 = document.createElement('p');
    menuItem6P2.innerText = '27';
    menuItem6.appendChild(menuItem6P2);

    const menuItem7 = document.createElement('div');
    menuItem7.classList.add('menu-item');
    menuDisplay.appendChild(menuItem7);
    const menuItem7H2 = document.createElement('h2');
    menuItem7H2.innerText = 'Sorpresa di Polpo';
    menuItem7.appendChild(menuItem7H2);
    const menuItem7P1 = document.createElement('p');
    menuItem7P1.innerText = 'An entire octopus boiled for hours until tender. Served in own juices. Please call ahead to ensure your order is out in a timely manner.';
    menuItem7.appendChild(menuItem7P1);
    const menuItem7P2 = document.createElement('p');
    menuItem7P2.innerText = '32';
    menuItem7.appendChild(menuItem7P2);
}


export function addDessert() {
    const menuDisplayContainer = document.getElementById('menu-display-container');
    const menuDisplay = document.createElement('div');
    menuDisplay.classList.add('menu-display');
    menuDisplay.setAttribute('id', 'menu-display');
    menuDisplayContainer.appendChild(menuDisplay);

    const desertTitle = document.createElement('h2');
    desertTitle.classList.add('menu-title');
    desertTitle.innerText = 'Desserts';
    menuDisplay.appendChild(desertTitle);


    const menuItem1 = document.createElement('div');
    menuItem1.classList.add('menu-item');
    menuDisplay.appendChild(menuItem1);
    const menuItem1H2 = document.createElement('h2');
    menuItem1H2.innerText = 'Randal\'s Baked Alaska™';
    menuItem1.appendChild(menuItem1H2);
    const menuItem1P1 = document.createElement('p');
    menuItem1P1.innerText = 'Chef Randal\'s famed baked alaska. Known for its large size, this desert towers more than two feet high.';
    menuItem1.appendChild(menuItem1P1);
    const menuItem1P2 = document.createElement('p');
    menuItem1P2.innerText = '25';
    menuItem1.appendChild(menuItem1P2);

    const menuItem2 = document.createElement('div');
    menuItem2.classList.add('menu-item');
    menuDisplay.appendChild(menuItem2);
    const menuItem2H2 = document.createElement('h2');
    menuItem2H2.innerText = 'Salame di Cioccolato';
    menuItem2.appendChild(menuItem2H2);
    const menuItem2P1 = document.createElement('p');
    menuItem2P1.innerText = 'A few delectable slices of this famous Italian desert. Contains meat and/or meat products.';
    menuItem2.appendChild(menuItem2P1);
    const menuItem2P2 = document.createElement('p');
    menuItem2P2.innerText = '12';
    menuItem2.appendChild(menuItem2P2);

    const menuItem3 = document.createElement('div');
    menuItem3.classList.add('menu-item');
    menuDisplay.appendChild(menuItem3);
    const menuItem3H2 = document.createElement('h2');
    menuItem3H2.innerText = '4-inch Torrone';
    menuItem3.appendChild(menuItem3H2);
    const menuItem3P1 = document.createElement('p');
    menuItem3P1.innerText = 'A piece of torrone measuring 4 inches in depth.';
    menuItem3.appendChild(menuItem3P1);
    const menuItem3P2 = document.createElement('p');
    menuItem3P2.innerText = '13';
    menuItem3.appendChild(menuItem3P2);

    const menuItem4 = document.createElement('div');
    menuItem4.classList.add('menu-item');
    menuDisplay.appendChild(menuItem4);
    const menuItem4H2 = document.createElement('h2');
    menuItem4H2.innerText = 'Jello di Colosseo';
    menuItem4.appendChild(menuItem4H2);
    const menuItem4P1 = document.createElement('p');
    menuItem4P1.innerText = 'A dessert gelatin molded in the shape of the colosseum.';
    menuItem4.appendChild(menuItem4P1);
    const menuItem4P2 = document.createElement('p');
    menuItem4P2.innerText = '11';
    menuItem4.appendChild(menuItem4P2);

}