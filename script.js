/*----------------------------------------------------*/
/* Quote Loop
------------------------------------------------------ */

function fade($ele) {
    $ele.fadeIn(1000).delay(3000).fadeOut(1000, function() {
        var $next = $(this).next('.quote');
        fade($next.length > 0 ? $next : $(this).parent().children().first());
   });
}
fade($('.quoteLoop > .quote').first());


/*----------------------------------------------------*/
/* Navigation
------------------------------------------------------ */

$(window).scroll(function() {

    if ($(window).scrollTop() > 300) {
        $('.main_nav').addClass('sticky');
    } else {
        $('.main_nav').removeClass('sticky');
    }
});

// Mobile Navigation
$('.mobile-toggle').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.main_nav').removeClass('open-nav');
    } else {
        $('.main_nav').addClass('open-nav');
    }
});

$('.main_nav li a').click(function() {
    if ($('.main_nav').hasClass('open-nav')) {
        $('.navigation').removeClass('open-nav');
        $('.main_nav').removeClass('open-nav');
    }
});


/*----------------------------------------------------*/
/* Smooth Scrolling (native)
------------------------------------------------------ */

jQuery(document).ready(function($) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('.smoothscroll').off('click').on('click', function (e) {
    const href = $(this).attr('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    if (prefersReduced) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    } else {
      // Use native smooth scrolling to avoid jQuery animate conflicts in Firefox
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Update URL without causing a jump
    if (history.pushState) history.pushState(null, '', href);
  });
});


TweenMax.staggerFrom(".heading", 0.8, {opacity: 0, y: 20, delay: 0.2}, 0.4);