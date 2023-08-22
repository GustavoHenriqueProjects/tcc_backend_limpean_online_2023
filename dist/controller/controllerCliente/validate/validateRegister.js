"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validadeAddress = exports.validatePhoneWithDDD = exports.validateCPF = exports.validateEmail = void 0;
function validatePhoneWithDDD(ddd, phone) {
    let numberPhone = `${ddd} ${phone}`;
    let telefone = numberPhone.replace(/\D/g, '');
    if (!(telefone.length >= 10 && telefone.length <= 11))
        return false;
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9)
        return false;
    for (var n = 0; n < 10; n++) {
        if (telefone == new Array(11).join() || telefone == new Array(12).join())
            return false;
    }
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1)
        return false;
    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1)
        return false;
    return true;
}
exports.validatePhoneWithDDD = validatePhoneWithDDD;
function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
exports.validateEmail = validateEmail;
function validateCPF(cpf, dataNascimento) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) {
        return false;
    }
    const dataNascRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataNascimento.match(dataNascRegex)) {
        return false;
    }
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
        return false;
    }
    return true;
}
exports.validateCPF = validateCPF;
function validadeAddress(address) {
    let statusAddress = true;
    if (!address.state || address.state === "" ||
        !address.stateAcronym || address.stateAcronym.length != 2 ||
        !address.city || address.city === "" ||
        !address.cep || address.cep === "" ||
        !address.district || address.district === "" ||
        !address.road || address.road === "" ||
        !address.houseNumber || address.houseNumber === "" ||
        (address.publicPlace !== null && typeof address.publicPlace !== 'string') ||
        (address.complement !== null && typeof address.complement !== 'string')) {
        statusAddress = false;
    }
    return statusAddress;
}
exports.validadeAddress = validadeAddress;
