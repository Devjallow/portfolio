
        document.addEventListener('DOMContentLoaded', function () {
            const addListingForm = document.getElementById('addListingForm');

            addListingForm.addEventListener('submit', function (event) {
                event.preventDefault();

                // Retrieve form data
                const title = document.getElementById('listingTitle').value;
                const location = document.getElementById('listingLocation').value;
                const price = document.getElementById('listingPrice').value;
                const description = document.getElementById('listingDescription').value;
                const Agentinfo = document.getElementById('Agentmail').value;
                const imageInput = document.getElementById('listingImage');
                const image = imageInput.files[0];

                // Create a new listing container
                const newListingContainer = document.createElement('div');
                newListingContainer.className = 'listing-container';

                // Create an image element
                const imageElement = document.createElement('img');
                imageElement.src = URL.createObjectURL(image);
                imageElement.alt = 'Listing Image';
                imageElement.className = 'listing-image';

                // Populate the listing container with data
                newListingContainer.appendChild(imageElement);

                newListingContainer.innerHTML += `
                    <div class="list-infor">
                        
                        

                        <div>
                            <h4>${title}</h4>
                            <p>${location}</p>
                        </div>
                    
                        <div>
                            <h4>${price}</h4>
                            <p>${description}</p>
                            <p>Email Agent</p>
                        </div>
                    </div>
                `;

               
                const listingsContainer = document.getElementById('listings');
                listingsContainer.appendChild(newListingContainer);

          
                addListingForm.reset();


                
            });
            const searchInput = document.querySelector('#search-box input');
            const listingsContainer = document.getElementById('listings');

            searchInput.addEventListener('input', function () {
            const searchTerm = searchInput.value.toLowerCase();
            const listingContainers = listingsContainer.querySelectorAll('.listing-container');

            listingContainers.forEach(function (listing) {
                const title = listing.querySelector('h4').innerText.toLowerCase();
                const location = listing.querySelector('p:nth-child(2)').innerText.toLowerCase();

                
                if (title.includes(searchTerm) || location.includes(searchTerm) ) {
                    listing.style.display = 'block';
                } else {
                    listing.style.display = 'none';
                }
            });
        });
        });
        document.addEventListener('DOMContentLoaded', function () {
            const addListingForm = document.getElementById('addListingForm');
            const listingsContainer = document.getElementById('listings');
        
            addListingForm.addEventListener('submit', function (event) {
                event.preventDefault();
        
               
                const title = document.getElementById('listingTitle').value;
                const locationLat = parseFloat(document.getElementById('listingLocationLat').value);
                const locationLog = parseFloat(document.getElementById('listingLocationLog').value);
                const maxRent = parseFloat(document.getElementById('listingPriceMax').value);
                const location = document.getElementById('listingLocation').value;
                const minRent = parseFloat(document.getElementById('listingPriceMin').value);
                const rented = document.getElementById('rented').value === 'true';
                const agentInfo = document.getElementById('Agentmail').value;
                const imageInput = document.getElementById('listingImage');
                const image = imageInput.files[0];
        
                
                const jsonData = {
                    images: ["string"], 
                    latitude: locationLat,
                    location: location,
                    longitude: locationLog,
                    max_rent: maxRent,
                    min_rent: minRent,
                    name: title,
                    owner_id: 0, 
                    rented: rented,
                };
        
               
                fetch('https://embadi43.pythonanywhere.com/rental-listings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(jsonData),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    
                    console.log('Listing added successfully:', data);
        
                   
                    const newListingContainer = document.createElement('div');
                    newListingContainer.className = 'listing-container';
        
                   
                    if (image) {
                       
                        const imageElement = document.createElement('img');
                        imageElement.src = URL.createObjectURL(image);
                        imageElement.alt = 'Listing Image';
                        imageElement.className = 'listing-image';
        
                    
                        newListingContainer.appendChild(imageElement);
                    }
        
                    newListingContainer.innerHTML += `
                        <div class="list-info">
                            <div>
                                <h4>${title}</h4>
                                <p>${location}</p>
                            </div>
                            <div>
                                <h4>${minRent} - ${maxRent}</h4>
                                <p>Rented: ${rented}</p>
                                <button>Email Agent: ${agentInfo}</button>
                            </div>
                        </div>
                    `;
        
                    
                    listingsContainer.appendChild(newListingContainer);
        
                    
                    addListingForm.reset();
                })
                .catch(error => {
                   
                    console.error('Failed to add listing:', error);
                });
            });
        });
