$(document).ready(function(){
        $.ajax({
        url: 'https://api.airtable.com/v0/appdqzfZoeTcXC7VD/config?Live=true',
        headers: {
          'Authorization': 'Bearer key1prgPxnqRmgH5Q'
        },
        method: 'GET',

          success: function(data) {
                 menu = {}
                 $.each(data, function() {
                    $.each(this, function(k, v) {
                    menu[v['fields']['Main Menu']] = {}
                    });
                  });
                  var no_name_num = 1

                  $.each(data, function() {
                     $.each(this, function(k, item) {

                       if(item['fields']['Live'] == true){
                         aux = menu[item['fields']['Main Menu']]

                         if(Object.keys(item['fields']).includes("Name")){

                          link_name = item['fields']['Name']
                   				link = item['fields']['URL']
                         }
                         else{
                           link_name = 'No Name URL #' + no_name_num
                   				 link = item['fields']['URL']
                   				 no_name_num += 1
                         }
                         if(Object.keys(item['fields']).includes("Sub-menu")){
                            s_menu = item['fields']['Sub-menu']
                            if(!Object.keys(aux).includes(s_menu)){
                              var s = {}
                              s[link_name] = link
                              aux[s_menu] = s
                            }else{
                              aux[s_menu][String(link_name)] = link
                            }
                         }
                         else{
                            if(!Object.keys(aux).includes('No Name Sub-Menu')){
                              var s = {}
                              s[link_name] = link
                              aux["No Name Sub-Menu"] = s
                            }else{
                              aux["No Name Sub-Menu"][String(link_name)] = link
                            }
                         }
                       }
                     });
                   });
                   // $('#cssmenu').append('<ul id="menu_ul">');
                   var css_menu =  $('#cssmenu');
                   var menu_ul = $('<ul/>').appendTo(css_menu);
                   Object.keys(menu).map(function(key, index) {
                     var li = $('<li/>').addClass('has-sub')
                              .appendTo(menu_ul);
                      var a = $('<a/>').html(key)
                              .appendTo(li);
                      var sub_ul = $('<ul />').appendTo(li);


                    Object.keys(menu[key]).map(function(k, i){

                      var sub_li = $('<li/>').addClass('has-sub')
                               .appendTo(sub_ul);

                       var sub_a = $('<a/>').html(k)
                               .appendTo(sub_li);

                       var sub_sub_ul = $('<ul />').appendTo(sub_li);


                      Object.keys(menu[key][k]).map(function(item, idx){
                        var sub_sub_li = $('<li/>').appendTo(sub_sub_ul);
                         var sub_sub_a = $('<a id="clickable"/>').html(item)
                                 .attr('href',menu[key][k][item])
                                 .appendTo(sub_sub_li);


                      });
                    });
                });
                $('#cssmenu li.has-sub>a').on('click', function(){
                  console.log("conazo");
                  $(this).removeAttr('href');
                  var element = $(this).parent('li');
                  if (element.hasClass('open')) {
                    element.removeClass('open');
                    element.find('li').removeClass('open');
                    element.find('ul').slideUp(200);
                  }
                  else {
                    element.addClass('open');
                    element.children('ul').slideDown(200);
                    element.siblings('li').children('ul').slideUp(200);
                    element.siblings('li').removeClass('open');
                    element.siblings('li').find('li').removeClass('open');
                    element.siblings('li').find('ul').slideUp(200);
                  }
                });
               },
               error: function(e) {
                  console.log(e);
                }
      });

});
