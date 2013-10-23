// Copyright (C) 2013  ESEBE Software s.r.o.
// 
//    The JavaScript code in this page is free software: you can
//    redistribute it and/or modify it under the terms of the GNU
//    General Public License (GNU GPL) as published by the Free Software
//    Foundation, either version 3 of the License, or (at your option)
//    any later version.  The code is distributed WITHOUT ANY WARRANTY;
//    without even the implied warranty of MERCHANTABILITY or FITNESS
//    FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
// 
//    As additional permission under GNU GPL version 3 section 7, you
//    may distribute non-source (e.g., minimized or compacted) forms of
//    that code without the copy of the GNU GPL normally required by
//    section 4, provided you include this license notice and a URL
//    through which recipients can access the Corresponding Source.

function menizer (parent_elem, menu_size, title_selector, click_callback){
	
	var menu_size = parseInt(menu_size);
	var cont_size = 100 - menu_size    ;
	var elem      = $(parent_elem)     ;
		
	if(menu_size < 0 || menu_size >100)
		throw new Error('The menu size must be between 0 and 100');
	
	if(menu_size==0 || menu_size==100)
		throw new Error('The menu size cannot be 0 or 100 (either the menu or the content would not be visible)');
	
	if(elem.parent().hasClass('menizer'))
		throw new Error('The element is already menized!');
	
	elem
		.addClass('menizer-content')
	 	.wrap('<div class="menizer"/>')
	 	.css('width', cont_size + '%')
	;
	
	content_wrapper = '<div class="menizer-content-wrapper" data-menizer-selected="false" />'
	elem.children()
		.wrap(content_wrapper)
	;
	
	elem.children().first()
		.css ('display','block')
		.attr('data-menizer-selected','true')
	;
	
	
	menu_wrapper = $('<div style="width:' + menu_size + '%" class="menizer-menu" />'    );
	menu_list    = $('<ul class="menizer-menu-list" />');
	
	menu_wrapper.append(menu_list);
	
	menu_elem_prefix = '<li class="menizer-menu-elem ';
	
	to_menize = elem.children();
	
	to_menize.each(function (idx, val){
		var cur_menu_elem_prefix = menu_elem_prefix
		
		title = $(val).children().first().find(title_selector).first().text();
				
		if(idx%2)
			cur_menu_elem_prefix += 'menizer-menu-elem-odd ' ;
		else
			cur_menu_elem_prefix += 'menizer-menu-elem-even ';
		
		var data_visible;
		if(idx == 0){
			cur_menu_elem_prefix += 'menizer-menu-elem-first menizer-menu-elem-selected';
		}else if(idx == to_menize.length -1){
			cur_menu_elem_prefix += 'menizer-menu-elem-last' ;
		}
		
		
		cur_menu_elem = $(cur_menu_elem_prefix + '" data-menizer-idx="' + idx + '" >' + title + '</li>')
		
		menu_list.append(cur_menu_elem);
		
		cur_menu_elem.click(function(ev){
			
			menizer_elem = $(this).closest('.menizer')          ;
			list_elem    = $(this).closest('.menizer-menu-elem'); 
			idx          = list_elem.attr('data-menizer-idx')   ;
			
			menizer_elem.find('.menizer-menu-elem').removeClass('menizer-menu-elem-selected');
			list_elem                              .addClass('menizer-menu-elem-selected');
			
			menizer_elem
				.find   ('.menizer-content-wrapper[data-menizer-selected="true"]')
					.css ('display'              , 'none')
					.attr('data-menizer-selected','false')
			;
			
			to_activate = $(menizer_elem.find('.menizer-content-wrapper')[idx]);
			
			to_activate
				.css ('display'              , 'block')
				.attr('data-menizer-selected', 'true' )
			;
			
			if(click_callback)
				click_callback(ev,to_activate);
		})
	});	
	
	elem.parent().append(menu_wrapper);
}

try {
	
	var to_extend_jquery;
	
	if($){
		to_extend_jquery = $;
	}else{
		to_extend_jquery = jQuery;
	}
	
	to_extend_jquery.fn.extend({
			menizer: function(menu_size, title_selector, click_callback){
				elem = $(this);
				menizer(elem, menu_size, title_selector, click_callback);
			}
		}
	);
	
}catch (e){
	throw 'Cannot register menizer in jQuery';
}
