import { PieChart } from "@mui/x-charts/PieChart";

function PokemonStats({ pokemon }) {
  return (
    <>
      <div>
        <h2>Stats</h2>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
     <PieChart
        series={[{ data: pokemon.stats.map((stat, i) => ({ id: i, value: stat.base_stat, label: stat.stat.name })) }]}
        width={400}
        height={200}
      />
    </>
  );
}

export default PokemonStats;