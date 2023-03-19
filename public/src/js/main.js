//Este script crea los listeners para el index "Drivers" (Siempre y cuando exista .card-container)
window.addEventListener('load', () => {
    if (!document.querySelector('.card-container')) {
    } else {
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

        let intervalo=500;
        for (let i = 0; i < cards.length; i++) {
            setTimeout(() => {
                cards[i].style.opacity = ('100%')
            }, intervalo);
            intervalo = intervalo+200;
        }
    } 
})


window.addEventListener('load', () => {
    if (!document.querySelector('.tarjeta')) {
    } else {
        let tarjetas = document.querySelectorAll('.tarjeta');
        
        let intervalo=300;
        for (let i = 0; i < tarjetas.length; i++) {
            setTimeout(() => {
                tarjetas[i].style.opacity = ('100%')
            }, intervalo);
            intervalo = intervalo+200;
        }
    }

})


