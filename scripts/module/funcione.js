export function createCard( movies ){

    const listFavs = JSON.parse( localStorage.getItem('listFavs') ) || [] 
// La pelicula que llega  si tiene el id del alguno de los que esta en listFavs entonces esta pelicula esta en favoritos
    const pelifav= listFavs.some(favs => favs === movies.id)
    // logica para el boton
    
    
    // agregando el url a la imagen
    const url='https://moviestack.onrender.com/static/'+ movies.image
    /* Creo el nodo <article> */
    /* document.createElement( elemento ) */
    const article = document.createElement( 'article' )
    /* Le agrego las clases */
    article.className = "flex flex-col w-[233px] h-[131]  md:w-[283px] md:h-[181] p-2 border-4 border-[#6D38E0] m-1 rounded bg-black text-white"
    // agrego un boton
    const boton =document.createElement('button')
    // agrego type
    boton.setAttribute('type', 'button')    
    // Le agrego el id de la pelicula
    boton.setAttribute('data-id', movies.id)
    // agrego la clase
    
    boton.className ="w-10 text-black border-2 border-red-500 self-end bg-white "
    
    // agrego text
    boton.textContent = "FAVS"

    if (pelifav) {
        boton.classList.add( "bg-red-500")
    }
    /* Creo el nodo <img> */
    const img = document.createElement( "img" )
    /* Agrego atributo src a la imagen */
    /* setAttribute */
    img.setAttribute( "src", url )

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
    article.append( boton, img, h3, h4, p, p2, a)
    
    return article
} 


export function renderCards( movies, element, fn ){

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


