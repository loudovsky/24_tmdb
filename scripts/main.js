const button = document.querySelector('.button')
const buttonAdd20 = document.querySelector('.button_1')
const input = document.querySelector('.input')
const swiper_wrapper = document.querySelectorAll('.swiper-wrapper')
const container = document.querySelector('.container')
let n = 1;
let p = n - 1;

const swiper = new Swiper(".swiper", {
    slidesPerView: 8,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});

function generate() {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=1&api_key=6631e5f1dc96088e0d26b86da29b5b6a`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.results.length === 0) {
            swiper_wrapper[0].innerHTML = 0;
            swiper_wrapper[0].innerHTML = `<div class="swiper-slide" data-movieid=""><img src="https://image.tmdb.org/t/p/w200/AhtNrNZ3Gkfvb6WfedQdB9kLy4u.jpg" alt=""><h1>The Girl and the Wooden Horse Torture</h1><p>1982</p></div>`
        }
        else {
            swiper_wrapper[0].innerHTML = 0;
            for( let i = 0; i < data.results.length ; i++) {
                if (data.results[i].poster_path !== null) {
                    swiper_wrapper[0].innerHTML += `<div class="swiper-slide" data-movieid="${data.results[i].id}"><img src="https://image.tmdb.org/t/p/w200${data.results[i].poster_path}" alt="${data.results[i].title}"><h1>${data.results[i].title}</h1><p>${data.results[i].release_date.slice(0,4)}<p></div>`
                }
                else {
                    swiper_wrapper[0].innerHTML += `<div class="swiper-slide" data-movieid="${data.results[i].id}"><img src="https://image.tmdb.org/t/p/w200/AhtNrNZ3Gkfvb6WfedQdB9kLy4u.jpg" alt="${data.results[i].title}${data.results[i].title}"><h1>${data.results[i].title}</h1><p>${data.results[i].release_date.slice(0,4)}<p></div>`
                }
            }
        }
        buttonAdd20.addEventListener('click', function(){
            add20()
        })
      })
      .catch(error => {console.log("Erreur lors de la récup des données :", error);
    });
}

function add20() {
    n++;
    container.innerHTML += `<div class="badger">
    <div class="badger-wrapper"></div>
    <div class="badger-pagination"></div>
    </div>`;
    const badger_wrapper = document.querySelector('.badger-wrapper');
    const badger = new Swiper(".badger", {
        slidesPerView: 8,
        spaceBetween: 30,
        pagination: {
          el: ".badger-pagination",
          clickable: true,
        },
    });
    fetch(`https://api.themoviedb.org/3/search/movie?query=${input.value}&include_adult=false&language=en-US&page=${n}&api_key=6631e5f1dc96088e0d26b86da29b5b6a`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
            for( let i = 0; i < data.results.length ; i++) {
                if (data.results[i].poster_path !== null) {
                    badger_wrapper.innerHTML += `<div class="badger-slide" data-movieid="${data.results[i].id}"><img src="https://image.tmdb.org/t/p/w200${data.results[i].poster_path}" alt="${data.results[i].title}"><h1>${data.results[i].title}</h1><p>${data.results[i].release_date.slice(0,4)}<p></div>`
                }
                else {
                    badger_wrapper.innerHTML += `<div class="badger-slide" data-movieid="${data.results[i].id}"><img src="https://image.tmdb.org/t/p/w200/AhtNrNZ3Gkfvb6WfedQdB9kLy4u.jpg" alt="${data.results[i].title}${data.results[i].title}"><h1>${data.results[i].title}</h1><p>${data.results[i].release_date.slice(0,4)}<p></div>`
                }
            }
      })
      .catch(error => {console.log("Erreur lors de la récup des données :", error);
    });
}



button.addEventListener('click', function(){
    generate()
})

input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generate()
    } 
})