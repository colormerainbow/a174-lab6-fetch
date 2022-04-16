
//This code does NOT create any global variables.
//Promises can be chained together, with the previous promise
// passing its results to the next one in the chain.
// the format is: fetch().then().then().catch()
//it's easier to read if we put each step in its own line,
//that's why the periods start the then lines.

fetch("houses.json")
    .then((response) => response.json())
    .then((data) => {
        //create a temp holder to append all the html generated inside the forEach iterators to build a description list.
        let html = `<p class="list">Game of Thrones List</p><dl class="GoT-House-List">`;


        //Pass the argument "house" to the arrow function to capture the house information as the dt
        //then pass the argument "member" to another function to capture each house member in the array as a dd
        data.forEach((house) => {
            let objInfo = `<dt class="house">${house.name}</dt>`;
            house.members.forEach((member) =>{
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
