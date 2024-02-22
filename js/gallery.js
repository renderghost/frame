document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid');
    const container = document.getElementById('container');
    const imageViewContainer = document.querySelector('#image-viewer');
    const metaViewContainer = document.querySelector('#meta-viewer');

    // Setup Intersection Observer
    const observerOptions = {
        root: null, // null means the viewport
        threshold: 0.1, // Callback is executed when 10% of the target is visible
        rootMargin: "0px" // No margin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target.querySelector('img');
                img.src = img.dataset.src; // Assuming lazy loading with data-src attribute
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: Stop observing the target
            }
        });
    }, observerOptions);

    fetch('photos/metadata.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data array by date in descending order (newest first)
            const sortedData = data.sort((a, b) => {
                // Assuming date format is "YYYY:MM:DD HH:MM:SS" and directly comparable
                return b.date.localeCompare(a.date);
            });

            sortedData.forEach((photo, index) => {
                const thumbnailWrapper = document.createElement('div');
                thumbnailWrapper.className = 'thumbnail';
                thumbnailWrapper.setAttribute('role', 'button');
                thumbnailWrapper.setAttribute('tabindex', '0');
                thumbnailWrapper.setAttribute('alt', `Thumbnail for ${photo.camera}`);
                thumbnailWrapper.addEventListener('click', () => loadPhotoToShowcase(photo));

                const img = document.createElement('img');
                img.src = `photos/${photo.thumbnail}`; // Updated line
                img.alt = `Thumbnail for ${photo.camera}`;
                img.loading = "lazy"
                img.onload = () => {
                    img.style.opacity = 1;
                };
                img.className = 'thumbnail-content';

                thumbnailWrapper.appendChild(img);
                gridContainer.appendChild(thumbnailWrapper);
            });

            // Automatically load the first photo into the showcase if sortedData is not empty
            if (sortedData.length > 0) {
                loadPhotoToShowcase(sortedData[0]);
            }
        })
        .catch(error => console.error('Error loading gallery metadata:', error));

    function loadPhotoToShowcase(photo) {
        loadImageIntoViewer(photo);
        addImageToBackground(photo);
        createMetadataTable(photo);
    }

    function loadImageIntoViewer(photo) {
        imageViewContainer.innerHTML = ''; // Clear existing content
        const fullImg = document.createElement('img');
        fullImg.src = `photos/${photo.filename}`;
        fullImg.alt = `Photo taken by ${photo.camera}`;
        fullImg.style.width = '100%'; // Adjust this as needed
        fullImg.style.height = 'auto'; // Adjust this as needed
        fullImg.style.zIndex = '1'; // Ensure the image is above the background
        imageViewContainer.appendChild(fullImg);
    }

    function addImageToBackground(photo) {
        let backgroundLayer = container.querySelector('.background');
        if (!backgroundLayer) {
            backgroundLayer = document.createElement('div');
            backgroundLayer.className = 'background';
            container.prepend(backgroundLayer); // Ensure it's the first child
        }

        // Set styles for the background layer to display the blurred image
        backgroundLayer.style.backgroundImage = `url('photos/${photo.filename}')`;
        backgroundLayer.style.zIndex = '-1'; // Ensure it stays behind the main image
    }

    function formatDate(dateString) {
        // Replace colons in the date part with hyphens and create a new Date object
        const [datePart] = dateString.split(' ');
        const formattedDatePart = datePart.replace(/:/g, '-');
        const date = new Date(formattedDatePart);

        // Create an array of month names to use in formatting
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Extract the day, month, and year from the Date object
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        // Return the formatted date string
        return `${day} ${month}, ${year}`;
    }

    function createMetadataTable(photo) {
        metaViewContainer.innerHTML = ''; // Clear existing content
        const formattedDate = formatDate(photo.date); // Convert to "DD MMM, YYYY"
        // About Section
        const aboutDiv = document.createElement('div');
        aboutDiv.innerHTML = `
            <p class="large">${photo.description || 'Insert whimsical description text here...'}</p>
            <p class="dull">${photo.location || 'Somewhere'}, on ${formattedDate || 'some date'}</p>
    `;
        metaViewContainer.appendChild(aboutDiv);

        // Specifications Section
        const specsDiv = document.createElement('div');
        specsDiv.innerHTML = `
            <table class="meta-table">
                <tr class="row"><td class="meta-label">Camera:</td><td class="meta-value">${photo.camera}</td></tr>
                <tr class="row"><td class="meta-label">Exposure:</td><td class="meta-value">${photo.exposure}</td></tr>
                <tr class="row"><td class="meta-label">Aperture:</td><td class="meta-value">f/${parseFloat(photo.aperture.split('/')[0]) / parseFloat(photo.aperture.split('/')[1])}</td></tr>
                <tr class="row"><td class="meta-label">ISO:</td><td class="meta-value">${photo.iso}</td></tr>
                <tr class="row"><td class="meta-label">Focal Length:</td><td class="meta-value">${parseFloat(photo.focal_length.split('/')[0]) / parseFloat(photo.focal_length.split('/')[1])}mm</td></tr>
            </table>
    `;
        metaViewContainer.appendChild(specsDiv);

        // Licensing Section
        const licenseDiv = document.createElement('div');
        licenseDiv.innerHTML = `
            <div class="card middle" xmlns:cc="http://creativecommons.org/ns#">
                <div>
                        <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1">
                        <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1">
                        <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1">
                        <img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1">
                </div>
                <div>
                    <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer">CC BY-NC-ND 4.0</a>
                </div>
            </div>
    `;
        metaViewContainer.appendChild(licenseDiv);
    }

});
