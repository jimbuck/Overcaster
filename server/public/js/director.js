

$(function(){
			
	$('.current-year').text(new Date().getFullYear());
	
	$('.navbar a[href="'+window.location.pathname+'"]').closest('li').addClass('active');
});