/***************************************************
 * Objetivo: Responsavel pelas constantes globais
 * Data: 14/08/2023
 * Versão: 14/08/2023
 **************************************************/

const ERROR_INVALID_CONTENT_TYPE = { status: 415, message: 'O tipo de mídia (Content-Type) da solicitação não é compatível com o servidor. Esperado: application/json'}
const ERRO_REQUIRED_DATA_CLIENTE = {status: 400, message: 'Nome, CPF, data de nascimento, telefone , DDD, email e senha são campos obrigatorios.'}
const ERRO_REGISTER_USER = {status: 500, message: "A inserção falhou verifique os dados e tente novamente."}
const ERRO_REGISTER_EMAIL = {status: 500, message: "Atenção email no formato inválido. Ele deve ter esse formato: exemplo@gmail.com"}

/***************************************   CONSTANTES DE SUCESSO  ************************************************************************************************/
const CREATED_REGISTER = {status: 201, message: "Registro criado com sucesso."}

export {
    ERROR_INVALID_CONTENT_TYPE,
    ERRO_REQUIRED_DATA_CLIENTE,
    ERRO_REGISTER_USER,
    CREATED_REGISTER,
    ERRO_REGISTER_EMAIL
}