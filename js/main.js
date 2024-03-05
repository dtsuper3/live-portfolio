$(document).ready(function () {
    'use strict';

    //********* page loader js

    // setTimeout(function () {
    //     $('.loader_bg').fadeToggle();        
    // }, 1500);

    //********** menu background color change while scroll
    $('.back-to-top').hide();
    $(window).on('scroll', function () {
        const menu_area = $('.nav-area');
        if ($(window).scrollTop() > 200) {
            menu_area.addClass('sticky_navigation');
        } else {
            menu_area.removeClass('sticky_navigation');
        }
        const showAfter = 200;
        if ($(this).scrollTop() > showAfter) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });


    //********** menu hides after click (mobile menu)

    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
            $(this).collapse('hide');
        }
    });


    //*********** scrollspy js

    $('body').scrollspy({
        target: '.navbar-collapse',
        offset: 195
    });


    //************ smooth scroll js

    $('a.smooth-menu,a.dadada,a.skill-btn').on("click", function (e) {
        e.preventDefault();
        const anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 50
        }, 1000);
    });

    //*********** Animated headline js

    $('.animate-scale').animatedHeadline({
        animationType: 'clip'
    });

    //***** Skill bar js

    var skillbar = $(".skillbar");

    skillbar.waypoint(function () {
        skillbar.each(function () {
            $(this).find(".skillbar-child").animate({
                width: $(this).data("percent")
            }, 1000);
        });
    }, {
        offset: "80%"
    });




    //************ Magnific Popup


    $('.zoom,.zoom1').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });



    //*************** Isotope filter

    var $Container = $('#img-filter');
    if ($Container.length > 0) {
        $Container.isotope({
            itemSelector: '.single-port',
            transitionDuration: '0.8s'
        });
        $(".img-filter").on("click", function (e) {
            $(".img-filter.active").removeClass("active");
            $(this).addClass("active");
            var selector = $(this).attr('data-filter');
            $Container.isotope({
                filter: selector
            });
            return false;
        });

        $(window).resize(function () {
            setTimeout(function () {
                $Container.isotope();
            }, 1000);
        }).trigger('resize');
    }



    //*************counter-up js

    // $('.counter').counterUp({
    //     delay: 50,
    //     time: 1000
    // });




    $(".testimonial-slider").owlCarousel({
        loop: true,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    function getAge() {
        const dob = new Date("12-09-1995").getTime();
        const now = Date.now();
        const oneYearInMs = 365 * 60 * 60 * 24 * 1000;
        const age = parseInt((now - dob) / oneYearInMs) + " Years";
        $("#age").append(age);
    }
    getAge();
});