/* <article class="w-8/12 p-2 border-4 border-[#6D38E0] rounded bg-black text-white">
<img src="https://moviestack.onrender.com/static/y5szbv8zju.jpg" alt="">
<h3 class="flex flex-col text-center font-bold">The Nun II</h3>
<h4 class="font-semibold">Confess your sins.</h4>
<p class="font-semibold"></p>Descripcion:</p>
<p class="line-clamp-3	">
    In 1956 France, a priest is violently murdered, and Sister 
    Irene begins to investigate. She once again comes face-to-face with a powerful evil.</p>
</article> */
// 

const div= document.getElementById("content")


/* Trabajando con nodos */
function createCard( movies ){
    /* Creo el nodo <article> */
    /* document.createElement( elemento ) */
    const article = document.createElement( 'article' )
    /* Le agrego las clases */
    article.className = "w-[233px] h-[131]  md:w-[283px] md:h-[181] p-2 border-4 border-[#6D38E0] m-1 rounded bg-black text-white"

    /* Creo el nodo <img> */
    const img = document.createElement( "img" )
    /* Agrego atributo src a la imagen */
    /* setAttribute */
    img.setAttribute( "src", movies.image )

    /* Agrego atributo alt */
    img.setAttribute( "alt", movies.name )

    const h3 = document.createElement('h3')
    h3.textContent = movies.name

    h3.classList.add( "flex", "flex-col", "text-center", "font-bold" )

    const h4 = document.createElement('h4')
    h4.textContent = movies.title
    h4.classList.add("font-semibold")

    const p = document.createElement( 'p' )
    p.innerHTML = "Descripcion:"
    p.classList.add("font-semibold")

    const p2 = document.createElement( 'p' )
    p2.textContent = movies.overview
    p2.classList.add("line-clamp-3")
     
    const a= document.createElement('a')
    a.setAttribute('class', "font-semibold text-[#6D38E0]")
    a.innerHTML = "See more..."
    a.setAttribute('href', `./detalles.html?id=${movies.id}`)

    /* element.append me permite agregar varios a la vez */
    article.append( img, h3, h4, p, p2, a)

    return article
} 


function renderCards( movies, element, fn ){

    const fragment = document.createDocumentFragment()
    if (movies.length == 0) {
        return element.innerHTML = `<h2>There are no movies with these filters</h2>`
    }
    for (const iterator of movies) {
        /* Ejecuto la funcion que crear el nodo */
        const newArticle = fn( iterator ) 
        /* Agrego el nodo al elemento */
        fragment.appendChild( newArticle )
    }
    element.innerHTML = "" 
    element.appendChild( fragment )

}

renderCards( peliculas, div, createCard )

const div2=document.getElementById('contentselect')

// barra de busqueda
// 1 crear la etiquet 
// 2poner el imput 
// 3trear el DOM
const inputBusqueda = document.getElementById('inputBusqueda')
// 4indentificar el evento 

// 5funcion para filtrar las peliculas por su nombre 
// 6agregarñlos a un array nuevo 
// 7enlazr la funcion con el evento 
// 8indicarle al evento lo que quuiero que haga 
// 9imprimir por pantallala nueva lista cda vez que se busque 
// 10 despues tengo qe hacer que si no encuentra niguno me de un aviso

const genres= peliculas.map(pelicula => pelicula.genres).flat()

const genresSinRepetidos= []
genres.forEach ( genres =>{
    if(!genresSinRepetidos.includes(genres)){
        genresSinRepetidos.push(genres)
    }
})

// console.log(genresSinRepetidos)

function creareOption(params) {
    const option =document.createElement('option')
    option.setAttribute('value', `${params}`)
    option.textContent = params
    return option
    
}
function crearselect( array, element, fn ){
    const select = document.createElement( 'select' )
    select.setAttribute('class', 'bg-[#D2CCFF] h-9 w-full border border-black rounded')
    select.setAttribute('id', 'select')
    const option =document.createElement('option')
    option.setAttribute('value', 'all')
    option.textContent = 'All'
    select.appendChild(option)
    for (const iterator of array) {
        /* Ejecuto la funcion que crear el nodo */
        const newOption = fn( iterator ) 
        /* Agrego el nodo al elemento */
        select.appendChild( newOption )
    }
    element.appendChild( select )
    
}

crearselect(genresSinRepetidos, div2, creareOption)

inputBusqueda.addEventListener('input',()=>{
    const peliFiltradoXTiTulo= filtrarpeliculasporTitulo(peliculas, inputBusqueda.value)
    const filtarPeliXgenres = filtarPeliculasXgenres (peliFiltradoXTiTulo, select)
    renderCards(filtarPeliXgenres, div, createCard );
})

const select = document.getElementById('select')


function filtrarpeliculasporTitulo(ListadePeliculas, title) {
   return ListadePeliculas.filter(pelicula => pelicula.title.toLowerCase().startsWith(title.toLowerCase()))
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
    return ListadePeliculas.filter(pelicula => pelicula.genres.includes(select.value))
}




