
$(document).ready(function() {
	$(".scrollGo").click(function(event) {
		event.preventDefault();
		var to = $(this).attr("to");
		$('html, body').animate({
			scrollTop: $("#"+to).offset().top
		}, 1500);
	});
	var nav = $("#menu"),
	stickyDiv = "sticky",
	menuHeight = $('#menuHeight'),
	header = $('#top');

	menuHeight.height(nav.height());

	$(window).scroll(function() {
		if( $(this).scrollTop() > header.height() - 90 ) {
			nav.addClass(stickyDiv);
			menuHeight.height(nav.height());
		} else {
			nav.removeClass(stickyDiv);
			menuHeight.height(nav.height());
		}
	});
});
