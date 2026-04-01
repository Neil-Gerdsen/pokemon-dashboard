import { useEffect, useState, useRef } from "react";
import PokemonStats from "./pokemonStats";
import PokemonCard from "./PokemonCard";

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
      setAllPokemon(data.results);
    };
    fetchAllPokemon();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // console.log(allPokemon);
    if (search.length > 0) {
      setSuggestions(allPokemon.filter((p) => p.name.startsWith(search.toLowerCase())).slice(0, 8));
    } else {
      setSuggestions(allPokemon);
    }
  }, [search, allPokemon]);

  return (
    <div className="flex flex-row gap-4">
      <section className="flex flex-col gap-4 w-[30%] items-center">
        {/* <h1>Pokémon Search</h1> */}

        {/* <input
          className="w-[40%]"
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          placeholder="Search pokemon..."
        /> */}
        {/* <div className="flex flex-col overflow-auto h-[80%] w-full">
          {suggestions.map((p) => (
            <div key={p.name} onClick={() => { setSearch(p.name); fetchPokemon(p.name); }}>
              <PokemonCard p={p} />
            </div>
          ))}
        </div> */}
        <div className="h-screen flex flex-col p-4">
  <h1 className="text-2xl font-bold mb-4">Pokémon Search</h1>

  <input
    ref={inputRef}
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search pokemon..."
    className="border p-2 rounded mb-4"
  />

  {/* SCROLL AREA */}
  <div className="flex-1 overflow-y-auto">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {suggestions.map((p) => (
        <PokemonCard
          key={p.name}
          p={p}
          onClick={() => {
            setSearch(p.name);
            fetchPokemon(p.name);
          }}
        />
      ))}
    </div>
  </div>
</div>
      </section >
    <section className="flex flex-col gap-4 w-[70%]">
      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          
          <ul>
            <PokemonStats pokemon={pokemon} />
          </ul>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
    </section>
    </div >
  );
}

export default SearchPage;