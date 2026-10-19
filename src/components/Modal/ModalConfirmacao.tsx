import "./ModalConfirmacao.css"

function ModalConfirmacao({
    show,
    titulo,
    mensagem,
    textoConfirmar = "Confirmar",
    textoCancelar = "Voltar",
    onClose,
    onConfirm
}: ModalConfirmacaoProps){
    if(!show){
        return null;
    }

    return(
        <>
            <div
            className='modal fade show d-block'
            tabIndex={-1}
            role='dialog'
            aria-modal="true"
            ></div>

            <div className='modal-backdrop modal-dialog-centered' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>{titulo}</h5>

                        <button
                        className='btn-close'
                        type='button'
                        aria-label="Fechar"                        
                        onClick={onClose}
                        ></button>
                    </div>
                    <div className='modal-body'>
                        <p>{mensagem}</p>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-outline-secondary" type="button"></button>
                    </div>
                </div>
            </div>

            <div className='modal-backdrop fade show'></div>
        </>
    )
}