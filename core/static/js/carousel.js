
// new Swiper instance ,which is a powerful and flexible JavaScript library for building sliders
// var swiper :Creates  a variable named swiper to hold the instance of the Swiper object .
// new Swiper('.swiper-container', {...}):This initializes a new Swiper object on an HTML element with the class .swiper-container
// Configuration:
// Inside the {...} object ,various options are set to control the behavior and appearance of the Swiper.

// Setting the Number of Visible Slides 
// slidesPerView: 1,
// slidesPerView:This option controls how many slides are visible at a time in the carousel 
// Setting it to 1 means that only  one slide will be shown at a time .If you set this value to 2,it would show two slides side by side

// Setting the space between Slides :
// spaceBetween: 30,
// spaceBetween: This option sets the space (in pixels) between each slide
// Setting it to 30 means there will be a 30-pixel gap between consecutive slides 

// loop: true,
// loop: when set to true ,this option allows the slider to loop back to the first slide after reaching the last slide,creating an infinite loop

// pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
// },

// pagination:This object defines the pagination (the dots or bullets below the slides) settings
// el: '.swiper-pagination': This selects the element with the class .swiper-pagination in the HTML as the container for the pagination bullets
// clickable:true : This allows users to click on the pagination bullets to navigate to a specific slide


// Note :.swiper-wrapper:
// This class is mandatory because Swiper uses it to identify the container that wraps all the slides.
// Without this class, Swiper won’t know which element contains the slides, and it won’t apply the necessary styles and behaviors to create the carousel.

// .swiper-slide:
// This class is also mandatory because Swiper uses it to recognize each individual slide inside the .swiper-wrapper.
// If your slides don’t have the .swiper-slide class, Swiper won’t treat them as slides, and they won’t behave correctly within the slider (e.g., transitions and navigation might not work).
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        // the el param is a built-in property of Swiper used to define the container element that will hold the pagination bullets
        el: '.swiper-pagination',
        // The clickable parameter is a boolean property (either true or false) that determines whether the pagination bullets can be interacted with.
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        // This sets the delay between slide transitions to 5000 milliseconds (or 5 seconds)
        delay: 5000,
    },
});