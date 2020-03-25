var saveCheck;

// load the game
window.addEventListener('load', function() {
	saveCheck = 0;
    loadGameState();
    loadUnlockedCows();
    animateCows();
    setup(); // asign listeners to cows for datastore
}, true);

// runs when a cow is clicked
function clickThatCow(imageElement) {
	saveCheck++;
	document.getElementById("saveCheckDiv").innerHTML = "Saving...";
    var inc = 0;

    var str = imageElement.src;
	var precedingCow = "static/cows/"; // Whatever comes before the cow image name
    var n = str.indexOf(precedingCow);
    var imgName = str.substring(n+precedingCow.length);
    let cow = "Error";

    switch (imgName) {
        case "standardCow.jpeg":
            inc = 100;
            cow = "Standard Cow";
            break;
        case "cuteCow.jpg":
            inc = 175;
            cow = "Cute Cow";
            break;
        case "sillyCow.jpg":
            inc = Math.floor(Math.random()*500) + 1; // this will get a number between 1 and 500;
            inc *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
            cow = "Silly Cow";
            break;
        case "chonkCow.jpg":
            inc = Math.floor(Math.random()*5) == 2 ? 600 : 300; // 20% chance of inc = 600, 80% chance inc = 300
            cow = "Chonk Cow";
            break;
        case "minecraftCow.jpg":
            temp = Math.floor(Math.random()*10) + 1; // 10% chance of any power of 2 from 0 - 10
            inc = Math.pow(2, temp);
            cow = "Minecraft Cow";
            break;
        default:
            alert("Default case ran! Problem in clickThatCow switch. Perhaps you forgot to fully implement this cow?");
            inc = 0;
            break;
    }

    points += inc;
    document.getElementById('points').innerHTML = points;

    // Add a log (manipulate the DOM)
    var node = document.createElement("p");											// Create a <p> node
    var textnode = document.createTextNode(cow + " gave you " + inc + " points!");	// Create the text for it
    node.appendChild(textnode);														// Append the text to <p>
    node.classList.add("logItem");													// Treat this like a log item...
    if (inc > 0) {
        node.classList.add("green");												// Make the text green for positive point values...
    } else if (inc < 0) {															// red for negative point values...
        node.classList.add("red");													// black (default) otherwise
    }
    var logger = document.getElementById("logBox");
    if (logger.childNodes.length > 100) {
        logger.removeChild(logger.childNodes[0]);									// Remove the oldest node once the limit has been reached
    }
    logger.appendChild(node);														// Append <p> to the logger
    logger.scrollTop = logger.scrollHeight;											// scroll down in the logger
}

function loadGameState() {
    points = Number(document.getElementById('points').innerHTML);
    cows = Number(document.getElementById('cows').innerHTML);
    document.getElementById("init_msg").innerHTML = "Loaded " + points + " points and " + cows + " as the state of your cows.";
}

function loadUnlockedCows() {
    // If the user's "cows" data says they own a certain cow, then set the
    // images src to the correct cow image source. If the user does not own 
    // a certain cow then that image's source will be set to Tall Grass
    console.log("Cow state is apparently " + cows);
    
    if ((cows & 1) == 1) {
        document.getElementById("cow0").style.display = "inline";
    }
    if ((cows & 2) == 2) {
        document.getElementById("cow1").style.display = "inline";
    }
    if ((cows & 4) == 4) {
        document.getElementById("cow2").style.display = "inline";
    }
    if ((cows & 8) == 8) {
        document.getElementById("cow3").style.display = "inline";
    }
    if ((cows & 16) == 16) {
        document.getElementById("cow4").style.display = "inline";
    }
}

// Give each cow its own copy of variables
function animateThisCow(cowCount) { // Math.floor(Math.random()*500) + 1; // this will get a number between 1 and 500;
    let leftSpace = 2*(Math.floor(Math.random()*301) + 1) - 102; // Random even number between -100 and 500 inclusive
    let topSpace = 2*(Math.floor(Math.random()*201) + 1) - 102; // Random even number between -100 and 300 inclusive

    let directionX = Math.random() <= .5 ? true : false;
    let directionY = Math.random() <= .5 ? true : false;

    let newCow = null;
    let hold = 0;
    let stepX = 1;
    let stepY = 1;

    newCow = document.getElementById("cow"+cowCount);
    if (newCow != null) {
        newCow.style.left = leftSpace+"px";
        newCow.style.top = topSpace+"px";
    } // please allow setup to run

    setInterval(function() {
        if (hold > 0) {
            hold--;
        } else {
            if (newCow == null) { newCow = document.getElementById("cow"+cowCount); } // mitigate errors
            newCow.style.left = leftSpace+"px";
            newCow.style.top = topSpace+"px";

            // Changes every increment, adds a dawdle animation
            stepX = Math.floor(Math.random()*4) // Random number between 0 and 3
            stepY = Math.floor(Math.random()*4) // Random number between 0 and 3

            if (directionX) {
                leftSpace += stepX;
                if (leftSpace > 500) {
                    // Under the rightmost wall
                    directionX = false;
                    hold = 2*((Math.floor(Math.random()*4)) + 5); // Random number between 10 and 16 inclusive
                }
            } else {
                leftSpace -= stepX;
                if (leftSpace < -100) {
                    // Under the leftmost wall
                    directionX = true;
                    hold = 2*((Math.floor(Math.random()*4)) + 5); // Random number between 10 and 16 inclusive
                }
            }

            if (directionY) {
                topSpace += stepY;
                if (topSpace > 300) {
                    // Under the bottommost wall
                    directionY = false;
                    hold = 2*((Math.floor(Math.random()*4)) + 5); // Random number between 10 and 16 inclusive
                }
            } else {
                topSpace -= stepY;
                if (topSpace < -100) {
                    // Under the topmost wall
                    directionY = true;
                    hold = 2*((Math.floor(Math.random()*4)) + 5); // Random number between 10 and 16 inclusive
                }
            }
        }
    }, 200);
}

// Animate the cows!!!
function animateCows() {
    let pasture = document.getElementById("thePasture")
    var cowCount = 0;
    for (var children = 0; children < pasture.childNodes.length; children++) {
        if (pasture.childNodes[children] instanceof HTMLImageElement) {
            animateThisCow(cowCount);
            cowCount++;
        }
    }
}

function setup() {
    let pasture = document.getElementById("thePasture");
    
    for (var children = 0; children < pasture.childNodes.length; children++) {
        if (pasture.childNodes[children] instanceof HTMLImageElement) {
            pasture.childNodes[children].addEventListener("click", makePost, true);
        }
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
		saveCheck--;
		if (saveCheck == 0) {
			document.getElementById("saveCheckDiv").innerHTML = "";
		}
        /*if (httpRequest.status === 200) {
            alert("ALERTING!  Value sent to server!");
        }*/ // No need to stratify by code yet...
    } 
}

function buyThatCow(cowID) {
    saveCheck++;
    document.getElementById("saveCheckDiv").innerHTML = "Saving...";
    var inc = 0;
    var buyattempt = 0;

    // if the user has enough points to buy a cow when it is clicked on,
    // and it has not been bought before, change that cow's array value to non-null,
    // so it loads instead of tall grass the next time cowclicker.html is loaded
    switch(cowID){
        case 1:
      //case "https://cow-clicker-2.appspot.com/static/cuteCow.jpg":
            if(points >= 5000 && (cows & 2 != 2)){
                cows = cows + 2;
                points = points - 5000;
            }
            break;
        
        case 2:
      //case "https://cow-clicker-2.appspot.com/static/sillyCow.jpg":
            if(points >= 10000 && (cows & 4 != 4)){
                cows = cows + 4;
                points = points - 10000;
            }
            break;

        case 3:
      //case "https://cow-clicker-2.appspot.com/static/chonkCow.jpg":
            if(points >= 50000 && (cows & 8 != 8)){
                cows = cows + 8;
                points = points - 50000;
            }
            break;

        case 4:
      //case "https://cow-clicker-2.appspot.com/static/minecraftCow.jpg":
            if(points >= 100000 && (cows & 16 != 16)){
                cows = cows + 16;
                points = points - 100000;
            }
            break;
            
        default:
            console.log("default case ran!!!!")
            break;
    }

    document.getElementById('points').innerHTML = points;

    // add a log

}