const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("result");

btnSearch.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  resultDiv.innerHTML = "";

  fetch("./travel_recommendation_api.json")
    .then((res) => res.json())
    .then((data) => {
      let itemsToDisplay = [];

      if (query.includes("beach")) {
        itemsToDisplay = data.beaches;
      } else if (query.includes("temple")) {
        itemsToDisplay = data.temples;
      } else if (query.includes("countr")) {
        data.countries.forEach((country) => {
          itemsToDisplay.push(...country.cities);
        });
      }

      itemsToDisplay.forEach((item) => {
        resultDiv.innerHTML += `
          <div style="background:#fff; border-radius:8px; padding:15px; margin-bottom:15px; box-shadow:0 2px 5px rgba(0,0,0,0.2); max-width:400px; text-align:left;">
            <img src="${item.imageUrl}" style="width:100%; border-radius:6px;" />
            <h3 style="color:#333; margin:10px 0;">${item.name}</h3>
            <p style="color:#666;">${item.description}</p>
          </div>
        `;
      });
    });
});

btnClear.addEventListener("click", () => {
  searchInput.value = "";
  resultDiv.innerHTML = "";
});
