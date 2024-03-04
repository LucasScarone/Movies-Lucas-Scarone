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
    renderCards(peliculasid, div, createCard)
})
