document.querySelector(".searchButton").addEventListener("click", function() {
  let ing1 = $("#Ing1").val();
  let ing2 = $("#Ing2").val();
  let ing3 = $("#Ing3").val();
  let request = new XMLHttpRequest();
  let apiKey = "7a91dadd6f844e0982e53a342d4fc973";
  //We are changing the URL to be more dynamic with the recipes

  let url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ing1},${ing2},${ing3}&number=4`;

  request.open("GET", url, true);

  request.onload = function() {
    if (this.response === "Not Found") {
      console.log("404 Not Found");
    } else {
      let data = JSON.parse(this.response);

      if (request.status >= 200 && request.status < 400) {
        console.log(data);
        //Displaying Recipes

        //Appends the Information on page

        for (i = 0; i < data.length; i++) {
          // $(`.recipe${i}`).append(`<img src="${data[i].image}"/>`);
          // $(`.recipe${i}`).append(`<h3>${data[i].title}</h3>`);
          document.querySelector(`.title${i}`).innerText = `${data[i].title}`;
          // document.querySelector(`.img${i}`).innerText = `${data[i].image}`
          $(`.img${i}`).attr("src", `${data[i].image}`)


          ingInstructions(data[i].id)
          // console.log(data[i].id,i)
        }
      }
    }
  };

  request.send();
});

//I changed the insstructions to top of function instead of outside the for loop to try
function ingInstructions(id, index) {
  let request = new XMLHttpRequest();
  let apiKey = "7a91dadd6f844e0982e53a342d4fc973";
  let url = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`;

  request.open("GET", url, true);

  request.onload = function() {
    if (this.response === "Not Found") {
      console.log("404 Not Found");

    } else {
      let data = JSON.parse(this.response);
      if (request.status >= 200 && request.status < 400) {
        // console.log(data)
        let instructions = '';
        for (i = 0; i < data[0].steps.length; i++) {
          instructions += data[0].steps[i].step;
        }
        console.log(instructions)
        document.querySelector(`.inst${index}`).innerText = instructions
      }

    }
  }
  request.send();
}



function scrollToTop() {
  window.scrollTo(0, 0);
}