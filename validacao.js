function calcularDigito(codigo, multiplicador) {
    let soma = 0;
    for (let i = 0; i < codigo.length; i++) {
        soma += parseInt(codigo[i]) * multiplicador--;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function validarCPFFormato(cpf) {
    const cpfFormatado = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfFormatado.test(cpf);
}

function validarCPFChecksum(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    const primeiroDigito = calcularDigito(cpf.slice(0, 9), 10);
    const segundoDigito = calcularDigito(cpf.slice(0, 10), 11);

    return primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10]);
}

function formatarCPF(codigo, digitoVerificador) {
    const cpfFormatado = `${codigo.slice(0, 3)}.${codigo.slice(3, 6)}.${codigo.slice(6, 9)}-${digitoVerificador}`;
    return cpfFormatado;
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    const primeiroDigito = calcularDigito(cpf.slice(0, 9), 10);
    const segundoDigito = calcularDigito(cpf.slice(0, 10), 11);

    return primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10]);
}

function calcularDigitoCNPJ(codigo, multiplicador) {
    let soma = 0;
    for (let i = 0; i < codigo.length; i++) {
        soma += parseInt(codigo[i]) * multiplicador--;
        if (multiplicador < 2) multiplicador = 9;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) {
        return false;
    }

    const primeiroDigito = calcularDigitoCNPJ(cnpj.slice(0, 12), 5);
    const segundoDigito = calcularDigitoCNPJ(cnpj.slice(0, 13), 6);

    return primeiroDigito === parseInt(cnpj[12]) && segundoDigito === parseInt(cnpj[13]);
}

function calcularDigitoRGSP(rg) {
    const rgSemDigito = rg.slice(0, -1);
    const digitoVerificador = rg.slice(-1);
    const primeiroDigito = calcularDigito(rgSemDigito, 9);
    return primeiroDigito === parseInt(digitoVerificador);
}

function validarRGSPFormato(rg) {
    const rgFormatado = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
    return rgFormatado.test(rg);
}


function validarRGSP(rg) {
    rg = rg.replace(/[^\d]/g, '');

    if (rg.length !== 9) {
        return false;
    }

    const primeiroDigito = calcularDigitoRGSP(rg.slice(0, 8), 9);

    return primeiroDigito === parseInt(rg[8]);
}

function formatarRGSP(codigo) {
    return `${codigo.slice(0, 2)}.${codigo.slice(2, 5)}.${codigo.slice(5, 8)}-${codigo.slice(8, 9)}`;
}

function validarDocumento(documento) {
    const documentoSemEspacos = documento.replace(/[^\d]/g, '');

    if (documentoSemEspacos.length === 11) {
        if (validarCPF(documentoSemEspacos)) {
            return "CPF válido!";
        } else {
            return "CPF inválido!";
        }
    } else if (documentoSemEspacos.length === 14) {
        if (validarCNPJ(documentoSemEspacos)) {
            return "CNPJ válido!";
        } else {
            return "CNPJ inválido!";
        }
    } else if (documentoSemEspacos.length === 10) {
        if (validarRGSP(documentoSemEspacos)) {
            return "RG-SP válido!";
        } else {
            return "RG-SP inválido!";
        }
    } else {
        return "Documento inválido!";
    }
}

function validateCpfCnpj() {
    var cpfCnpj = document.getElementById('cpf').value;
    var resultCpf = document.getElementById('resultadoCPF');
    var rgSp = document.getElementById('rg').value;
    var resultRg = document.getElementById('resultadoRG');

    cpfCnpj = cpfCnpj.replace(/[^\d]/g, '');
    rgSp = rgSp.replace(/[^\d]/g, '');

    if ((cpfCnpj.length === 11 || cpfCnpj.length === 14) && validarDocumento(cpfCnpj)) {
        resultCpf.textContent = "CPF/CNPJ válido!";
    } else {
        resultCpf.textContent = "CPF/CNPJ inválido (tamanho/formato incorreto)!";
    }

    if (rgSp.length === 9 && validarRGSP(rgSp)) {
        resultRg.textContent = "RG-SP válido!";
    } else {
        resultRg.textContent = "RG-SP inválido (tamanho/formato incorreto)!";
    }
}
