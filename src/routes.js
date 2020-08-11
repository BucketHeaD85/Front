
import SillonesList from "./views/SillonesList";
import Welcome from "./views/Welcome";
import Paciente from "./views/Paciente";
import PacienteList from "./views/PacienteList";

export default [
    {
        path:"/",
        exact:true,
        component: Paciente
    },

    {
        path:"/add",
        exact: true,
        component: Paciente
    },

    {
        path:"/edit/:id",
        exact: true,
        component: Paciente
    },

    {
        path:"/list",
        exact: true,
        component: PacienteList
    },

    {
        path:"/sillones",
        exact: true,
        component: SillonesList
    }

];