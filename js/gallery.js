document.addEventListener('DOMContentLoaded', function () {
    // Initialize your gallery here using Slick Slider
    $('.gallery').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        lazyLoad: 'ondemand',
        // Additional options as needed
    });

    // Load images and metadata from a JSON file (you need to create this)
    fetch('photos/metadata.json')
        .then(response => response.json())
        .then(data => {
            // Process and display your images and metadata
        });
});
