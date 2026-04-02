import { useEffect, useState, useRef } from "react";
import PokemonStats from "./pokemonStats";
import PokemonCard from "./PokemonCard";
import icons from "./assets/icons";
import Filter from "./Filter";

function SearchPage() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const inputRef = useRef(null);


  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name) => {
    setFavorites((prev) =>
      prev.includes(name)
        ? prev.filter((f) => f !== name)
        : [...prev, name]
    );
  };


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
      const detailed = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          const d = await res.json();

          return {
            ...p,
            types: d.types.map((t) => t.type.name),
          };
        })
      );
      setAllPokemon(detailed);
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

  const filteredSuggestions = suggestions.filter((p) => {
    if (!p.types) return true;
    if (selectedTypes.length === 0) return true;

    return selectedTypes.every((type) =>
      p.types?.includes(type)
    );
  });

  const sortedSuggestions = [...filteredSuggestions].sort((a, b) => {
    return favorites.includes(b.name) - favorites.includes(a.name);
  });


  return (
    <div className="flex flex-row gap-4">
      <section className="flex flex-col gap-4 w-[30%] items-center">

        <div className="h-screen flex flex-col p-4">
          <div className="flex justify-between items-center w-[90%] relative">
            <h1 className="text-2xl font-bold">Pokémon Search</h1>

            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="bg-gray-200 px-3 py-1 rounded"
            >
              Filter
            </button>

            {showFilter && (
              <Filter
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
              />
            )}
          </div>
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
              {sortedSuggestions.map((p) => (
                <PokemonCard
                  key={p.name}
                  p={p}
                  onClick={() => {
                    setSearch(p.name);
                    fetchPokemon(p.name);

                    // setIsFavorite(JSON.parse(localStorage.getItem("favorites"))?.includes(p.name) || false);
                  }}
                  isFavorite={favorites.includes(p.name)}
                  onToggleFavorite={() => toggleFavorite(p.name)}
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
            <div className="flex gap-2 mt-2">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-200 capitalize"
                >
                  <img
                    src={icons[t.type.name]}
                    alt={t.type.name}
                    className="w-4 h-4"
                  />
                  {t.type.name}
                </span>
              ))}
            </div>

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