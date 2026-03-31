  <div key={name} onClick={() => { setSearch(name); fetchPokemon(name); }}>
          {name}
        </div>