
let peliculas =[]
const URLParams = new URLSearchParams (location.search)
const id= URLParams.get('id')
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
const peliDetalle= peliculas.find(pelicula => pelicula.id == id)
const divDetalle=document.getElementById('contentDetalles')

divDetalle.innerHTML=`
<div class="flex grow flex-wrap items-center justify-center bg-gradient-to-b from-black via-indigo-500 to-purple-500">
        <img class="w-[80px] h-[80px] bg-gradient-to-t from-purple-400 object-cover border border-white rounded-full md:ml-1" src="./img/Moviestack_isotipo.png" alt="logo">
        <h1 class="flex font-bold text-3xl md:ml-2 md:grow lg:grow ">MOVIESTACK</h1>
        <nav class="grow p-2 flex justify-center gap-5 md:grow-0 lg:grow-0">
        <a class="bg-white text-[#6D38E0] border border-[#6D38E0] rounded p-2 text-lg font-semibold" href="index.html">Home</a>
        <a class="bg-white text-[#6D38E0] border border-[#6D38E0] rounded p-2 text-lg font-semibold" href="movies.html">Movies</a>
        <a class="bg-white text-[#6D38E0] border border-[#6D38E0] rounded p-2 text-lg font-semibold" href="">Favs</a>
        </nav>
    <main class=" flex-wrap ">
            <a class="font-semibold text-white" href="/movies.html"> <- Back to top</a>
        <div class="flex flex-wrap">
            <img class="w-full h-1/2 md:pl-2  md:w-[350px] md:h-[300px] lg:w-1/2 lg:h-1/2" src="https://moviestack.onrender.com/static/${peliDetalle.image}" alt="${peliDetalle.title}">
            <div class="px-5 md:w-1/2">
                <h2 class="text-center font-bold text-3xl">${peliDetalle.title}</h2>
                <h3 class="font-bold text-2xl">${peliDetalle.tagline}</h3>
                <h4 class="font-bold text-white">#${peliDetalle.genres}</h4>
                <p>${peliDetalle.overview}</p>
                </div>
        </div>
        <div id="tabla" class="flex justify-center text-center gap-2 px-1 md:gap-[100px] lg:gap-[40px] lg:pt-2 ">
            <table class="flex md:w-2/5 justify-center">
                <thead class=" w-1/2">
                    <tr class="flex flex-col text-white border ">
                        <th class="border ">Original Language</th>
                        <th class="border ">Release Date</th>
                        <th class="border ">Runtime</th>
                        <th class="border ">Status</th>
                    </tr>
                </thead>
                <tbody class="w-1/2 ">
                    <tr class="flex flex-col border ">
                        <td class="border max-md:h-[52px]">${peliDetalle.original_language}</td>
                        <td class="border ">${peliDetalle.release_date}</td>
                        <td class="border ">${peliDetalle.runtime} min</td>
                        <td class="border ">${peliDetalle.status}</td>
                    </tr>
                </tbody>
            </table>
            <table class="flex md:w-2/5 ">
                <thead class=" md:w-1/2">
                    <tr class="flex flex-col text-white border">
                        <th class="border max-md:h-[52px]">Vote Average</th>
                        <th class="border">Budget</th>
                        <th class="border">Revenue</th>
                    </tr>
                </thead>
                <tbody class=" md:w-1/2">
                    <tr class="flex flex-col border w-full">
                        <td class="border max-md:h-[52px]">${peliDetalle.vote_average}</td>
                        <td class="border">${peliDetalle.budget.toLocaleString()}</td>
                        <td class="border">${peliDetalle.revenue.toLocaleString()}</td>
                        </tr>
                </tbody>
            </table>
        </div>
    </main>
</div>`

})
