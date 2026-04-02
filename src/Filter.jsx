import icons from "./assets/icons";

const allTypes = [
  "fire","water","grass","electric","bug","dark","dragon",
  "fairy","fighting","flying","ghost","ground","ice",
  "normal","poison","psychic","rock","steel"
];

function Filter({ selectedTypes, setSelectedTypes }) {
  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="absolute top-12 right-0 bg-white shadow-lg rounded-xl p-3 z-50 w-48">
      <div className="flex flex-wrap gap-2">
        {allTypes.map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs capitalize ${
              selectedTypes.includes(type)
                ? "bg-blue-400 text-white"
                : "bg-gray-200"
            }`}
          >
            <img src={icons[type]} className="w-4 h-4" />
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filter;