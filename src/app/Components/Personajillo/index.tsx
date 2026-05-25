import { PersonajeT } from "@/app/Types/PersonajeT"

const Personajillo = ({ personaje }: { personaje: PersonajeT }) => {
    return (
        <div>
            <img src={personaje.image} alt={personaje.name} width={80} height={80} />
            <h1>{personaje.name}</h1>
            <p>Estado: {personaje.status}</p>
            <p>Género: {personaje.gender}</p>
        </div>
    )
}

export default Personajillo
