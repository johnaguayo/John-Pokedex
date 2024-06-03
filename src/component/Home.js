import React, {startTransition, useEffect, useState} from "react";
import { getElements } from "../API";

const Home = (props) => {
    
    const [pokemon, setPokemon] = useState([]);
    const [menuAbierto, setmenuAbierto]=useState(-1);
    const [principal, setPrincipal]=useState('');

    function resuelto() {
        window.scrollTo(0,0)
    }

    function pulsado(id) {
        if (id == menuAbierto) {
            setmenuAbierto(-1);
        } else {
            setmenuAbierto(id);
        }
    }

    useEffect(() => {
        const getPokemon = async () => {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=40&offset=0");
            const listaPokemones = await response.json()
            const { results } = listaPokemones;

            const newPokemones = results.map( async (pokemon) => {
                const response = await fetch(pokemon.url)
                const poke = await response.json()

                return {
                    name: poke.name,
                    img: poke.sprites.other.dream_world.front_default,
                    id: poke.id,
                    types: poke.types.map(type => type.type.name),
                    imagenes: {
                        front_default: poke.sprites.front_default,
                        back_default: poke.sprites.back_default,
                        front_shiny: poke.sprites.front_shiny,
                        back_shiny: poke.sprites.back_shiny
                    },
                    abilities: poke.abilities.map(ability => ability.ability.name),
                    weight: poke.weight,
                    height: poke.height,
                }
            })
            setPokemon(await Promise.all(newPokemones))
        };
        getPokemon()


        
    }, []);

    return (
        <div className="principal">
            <div className="principal2">
                <div className="titulo">
                    <img width={"180px"} height={"80px"} className="titul" src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg"></img>
                </div>
            </div>
            <div className="poke">
                <div className="llista-pokemones">
                    {pokemon.map(pokemon => {
                        return (
                            <div className="Pokemones" onClick={() => {pulsado(pokemon?.id)}}>
                                <button><img className="unico" width={"80px"} height={"80px"} src={pokemon.img} alt={pokemon.name}></img></button>
                                <div className="idd">Nº {pokemon.id}</div>
                                <div className="pok">
                                    <button className="twi"><img className="cochess" width={"60px"} height={"60px"} src="https://i.pinimg.com/originals/43/ed/d5/43edd5aa5f0de7f410f5e38326f4b94c.png"></img></button>
                                    <h3 className="texto">{pokemon.name}</h3>
                                </div>
                                <div className='menu2-principal' style={{height:(menuAbierto == pokemon?.id ? '2000px':"0px"), transition:'height 1s ease-in-out',borderRadius: '20px'}}>
                                    <div className="retrato">
                                        <div className="id">Nº {pokemon.id}</div>
                                        <img className="unico2" width={"200px"} height={"200px"} src={pokemon.img} alt={pokemon.name}></img>
                                        <div className="alinea">
                                            <div className="types">
                                                <div className="nom">
                                                    <p className="nombe">Nom</p>
                                                    <hr></hr>
                                                    <div className="texto2">{pokemon.name}</div>
                                                </div>
                                                <div className="typs">
                                                    <p className="ty">Types</p>
                                                    <hr></hr>
                                                    {pokemon.types.map((type, index) => (
                                                    <div className="typess">
                                                        <div style={{position:"relative",marginLeft:"40px",fontSize:"x-large",top:"20px",right:"25px"}} className={type}>{type}</div>
                                                    </div>
                                                    ))}
                                                </div>
                                                <div className="bac">
                                                    <p className="diseny">Diseños</p>
                                                    <hr></hr>
                                                    <div className="cen" >
                                                        <img style={{position:"relative",left:"5px",filter:"drop-shadow(0px 3px 1px rgba(255, 228, 196))"}} src={pokemon.imagenes.front_default} />
                                                        <img style={{position:"relative",left:"2px",filter:"drop-shadow(0px 3px 1px rgba(255, 228, 196))"}} src={pokemon.imagenes.back_default} />
                                                        <img style={{position:"relative",left:"10px",filter:"drop-shadow(0px 3px 1px rgba(255, 228, 196))"}} src={pokemon.imagenes.front_shiny} />
                                                        <img style={{position:"relative",left:"0px",filter:"drop-shadow(0px 3px 1px rgba(255, 228, 196))"}} src={pokemon.imagenes.back_shiny} />
                                                    </div>
                                                </div>
                                                <div className="habili">
                                                    <p className="habi">Habilitats  </p>
                                                    <hr></hr>
                                                    {pokemon.abilities.map((ability) => (
                                                        <div className="hab">
                                                            <span style={{position:"relative",fontSize:"18px"}} className={ability}>{ability}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="tamany">
                                                    <p className="anc">Peso </p>
                                                    <hr></hr>
                                                    <p className="ancho">{pokemon.weight / 10} kg</p>
                                                    <p className="anc2">Altura </p>
                                                    <hr></hr>
                                                    <p className="alto">{pokemon.height / 10} m</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="botones">
                <div className="alini">
                    <button onClick= {() => {resuelto(principal)}} className="face"><img className="pika" width={"60px"} height={"60px"} src="https://i.pinimg.com/originals/05/18/69/051869b2898f3956fc981f12f1eee50a.png"></img></button>
                    <button className="twi"><img className="coches" width={"60px"} height={"60px"} src="https://i.pinimg.com/originals/43/ed/d5/43edd5aa5f0de7f410f5e38326f4b94c.png"></img></button>
                    <button className="store"><img className="cine" width={"60px"} height={"60px"} src="https://www.freeiconspng.com/thumbs/pokeball-icon/pokeball-icon-28.png"></img></button>
                </div>
            </div>
        </div>
    )
};
  
export default Home;