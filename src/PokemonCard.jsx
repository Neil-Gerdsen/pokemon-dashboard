import { useEffect, useState } from "react";
import icons from "./assets/icons";

function PokemonCard({ p, onClick, isFavorite, onToggleFavorite }) {
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

  // useEffect(() => {
  //   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  //   setIsFavorite(favorites.includes(p.name));
  // }, [p.name]);


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
      {/* <img 
        onClick={onClick}
        src={icons.favorite}
        alt="Favorite"
        className="w-6 h-6 object-contain mb-2 self-end"
      /> */}

      <button
        onClick={(e) => {
          e.stopPropagation(); // voorkomt dat card click triggert
          onToggleFavorite();
        }}
        className="flex self-end top-2 right-2"
      >
        {isFavorite ? "⭐" : "☆"}
      </button>

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
    </div>
  );
}

export default PokemonCard;