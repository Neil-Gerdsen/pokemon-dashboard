import { useEffect, useState, useRef } from "react";


async function GetTopPokemon({allPokemon}) {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await res.json();

  const pokemonList = data.results;

  const detailed = await Promise.all(
    pokemonList.map(async (p) => {
      const res = await fetch(p.url);
      const pokeData = await res.json();

      const totalStats = pokeData.stats.reduce(
        (sum, stat) => sum + stat.base_stat,
        0
      );

      return {
        name: pokeData.name,
        totalStats,
      };
    })
  );

  const top10 = detailed
    .sort((a, b) => b.totalStats - a.totalStats)
    .slice(0, 10);

  console.log(top10);


  return(
    <>
    <h1>Top 10 Strongest Pokémon</h1>
    <h1>{top10}</h1>
    
    </>
  );
}

export default GetTopPokemon;