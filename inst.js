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
          <button onclick=deleteCard(${element.id})>delete</button>
        </div>`;
  });
}

async function deleteCard(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}
