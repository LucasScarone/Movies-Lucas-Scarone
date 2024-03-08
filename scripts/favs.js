import {renderCards, createCard } from './module/funcione.js'
let peliculas=[]
const url='https://moviestack.onrender.com/api/movies'
const init = {
    method: "GET",
    headers:{
        'x-api-key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
    }
}
const listFavs = JSON.parse( localStorage.getItem('listFavs') ) || [] 
const div= document.getElementById('content')

console.log(listFavs)

fetch(url,init)
.then(response => response.json())
.then((data)=>{
    peliculas = data.movies
    const peliculasid = peliculas.filter(pelicula => listFavs.includes(pelicula.id))
    content.addEventListener('click', (e) => {
    // detecto el click
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            // asigno peliculaFavs elvalor que necesito en el array
            const peliculaFavs = button.dataset.id;
            // ahora hago un indexof para buscar si la lista}
            console.log(peliculaFavs)
            // tiene ese valor incluido y lo guardo
            listFavs.filter(listFavsid => listFavsid != peliculaFavs)
            localStorage.setItem( 'listFavs',JSON.stringify(listFavs))
            renderCards(listFavs, div, createCard)
        }   
    })
})
