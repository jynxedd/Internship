const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("search-bar");

const breedImages = {
    "Bald Eagle": "Images/BaldEagle.jpg",
    "Peacock": "Images/Peacock.jpg",
    "Hornbill": "Images/Hornbill.jpg",
    "Hummingbird": "Images/Hummingbird.jpg",
    "Penguin": "Images/Penguin.jpg",
    "Toucan": "Images/Toucan.jpg",
    "Albatross": "Images/Albatross.jpg",
    "Flamingo": "Images/Flamingo.jpg",
    "Ostrich": "Images/Ostrich.jpg",
    "Snowy Owl": "Images/SnowyOwl.jpg",
    "Toucanet": "Images/Toucanet.jpg",
    "Kingfisher": "Images/Kingfisher.jpg",
    "Puffin": "Images/Puffin.jpg",
    "Blue Jay": "Images/BlueJay.jpg",
    "Emu": "Images/Emu.jpg",
    "Resplendent Quetzal": "Images/ResplendentQuetzal.jpg",
    "Black-browed Albatross": "Images/Black-browedAlbatross.jpg",
    "Swallow-tailed Toucan": "Images/Swallow-tailedToucan.jpg",
    "Swan": "Images/Swan.jpg",
    "Belted Kingfisher": "Images/BeltedKingfisher.jpg", 
    "Horned Puffin": "Images/HornedPuffin.jpg",
    "Roseate Spoonbill": "Images/RoseateSpoonbill.jpg",
    "Eagle": "Images/Eagle.jpg",
    "Rainbow Lorikeet": "Images/RainbowLorikeet.jpg",
    "Channel-billed Toucan": "Images/Channel-billedToucan.jpg",
    "Cassowary": "Images/Cassowary.jpg",
    "Pigeon": "Images/Pigeon.jpg",
    "Golden Pheasant": "Images/GoldenPheasant.jpg",
    "Harpy Eagle": "Images/HarpyEagle.jpg",
    "Laysan Albatross": "Images/LaysanAlbatross.jpg",
    "Emerald Toucanet": "Images/EmeraldToucanet.jpg",
    "Kookaburra": "Images/Kookaburra.jpg",
    "Crowned Crane": "Images/CrownedCrane.jpg",
    "Emperor Penguin": "Images/EmperorPenguin.jpg",
    "Parrot": "Images/Parrot.jpg",
    "Rhea": "Images/Rhea.jpg",
    "Pelican": "Images/Pelican.jpg",
    "Wandering Albatross": "Images/WanderingAlbatross.jpg",
    "Atlantic Puffin": "Images/AtlanticPuffin.jpg",
    "Cockatoo": "Images/Cockatoo.jpg",
    "Keel-billed Toucan": "Images/Keel-billedToucan.jpg",
    "Golden Eagle": "Images/GoldenEagle.jpg",
    "Woodpecker": "Images/Woodpecker.jpg",
    "Common Kestrel": "Images/CommonKestrel.jpg"
};

async function getData() {
    const data = await fetch('https://freetestapi.com/api/v1/birds');
    const openData = await data.json();
    console.log(openData)
    return openData;
}

function cardDisplay(breedName,description,place_of_found,habitat,diet,family,species,weight_kg,wingspan_cm) {

    const modal = document.createElement('div');
    modal.className = 'modalTwo';
    modal.style.display = 'flex'; 
    const currModal = `
        <div class="modal-content">
            <div class="modal-image">
                <img src="${breedImages[breedName]}" alt="${breedName}">
            </div>
            <div class="right">
                <div class="modal-header">
                    <h3>Additional Information</h3>
                    <button class="close">&times;</button>
                </div>
                <div class="modal-text">
                    <p>${breedName} Place Found: ${place_of_found}</p>
                    <p>${breedName} Habitat: ${habitat}</p>
                    <p>${breedName} Diet:  ${diet}</p>
                    <p>${breedName} Family: ${family}</p>
                    <p>${breedName} Species: ${species}</p>
                    <p>${breedName} Weight: ${weight_kg}</p>
                    <p>${breedName} Wing Span: ${wingspan_cm}</p>
                    <p>${breedName} Description: ${description}</p>
                </div>
            </div>
        </div>`;

    modal.innerHTML = currModal
    document.body.appendChild(modal);
    modal.querySelector('.close').onclick = () => {
        modal.style.display = 'none'; 
    };
}

getData().then((birdArray) => {
    for (let i = 0; i < birdArray.length; i++) {
        const breedName = birdArray[i].name;
        const place_of_found = birdArray[i].place_of_found
        const habitat = birdArray[i].habitat
        const diet = birdArray[i].diet
        const imageUrl = breedImages[breedName];
        const family = birdArray[i].family
        const species = birdArray[i].species
        const weight_kg = birdArray[i].weight_kg
        const wingspan_cm = birdArray[i].wingspan_cm
        const description = birdArray[i].description
    
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = ()=>cardDisplay(breedName,description,place_of_found,habitat,diet,family,species,weight_kg,wingspan_cm);

        card.innerHTML = `
            <img src="${imageUrl}" alt="${birdArray[i].name}">
            <div class="card-content">
                <h2>${birdArray[i].name}</h2>
                <h3>Origin: ${birdArray[i].origin}</h3>
                <h3>Read More...</h3>
            </div>
        `;
        cardContainer.appendChild(card);
    }
    searchBar.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredBirds = birdArray.filter(bird => bird.name.toLowerCase().includes(searchValue));
        cardContainer.innerHTML = ''; 
        filteredBirds.forEach(bird => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => cardDisplay(
                bird.name,
                bird.place_of_found,
                bird.habitat,
                bird.diet,
                bird.family,
                bird.species,
                bird.weight_kg,
                bird.wingspan_cm,
                bird.description
            ); 

            card.innerHTML = `
                <img src="${breedImages[bird.name]}" alt="${bird.name}">
                <div class="card-content">
                    <h2>${bird.name}</h2>
                    <h3>Origin: ${bird.origin}</h3>
                    <a href="" class="btn">Read More...</a>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    })
});

