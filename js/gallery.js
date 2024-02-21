document.addEventListener('DOMContentLoaded', function () {
    fetch('photos/metadata.json')
        .then(response => response.json())
        .then(data => {
            const galleryContainer = document.querySelector('.gallery');
            galleryContainer.innerHTML = ''; // Clear existing items

            data.forEach(photo => {
                const aperture = parseFloat(photo.aperture.split('/')[0]) / parseFloat(photo.aperture.split('/')[1]).toFixed(1);
                const focalLength = parseFloat(photo.focal_length.split('/')[0]) / parseFloat(photo.focal_length.split('/')[1]).toFixed(1);

                const photoElement = document.createElement('div');
                photoElement.className = 'slide-content';
                photoElement.innerHTML = `
                    <div class="slide">
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
                    </div>
                `;

                galleryContainer.appendChild(photoElement);
            });

            // Initialize Slick Slider here, after all slides have been added
            $(galleryContainer).slick({
                // respondTo: min,
                accessibility: true,
                adaptiveHeight: false, // Useful if your images are of varying heights
                arrows: true,
                autoplay: true,
                autoplaySpeed: 5000,
                dots: false,
                draggable: true,
                infinite: true,
                lazyLoad: 'progressive', // Progressive or OnDemand
                pauseOnHover: true,
                slidesToScroll: 1,
                slidesToShow: 3,
                speed: 400,
                swipe: true,
            });

        })
        .catch(error => console.error('Error loading gallery metadata:', error));
});
