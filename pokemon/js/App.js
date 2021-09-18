//

const pokedex=document.getElementById("pokedex");
//console.log(pokedex);

const fetchPokemonInfo =() =>{
 console.log("Fetching!!");
 const combined=[];
 for (var i=1;i<=100;i++)
 {var url=`https://pokeapi.co/api/v2/pokemon/${i}`;
 
 combined.push(fetch(url).then(res=> res.json()));
 }
 Promise.all(combined).then(results=>{
     const pokemon= results.map(data=>({
        name:data.name,
        id:data.id,
        image:data.sprites['front_default'],
       hp:data.stats[0].base_stat,
       attack:data.stats[1].base_stat,
       defence:data.stats[2].base_stat,
       type:data.types.map((type)=>type.type.name).join(', ')
     }));
   displayp(pokemon);
 });


};
var displayp= (pokemon) =>{
    console.log(pokemon);
    var pokemonHTMLString=pokemon.map(
        (rest) => `
        
        <li class="box">
        <div class="box_image">
        <img  src=${rest.image}></div>
        <div  class="status" >
        <ol><li>HP:${rest.hp}</li>
          <li>Attack:${rest.attack}</li>
          <li>Defence:${rest.defence}</li>
          </ol>
        </div>
        <div class="box_content">
        <h2 class="box_header" > ${rest.id}. ${rest.name}</h2>
        <p class="box_type">Type: ${rest.type}</p><div>
       
        </li>
       
        `);

       pokedex.innerHTML=pokemonHTMLString;
};

fetchPokemonInfo();