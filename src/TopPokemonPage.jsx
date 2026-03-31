import { useEffect, useState } from "react";

function TopPokemonPage() {
  const [top10, setTop10] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await response.json();
      setAllPokemon(data.results);
    }
    fetchAllPokemon();
  }, []);

  useEffect(() => {
    async function fetchTopPokemon() {
      if (!allPokemon.length) return;

      setLoading(true);
      const detailed = await Promise.all(
        allPokemon.map(async (p) => {
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

      const top10Result = detailed
        .sort((a, b) => b.totalStats - a.totalStats)
        .slice(0, 10);

      setTop10(top10Result);
      setLoading(false);
    }

    fetchTopPokemon();
  }, [allPokemon]);

  return (
    <div>
      <h1>Top 10 Strongest Pokémon</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {top10.map((p) => (
            <p key={p.name}>
              {p.name} - {p.totalStats}
            </p>
          ))}
        </>
      )}
    </div>
  );
}

export default TopPokemonPage;
