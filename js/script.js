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
    animates2 = $('.animate'),
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
    animates2.each(function () {
      var el = $(this);
      var elemTop = el.offset().top;
      var elemBottom = elemTop + el.height();
      if (!el.hasClass('animated')) {
        if (!((elemBottom < posButView && elemBottom > posTopView) || (elemTop > posTopView && elemTop < posButView))) {
          //
        } else {
          el.addClass('animated');
          el.addClass(waitAnim);
          el.addClass('animating', 500);
        }
      } else {
        if (el.hasClass('animating')) {
            el.removeClass(waitAnim);
            el.removeClass('animating');
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

  var form = $('#mailForm'),
        summary = $('#summary'),
        name=$('#name'),
        mail=$('#mail'),
        message=$('#message');

    // Success function
    function doneFunction(response) {
        summary.fadeIn().removeClass('is-hidden').removeClass('has-text-danger').addClass('has-text-success');
        summary.text(response);
        setTimeout(function () {
            summary.fadeOut();
        }, 5000);
        form.find('input:not([type="submit"]), textarea').val('');
    }

    // fail function
    function failFunctio(data) {
        summary.fadeIn().removeClass('is-hidden').removeClass('has-text-success').addClass('has-text-danger');
        summary.text(data.responseText + ' '+ data.statusText);
        setTimeout(function () {
            summary.fadeOut();
        }, 5000);
    }
    function validateFunction() {
    	if(validateElement(name)&&validateElement(mail,true)&&validateElement(message)){
    		return true;
    	} else{
    		return false;
    	}


    }
    function validateElement(el, isMail){
    	if(el.val() === ""){
    		summary.fadeIn().removeClass('is-hidden').removeClass('has-text-success').addClass('has-text-warning');
        	summary.text(el.attr('placeholder')+' no debe estar vacio');
	        setTimeout(function () {
	            summary.fadeOut();
	        }, 5000);
	        return false
    	}
    	if(isMail){
    		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		if(!re.test(String(el.val()).toLowerCase())){
				summary.fadeIn().removeClass('is-hidden').removeClass('is-success').addClass('is-warning');
        	summary.text(el.attr('placeholder')+' no es un email valido');
	        setTimeout(function () {
	            summary.fadeOut();
	        }, 5000);
	        return false
    		}
    	}
    	return true;
    }

    
    form.submit(function (e) {
        e.preventDefault();
        if(validateFunction()){
        	formData = $(this).serialize();
        console.log(formData);
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData
        })
        .done(doneFunction)
        .fail(failFunctio);
        }
        
    });
});
