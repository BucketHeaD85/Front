import {api} from "../helpers/api";

const basePath = "/api/GestionSalasQuimio";
const baseSillones = "/api/GestionSillones"

const config = {
    headers: {
        accept: 'application/json',
    },
    data: {},
};

function disponibilizar(objeto){
    return api.put(`${baseSillones}/${objeto}`,  config);
}

function getAll(){
    return api.get(`${basePath}/`);
}

function getIdPaciente(id){
    return api.get(`${baseSillones}/Paciente/${id}`);
}


const sillonesService = {
    getAll,
    disponibilizar,
    getIdPaciente
};

export default sillonesService;
