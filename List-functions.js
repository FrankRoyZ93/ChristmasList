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
		// debug
		document.getElementById("demo").innerHTML = "Oops! Write something first!";				
	}
	else if(list == null || list == undefined)
	{
		window.alert("hum... the list doesn't exist...");
	}
	else
	{
		document.getElementById("demo").innerHTML = "";
		
		// reset the "Add" text 
		//document.getElementById("addText").value = "";			
		
		// add element in the list
		list.innerHTML += 
		'<li class="list-group-item" id="element' + (nbOfElements + 1) + '" ondrop="Drop(event, element' + (nbOfElements + 1) + ')" ondragover="AllowDrop(event)">' +
		'	<div class="input-group">' +
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
		
		// debug
		//document.getElementById("demo").innerHTML = _toAdd + nbOfElements;
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
		// We will now check in the list where '_toErase' is located
		// The following boolean will tell us when it has been located
		var toEraseFound = false;
		
		for (i = 0; i < nbOfElements; i++)
		{
			if(elements[i] == _toErase)
			{
				elements[i].parentNode.removeChild(elements[i]);
				toEraseFound = true;
				break;
			}
		}
		
		// now we need to give the rest of the list their new value
		if(toEraseFound)
		{
			ReorganiseList();
		}
		
		//	get the number of elements in the list
		nbOfElements = elements.length;
		
		// debug
		//document.getElementById("demo").innerHTML = _toErase.id;
	}
}

function ReorganiseList()
{
	FindList();
	var elements = list.getElementsByTagName("li");
	
	// debug
	//document.getElementById("reorganize").innerHTML = "";
	
	for (i = 0; i < nbOfElements; i++)
	{
		// debug
		//document.getElementById("reorganize").innerHTML += i + '</br>';		
		//document.getElementById("reorganize").innerHTML += elements[i].getElementsByTagName("input")[0].name + ' = ';
		//document.getElementById("reorganize").innerHTML += elements[i].getElementsByTagName("input")[0].value + ' - ';
		//document.getElementById("reorganize").innerHTML += elements[i].getElementsByTagName("span")[0].ondragstart + ' - ';
		//document.getElementById("reorganize").innerHTML += elements[i].getElementsByTagName("button")[0].onclick + ' --> ';
		
		elements[i].innerHTML =		
		'	<div class="input-group">' +
		'		<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true" draggable="true" ondragstart="Drag(element' + (i + 1) + ')"></span>' +
		'		<span class="input-group-adon" id="checkbox">' +
		'			<input type="checkbox" name="' + (i + 1) +'" value="' + elements[i].getElementsByTagName("input")[0].value + '">' + elements[i].getElementsByTagName("input")[0].value +
		'		</span>' +
		'		<span class="input-group-btn">' +
		'			<button class="btn btn-default" type="button" onclick="Erase(element' + (i + 1) + ')">Erase</button>' +
		'		</span>' +
		'	</div>';
		
		// debug
		//document.getElementById("reorganize").innerHTML += elements[i].getElementsByTagName("input")[0].name + ' = ';
		//document.getElementById("reorganize").innerHTML += elements[i].getElementsByTagName("input")[0].value + ' - ';
		//document.getElementById("reorganize").innerHTML += elements[i].getElementsByTagName("span")[0].ondragstart + ' - ';
		//document.getElementById("reorganize").innerHTML += elements[i].getElementsByTagName("button")[0].onclick + '</br>';
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
	
	// debug
	//document.getElementById("demo").innerHTML = _element.id + "    " + _element.getElementsByTagName("input")[0].value;
}

function Drop(_ev, _element) 
{
    _ev.preventDefault();
	
	var destChildren = _element.innerHTML;
	
	// debug
	//document.getElementById("demo").innerHTML = _element.id + " = " + _element.getElementsByTagName("input")[0].value + " <--> ";
	//document.getElementById("demo").innerHTML += dragOrigin.id + " = " + dragOrigin.getElementsByTagName("input")[0].value;
	
	_element.innerHTML = toTransfer;
	dragOrigin.innerHTML = destChildren;
	
	ReorganiseList();
}