import "./Eventos.css"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import CardEvento from "../../components/cardEvento/CardEvento"

import { useEffect, useState } from "react"
import type { Evento } from "../../types/api"
import { eventoService } from "../../services/eventPlusservice"

function Eventos() {
    const [eventos, setEventos] = useState<Evento[]>([])

    useEffect(() => {
        async function carregar() {
            const dados = await eventoService.listar();

            setEventos(dados);
        }

        void carregar();

    }, [])

    return (
        <>
            <Header />
            <main>
                <section className="eventos-container">
                    <h1>Catálogo de Eventos</h1>
                    <div className="eventos-lista">
                        {eventos.map((evento) => (
                            <CardEvento
                                key={evento.idEvento}
                                id={evento.idEvento}
                                imagem={evento.imagemUrl}
                                categoria={evento.idTipoEventoNavigation?.titulo}
                                titulo={evento.nomeEvento}
                                descricao={evento.descricao} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Eventos;
