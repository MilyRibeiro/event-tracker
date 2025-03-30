import React from 'react';
import { IEvento } from '../../../interfaces/IEvento';
// import { useSetRecoilState } from 'recoil';
// import { listaDeEventosState } from '../../../state/atom';
import useAtualizarEvento from '../../../state/hooks/useAtualizarEvento';

// const EventoCheckbox: React.FC<{ evento: IEvento, aoAlterarStatus: (id: number) => void }> = ({ evento, aoAlterarStatus }) => {
const EventoCheckbox: React.FC<{ evento: IEvento }> = ({ evento }) => {

  const atualizarEvento = useAtualizarEvento();

  // const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  const alterarStatus = () => {
    // evento.completo = !evento.completo;
    const eventoAlterado = {
      ...evento,
    };
    eventoAlterado.completo = !eventoAlterado.completo;
    atualizarEvento(eventoAlterado);


    // setListaDeEventos(listaAntiga => {
    //   const indice = listaAntiga.findIndex(e => e.id === evento.id);
    //   return [...listaAntiga.slice(0, indice), eventoAlterado, ...listaAntiga.slice(indice + 1)];
    // });
  }

  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ];

  return (
    // <i className={estilos.join(' ')} onClick={() => aoAlterarStatus(evento.id!)}></i>
    <i className={estilos.join(' ')} onClick={alterarStatus}></i>
  )
}

export default EventoCheckbox;