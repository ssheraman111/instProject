let API = " http://localhost:8000";
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
let saveBtn = document.querySelector("#saveBtn");
saveBtn.addEventListener("click", () => {
  inp.forEach((item) => {
    console.log(item.value);
  });
});
