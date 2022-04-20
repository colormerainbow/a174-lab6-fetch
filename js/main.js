/* Retain previous promise code sections for comparison
fetch("houses.json")
    .then((response) => response.json())
    .then((data) => {
        //create a temp holder to append all the html generated inside the forEach iterators to build a description list.
        let html = `<p class="list">Game of Thrones List</p><dl class="GoT-House-List">`;


        //Pass the argument "house" to the arrow function to capture the house information as the dt
        //then pass the argument "member" to another function to capture each house member in the array as a dd
        data.forEach((house) => {
            let objInfo = `<dt class="house">${house.name}</dt>`;
            house.members.forEach((member) => {
                objInfo += `<dd class="folks">${member}</dd>`;
            });

            // generate the html snippet for one array item and add to the "html" temp holder.
            html += objInfo;
        });
        //close the html with the closing tag
        html += `</dl>`;

        //make a reference to the html container where
        //the info will be displayed.
        const container = document.querySelector("#container");
        container.innerHTML = html;
    })
    .catch((err) => console.log("There was an error:", err));
    //this only runs if there is an error during the above process

fetch('https://x-colors.herokuapp.com/api/random/hue?type=dark')
    .then((response) => response.json())
    .then((data) => {
        let mainBody = document.getElementById("mainbody");
        mainBody.style.backgroundColor = data.hex;
        mainBody.style.color = "white";
    })
    .catch((err) => console.log("There was an error:", err));
*/

/*extra credit - convert the gathering of the json in a function call then create an async function that compiles the html string. then call the function; this time fetch a light background with dark text as variation. */

//Function to gather the house json information
async function getHouses() {
    try {
        let response = await fetch("houses.json");
        let data = await response.json();
        return data;
    } catch (err) {
        console.log('There is an error', err);
    }
}

// function to compile the html string to display the json information
async function processHouses() {
    try {
        let houses = await getHouses();
        let html = `<h2 class="list">Game of Thrones List</h2><dl class="GoT-House-List">`;

        houses.forEach((house) => {
            let objInfo = `<dt class="house"><h3>${house.name}</h3></dt>`;
            house.members.forEach((member) => {
                objInfo += `<dd class="folks">${member}</dd>`;
            });

            // generate the html snippet for one array item and add to the "html" temp holder.
            html += objInfo;
        });
        //close the html with the closing tag
        html += `</dl>`;

        //make a reference to the html container where
        //the info will be displayed.
        const container = document.querySelector("#container");
        container.innerHTML = html;
    } catch (err) {
        console.log('There is an error', err);
    }
}

//Function to gather the random color json information
async function getColors(shade) {
    try {
        let response = await fetch(`https://x-colors.herokuapp.com/api/random/hue?type=${shade}`);
        let data = await response.json();
        return data;
    } catch (err) {
        console.log('There is an error', err);
    }
}
// function to use that random color for the page background
async function processColors(block, shade) {
    try {
        let colors = await getColors(shade);
        block.style.backgroundColor = colors.hex;
        if (shade === 'light') {
            block.style.color = "black";
        } else {
            block.style.color = "white";
        }
    } catch (err) {
        console.log('There is an error', err);
    }
}

let mainBody = document.getElementById("mainbody");

// call those functions to initialize the page
processHouses();
processColors(mainBody, "light");

//change the color theme based on user selection
let lighten = document.querySelector(".lighten");
let darken = document.querySelector(".darken");

lighten.addEventListener('click', (e) => {
    processColors(mainBody, "light");
});
darken.addEventListener('click', (e) => {
    processColors(mainBody, "dark");
});