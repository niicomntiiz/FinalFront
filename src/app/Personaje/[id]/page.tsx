"use client"

import { PersonajeT } from "@/app/Types/PersonajeT"
import api from "@/api/api"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./style.module.css";

const Personaje = () => {
    const { id } = useParams()
    const [personaje, setPersonaje] = useState<PersonajeT>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get(`/character/${id}`).then((e) => setPersonaje(e.data))
            .catch((e) => alert(String(e)))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <h1>Loading...</h1>
    if (!personaje) return <h1>Personaje no encontrado</h1>

    return (
        <div className={styles.characterContainer}>
            <img src={personaje.image} alt={personaje.name} width={200} height={200} />
            <h1>{personaje.name}</h1>
            <p>ID: {personaje.id}</p>
            <p>Estado: {personaje.status}</p>
            <p>Género: {personaje.gender}</p>
            <p>Especie: {personaje.species}</p>
            <p>Origen: {personaje.origin.name}</p>
            <p>Ubicación: {personaje.location.name}</p>
        </div>
    )
}

export default Personaje
