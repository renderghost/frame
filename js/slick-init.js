$(document).ready(function () {
    $('.gallery').slick({
        // Your slick options here
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: 'ondemand'
    });
});