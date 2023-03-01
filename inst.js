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

// pagination
let paginationList = document.querySelector(".pagination-list");
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let currentPage = 1;
let pageTotalCount = 1;

let list = document.querySelector("#post-list");
// search
let searchInput = document.querySelector("#search");
let searchVal = "";

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
  drawPaginationButtons();

  let hey = await fetch(`${API}?q=${searchVal}&_page=${currentPage}&_limit=3`);
  let res = await hey.json();
  console.log(res);
  container.innerHTML = "";
  res.forEach((element) => {
    container.innerHTML += `
       <div class="cardPhoto " id="${element.id}">
        <img
          src="${element.photo}"
          class="imgPhoto"
            
          />
          
        <button class="btnDelete">delete</button>
        <button class="btnEdit">edit</button>

      </div>`;
  });
}

async function deleteCard() {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  render();
}
// async function modalLastTry(id) {}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("imgPhoto")) {
    let id = e.target.id;
    console.log(id);

    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {});
  }
});

function drawPaginationButtons() {
  // отправляем запрос для получения обшего количества продуктов
  fetch(`${API}?q=${searchVal}`)
    .then((res) => res.json())
    .then((data) => {
      // рассчитываем общее количество страниц
      pageTotalCount = Math.ceil(data.length / 3);

      paginationList.innerHTML = ""; //очищаем для предотвращения дублирования

      for (let i = 1; i <= pageTotalCount; i++) {
        // создаем кнопки с цифрами и для текущей страницы задаем класс active
        if (currentPage == i) {
          let page1 = document.createElement("li");
          page1.innerHTML += `
        <li class="page-item active"><a class="page-link page_number" href="#">${i}</a></li> 

          `;
          paginationList.append(page1);
        } else {
          let page1 = document.createElement("li");
          page1.innerHTML += `
          <li class="page-item"><a class="page-link page_number" href="#">${i}</a></li> 
  
            `;
          paginationList.append(page1);
        }
      }
      // красим в серый цвер пред и след кнопки
      if (currentPage == 1) {
        prev.classList.add("disabled");
      } else {
        prev.classList.remove("disabled");
      }

      if (currentPage == pageTotalCount) {
        next.classList.add("disabled");
      } else {
        next.classList.remove("disabled");
      }
    });
}
prev.addEventListener("click", () => {
  // делаем проверку на то не находимся ли мы на первой странице
  if (currentPage <= 1) {
    return;
  } //если не находимся на первой то перезаписываем currPage и вызываем render
  currentPage--;
  render();
});

next.addEventListener("click", () => {
  if (currentPage >= pageTotalCount) {
    return;
  }
  currentPage++;
  render();
});

document.addEventListener("click", function (e) {
  // отлавливаем click по цифре из pagination
  if (e.target.classList.contains("page_number")) {
    // опять перезаписываем currentPage на то значение которое содержит элемент на который нажали
    currentPage = e.target.innerText;
    // вызываем render с перезаписанным currentPage
    render();
  }
});

// search
searchInput.addEventListener("input", () => {
  searchVal = searchInput.value;
  render();
});

// delete
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnDelete")) {
    console.log("delete clicked");
    let id = e.target.id;

    fetch(`${API}/${id}`, { method: "DELETE" }).then(() => render());
    // вызываем функцию (render) отображения актуальных данных
  }
});
// test git check
console.log("test");
