import { useEffect, useRef } from "react"
import { Carousel } from "bootstrap"

import bannerEvento1 from "../../assets/banner-1.png"
import bannerEvento2 from "../../assets/banner-2.png"
import bannerEvento3 from "../../assets/banner-3.png"

import "./Carrossel.css"

function Carrossel(){
    const carrosselRef = useRef<HTMLElement>(null)

    // data-bs-ride só é lido no "load" da janela, então ao voltar para a Home
    // (rota do React) o autoplay não iniciava. Criamos a instância manualmente.
    useEffect(() => {
        if (!carrosselRef.current) return

        const carrossel = new Carousel(carrosselRef.current, { interval: 6000, ride: "carousel" })
        return () => carrossel.dispose()
    }, [])

    return(
        <section ref={carrosselRef} id="carrosselEventPlus" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={bannerEvento1} className="carousel-banner" alt="Banner do Primeiro Evento" />
                </div>

                <div className="carousel-item">
                    <img src={bannerEvento2} className="carousel-banner" alt="Banner do Segundo Evento" />
                </div>

                <div className="carousel-item">
                    <img src={bannerEvento3} className="carousel-banner" alt="Banner do Terceiro Evento" />
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carrosselEventPlus" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                <span className="visually-hidden">Anterior</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carrosselEventPlus" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"/>
                <span className="visually-hidden">Próximo</span>
            </button>
        </section>
    );
}

export default Carrossel;
