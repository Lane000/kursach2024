$(document).ready(function () {
    $(".slider").slick({
      arrows: true,
      dots: false,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 1000,
      easing: "linear",
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      pauseOnFocus: true,
      pauseOnDotsHover: true,
      draggable: true,
      waitForAnimate: false,
    });
  
    $(".slider_cards_popular_cinema").slick({
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1760,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 1440,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 1080,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  
    $(".slider_cards_tv").slick({
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,
    });
  });