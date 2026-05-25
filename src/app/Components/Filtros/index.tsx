"use client"

import { useState } from "react"
import "./styles.css"

const ESTADOS = ["", "Alive", "Dead", "unknown"]
const GENEROS = ["", "Female", "Male", "Genderless", "unknown"]

type Props = {
    status: string
    gender: string
    onStatusChange: (v: string) => void
    onGenderChange: (v: string) => void
    onNameSearch: (v: string) => void
}

const Filtros = ({ status, gender, onStatusChange, onGenderChange, onNameSearch }: Props) => {
    const [input, setInput] = useState("")

    const cycleStatus = () => {
        const next = (ESTADOS.indexOf(status) + 1) % ESTADOS.length
        onStatusChange(ESTADOS[next])
    }

    const cycleGender = () => {
        const next = (GENEROS.indexOf(gender) + 1) % GENEROS.length
        onGenderChange(GENEROS[next])
    }



    return (
        <div>
            <input
                className="buscadorInput"
                type="text"
                placeholder="Busca un personaje"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key=== "Enter"){
                        onNameSearch(input);
                    }
                }}
            />
            <button className="botones" onClick={() => onNameSearch(input)}>Buscar</button>

            <button className="botones" onClick={cycleStatus}>Estado: {status || "Todos"}</button>
            <button className="botones"  onClick={cycleGender}>Género: {gender || "Todos"}</button>
        </div>
    )
}

export default Filtros
