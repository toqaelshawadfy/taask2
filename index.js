
const initSlider=()=>{
    const  imageSlider = document.querySelector(".image-slider .image-list")
    const slideButtons = document.querySelectorAll(".image-slider .slide-button")
    const sliderScrollbar=document.querySelector(".container .slider-scrollbar")
    const sliderThumb = sliderScrollbar.querySelector(" .scrollbar-thumb")
    const maxScrollLeft = imageSlider.scrollWidth - imageSlider.clientWidth;

    // Variables for swipe functionality
    let startX = 0;
    let endX = 0;

    const scrollSlider = (direction) => {
        const scrollAmount = imageSlider.clientWidth * direction;
        imageSlider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Add event listeners to the buttons
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "left-arrow" ? -1 : 1;
            scrollSlider(direction);
        });
    });
    //  update scrollbar thumb position based on image scroll
    let updateScrollThumbPosition = () => {
       const scrollPosition = imageSlider.scrollLeft
       const ThumbPosition = (scrollPosition / maxScrollLeft ) * (sliderScrollbar.clientWidth - sliderThumb.offsetWidth);
       sliderThumb.style.left=`${ThumbPosition}px`
    }


    imageSlider.addEventListener("scroll" , () => {
        updateScrollThumbPosition();
    })


    let autoScroll = setInterval( ()=>{
        scrollSlider(1); // Scroll to the right by default
    }, 4000);

    // Pause the automatic transition when the user hovers over the slider
    imageSlider.addEventListener("mouseenter", () => clearInterval(autoScroll));

    // Resume the automatic transition when the user stops hovering over the slider
    imageSlider.addEventListener("mouseleave", () => {
        autoScroll = setInterval(() => {
            scrollSlider(1);
        }, 4000);
    });


    // // Add swipe functionality
    // imageSlider.addEventListener("touchstart", (e) => {
    //     startX = e.touches[0].clientX;
    // });

    // imageSlider.addEventListener("touchmove", (e) => {
    //     endX = e.touches[0].clientX;
    // });

    // imageSlider.addEventListener("touchend", () => {
    //     const threshold = 50; // Minimum swipe distance to be considered a swipe
    //     const swipeDistance = startX - endX;

    //     if (swipeDistance > threshold) {
    //         // Swipe left
    //         scrollSlider(1);
    //     } else if (swipeDistance < -threshold) {
    //         // Swipe right
    //         scrollSlider(-1);
    //     }
    // });
}
window.addEventListener("load" , initSlider)