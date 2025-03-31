import { useSetRecoilState } from "recoil"
import { listaDeEventosState } from "../atom"
import { IEvento } from "../../interfaces/IEvento";

const useDeletarEvento = () => {
    const setListadeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

    return (evento: IEvento) => {
        setListadeEventos((listaAntiga) => [
            ...listaAntiga.filter(e => evento.id !== e.id)
        ]);
    };
}

export default useDeletarEvento;