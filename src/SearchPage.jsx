import { useEffect, useState, useRef } from "react";
import PokemonStats from "./pokemonStats";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const inputRef = useRef(null);

  const fetchPokemon = async (name = search) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    setPokemon(data);
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchAllPokemon = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
      const data = await response.json();
      setAllPokemon(data.results.map((p) => p.name));
    };
    fetchAllPokemon();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setSuggestions(allPokemon.filter((name) => name.startsWith(search.toLowerCase())).slice(0, 8));
    } else {
      setSuggestions([]);
    }
  }, [search, allPokemon]);

  return (
    <div>
      <h1>Pokémon Search</h1>
      <input
        ref={inputRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoFocus
        placeholder="Search pokemon..."
      />

      {suggestions.map((name) => (
        <div key={name} onClick={() => { setSearch(name); fetchPokemon(name); }}>
          {name} hoi
        </div>
      ))}

      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <h2>test stats</h2>
          <ul>
            <PokemonStats pokemon={pokemon} />
          </ul>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </div>
  );
}

export default SearchPage;