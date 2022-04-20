// fetch the data from the local json file

fetch("houses.json")
    .then((response) => response.json())
    .then((data) => {
        //create a temp holder to append all the html generated inside the forEach iterators to build a description list.
        let html = `<h2 class="list">Game of Thrones List</h2><dl class="GoT-House-List">`;


        //Pass the argument "house" to the arrow function to capture the house information as the dt
        //then pass the argument "member" to another function to capture each house member in the array as a dd
        data.forEach((house) => {
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
    })
    .catch((err) => console.log("There was an error:", err));
//this only runs if there is an error during the above process

/* part 2 of assignment - make external json call for random dark color then
set it as the background color for the page. Make text color white for the dark background */

fetch('https://x-colors.herokuapp.com/api/random/hue?type=dark')
    .then((response) => response.json())
    .then((data) => {
        let mainBody = document.getElementById("mainbody");
        mainBody.style.backgroundColor = data.hex;
        mainBody.style.color = "white";
    })
    .catch((err) => console.log("There was an error:", err));

let container = document.querySelector("#container");
container.addEventListener('click', (e) => {
    location.reload();
});