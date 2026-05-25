"use client";
import "./style.css";
import { useEffect, useState } from "react";
import { ResultPersonajesT } from "../Types/PersonajeT";
import api from "@/api/api";
import Personajillo from "../Components/Personajillo";
import Paginador from "../Components/Paginador";
import Link from "next/link";

import Filtros from "../Components/Filtros"; 

const CharactersPage = () => {

    const [resultCharacters, setResultCharacters] = useState<ResultPersonajesT | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sinResultados, setSinResultados] = useState(false);


    const [nombre, setNombre] = useState("");
    const [status, setStatus] = useState("");
    const [gender, setGender] = useState("");

    const fetchCharacters = () => {
        setLoading(true);
        setSinResultados(false);


        const params: Record<string, string> = { page: String(page) };
        if (nombre) params.name = nombre;
        if (status) params.status = status;
        if (gender) params.gender = gender;


        api.get("/character", { params })
            .then((e)=>{
                const {data} : {data: ResultPersonajesT} = e;
                setResultCharacters(data);
            })
            .catch((error) => {
                setResultCharacters(null);
                setSinResultados(true);
            })
            .finally(()=>{
                setLoading(false);
            })
    }

    useEffect(()=>{
        fetchCharacters();
    },[page, nombre, status, gender]);

    const handleStatusChange = (v: string) => { setStatus(v); setPage(1); }
    const handleGenderChange = (v: string) => { setGender(v); setPage(1); }
    const handleNameSearch = (v: string) => { setNombre(v); setPage(1); }

    return (
        <div className="characterContainer">
            
            <Filtros
                status={status}
                gender={gender}
                onStatusChange={handleStatusChange}
                onGenderChange={handleGenderChange}
                onNameSearch={handleNameSearch}
            />

            {loading && <h1>Loading...</h1>}

            {!loading && sinResultados && <h1>No se han encontrado personajes con esos filtros.</h1>}

            {!loading && !sinResultados && resultCharacters && resultCharacters.results.map((e)=>(
                <Link className="characterContainer"key={e.id} href={`Personaje/${e.id}`}>
                    <Personajillo personaje={e}/>
                </Link>
            ))}
            
            {!loading && !sinResultados && resultCharacters && (
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