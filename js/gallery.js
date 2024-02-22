document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid');
    const imageViewContainer = document.querySelector('#image-viewer');
    const metaViewContainer = document.querySelector('#meta-viewer');

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
        // Clear previous content
        imageViewContainer.innerHTML = ''; // Clearing to ensure fresh start
        metaViewContainer.innerHTML = '';

        // Create or select the background layer
        let backgroundLayer = imageViewContainer.querySelector('.background');
        if (!backgroundLayer) {
            backgroundLayer = document.createElement('div');
            backgroundLayer.className = 'background';
            imageViewContainer.prepend(backgroundLayer); // Ensure it's the first child
        }

        // Set styles for the background layer to display the blurred image
        backgroundLayer.style.backgroundImage = `url('photos/${photo.filename}')`;
        backgroundLayer.style.backgroundSize = 'cover';
        backgroundLayer.style.backgroundPosition = 'center';
        backgroundLayer.style.filter = 'blur(8px) brightness(50%)';
        backgroundLayer.style.position = 'absolute';
        backgroundLayer.style.top = '0';
        backgroundLayer.style.left = '0';
        backgroundLayer.style.width = '100%';
        backgroundLayer.style.height = '100%';
        backgroundLayer.style.zIndex = '-1'; // Ensure it stays behind the main image

        // Ensure imageViewContainer is positioned relatively
        imageViewContainer.style.position = 'relative';
        imageViewContainer.style.overflow = 'hidden';

        // Create and append the full-size image
        const fullImg = document.createElement('img');
        fullImg.src = `photos/${photo.filename}`;
        fullImg.alt = `Photo taken by ${photo.camera}`;
        fullImg.style.width = '100%'; // Adjust this as needed
        fullImg.style.height = 'auto'; // Adjust this as needed
        fullImg.style.zIndex = '1'; // Ensure the image is above the background
        imageViewContainer.appendChild(fullImg);

        // Create the table for metadata
        const table = document.createElement('table');
        table.className = 'meta-table'; // Add a class for styling

        // HTML string for table rows
        const tableHtml = `
            <h2 class="viewer-title">Specification</h2>
            <tr class="row"><td class="meta-label">Camera:</td><td class="meta-value">${photo.camera}</td></tr>
            <tr class="row"><td class="meta-label">Exposure:</td><td class="meta-value">${photo.exposure}</td></tr>
            <tr class="row"><td class="meta-label">Aperture:</td><td class="meta-value">f/${parseFloat(photo.aperture.split('/')[0]) / parseFloat(photo.aperture.split('/')[1])}</td></tr>
            <tr class="row"><td class="meta-label">ISO:</td><td class="meta-value">${photo.iso}</td></tr>
            <tr class="row"><td class="meta-label">Focal Length:</td><td class="meta-value">${parseFloat(photo.focal_length.split('/')[0]) / parseFloat(photo.focal_length.split('/')[1])}mm</td></tr>
            <tr class="row"><td class="meta-label">Flash:</td><td class="meta-value">${photo.flash}</td></tr>
            <tr class="row"><td class="meta-label">Orientation:</td><td class="meta-value">${photo.orientation}</td></tr>
        `;

        table.innerHTML = tableHtml;
        metaViewContainer.appendChild(table);
    }
});
