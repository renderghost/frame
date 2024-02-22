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

    function createMetadataTable(photo) {
        metaViewContainer.innerHTML = ''; // Clear existing content

        // About Section
        const aboutDiv = document.createElement('div');
        aboutDiv.innerHTML = `
            <h2 class="viewer-title">About</h2>
            <table class="meta-table">
                <tr class="row"><td class="meta-label">Description:</td><td class="meta-value">${photo.description || 'N/A'}</td></tr>
                <tr class="row"><td class="meta-label">Location:</td><td class="meta-value">${photo.location || 'Unknown'}</td></tr>
                <tr class="row"><td class="meta-label">Date:</td><td class="meta-value">${photo.date}</td></tr>
            </table>
    `;
        metaViewContainer.appendChild(aboutDiv);

        // Specifications Section
        const specsDiv = document.createElement('div');
        specsDiv.innerHTML = `
            <h2 class="viewer-title">Specifications</h2>
            <table class="meta-table">
                <tr class="row"><td class="meta-label">Camera:</td><td class="meta-value">${photo.camera}</td></tr>
                <tr class="row"><td class="meta-label">Exposure:</td><td class="meta-value">${photo.exposure}</td></tr>
                <tr class="row"><td class="meta-label">Aperture:</td><td class="meta-value">f/${parseFloat(photo.aperture.split('/')[0]) / parseFloat(photo.aperture.split('/')[1])}</td></tr>
                <tr class="row"><td class="meta-label">ISO:</td><td class="meta-value">${photo.iso}</td></tr>
                <tr class="row"><td class="meta-label">Focal Length:</td><td class="meta-value">${parseFloat(photo.focal_length.split('/')[0]) / parseFloat(photo.focal_length.split('/')[1])}mm</td></tr>
                <tr class="row"><td class="meta-label">Flash:</td><td class="meta-value">${photo.flash}</td></tr>
                <tr class="row"><td class="meta-label">Orientation:</td><td class="meta-value">${photo.orientation}</td></tr>
            </table>
    `;
        metaViewContainer.appendChild(specsDiv);

        // Licensing Section
        const licenseDiv = document.createElement('div');
        licenseDiv.innerHTML = `
            <h2 class="viewer-title">Licensing</h2>
            <table class="meta-table">
                <tr class="row"><td colspan="2">
                    <p xmlns:cc="http://creativecommons.org/ns#">This work is licensed under <a href="http://creativecommons.org/licenses/by-nc-nd/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-NC-ND 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1"></a></p>
                    <p>Photography by Barry Prendergast. Visit <a href="http://www.domain.com" target="_blank">www.domain.com</a> for more.</p>
                </td></tr>
            </table>
    `;
        metaViewContainer.appendChild(licenseDiv);
    }

});
