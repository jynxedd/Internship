const cardContainer = document.getElementById("card-container");
const searchBar = document.getElementById("search-bar");

const breedImages = {
    "Persian": "Images/Persian.jpg",
    "Siamese": "Images/Siamese.jpg",
    "Maine Coon": "Images/MaineCoon.jpg",
    "Bengal": "Images/Bengal.jpg",
    "Ragdoll": "Images/Ragdoll.jpg",
    "Sphynx": "Images/Sphynx.jpg",
    "Scottish Fold": "Images/ScottishFold.jpg",
    "Abyssinian": "Images/Abyssinian.jpg",
    "British Shorthair": "Images/BritishShorthair.jpg",
    "Russian Blue": "Images/RussianBlue.jpg",
    "Egyptian Mau": "Images/EgyptianMau.jpg",
    "Birman": "Images/Birman.jpg",
    "Turkish Van": "Images/TurkishVan.jpg",
    "Cornish Rex": "Images/CornishRex.jpg",
    "Chartreux": "Images/Chartreux.jpg",
    "American Shorthair": "Images/AmericanShorthair.jpg",
    "Balinese": "Images/Balinese.jpg",
    "Nebelung": "Images/Nebelung.jpg",
    "Singapura": "Images/Singapura.jpg",
    "Tonkinese": "Images/Tonkinese.jpg",
    "Himalayan": "Images/Himalayan.jpg",
    "Devon Rex": "Images/DevonRex.jpg",
    "Manx": "Images/Manx.jpg",
    "Norwegian Forest Cat": "Images/NorwegianForestCat.jpg",
    "Ocicat": "Images/Ocicat.jpg"
};

async function getData() {
    const data = await fetch('https://freetestapi.com/api/v1/cats');
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

getData().then((catArray) => {
    for (let i = 0; i < catArray.length; i++) {
        const breedName = catArray[i].name;
        const breedGroup = catArray[i].breed_group
        const size = catArray[i].size
        const lifespan = catArray[i].lifespan
        const imageUrl = breedImages[breedName];
        const colors = catArray[i].colors
        const description = catArray[i].description
        const origin = catArray[i].origin
        const temperament = catArray[i].temperament
    
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';
        card.onclick = ()=>cardDisplay(breedName,breedGroup,size,lifespan,colors,description,origin,temperament); // Assign the test function to the onclick event

        card.innerHTML = `
            <img src="${imageUrl}" alt="${catArray[i].name}">
            <div class="card-content">
                <h2>${catArray[i].name}</h2>
                <h3>Origin: ${catArray[i].origin}</h3>
                <a href="" class="btn">Read More...</a>
            </div>
        `;
        cardContainer.appendChild(card);
    }

    searchBar.addEventListener('input', (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredCats = catArray.filter(cat => cat.name.toLowerCase().includes(searchValue));
        cardContainer.innerHTML = ''; 
        filteredCats.forEach(cat => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => cardDisplay(
                cat.name,
                cat.breed_group,
                cat.size,
                cat.lifespan,
                cat.colors,
                cat.description,
                cat.origin,
                cat.temperament
            ); 

            card.innerHTML = `
                <img src="${breedImages[cat.name]}" alt="${cat.name}">
                <div class="card-content">
                    <h2>${cat.name}</h2>
                    <h3>Origin: ${cat.origin}</h3>
                    <a href="" class="btn">Read More...</a>
                </div>
            `;
            cardContainer.appendChild(card);
        });
    })
});
