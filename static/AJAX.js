function setup() {
    let pasture = document.getElementById("thePasture");
    for (var children = 0; children < pasture.childNodes.length; children++) {
        if (pasture.childNodes[children] instanceof HTMLImageElement) {
            pasture.childNodes[children].addEventListener("click", makePost, true);
        }
    }
    alert("Listeners added.");
}

function makePost() {
	var httpRequest = new XMLHttpRequest();

	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
			
	httpRequest.onreadystatechange = function() { alertResult(httpRequest) };
	
	httpRequest.open("POST", "/update-user");
	httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	var data;
	data = "points=" + document.getElementById("points").innerHTML + "&cows=" + document.getElementById("cows").innerHTML;
	
    alert("Sending request...");
	httpRequest.send(data);
}

function alertResult(httpRequest) {
	alert("ALERTING!  readyState:  " + httpRequest.readyState);
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			alert("ALERTING!  Value sent to server!");
		} else {
			alert("ALERTING!  There was a problem with the request.");
		}
	}
}

window.addEventListener("load", setup, true);