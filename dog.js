const cardContainer = document.getElementById("card-container");

const breedImages = {
    "Golden Retriever": "Images/GoldenRetriever.jpg",
    "German Shepherd": "Images/GermanShepherd.jpg",
    "Labrador Retriever": "Images/LabradorRetriever.jpg",
    "Beagle": "Images/Beagle.jpg",
    "Bulldog": "Images/Bulldog.jpg",
    "Poodle": "Images/Poodle.jpg",
    "Rottweiler": "Images/Rottweiler.jpg",
    "Yorkshire Terrier": "Images/YorkshireTerrier.jpg",
    "Boxer": "Images/Boxer.jpg",
    "Dachshund": "Images/Dachshund.jpg",
    "Siberian Husky": "Images/SiberianHusky.jpg",
    "Doberman Pinscher": "Images/DobermanPinscher.jpg",
    "Shih Tzu": "Images/ShihTzu.jpg",
    "Great Dane": "Images/GreatDane.jpg",
    "Miniature Schnauzer": "Images/MiniatureSchnauzer.jpg",
    "Pembroke Welsh Corgi": "Images/PembrokeWelshCorgi.jpg",
    "Saint Bernard": "Images/SaintBernard.jpg",
    "Shetland Sheepdog": "Images/ShetlandSheepdog.jpg",
    "Dalmatian": "Images/Dalmatian.jpg",
    "Australian Shepherd": "Images/AustralianShepherd.jpg",
    "Border Collie": "Images/BorderCollie.jpg",
    "Basset Hound": "Images/BassetHound.jpg",
    "Chihuahua": "Images/Chihuahua.jpg",
    "Pomeranian": "Images/Pomeranian.jpg"
};

async function getData() {
    const data = await fetch('https://freetestapi.com/api/v1/dogs');
    const openData = await data.json();
    return openData;
}

function cardDisplay(breedName,breedGroup,size,lifespan,colors,description,origin,temperament) {

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
                    <p>${breedName} Group: ${breedGroup}</p>
                    <p>${breedName} Colours: ${colors.map((color)=>color + ' ')}</p>
                    <p>${breedName} Size:  ${size}</p>
                    <p>${breedName} Lifespan: ${lifespan}</p>
                    <p>${breedName} Description: ${description}</p>
                    <p>${breedName} Temperament: ${temperament}</p>
                </div>
            </div>
        </div>`;

    modal.innerHTML = currModal
    document.body.appendChild(modal);
    modal.querySelector('.close').onclick = () => {
        modal.style.display = 'none'; 
    };
}

getData().then((dogArray) => {
    for (let i = 0; i < dogArray.length; i++) {
        const breedName = dogArray[i].name;
        const breedGroup = dogArray[i].breed_group
        const size = dogArray[i].size
        const lifespan = dogArray[i].lifespan
        const imageUrl = breedImages[breedName];
        const colors = dogArray[i].colors
        const description = dogArray[i].description
        const origin = dogArray[i].origin
        const temperament = dogArray[i].temperament
    
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = ()=>cardDisplay(breedName,breedGroup,size,lifespan,colors,description,origin,temperament); // Assign the test function to the onclick event

        card.innerHTML = `
            <img src="${imageUrl}" alt="${dogArray[i].name}">
            <div class="card-content">
                <h2>${dogArray[i].name}</h2>
                <h3>Origin: ${dogArray[i].origin}</h3>
                <a href="" class="btn">Read More...</a>
            </div>
        `;
        cardContainer.appendChild(card);
    }
});
