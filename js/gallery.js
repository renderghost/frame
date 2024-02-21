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

                galleryContainer.appendChild(photoElement);
            });

            // Initialize Slick Slider here, after all slides have been added
            $(galleryContainer).slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                lazyLoad: 'ondemand',
                accessibility: true,
                draggable: true,
                swipe: true,
                dots: true,
                adaptiveHeight: true, // Useful if your images are of varying heights
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

        })
        .catch(error => console.error('Error loading gallery metadata:', error));
});
