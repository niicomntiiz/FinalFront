"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { ResultPersonajesT } from "../Types/PersonajeT";
import api from "@/api/api";
import Personajillo from "../Components/Personajillo";
import Paginador from "../Components/Paginador";
import Link from "next/link";

const CharactersPage = () => {

    const [resultCharacters, setResultCharacters] = useState<ResultPersonajesT | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    const fetchCharacters = () => {
        try{
            api.get(`/character?page=${page}`).then((e)=>{
                const {data} : {data: ResultPersonajesT} = e;
                setResultCharacters(data);
            }).finally(()=>{
                setLoading(false);
            })
        }catch(e){
            alert(String(e));
        }
    }

    useEffect(()=>{
        fetchCharacters();
    },[page]);

    if(loading){
        return(<h1>Loading...</h1>)
    }

    return (
        <div className="characterContainer">
            {resultCharacters && resultCharacters.results.map((e)=>(
                <Link key={e.id} href={`Personaje/${e.id}`}>
                <Personajillo personaje={e}/>
                </Link>
            ))}
            
            {resultCharacters && (
                <Paginador 
                    page={page} 
                    totalPages={resultCharacters.info.pages} 
                    setPage={(e) => setPage(e)} 
                />
            )}
        </div>
    )
};

export default CharactersPage;