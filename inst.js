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

//adding event listener and iterating input values

saveBtn.addEventListener("click", async function () {
  if (!descr.value.trim() || !photo.value.trim()) {
    alert("hey");
    return;
  } else {
    let postData = {
      descr: descr.value,
      photo: photo.value,
    };
    console.log(postData);
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(postData),
    });
  }
});
