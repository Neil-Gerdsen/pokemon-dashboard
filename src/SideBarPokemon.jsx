import { useEffect, useState } from "react";
import PokemonStats from "./pokemonStats";

function SideBarPokemon({ }) {
    const [allPokemon, setAllPokemon] = useState([]);
    const [pokemon, setPokemon] = useState(null);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        async function fetchAllPokemon() {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
            const data = await response.json();
            setAllPokemon(data.results);
        }
        fetchAllPokemon();
    }, []);

    const fetchPokemon = async (name = search) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json();
        setPokemon(data);
        setSuggestions([]);
    };

    return (
        <>
            <h2>All Pokémon</h2>
            <div className="flex flex-row gap-8 w-full p-4 rounded">

                <div className="flex flex-col w-[50%] overflow-y-auto max-h-screen border-r border-gray-300 pr-4">
                    {allPokemon.map((p) => (
                        <p
                            key={p.name}
                            onClick={() => {
                                fetchPokemon(p.name);
                                setSearch(p.name);
                            }}
                        >
                            {p.name}
                        </p>
                    ))}
                </div>
                <div className="flex w-[50%] flex-col gap-4">
                    <h1>hoi</h1>
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
            </div>

        </>
    )
}
export default SideBarPokemon;