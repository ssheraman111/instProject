let API = " http://localhost:8000/post";
let addPostBtn = document.querySelector(".addPost");

// Here I added attributes of modal window so after clicking the button
// we get a modal window with two inputs
addPostBtn.setAttribute("data-bs-toggle", "modal");
addPostBtn.setAttribute("data-bs-target", "#haroo");
// addPostBtn.classList.add("btn btn-success");

// calling out inps of modal window
let descr = document.querySelector("#descr");
let photo = document.querySelector("#photo");
let inp = document.querySelectorAll(".inp");
console.log(descr, photo);
//getting save button

let saveBtn = document.querySelector("#saveBtn");

let card = document.querySelector(".imgPhoto");

//adding event listener and iterating input values
render();

saveBtn.addEventListener("click", async function () {
  if (!descr.value.trim() || !photo.value.trim()) {
    alert("hey");
    return;
  } else {
    let postData = {
      descr: descr.value,
      photo: photo.value,
    };
    // console.log(postData);
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(postData),
    });
  }
  descr.value = "";
  photo.value = "";
  container.innerHTML = "";

  render();
});
//  getting container
let container = document.querySelector(".container");

//creating function get data from JsonServer

async function get() {
  let hey = await fetch(API);
  let res = await hey.json();
  console.log(res);
  render(res.photo);
}
// get();
// //creating function render
async function render() {
  let hey = await fetch(API);
  let res = await hey.json();
  console.log(res);
  res.forEach((element) => {
    container.innerHTML += `
       <div class="cardPhoto">
        <img
          src="${element.photo}"
          class="imgPhoto"
            data-bs-toggle="modal"
            data-bs-target="#bigPostModal"
          id="${element.id}"
        />
      </div>`;
  });
}

async function deleteCard() {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}
function modalLastTry() {}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("imgPhoto")) {
    let id = e.target.id;
    let hey = await fetch(`${API}/${id}`);
    let res = await hey.json();
    let photo = res.photo;
    e.target.src = photo;
    console.log(e.target);
    console.log(res);
  }
});

// document.addEventListener("click", function (e) {
//     if (e.target.classList.contains("btn-edit")) {
//       // Catching ID

//       let id = e.target.id;
//       // Get data of product that we are editing
//       fetch(`${api}/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           // fill inputs of modal window with data that we fetch from json.server
//           editTitle.value = data.title;
//           editDescr.value = data.descr;
//           editImage.value = data.image;
//           editPrice.value = data.price;

//           // giving ID to the button save changes

//           editSaveBtn.id = data.id;
//           // editSaveBtn.setAttribute("id", data.id);
//         });
//     }
//   });
