$(document).ready(function () {
  $(".scrollGo").click(function (event) {
    event.preventDefault();
    var to = $(this).attr("to");
    $('html, body').animate({
      scrollTop: $("#" + to).offset().top
    }, 1500);
  });
  var nav = $("#menu"),
    stickyDiv = "sticky",
    menuHeight = $('#menuHeight'),
    logo = $('#logoSticky'),
    logoWhite = 'assets/img/logo.png',
    logoBlack = 'assets/img/logo-black.png',
    header = $('#top'),
    animates = $('.animated'),
    noScroll = 'noScroll',
    waitAnim = 'wait-animate',
    buttonPlay = $('#buttonPlay'),
   myVideo = document.getElementById("video"),
  coverVideo = $('#coverVideo');

  menuHeight.height(nav.height());

  $(window).scroll(function () {
    var posTopView  = $(this).scrollTop();
    var posButView =  posTopView + $(this).height();
    animates.each(function () {
      var el = $(this);
      if(!el.hasClass(noScroll)) {
        var elemTop = el.offset().top;
        var elemBottom = elemTop + el.height();
        if (!((elemBottom < posButView && elemBottom > posTopView) || (elemTop > posTopView && elemTop < posButView))) {
          el.addClass(waitAnim, 500);
        } else {
          el.removeClass(waitAnim);
        }
      }
    });
    if (posTopView > header.height() - 90) {
      nav.addClass(stickyDiv);
      logo.attr('src', logoBlack);
      menuHeight.height(nav.height());
    } else {
      nav.removeClass(stickyDiv);
      logo.attr('src', logoWhite);
      menuHeight.height(nav.height());
    }
  });
  buttonPlay.on('click',function () {
    if (myVideo.paused) {
      myVideo.play();
      coverVideo.removeClass('stop');
      coverVideo.addClass('play');
    }
    else {
      coverVideo.addClass('stop');
      coverVideo.removeClass('play');
      myVideo.pause();
    }
  });
});
