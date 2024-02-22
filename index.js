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
    /* element.append me permite agregar varios a la vez */
    article.append( img, h3, h4, p, p2 )

    return article
} 


function renderCards( movies, element, fn ){
    /* Recorro la lista de personajes */

    const fragment = document.createDocumentFragment()
    for (const iterator of movies) {
        /* Ejecuto la funcion que crear el nodo */
        const newArticle = fn( iterator ) 
        /* Agrego el nodo al elemento */
        fragment.appendChild( newArticle )
    }
    element.appendChild( fragment )

}

renderCards( peliculas, div, createCard )


