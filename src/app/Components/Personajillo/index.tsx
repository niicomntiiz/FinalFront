import { PersonajeT } from "@/app/Types/PersonajeT"

const Personajillo = ({ personaje }: { personaje: PersonajeT }) => {
    return (
        <div>
            <img src={personaje.image} alt={personaje.name} width={80} height={80} />
            <p>{personaje.name}</p>
            <p>{personaje.status}</p>
            <p>{personaje.gender}</p>
        </div>
    )
}

export default Personajillo
