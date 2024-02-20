$(document).ready(function () {
    // Assuming your gallery class is '.gallery', adjust if necessary
    $('.gallery').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: 'ondemand',
        // Additional options as needed for your project
    });
});
