$(document).ready(function () {
    $('.gallery').slick({
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

    // Example of disabling right-click on gallery images
    $('.gallery img').on('contextmenu', function (e) {
        e.preventDefault();
    });

    // Example of using Slick events for custom actions
    $('.gallery').on('afterChange', function (event, slick, currentSlide) {
        console.log('Current slide:', currentSlide);
        // Additional actions here if needed
    });
});
