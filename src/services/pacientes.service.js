import {api} from "../helpers/api.pacientes";

const basePath = "/pacientes";

const config = {
    headers: {
        accept: 'application/json',
    },
    data: {},
};


function findPacienteById(pacienteId) {
    return api.get(`${basePath}/${pacienteId}`);
};


function modificarEstado(paciente){
    return api.put(`${basePath}/${paciente.id}`,paciente)
}

const pacientesService = {
    findPacienteById,
    modificarEstado
};

export default pacientesService;
