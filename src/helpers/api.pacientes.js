import axios from "axios";

const endpoints = {
    pacientes: "http://iswayudantia02072020.herokuapp.com"
    //development: 'http://127.0.0.1:8000',
};

export const api = axios.create({
    baseURL: endpoints["pacientes"],
    timeout: 20000,
});
