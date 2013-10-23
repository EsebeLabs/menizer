menizer.js
=======

Menizer is a jQuery extension script that converts any displayable html parent element with displayable subelements into a block with a right clickable menu and displayable zone which shows the selected block.

For example, let's consider the following block structure:


<hr/>
	 <div id="parent" style="width:90%; display:inline-block; background-color:white;" >
	    <div id="child1" style="background-color:red; width: inherit; display:inline-block;" >
	       <div class="title">Title1</div>
	       <div class="content1">
	         Content 3
	       </div>
	    </div>
	    <div id="child2" style="background-color:blue; width: inherit; display:inline-block;" >
	       <div class="title" >Title2</div>
	       <div class="content2">
	         Content 2
	       </div>
	    </div>
	    <div id="child3" style="background-color:red; width: inherit; display:inline-block;" >
	       <div class="title">Title3</div>
	       <div class="content3">
	         Content 3
	       </div>
	    </div>
	 </div>

<hr/>


The previous code would be redenred as follow

<hr>
 <div id="parent" style="width:90%; display:inline-block; background-color:white;" >
    <div id="child1" style="background-color:red; width: inherit; display:inline-block;" >
       <div class="title">Title1</div>
       <div class="content3">
         Content 1
       </div>
    </div>
    <div id="child2" style="background-color:blue; width: inherit; display:inline-block;" >
       <div class="title" >Title2</div>
       <div class="content3">
         Content 2
       </div>
    </div>
    <div id="child3" style="background-color:red; width: inherit; display:inline-block;" >
       <div class="title">Title3</div>
       <div class="content3">
         Content 3
       </div>
    </div>

 </div>
<hr>

You can add menizer to your web page including a reference to the script after the jQuery's inclusion script element:

	<!DOCTYPE html>
	<html>
	  <head>
	    <script type="application/javascript" src="jquery-1.8.3.js"></script>
	    <script type="application/javascript" src="menizer-0.1.js" ></script>
	  </head>
	<body>
	   <div id="parent" style="width:100%; display:inline-block;background-color:white;" >
	      <div id="child1" style="background-color:red; width: inherit; display:inline-block;" >
	         <div class="title">Title1</div>
	         <div class="content1">
	           Content 3
	         </div>
	      </div>
	      <div id="child2" style="background-color:blue; width: inherit; display:inline-block;" >
	         <div class="title" >Title2</div>
	         <div class="content2">
	           Content 2
	         </div>
	      </div>
	      <div id="child3" style="background-color:red; width: inherit; display:inline-block;" >
	         <div class="title">Title3</div>
	         <div class="content3">
	           Content 3
	         </div>
	      </div>
	   </div>
	</body>
	</html>

In order to create a vertical menu with menizer, we have to select the parent element with menizer and specify the menu width(in percentage) and the selector for the elements which text will be used to fill the menu:

	  $('#parent').menizer(30,'.title');

The rendered HTML would be something similar to:

<hr>
 <div id="parent" style="width:90%; display:inline-block; background-color:white;" >
    <div id="child1" style="background-color:red; width: 60%; display:inline-block; float:left; clear:left" >
       <div class="content3">
         Content 1
       </div>
    </div>
    <div style="display:inline-block;width:25%;float:left;margin-left:5%;">
	<div style="width:100%; float:left; clear:left; text-align:left;">Title1</div>
	<div style="width:100%; float:left; clear:left; text-align:left;">Title2</div>
	<div style="width:100%; float:left; clear:left; text-align:left;">Title3</div>
    </div>
 </div>
<hr>

So the right menu has width equal to 30% of the width of the parent element, and the display element has the remaining 70%. 

For each of the child elements, the title for the menu is extracted doing `childElem.find('.title')[0].text()`. The elements in the side menu will be clickable and will change the content of the displayed block.

A callback can also be added as the trailing extra argument to the menizer call to run an action every time a button of the menu is pressed. The callback has the following propotype

	function (click_event,clicked_wrapper_elem){}

where click\_event is the jQuery's click event and clicked\_wrapper\_elem is the jQuery object wrapping the displayed block element. $(this) should represent the pressed menu button.
