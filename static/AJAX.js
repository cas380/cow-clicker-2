function setup() {
    let pasture = document.getElementById("thePasture");
    // stratifying by image breaks this...
    for (let cowCount = 0; cowCount < pasture.childNodes.length; cowCount++) {
        pasture.childNodes[cowCount].addEventListener("click", makePost, true);
    }
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
	
	httpRequest.send(data);
}

function alertResult(httpRequest) {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			alert("ALERTING!  Value sent to server!");
		} else {
			alert("ALERTING!  There was a problem with the request.");
		}
	}
}

window.addEventListener("load", setup, true);