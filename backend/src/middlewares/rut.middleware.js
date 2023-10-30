/**
 * Valida un RUT chileno en el formato XX.XXX.XXX-X.
 *
 * @param {string} rut - El RUT a validar en el formato XX.XXX.XXX-X.
 * @returns {boolean} Retorna true si el RUT es válido, false si no lo es.
 */
function validateRut(rut) {
    // Expresión regular para validar el formato del RUT (XX.XXX.XXX-X)
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-\d{1}$/;
    
    if (!rut.match(rutRegex)) {
        return false;
    }

    // Obtiene el número y el dígito verificador del RUT
    const [numero, dv] = rut.replace(/\./g, "").split("-");
    let M = 0;
    let S = 1;

    for (; numero; numero = Math.floor(numero / 10)) {
        S = (S + numero % 10 * (9 - M++ % 6)) % 11;
    }

    if (S) {
        // Si el residuo es diferente a 0, el dígito verificador debe ser 11 menos el residuo
        if (S !== parseInt(dv, 10)) {
            return false;
        }
    } else {
        // Si el residuo es 0, el dígito verificador debe ser 0
        if (dv !== "0") {
            return false;
        }
    }


    // Retorna true si el RUT es válido, false si no lo es
    return true;
}

module.exports = {
    validateRut,
};
