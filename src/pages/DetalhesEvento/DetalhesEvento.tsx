import { data, Link, useNavigate, useParams } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Botao from "../../components/botao/Botao";

import imagemPadrao from "../../assets/banner-1.png";
import relogio from "../../assets/icons/relogio.svg";
import predio from "../../assets/icons/predio.svg";
import filtro from "../../assets/icons/filtro.svg";


import "./DetalhesEvento.css";
import { useCallback, useEffect, useState } from "react";
import { type Comentario, type Evento, type Presenca } from "../../types/api";
import { comentarioService, eventoService, presencaService } from "../../services/eventPlusservice";
import { useAuth } from "../../context/auth";
import { getApiErrorMessage } from "../../services/api";

function DetalhesEvento() {
    const { id = "" } = useParams();

    const navigate = useNavigate();

    const { autenticado, usuario } = useAuth();
    const [evento, setEvento] = useState<Evento | null>(null);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [secaoComentarios, setSecaoComentarios] = useState<boolean>(false)
    const [presenca, setPresenca] = useState<Presenca | null>(null);
    const [presencaCarregada, setPresencaCarregada] = useState("");
    const [confirmandoCancelamento, setConfirmandoCancelamento] = useState(false);
    const [enviandoInscricao, setEnviandoInscricao] = useState(false);
    const [mensagemInscricao, setMensagemInscricao] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");

    const carregar = useCallback(async () => {
        if (!id) return;
        setCarregando(true);
        setErro("");
        try {
            const [eventoAtual, comentariosAtuais] = await Promise.all([
                eventoService.buscar(id),
                comentarioService.listarPorEvento(id)
            ])
            setEvento(eventoAtual);
            setComentarios(comentariosAtuais)
        } catch (error) {
            setErro(getApiErrorMessage(error));
        } finally {
            setCarregando(false);
        }
    }, [id])


    useEffect(() => {
        const timeout = window.setTimeout(() => void carregar(), 0);
        return () => window.clearTimeout(timeout);
    }, [carregar])

    useEffect(() => {
        if(!usuario || !id) return;
        const chave = `${usuario.idUsuario}:${id}`
        let ativo = true;

        presencaService
        .listarPorUsuario(usuario.idUsuario)
        .then((items) => {
            if(ativo) setPresenca(items.find((item) => item.idEvento === id) ?? null);
        })
        .catch(() => {
            if(ativo) setPresenca(null);
        })
        .finally(() => {
            if(ativo) setPresencaCarregada(chave);
        })
    })

    function exigirLogin(){
        if(autenticado) return false;
        navigate("/", {state: {from: location.pathname}});
        return true;
    }

    function mostrarEvento() {
            console.log(evento)
        }

    async function inscrever() {
            if(exigirLogin() || !usuario || !evento || presenca) return;
            setEnviandoInscricao(true);
            setMensagemInscricao("");

            try {
                const novaPresenca = await presencaService.cadastrar({
                    situacao: true,
                    idEvento: evento?.idEvento || "",
                    idUsuario: usuario?.idUsuario || ""
                });
                setPresenca(novaPresenca);
                setMensagemInscricao("Inscrição realizada com sucesso.")
            } catch (error) {
                setMensagemInscricao(getApiErrorMessage(error));
            } finally {
                setEnviandoInscricao(false);
            }
        }

    const chavePresenca = usuario && id ? `${usuario.idUsuario}:${id}` : "";
    const checandoPresenca = Boolean(chavePresenca && presencaCarregada !== chavePresenca);

    return (
        <>
            <Header />
            <main>
                <img src={evento?.imagemUrl || imagemPadrao} alt="Banner do Evento" />
                <h1>{evento?.nomeEvento}</h1>
                <div>
                    <button onClick={() => setSecaoComentarios(false)}>Sobre o Evento</button>
                    <button onClick={() => setSecaoComentarios(true)}>Comentários</button>
                    {secaoComentarios ? <h2>Comentários</h2> : <>
                        <p>{evento?.descricao}</p>
                    </>}
                </div>
                <div>
                    <h2>Informações principais</h2>
                    <hr />

                    <div>
                        <img src={relogio} alt="" />
                        <span>{evento?.dataEvento}</span>
                    </div>
                    <div>
                        <img src={predio} alt="" />
                        <span>{evento?.idInstituicaoNavigation?.nomeFantasia}</span>
                    </div>
                    <div>
                        <img src={filtro} alt="" />
                        <span>{evento?.idTipoEventoNavigation?.titulo}</span>
                    </div>
                    <Botao
                        className={presenca ? "detalhe-evento-cancelar" : ""}
                        texto={checandoPresenca ? "Verificando inscrição..." : presenca ? "Cancelar Inscrição"
                            : enviandoInscricao ? "Inscrevendo..." : "Se inscrever"
                        }
                        type="button"
                        disabled={checandoPresenca || enviandoInscricao}
                        onClick={() => presenca ? setConfirmandoCancelamento(true) : void inscrever}
                    />
                    {mensagemInscricao ? <p className="detalhe-evento-mensagem" role="status">{mensagemInscricao}</p> : null}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default DetalhesEvento;