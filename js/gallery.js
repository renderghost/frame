document.addEventListener('DOMContentLoaded', function () {
    // Fetch the metadata.json file
    fetch('photos/metadata.json')
        .then(response => response.json())
        .then(data => {
            const galleryContainer = document.querySelector('.gallery');
            // Ensure the container is empty before adding new items
            galleryContainer.innerHTML = '';

            // Loop through each item in the metadata array
            data.forEach(photo => {
                const aperture = parseFloat(photo.aperture.split('/')[0]) / parseFloat(photo.aperture.split('/')[1]).toFixed(1);
                const focalLength = parseFloat(photo.focal_length.split('/')[0]) / parseFloat(photo.focal_length.split('/')[1]).toFixed(1);

                const photoElement = document.createElement('div');
                photoElement.className = 'photo-item';
                photoElement.innerHTML = `
                    <img src="photos/${photo.filename}" alt="Photo taken by ${photo.camera}" data-lazy="photos/${photo.filename}">
                    <div class="photo-info">
                        <p>Date: ${photo.date.replace(/:/g, '-')}</p>
                        <p>Camera: ${photo.camera}</p>
                        <p>Exposure: ${photo.exposure}</p>
                        <p>Aperture: f/${aperture}</p>
                        <p>ISO: ${photo.iso}</p>
                        <p>Focal Length: ${focalLength}mm, Flash: ${photo.flash}</p>
                        <p>Orientation: ${photo.orientation}</p>
                        <p>Image Dimensions: ${photo.image_width}x${photo.image_height}</p>
                        <p>Lens Model: ${photo.lens_model}</p>
                    </div>
                `;

                // Append the gallery item to the container
                galleryContainer.appendChild(photoElement);
            });
        })
        .catch(error => console.error('Error loading gallery metadata:', error));
});
