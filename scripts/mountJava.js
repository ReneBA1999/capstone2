"use strcit"

document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("mountainDropdown");
    const mountainInfo = document.getElementById("mountainInfo");
    const mountainName = document.getElementById("mountainName");
    const mountainImage = document.getElementById("mountainImage");
    const mountainElevation = document.getElementById("mountainElevation");
    const mountainEffort = document.getElementById("mountainEffort");
    const mountainDescription = document.getElementById("mountainDescription");
    const mountainCoordinates = document.getElementById("mountainCoordinates");
  
    // Populate the dropdown with mountain names
    mountainsArray.forEach(mountain => {
      const option = document.createElement("option");
      option.value = mountain.name;
      option.textContent = mountain.name;
      dropdown.appendChild(option);
    });
  
    // Add event listener to the dropdown
    dropdown.addEventListener("change", () => {
      const selectedMountain = mountainsArray.find(mountain => mountain.name === dropdown.value);
  
      if (selectedMountain) {
        mountainName.textContent = selectedMountain.name;
        mountainImage.src = selectedMountain.img;
        mountainImage.alt = selectedMountain.name;
        mountainElevation.textContent = selectedMountain.elevation;
        mountainEffort.textContent = selectedMountain.effort;
        mountainDescription.textContent = selectedMountain.desc;
        mountainCoordinates.textContent = `Latitude: ${selectedMountain.coords.lat}, Longitude: ${selectedMountain.coords.lng}`;
        mountainInfo.classList.remove("hidden");
      }
    });
  });