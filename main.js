let timer;
let deleteFirstPhotoDelay;

async function start() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (e) {
    console.log("Error in fetching data through API");
  }
}

start();

function createBreedList(breedList) {
  document.getElementById("header").innerHTML = `
<select onchange="loadByBreed(this.value)">
        <option>Choose your Fav!</option>
        ${Object.keys(breedList)
          .map(function (breed) {
            return `<option>${breed}</option>`;
          })
          .join("")}
</select>
`;
}

async function loadByBreed(breed) {
  if (breed != "Choose your Fav!") {
    alert(breed);
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlider(data.message);
  }
}

function createSlider(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);
  if (images.length > 1) {
    document.getElementById("slider").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `;
    currentPosition += 2;
    if (images.length == 2) currentPosition = 0;
    timer = setInterval(nextSlide, 3000);
  } else {
    document.getElementById("slider").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `;
  }

  function nextSlide() {
    document
      .getElementById("slider")
      .insertAdjacentHTML(
        "beforeend",
        `<div class="slide" id="slide style="background-image: url('${images[currentPosition]}')"></div>`
      );
    deleteFirstPhotoDelay = setTimeout(function () {
      document.querySelector(".slide").remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
