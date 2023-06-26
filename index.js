let images = [{
    url: "./images/slider-1.jpg",
  }, {
    url: "./images/slider-2.jpg",
  }, {
    url: "./images/slider-3.jpg",
}];

function sliderInit(images, options) {
  if (!images || !images.length) return;
  
  options = options || {
    dots: true,
    titles: false,
    autoplay: false,
    autoplayInterval: 0
  };
  
  let sliderWrapper = document.querySelector(".slider");
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let dotsWrapper = document.querySelector(".slider__dots");
  let navWraper = document.querySelector(".slider__nav__li__item");
  let intervalId;
  
  initImages();
  initArrows();
  initNav();
  
  if (options.dots) {
    initDots();
  }
  
  if (options.titles) {
    initTitles();
  }
  
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() {
    images.forEach((image, index) => {
      let imageElement = document.createElement("div");
      imageElement.className = `image n${index} ${index === 0? "active" : ""}`;
      imageElement.dataset.index = index;
      imageElement.style.backgroundImage = `url(${image.url})`;
      sliderImages.appendChild(imageElement);
    });
  }
  
  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let lastIndex = images.length - 1;
        let currentNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = currentNumber === 0? lastIndex : currentNumber - 1;
        } else {
          nextNumber = currentNumber === lastIndex? 0 : currentNumber + 1;
        }
        moveSlider(nextNumber);
        if (options.autoplay) {
          clearInterval(intervalId);
        }
      })
    });
  }
  
  function moveSlider(num) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(`.n${num}`).classList.add("active");
    
    if (options.dots) {
      dotsWrapper.querySelector(".active").classList.remove("active");
      dotsWrapper.querySelector(`.n${num}`).classList.add("active");
    }
  }
  
  function initDots() {    
      images.forEach((image, index) => {
      let dot = document.createElement("div");
      dot.className = `slider__dots-item n${index} ${index === 0? "active" : ""}`
      dot.dataset.index = index;
      dot.addEventListener("click", function() {
        moveSlider(dot.dataset.index);
        if (options.autoplay) {
          clearInterval(intervalId);
        }
      });
      dotsWrapper.appendChild(dot);
    });
  }

  function initNav() {
    images.forEach((image, index) => {
      let nav = document.createElement("li");
      nav.className = `slider__nav__li__item n${index} ${index === 0? "active" : ""}`
      nav.dataset.index = index;
      nav.addEventListener("click", function() {
        moveSlider(nav.dataset.index);
        if (options.autoplay) {
          clearInterval(intervalId);
        }
      });
      navWrapper.appendChild(nav);
    });
  }
  
  function initTitles() {
    images.forEach((image, index) => {
      let sliderImage = sliderImages.querySelector(`.n${index}`);
      let title = document.createElement("div");
      title.className = "slider__images-title";
      title.innerText = image.title;
      sliderImage.appendChild(title);
    });
  }
  
  function initAutoplay() {
    intervalId = setInterval(() => {
      let currentNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = currentNumber === images.length - 1 ? 0 : currentNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let sliderOptions = {
    dots: true,
    titles: false,
    autoplay: true,
    autoplayInterval: 4000
  }
  sliderInit(images, sliderOptions);
});
