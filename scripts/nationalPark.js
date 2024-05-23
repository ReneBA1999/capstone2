

// //Ensure the DOM content is loaded before executing JavaScript
// document.addEventListener('DOMContentLoaded', function() {
//     // Populate the dropdowns
//     const stateSelect = document.getElementById('state-select');
//     locationsArray.forEach(location => {
//         const option = document.createElement('option');
//         option.value = location;
//         option.textContent = location;
//         stateSelect.appendChild(option);
//     });

//     const typeSelect = document.getElementById('type-select');
//     parkTypesArray.forEach(type => {
//         const option = document.createElement('option');
//         option.value = type;
//         option.textContent = type;
//         typeSelect.appendChild(option);
//     });

//     // Handle radio button change to enable/disable corresponding dropdown
//     const searchLocationRadio = document.getElementById('search-location');
//     const searchTypeRadio = document.getElementById('search-type');

//     searchLocationRadio.addEventListener('change', () => {
//         stateSelect.disabled = !searchLocationRadio.checked;
//         typeSelect.disabled = searchLocationRadio.checked;
//     });

//     searchTypeRadio.addEventListener('change', () => {
//         typeSelect.disabled = !searchTypeRadio.checked;
//         stateSelect.disabled = searchTypeRadio.checked;
//     });

//     // Add event listener to the search button
//     document.getElementById('search-button').addEventListener('click', () => {
//         const resultsDiv = document.getElementById('results');
//         resultsDiv.innerHTML = '';

//         if (searchLocationRadio.checked) {
//             const selectedState = stateSelect.value;
//             if (selectedState) {
//                 const matchingParks = nationalParksArray.filter(park => park.State === selectedState);
//                 if (matchingParks.length > 0) {
//                     matchingParks.forEach(park => {
//                         const parkElement = document.createElement('div');
//                         parkElement.textContent = 
//                         `LocationID: ${park.LocationName},
//                         LocationName: ${park.LocationName},
//                         Address: ${park.Address},
//                         City: ${park.City} ,
//                         State: ${park.State},
//                         ZipCode: ${park.ZipCode},
//                         Phone: ${park.Phone},
//                         Fax: ${park.Fax},
//                         Latitude: ${park.Latitude},
//                         Longitude: ${park.Longitude},
//                         Location: `;
//                         resultsDiv.appendChild(parkElement);
//                     });
//                 } else {
//                     resultsDiv.textContent = 'No parks found in the selected state/territory.';
//                 }
//             } else {
//                 resultsDiv.textContent = 'Please select a state/territory.';
//             }
//         } else if (searchTypeRadio.checked) {
//             const selectedType = typeSelect.value;
//             if (selectedType) {
//                 const matchingParks = nationalParksArray.filter(park => park.LocationName.includes(selectedType));
//                 if (matchingParks.length > 0) {
//                     matchingParks.forEach(park => {
//                         const parkElement = document.createElement('div');
//                         parkElement.textContent = 
//                         `LocationID: ${park.LocationName},
//                         LocationName: ${park.LocationName},
//                         Address: ${park.Address},
//                         City: ${park.City} ,
//                         State: ${park.State},
//                         ZipCode: ${park.ZipCode},
//                         Phone: ${park.Phone},
//                         Fax: ${park.Fax},
//                         Latitude: ${park.Latitude},
//                         Longitude: ${park.Longitude},
//                         Location: `;
//                         resultsDiv.appendChild(parkElement);
//                     });
//                 } else {
//                     resultsDiv.textContent = 'No parks found for the selected type.';
//                 }
//             } else {
//                 resultsDiv.textContent = 'Please select a park type.';
//             }
//         }
//     });
// });
/////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    // Populate the dropdowns
    const stateSelect = document.getElementById('state-select');
    locationsArray.forEach(location => {
        const option = document.createElement('option');
        option.value = location;
        option.textContent = location;
        stateSelect.appendChild(option);
    });

    const typeSelect = document.getElementById('type-select');
    parkTypesArray.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });

    // Handle radio button change to enable/disable corresponding dropdown
    const searchLocationRadio = document.getElementById('search-location');
    const searchTypeRadio = document.getElementById('search-type');

    searchLocationRadio.addEventListener('change', () => {
        stateSelect.disabled = !searchLocationRadio.checked;
        typeSelect.disabled = searchLocationRadio.checked;
    });

    searchTypeRadio.addEventListener('change', () => {
        typeSelect.disabled = !searchTypeRadio.checked;
        stateSelect.disabled = searchTypeRadio.checked;
    });

    // Add event listener to the search button
    document.getElementById('search-button').addEventListener('click', () => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        const createTable = (parks) => {
            const table = document.createElement('table');
            
            const thead = document.createElement('thead');
            const headers = ['LocationID', 'LocationName', 'Address', 'City', 'State', 'ZipCode', 'Phone', 'Fax', 'Latitude', 'Longitude', 'Coordinates', 'Type'];
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            parks.forEach(park => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td data-label="LocationID">${park.LocationID}</td>
                    <td data-label="LocationName">${park.LocationName}</td>
                    <td data-label="Address">${park.Address}</td>
                    <td data-label="City">${park.City}</td>
                    <td data-label="State">${park.State}</td>
                    <td data-label="ZipCode">${park.ZipCode}</td>
                    <td data-label="Phone">${park.Phone}</td>
                    <td data-label="Fax">${park.Fax}</td>
                    <td data-label="Latitude">${park.Latitude}</td>
                    <td data-label="Longitude">${park.Longitude}</td>
                    <td data-label="Coordinates">${park.Location.coordinates.join(', ')}</td>
                    <td data-label="Type">${park.Location.type}</td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
            return table;
        };

        if (searchLocationRadio.checked) {
            const selectedState = stateSelect.value;
            if (selectedState) {
                const matchingParks = nationalParksArray.filter(park => park.State === selectedState);
                if (matchingParks.length > 0) {
                    const table = createTable(matchingParks);
                    resultsDiv.appendChild(table);
                } else {
                    resultsDiv.textContent = 'No parks found in the selected state/territory.';
                }
            } else {
                resultsDiv.textContent = 'Please select a state/territory.';
            }
        } else if (searchTypeRadio.checked) {
            const selectedType = typeSelect.value;
            if (selectedType) {
                const matchingParks = nationalParksArray.filter(park => park.LocationName.includes(selectedType));
                if (matchingParks.length > 0) {
                    const table = createTable(matchingParks);
                    resultsDiv.appendChild(table);
                } else {
                    resultsDiv.textContent = 'No parks found for the selected type.';
                }
            } else {
                resultsDiv.textContent = 'Please select a park type.';
            }
        }
    });
});