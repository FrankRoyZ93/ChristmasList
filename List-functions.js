function Add(toAdd, list) 
{
	if (toAdd == "")
	{
		// debug
		document.getElementById("demo").innerHTML = "Oops! Write something first!";				
	}
	else
	{
		//	number of elements in the list	
		var nbInList = list.getElementsByTagName("li").length;
		
		// debug
		document.getElementById("demo").innerHTML = toAdd + (nbInList + 1);
		
		// reset the "Add" text 
		document.getElementById("addText").value = "";			
		
		// add element in the list
		list.innerHTML += '<li class="list-group-item"><input type="checkbox" name="check' + (nbInList + 1) +'" value="' + (nbInList + 1) +'">' + toAdd + '</li>';
	}
}