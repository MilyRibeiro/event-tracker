import { useRecoilValue } from "recoil";
// import { listaDeEventosState } from "../atom";
import { eventosFiltradosState } from "../seletores";

const useListaDeEventos = () => {
    // return useRecoilValue(listaDeEventosState);
    return useRecoilValue(eventosFiltradosState);
};

export default useListaDeEventos;