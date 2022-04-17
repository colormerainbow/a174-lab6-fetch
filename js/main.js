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
    let response = await fetch("houses.json");
    console.log('house response is', response);
    return response.json();
}

// function to compile the html string to display the json information
async function processHouses() {
    let houses = await getHouses();
    console.log(houses);
    let html = `<p class="list">Game of Thrones List</p><dl class="GoT-House-List">`;
    houses.forEach((house) => {
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
}

//Function to gather the random color json information
async function getColors() {
    let response = await fetch('https://x-colors.herokuapp.com/api/random/hue?type=light');
    console.log('response is', response);
    return response.json();
}
// function to use that random color for the page background
async function processColors() {
    console.log('here');
    let colors = await getColors();
    console.log('colors', colors);
    let mainBody = document.getElementById("mainbody");
    mainBody.style.backgroundColor = colors.hex;
    mainBody.style.color = "black";
}

// call those functions
processHouses();
processColors();