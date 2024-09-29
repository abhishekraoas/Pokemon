import { useState, useEffect } from "react";
import "./Pokemon.css";
import { PokemonCards } from "./PokemonCards";

export const FetchAPI = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const[search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=50";

  const fetchPokeMon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log(data.results);
      const detailPokemonData = data.results.map(async (currPokemon) => {
        // console.log(currPokemon.url);
        const res = await fetch(currPokemon.url);
        const data = await res.json();
        return data;
      });

      const pokemonData = await Promise.all(detailPokemonData);
      // console.log(pokemonData);
      setPokemon(pokemonData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokeMon();
  }, []);

  //   console.log(pokemon);

  //Search Functionality
  const searchData = pokemon.filter((currPokemon)=> currPokemon.name.toLowerCase().includes(search.toLowerCase())) ;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <section className="container">
      <header>
        <h1 className="title">Let's Catch Pokémon</h1>
      </header>
      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokémon"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <ul className="cards">
            {
                searchData.map((currPokemon) => {
                return <PokemonCards key={currPokemon.id} pokemonData={currPokemon}/>
             }
            )}
        </ul>
         
      </div>
    </section>
  );
};
