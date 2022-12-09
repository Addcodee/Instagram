const API = "http://localhost:8000/insta-data";

//! Вытаскиваем инпуты создания поста

const desc = document.querySelector("#inp_desc");

const img = document.querySelector("#inp_img");

//! вытаскиваем кнопку создания

const btnAdd = document.querySelector("#btn-create");

//! вытаскиванм блок profile

const list = document.querySelector("#profile-list");

// ! вытаскиваем кнопки points, редактировать и удалить
const btnModalPoints = document.querySelector("#card_points");

const btnDelete = document.querySelector("points_delete");

const btnEdit = document.querySelector("#btn-edit");

//! вытаскиваем инпуты редактирования 

const editDesc = document.querySelector("#edit_inp_desc");

const editImg = document.querySelector("#edit_inp_img");

//! функция создания

btnAdd.addEventListener("click", function (e) {
  let obj = {
    desc: desc.value,
    img: img.value,
  };
  if (!obj.img.trim()) {
    alert("Нет картинки");
    return;
  }
  desc.value = "";
  img.value = "";

  let modal = bootstrap.Modal.getInstance(addModal);
  modal.hide();

  createPost(obj);
});

async function createPost(obj) {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  });
  render();
}

render();

//! функция чтения

async function render() {
  let profile = await fetch(API).then((res) => res.json());

  list.innerHTML = "";

  profile.forEach((data) => {
    let newElem = document.createElement("div");

    newElem.innerHTML = `
    <div class="mb-3 card" style="width: 27rem">
    <div class = 'mt-2 mb-2 ms-2 d-flex justify-content-between'>
    <div>
    <img id = 'insta_avatar' src = 'https://images.pexels.com/photos/6055975/pexels-photo-6055975.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'>
    <span id = insta_nick class = 'ms-2'>add_code<span>
    </div>
    <button id= ${data.id} class= 'me-2 card_points' data-bs-toggle="modal" data-bs-target="#point_modal">...</button>
    </div>
  
  <img src="${data.img}" class="card-img-top" alt="...">
  
  
  
  <div class="card-body">
  
  
  
  <div class = 'd-flex justify-content-between'>
  
  <div class = 'mb-4'>
  
  <img id = 'insta_like' src = 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png'>
  <img id = 'insta_comment' src = 'https://cdn-icons-png.flaticon.com/128/5948/5948565.png'>
  <img id = 'insta_repost' src = 'https://cdn-icons-png.flaticon.com/128/3024/3024593.png'>
  </div>
  
  <div>
  <img id = 'insta_save' src = 'https://cdn-icons-png.flaticon.com/128/5662/5662990.png'>
  </div>
  
  
  </div>

    <p class="card-title">${data.desc}</p>
  </div>
  
  </div>
    `;
    list.append(newElem);
  });
}

//! функция редактирования

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("card_points")) {
    let id = e.target.id;
    fetch(`${API}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        editDesc.value = data.desc
        editImg.value = data.img

        btnEdit.setAttribute('id', data.id)
      });
  }
});

btnEdit.addEventListener('click', async function(){
  let id = this.id

  let desc = editDesc.value
  let img = editImg.value

if(!desc || !img) return

let editedObj = {
  desc: desc,
  img: img
}
saveEdit(editedObj, id)
})

async function saveEdit(editedObj, id){
  await fetch(`${API}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(editedObj)
  })
  render()
  let modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
}