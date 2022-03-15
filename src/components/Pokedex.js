import React, { useState } from 'react';

const Pokedex = props => {
    const [pokemon, setPokemon] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const fetchPokemon = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                setPokemon(response.results);
                setNextPage(response.next);
                setPrevPage(response.previous);
            })
            .catch(e => console.error(e));
    }

    return (
        <>
            <button className='btn btn-secondary w-50 mx-auto' onClick={() => fetchPokemon("https://pokeapi.co/api/v2/pokemon")}>Fetch Pokemon</button>
            <ul className='list-group my-3 w-25 mx-auto'>
                {pokemon.map((mon, index) => {
                    return (
                        <li key={index} className='list-group-item'>{mon.name.charAt(0).toUpperCase().concat(mon.name.slice(1))}</li>
                    );
                })}
            </ul>
            <div className='btn-group'>
                <button className={`btn btn-primary ${prevPage ? '' : 'disabled'}`} onClick={() => fetchPokemon(prevPage)}>&lt;</button>
                <button className={`btn btn-primary ${nextPage ? '' : 'disabled'}`} onClick={() => fetchPokemon(nextPage)}>&gt;</button>
            </div>
        </>
    );
}

export default Pokedex;