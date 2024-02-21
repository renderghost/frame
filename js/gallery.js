document.addEventListener('DOMContentLoaded', function () {
    const gridContainer = document.getElementById('grid');
    const imageViewContainer = document.querySelector('#image-viewer');
    const metaViewContainer = document.querySelector('#meta-viewer');

    fetch('photos/metadata.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((photo, index) => {
                // Create a div to wrap the image and make it more interactive
                const thumbnailWrapper = document.createElement('div');
                thumbnailWrapper.className = 'thumbnail';
                thumbnailWrapper.setAttribute('role', 'button');
                thumbnailWrapper.setAttribute('tabindex', '0');
                thumbnailWrapper.setAttribute('alt', `Thumbnail for ${photo.camera}`);
                thumbnailWrapper.addEventListener('click', () => loadPhotoToShowcase(photo));

                // Create and append the thumbnail image to the wrapper
                const img = document.createElement('img');
                img.src = `photos/${photo.filename}`;
                img.alt = `Thumbnail for ${photo.camera}`;
                img.className = 'thumbnail-content';

                thumbnailWrapper.appendChild(img);
                gridContainer.appendChild(thumbnailWrapper);

                // Automatically load the first photo into the showcase
                if (index === 0) {
                    loadPhotoToShowcase(photo);
                }
            });
        })
        .catch(error => console.error('Error loading gallery metadata:', error));

    function loadPhotoToShowcase(photo) {
        // Clear previous content
        imageViewContainer.innerHTML = '<div class="background"></div>'; // Reset with background layer
        metaViewContainer.innerHTML = '';

        const backgroundLayer = imageViewContainer.querySelector('.background');
        // Set the background layer with the image
        backgroundLayer.style.backgroundImage = `url(photos/${photo.filename})`;
        backgroundLayer.style.position = 'absolute';
        backgroundLayer.style.top = '0';
        backgroundLayer.style.left = '0';
        backgroundLayer.style.width = '100%';
        backgroundLayer.style.height = '100%';
        backgroundLayer.style.backgroundSize = 'cover';
        backgroundLayer.style.backgroundPosition = 'center';
        backgroundLayer.style.transform = 'scale(5)';
        backgroundLayer.style.filter = 'blur(12px) brightness(33%)';
        backgroundLayer.style.zIndex = '1';

        // Ensure imageViewContainer is positioned relatively
        imageViewContainer.style.position = 'relative';
        imageViewContainer.style.overflow = 'hidden';

        // Create and append the full-size image
        const fullImg = document.createElement('img');
        fullImg.src = `photos/${photo.filename}`;
        fullImg.alt = `Photo taken by ${photo.camera}`;
        fullImg.style.position = 'relative';
        fullImg.style.zIndex = '2'; // Ensure the image is above the background
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
            <tr class="row"><td class="meta-label">Dimensions:</td><td class="meta-value">${photo.image_width}x${photo.image_height}</td></tr>
        `;

        table.innerHTML = tableHtml;
        metaViewContainer.appendChild(table);
    }
});
