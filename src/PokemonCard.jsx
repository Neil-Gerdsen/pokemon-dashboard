import { useEffect, useState } from "react";
const typeColors = {
  fire: "bg-red-400 text-white",
  water: "bg-blue-400 text-white",
  grass: "bg-green-400 text-white",
  electric: "bg-yellow-300 text-black",
  poison: "bg-purple-400 text-white",
  bug: "bg-lime-400 text-black",
  normal: "bg-gray-300 text-black",
  flying: "bg-indigo-300 text-black",
  ground: "bg-yellow-600 text-white",
  fairy: "bg-pink-300 text-black",
};
function PokemonCard({ p, onClick }) {
  const [types, setTypes] = useState([]);

  const id = p.url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await fetch(p.url);
        const data = await res.json();
        setTypes(data.types);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTypes();
  }, [p.url]);

  return (
    <div
      onClick={onClick}
      className="
        flex flex-col items-center
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-200
        p-4 cursor-pointer
        border border-gray-100
      "
    >
      <img
        src={imageUrl}
        alt={p.name}
        className="w-20 h-20 object-contain mb-2"
      />

      <p className="capitalize font-semibold text-gray-800">
        {p.name}
      </p>

      <span className="text-xs text-gray-400 mb-2">
        #{id}
      </span>

      {/* TYPES */}
      <div className="flex gap-2 flex-wrap justify-center">
        {types.map((t) => (
          <span
            key={t.type.name}
            className="text-xs px-2 py-1 rounded-full bg-gray-200 capitalize"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;