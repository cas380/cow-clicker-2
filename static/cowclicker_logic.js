/* When implementing a cow...
	1.) add it to largerPasture in cowclicker.html
	2.) increase COW_TOTAL
	3.) add its _ENUM
	4.) add its _COW
	5.) append it to cowAddressSpace
	6.) add its case to cowClickSwitch()
	7.) add it to the shop in store.html
	8.) add its case to buyThatCow()
*/

// total number of cows (in existence, not of the user), used in loops
let COW_TOTAL = 16;

// Define the bitwise representations
// the rightmost number is the cow's ID!
const STANDARD_ENUM = Math.pow(2, 0);
const CUTE_ENUM = Math.pow(2, 1);
const SILLY_ENUM = Math.pow(2, 2);
const CHONK_ENUM = Math.pow(2, 3);
const MINECRAFT_ENUM = Math.pow(2, 4);
const BABY_ENUM = Math.pow(2, 5);
const MILTANK_ENUM = Math.pow(2, 6);
const CHEESE_ENUM = Math.pow(2, 7);
const SECRET_ENUM = Math.pow(2, 8);
const STRAWBERRY_ENUM = Math.pow(2, 9);
const WEBKINZ_ENUM = Math.pow(2, 10);
const DUMB_ENUM = Math.pow(2, 11);
const AC_ENUM = Math.pow(2, 12)
const BROKEN_ENUM = Math.pow(2, 13);
const SPOOKY_ENUM = Math.pow(2, 14);
const MARIO_ENUM = Math.pow(2, 15);

// Define the cow image addresses...
const STANDARD_COW = "standardCow.png";
const CUTE_COW = "cuteCartoonCow.png";
const SILLY_COW = "sillyCow.jpg";
const CHONK_COW = "chonkCow.jpg";
const MINECRAFT_COW = "minecraftCow.jpg";
const BABY_COW = "babyCow.png";
const MILTANK_COW = "miltankCow.png";
const CHEESE_COW = "cheeseCow.png";
const SECRET_COW = "secretCow.png";
const STRAWBERRY_COW = "strawberryCow.png";
const WEBKINZ_COW = "webkinzCow.png";
const DUMB_COW = "dumbCow.png";
const AC_COW = "animalCrossingCow.png";
const BROKEN_COW = "brokenCow.jpg";
const SPOOKY_COW = "spookyCow.jpg";
const MARIO_COW = "marioCow.png";
const cowAddressSpace = [STANDARD_COW, CUTE_COW, SILLY_COW, CHONK_COW, MINECRAFT_COW, 
BABY_COW, MILTANK_COW, CHEESE_COW, SECRET_COW, STRAWBERRY_COW, WEBKINZ_COW, DUMB_COW, 
AC_COW, BROKEN_COW, SPOOKY_COW, MARIO_COW];

// global variable for requests
var saveCheck;

// load the game
window.addEventListener('load', function() {
	saveCheck = 0;
    loadGameState();
    loadUnlockedCows();
    animateCows();
    setup(); // asign listeners to cows for datastore
}, true);

// takes the DOM Element of a cow and returns its name
function parseCowName(imageElement) {
	var str = imageElement.src;
	var precedingCow = "static/cows/"; // Whatever comes before the cow image name
	var n = str.indexOf(precedingCow);
	return str.substring(n+precedingCow.length);
}

// global used for Miltank Cow
var rollout = 0;
// global used for Cheese Cow and Mario Kart Cow
var prevClick = 0;
function cowClickSwitch(imgName) {
	switch (imgName) {
		case STANDARD_COW:
			return [100, "Standard Cow"];
		case CUTE_COW:
			return [175, "Cute Cow"];
		case SILLY_COW:
			var inc = Math.floor(Math.random()*500) + 1; // this will get a number between 1 and 500;
			inc *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
			return [inc, "Silly Cow"];
		case CHONK_COW:
			var inc = Math.floor(Math.random()*5) == 2 ? 600 : 300; // 20% chance of inc = 600, 80% chance inc = 300
			return [inc, "Chonk Cow"];
		case MINECRAFT_COW:
			var inc = Math.pow(2, Math.floor(Math.random()*10) + 1); // 10% chance of any power of 2 from 0 - 10
			return [inc, "Minecraft Cow"];
		case BABY_COW:
			return [cows, "Baby Cow"];
		case MILTANK_COW:
			rollout++; // more effective on consecutive clicks
			setTimeout(function(){ rollout--; }, 500);
			return [200*rollout, "Miltank Cow"];
		case CHEESE_COW:
			return [prevClick, "Cheese Cow"];
		case SECRET_COW: // recursive with random cow
			var retArr = cowClickSwitch(cowAddressSpace[Math.floor(Math.random()*COW_TOTAL)]); // if it chooses Secret Cow, recurses again
			retArr[1] = "Secret " + retArr[1]; // will add as many "Secret" as there are recursions
			return retArr;
		case STRAWBERRY_COW:
			return [400, "Strawberry Cow"];
		case WEBKINZ_COW:
			// yields kinzcash depending on the time 
			var d = new Date(); // gets stronger later in the day
			var inc = Math.floor(Number(d.getHours() + "" + d.getMinutes()));
			return [inc, "Webkinz Cow"];
		case DUMB_COW: // gives you negative points
			return [-175, "Dumb Cow"];
		case AC_COW:
			// yields bells depending on the time 
			var d = new Date(); // gets weaker later in the day
			var inc = 2359 - Math.floor(Number(d.getHours() + "" + d.getMinutes()));
			return [inc, "Animal Crossing Cow"];
		case BROKEN_COW: 
			// Broken Cow uses the lowest 10 bits of your points to calculate the score
			var glitch = 0;
			for (var i = 0, j = 0; i <= Math.pow(2, 9); j += 1, i = Math.pow(2, j)) {
				// has a 20% chance of flipping any given bit
				glitch += (Math.random() < .8 ? points & i : ((points & i) == i ? 0 : i));
			} // max of (unlikely) 1023 points
			return [glitch, "Broken Cow"];
		case SPOOKY_COW: 
			// generates a random numer and interprets 10 bits of its one's complement as an unsigned int
			var inc = (~Math.floor(Math.random()*10000)) & 2047;
			return [inc, "Spooky Cow"];
		case MARIO_COW:
			// uses some multiple of the previous points
			var inc = Math.ceil(((Math.random()*10)/2)*prevClick);
			return [inc, "Mario Kart Cow"];
		default:
			alert("Default case ran!\n Problem in cowClickSwitch()\n\n Image name: "+imgName);
			return null;
	}
}

// runs when a cow is clicked
function clickThatCow(imageElement) {
	saveCheck++;
	document.getElementById("saveCheckDiv").innerHTML = "Saving...";

	// get the image name
    var imgName = parseCowName(imageElement);
	// run through the cow switch
    var cowAttributes = cowClickSwitch(imgName);

	// adjust points
	prevClick = cowAttributes[0];
    points += cowAttributes[0];
    document.getElementById('points').innerHTML = points;

    // Add a log for this action!
	createLog(cowAttributes[1] + " gave you " + cowAttributes[0] + " points!", cowAttributes[0])
}

// manipulates the DOM to add a log
function createLog(textNodeMsg, color) {
    var node = document.createElement("p");						// Create a <p> node
    var textnode = document.createTextNode(textNodeMsg);		// Create the text for it
    node.appendChild(textnode);									// Append the text to <p>
    node.classList.add("logItem");								// Treat this like a log item...
    if (color > 0) {
        node.classList.add("green");							// Make the text green for positive point values...
    } else if (color < 0) {										// red for negative point values...
        node.classList.add("red");								// black (default) otherwise
    }
    var logger = document.getElementById("logBox");
    if (logger.childNodes.length > 100) {
        logger.removeChild(logger.childNodes[0]);				// Remove the oldest node once the limit has been reached
    }
    logger.appendChild(node);									// Append <p> to the logger
    logger.scrollTop = logger.scrollHeight;						// scroll down in the logger
}

function loadGameState() {
    points = Number(document.getElementById('points').innerHTML);
    cows = Number(document.getElementById('cows').innerHTML);
    document.getElementById("init_msg").innerHTML = "Loaded " + points + " points and " + cows + " as the state of your cows.";
}

function loadUnlockedCows() {
    // If the user's "cows" data says they own a certain cow, make it appear
    console.log("Cow state is apparently " + cows);
    
	for (var i = 1, j = 0; i <= Math.pow(2, COW_TOTAL); j += 1, i = Math.pow(2, j)) {
		if ((cows & i) == i) {
			document.getElementById("cow"+j).style.display = "inline";
		} // otherwise, the style will be hidden
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
    // Used for cowclicker.html, store.html calls makePost() on click manually so it can store the correct values
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

// returns true if player owns this cow
function hasCow(cowEnum) {
	return (cows & cowEnum) == cowEnum;
}

// tries to purchase a cow, returns success code
function attemptCowPurchase(imageElement, cowEnum, cowName) {
	try {
		// get the point cost for that cow (will not fail unless the HTML is messed up)
		var cost = Number(imageElement.parentNode.childNodes[3].childNodes[1].innerHTML); 
	} catch {
		createLog("CRITICAL ERROR: DOM structure changed!", 0);
	}
	if (!hasCow(cowEnum)) { // if you can buy the cow and don't already own it
		if (points >= cost) {
			points -= cost;
			cows += cowEnum;
			document.getElementById('points').innerHTML = points;
			document.getElementById('cows').innerHTML = cows;
			createLog("You bought "+cowName+"!", 1);
			return "GOOD";
		}
		else {
			return "POOR";
		}
	} else {
		return "OWNS";
	}
}

function buyThatCow(imageElement) {
	saveCheck++;
	document.getElementById("saveCheckDiv").innerHTML = "Saving...";

	var imgName = parseCowName(imageElement);
	var success = null;

	switch (imgName) {
        case CUTE_COW:
			success = attemptCowPurchase(imageElement, CUTE_ENUM, "Cute Cow");
			break;
        case SILLY_COW:
			success = attemptCowPurchase(imageElement, SILLY_ENUM, "Silly Cow");
			break;
        case CHONK_COW:
			success = attemptCowPurchase(imageElement, CHONK_ENUM, "Chonk Cow");
			break;
        case MINECRAFT_COW:
			success = attemptCowPurchase(imageElement, MINECRAFT_ENUM, "Minecraft Cow");
			break;
        case BABY_COW:
			success = attemptCowPurchase(imageElement, BABY_ENUM, "Baby Cow");
			break;
        case MILTANK_COW:
			success = attemptCowPurchase(imageElement, MILTANK_ENUM, "Miltank Cow");
			break;
        case CHEESE_COW:
			success = attemptCowPurchase(imageElement, CHEESE_ENUM, "Cheese Cow");
			break;
        case SECRET_COW:
			success = attemptCowPurchase(imageElement, SECRET_ENUM, "Secret Cow");
			break;
		case STRAWBERRY_COW:
			success = attemptCowPurchase(imageElement, STRAWBERRY_ENUM, "Strawberry Cow");
			break;
		case WEBKINZ_COW:
			success = attemptCowPurchase(imageElement, WEBKINZ_ENUM, "Webkinz Cow");
			break;
		case DUMB_COW:
			success = attemptCowPurchase(imageElement, DUMB_ENUM, "Dumb Cow");
			break;
		case BROKEN_COW:
			success = attemptCowPurchase(imageElement, BROKEN_ENUM, "Broken Cow");
			break;
		case SPOOKY_COW:
			success = attemptCowPurchase(imageElement, SPOOKY_ENUM, "Spooky Cow");
			break;
		case MARIO_COW:
			success = attemptCowPurchase(imageElement, MARIO_ENUM, "Mario Kart Cow");
			break;
		default:
			console.log("buyThatCow switch default case ran.");
			createLog("ERROR: buyThatCow switch default case ran.", 0);
			break;
	}
	
	switch (success) {
		case "OWNS":
			createLog("You already own this cow!", -1);
			break;
		case "POOR":
			createLog("You don't have enough points to buy that!", -1);
			break;
		default:
			// No errors!
			break;
	}

	// Save it!
	makePost();
}