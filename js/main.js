const API = "http://localhost:8000/profile";

//! Вытаскиваем инпуты создания поста

const desc = document.querySelector("#inp_desc");

const img = document.querySelector("#inp_img");

//! вытаскиваем кнопку создания

const btnAdd = document.querySelector("#btn-create");

//! вытаскиванм блок profile

const list = document.querySelector("#profile-list");

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

  let modal = bootstrap.Modal.getInstance(exampleModal);
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

async function render() {
  let profile = await fetch(API).then((res) => res.json());

  list.innerHTML = "";

  profile.forEach((data) => {
    let newElem = document.createElement("div");

    newElem.innerHTML = `
    <div class="mb-3 card" style="width: 25rem">
    <div class = 'm-1'>
    <img id = 'insta_avatar' src = 'https://images.pexels.com/photos/6055975/pexels-photo-6055975.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'>
    <span id = insta_nick class = 'ms-1'>add_code<span>
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
