// our list
var list;

//	actual number of elements in the list	
var nbOfElements = 0;

// origin position of a drag
var dragOrigin;
// element dragged that needs tranfer
var toTransfer;

function FindList()
{
	list = document.getElementById("list");	
	
	//	get the number of elements in the list
	nbOfElements = list.getElementsByTagName("li").length;
	
	if(list == null || list == undefined)
	{
		window.alert("hum... the list doesn't exist...");
	}
}

function Add(_toAdd) 
{
	FindList();
	if (_toAdd == "")
	{
		window.alert("Oops! Write something first!");				
	}
	else if(list == null || list == undefined)
	{
		window.alert("hum... the list doesn't exist...");
	}
	else
	{
		document.getElementById("demo").innerHTML = "";
		
		// reset the "Add" text 
		document.getElementById("addText").value = "";			
		
		// add element in the list
		list.innerHTML += 
		'<li class="list-group-item" id="element' + (nbOfElements + 1) + '" >' +
		'	<div class="input-group" ondrop="Drop(event, element' + (nbOfElements + 1) + ')" ondragover="AllowDrop(event)">' +
		'		<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true" draggable="true" ondragstart="Drag(element' + (nbOfElements + 1) + ')"></span>' +
		'		<span class="input-group-adon" id="checkbox">' +
		'			<input type="checkbox" name="' + (nbOfElements + 1) +'" value="' + _toAdd + '">' + _toAdd +
		'		</span>' +
		'		<span class="input-group-btn">' +
		'			<button class="btn btn-default" type="button" onclick="Erase(element' + (nbOfElements + 1) + ')">Erase</button>' +
		'		</span>' +
		'	</div>' +
		'</li>';
		
		//	get the number of elements in the list	
		nbOfElements = list.getElementsByTagName("li").length;
	}
}

function Erase(_toErase)
{
	FindList();
	if (_toErase == null || _toErase == undefined)
	{
		window.alert("Alert! This element doesn't exist anymore!");		
	}
	else if(list == null || list == undefined)
	{
		window.alert("hum... the list doesn't exist...");
	}
	else
	{		
		var elements = list.getElementsByTagName("li");
		
		// We will now check in the list where '_toErase' is located		
		for (i = 0; i < nbOfElements; i++)
		{
			if(elements[i] == _toErase)
			{
				elements[i].parentNode.removeChild(elements[i]);
				ReorganiseList();
				break;
			}
		}
	}
}

function ReorganiseList()
{
	FindList();
	var elements = list.getElementsByTagName("li");
	
	for (i = 0; i < nbOfElements; i++)
	{
		
		elements[i].id = "element" + (i + 1);
		elements[i].innerHTML =		
		'	<div class="input-group" ondrop="Drop(event, element' + (i + 1) + ')" ondragover="AllowDrop(event)">' +
		'		<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true" draggable="true" ondragstart="Drag(element' + (i + 1) + ')"></span>' +
		'		<span class="input-group-adon" id="checkbox">' +
		'			<input type="checkbox" name="' + (i + 1) +'" value="' + elements[i].getElementsByTagName("input")[0].value + '">' + elements[i].getElementsByTagName("input")[0].value +
		'		</span>' +
		'		<span class="input-group-btn">' +
		'			<button class="btn btn-default" type="button" onclick="Erase(element' + (i + 1) + ')">Erase</button>' +
		'		</span>' +
		'	</div>';
	}
}

function AllowDrop(_ev) 
{
    _ev.preventDefault();
}

function Drag(_element) 
{
	dragOrigin = _element;
	toTransfer = _element.innerHTML;
}

function Drop(_ev, _element) 
{
    _ev.preventDefault();
	
	var destChildren = _element.innerHTML;
	
	_element.innerHTML = toTransfer;
	dragOrigin.innerHTML = destChildren;
	
	ReorganiseList();
}