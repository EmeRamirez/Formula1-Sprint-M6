if (document.querySelector('.card-container')) {
    let card = document.querySelectorAll('.card-container');
}

window.addEventListener('load', () => {
    if (!document.querySelector('.card-container')) {
    } else {
        let cards = document.querySelectorAll('.card-container');
        let intervalo=500;
        for (let i = 0; i < cards.length; i++) {
            setTimeout(() => {
                cards[i].style.opacity = ('100%')
            }, intervalo);
            intervalo = intervalo+200;
        }
    }
})


// window.addEventListener('load',()=>{

//     for(let i = 0 ; i < 20 ; i++){ 
//         setTimeout(() => {
//             document.querySelector(`.card-container${i}`).style.opacity=('100%')
//         }, 500);
//     }   

// })

let cards = document.querySelectorAll('.card-container');
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('mouseover', () => {
        cards[i].style.border = ("3px solid rgba(11, 63, 207, 0.507)");
        cards[i].style.scale = ("105%");
    })
    cards[i].addEventListener('mouseout', () => {
        cards[i].style.border = ("3px solid rgba(255, 0, 0, 0.473)");
        cards[i].style.scale = ("100%");
    })
}

// document.querySelectorAll(".card-container").forEach((el, index) => {
//     el[index].addEventListener('mouseover', () => {
//          el[index].style.border=("2px solid rgba(11, 63, 207, 0.507)")
// })})

