

const esEstadoDenegadoRol = (estado) => {
    switch (estado) {
        case "habilitado":
            return false;
           
        case "inhabilitado":
            return true;
           
        case "pendiente":
            return true;
           
        default:
            return true;
           

    }
}

module.exports = {
    esEstadoDenegadoRol
}