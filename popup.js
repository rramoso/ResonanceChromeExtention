
$(document).ready(function(){

  $('#cssmenu li.active').addClass('open').children('ul').show();
  $('body').on('click', '#clickable', function(){
      chrome.tabs.create({url: $(this).attr('href')});
      return false;
    });
});
