import {renderCards, createCard } from './module/funcione.js'

let peliculas=[]

const div= document.getElementById("content")

const div2=document.getElementById('contentselect')

const inputBusqueda = document.getElementById('inputBusqueda')

const url='https://moviestack.onrender.com/api/movies'
const init = {
    method: "GET",
    headers:{
        'x-api-key': '0ff70d54-dc0b-4262-9c3d-776cb0f34dbd'
    }
}


fetch(url,init)
.then(response => response.json())
.then((data)=>{
    peliculas = data.movies
    // const PeliculasconFavs= peliculas.map(peliculas =>{
    //     return{
    //         peliculas,
    //         favs: true
    //     }
    
    

    renderCards(peliculas, div, createCard)

    const genres= peliculas.map(pelicula => pelicula.genres).flat()

    const genresSinRepetidos= []
        genres.forEach ( genres =>{
        if(!genresSinRepetidos.includes(genres)){
            genresSinRepetidos.push(genres)
        }
        })

    function creareOption(params) {
        const option =document.createElement('option')
        option.setAttribute('value', `${params}`)
        option.textContent = params
        return option
    
    }
    function crearselect(array, element, fn) {
        const select = document.createElement("select");
        select.setAttribute(
            "class",
            "bg-[#D2CCFF] h-9 w-full border border-[#6D38E0] rounded xl:h-[60px] xl:border-2 xl:text-xl 2xl:text-3xl 2xl:h-[80px]"
        );
        select.setAttribute("id", "select");
        const option = document.createElement("option");
        option.setAttribute("value", "all");
        option.textContent = "All";
        select.appendChild(option);
        for (const iterator of array) {
            /* Ejecuto la funcion que crear el nodo */
            const newOption = fn(iterator);
            /* Agrego el nodo al elemento */
            select.appendChild(newOption);
        }
        element.appendChild(select);
    }

    crearselect(genresSinRepetidos, div2, creareOption)

    inputBusqueda.addEventListener('input',()=>{
        const peliFiltradoXTiTulo= filtrarpeliculasporTitulo(peliculas, inputBusqueda.value)
        const filtarPeliXgenres = filtarPeliculasXgenres (peliFiltradoXTiTulo, select)
        renderCards(filtarPeliXgenres, div, createCard );
    })

    const select = document.getElementById('select')


    function filtrarpeliculasporTitulo(ListadePeliculas, title) {
    return ListadePeliculas.filter(peliculas => peliculas.title.toLowerCase().startsWith(title.toLowerCase()))
    } 


    select.addEventListener( 'change', ()=>{
        const peliculasfiltradasXgenres= filtarPeliculasXgenres(peliculas, select)
        const peliFiltradoXTiTulo= filtrarpeliculasporTitulo(peliculasfiltradasXgenres, inputBusqueda.value)

        renderCards(peliFiltradoXTiTulo, div, createCard)
    })

    function filtarPeliculasXgenres(ListadePeliculas, select){
        console.log(select.value)
        if (select.value === "all") {
            return ListadePeliculas
        }
        return ListadePeliculas.filter(peliculas => peliculas.genres.includes(select.value))
    }

    const content = document.getElementById('content');
    // recupero los datos
    const listFavs = JSON.parse( localStorage.getItem('listFavs') ) || [] 

    content.addEventListener('click', (e) => {
    // detecto el click
        if (e.target.tagName === 'BUTTON') {
            // asigno una variable
            const button = e.target;
            // agrego y saco el color si ya lo tiene
            button.classList.toggle("bg-red-500");
            // asigno peliculaFavs elvalor que necesito en el array
            const peliculaFavs = button.dataset.id;
            // ahora hago un indexof para buscar si la lista 
            // tiene ese valor incluido y lo guardo
            const index = listFavs.indexOf(peliculaFavs);
            // ahora compruebo si lo tiene lo borre y si no lo tien 
            // lo argregue
            if (index === -1) {
                listFavs.push(peliculaFavs);
            } else {
                listFavs.splice(index, 1);
            }
            if (listFavs.length === 0) {
                console.log("No Hay elementos en la lista"); 
            }else{
                console.log(listFavs);

            }
        }
        localStorage.setItem( 'listFavs',JSON.stringify(listFavs))
    })


})



