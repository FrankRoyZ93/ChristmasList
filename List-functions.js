//	actual number of elements in the list	
var nbOfElements = 0;

function Add(toAdd, list) 
{
	if (toAdd == "")
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
		//	get the number of elements in the list	
		nbOfElements = list.getElementsByTagName("li").length;
		
		// reset the "Add" text 
		document.getElementById("addText").value = "";			
		
		// add element in the list
		list.innerHTML += 
		'<li class="list-group-item" id="element' + (nbOfElements + 1) + '">' +
		'	<div class="input-group">' +
		'		<span class="glyphicon glyphicon-menu-hamburger" aria-hidden="true" draggable="true" ondragstart="Drag(event)"></span>' +
		'		<span class="input-group-adon">' +
		'			<input type="checkbox" value="' + (nbOfElements + 1) +'">' +
		'		</span>' +
				toAdd +
		'		<span class="input-group-btn">' +
		'			<button class="btn btn-default" type="button" onclick="Erase(element' + (nbOfElements + 1) + ', list)">Erase</button>' +
		'		</span>' +
		'	</div>' +
		'</li>';
		
		//	get the number of elements in the list	
		nbOfElements = list.getElementsByTagName("li").length;
		
		// debug
		document.getElementById("demo").innerHTML = toAdd + nbOfElements;
	}
}

function Erase(toErase, list)
{
	if (toErase == null || toErase == undefined)
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
		
		//	get the number of elements in the list
		nbOfElements = elements.length;
		
		// We will now check in the list where 'toErase' is located
		// The following boolean will tell us when it has been located
		var toEraseFound = false;
		var indexFound = 0;
		
		for (i = 0; i < nbOfElements; i++)
		{
			if(elements[i] == toErase)
			{
				elements[i].parentNode.removeChild(elements[i]);
				toEraseFound = true;
				indexFound = i;
				break;
			}
		}
		
		// now we need to give the rest of the list their new value
		if(toEraseFound)
		{
			for (i = indexFound; i < nbOfElements; i++)
			{
				element.id = 'element' + i;
				element.getElementsByTagName("input")[0].value = i;
				element.getElementsByTagName("button")[0].onclick = "Erase(element" + i + ", list)";				
			}
		}
		
		//	get the number of elements in the list
		nbOfElements = elements.length;
		
		// debug
		document.getElementById("demo").innerHTML = toErase.id;
	}
}

function AllowDrop(ev) {
    ev.preventDefault();
}

function Drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function Drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}