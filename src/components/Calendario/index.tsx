import React from 'react'
// import { IEvento } from '../../interfaces/IEvento';
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import 'kalend/dist/styles/index.css';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { listaDeEventosState } from '../../state/atom';
// import { IEvento } from '../../interfaces/IEvento';
import useAtualizarEvento from '../../state/hooks/useAtualizarEvento';

interface IKalendEvento {
  id: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

// const Calendario: React.FC<{ eventos: IEvento[] }> = ({ eventos }) => {
const Calendario: React.FC = () => {

  const eventosKalend = new Map<string, IKalendEvento[]>();
  const eventos = useRecoilValue(listaDeEventosState);
  // const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
  const atualizarEvento = useAtualizarEvento();

  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, []);
    }
    eventosKalend.get(chave)?.push({
      id: evento.id ?? 0,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    });
  });

  const eventosKalendArray = Array.from(eventosKalend.values()).flat();

  const onEventDragFinish: OnEventDragFinish = (
    //prevEvent: CalendarEvent,
    kalendEventoInalterado: CalendarEvent,
    kalendEentoAtualizado: CalendarEvent
    // updatedEvent: CalendarEvent,
    // events: any
  ) => {
    const evento = eventos.find(evento => evento.descricao === kalendEentoAtualizado.summary);
    if (evento) {
      const eventoAtualizado = {
        ...evento
      };
      eventoAtualizado.inicio = new Date(kalendEentoAtualizado.startAt);
      eventoAtualizado.inicio = new Date(kalendEentoAtualizado.endAt);
      atualizarEvento(eventoAtualizado);

      // setListaDeEventos(listaAntiga => {
      //   const indice = listaAntiga.findIndex(e => e.id === evento.id);
      //   return [...listaAntiga.slice(0, indice), eventoAtualizado, ...listaAntiga.slice(indice + 1)];
      // });
    }

    // if you want just update whole state, you can just set events
    // setState(events);
    // OR you can handle logic for updating inside your app with access to "updatedEvent" and "prevEvent"

  };

  return (
    <div className={style.Container}>
      <Kalend
        events={eventosKalendArray}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
      />
    </div>
  );
}

export default Calendario;


// function setState(events: any) {
//   throw new Error('Function not implemented.');
// }
// import React from 'react'
// import style from './Calendario.module.scss';
// import ptBR from './localizacao/ptBR.json'
// import Kalend, { CalendarView } from 'kalend'
// import 'kalend/dist/styles/index.css';
// import { useRecoilValue } from 'recoil';
// import { listaDeEventosState } from '../../state/atom';

// interface IKalendEvento {
//   id?: number
//   startAt: string
//   endAt: string
//   summary: string
//   color: string
// }

// const Calendario: React.FC = () => {

//   const eventosKalend = new Map<string, IKalendEvento[]>();
//   const eventos = useRecoilValue(listaDeEventosState);

//   eventos.forEach(evento => {
//     const chave = evento.inicio.toISOString().slice(0, 10)
//     if (!eventosKalend.has(chave)) {
//       eventosKalend.set(chave, [])
//     }
//     eventosKalend.get(chave)?.push({
//       id: evento.id,
//       startAt: evento.inicio.toISOString(),
//       endAt: evento.fim.toISOString(),
//       summary: evento.descricao,
//       color: 'blue'
//     })
//   })
//   return (
//     <div className={style.Container}>
//       <Kalend
//         events={Object.fromEntries(eventosKalend)}
//         initialDate={new Date().toISOString()}
//         hourHeight={60}
//         initialView={CalendarView.WEEK}
//         timeFormat={'24'}
//         weekDayStart={'Monday'}
//         calendarIDsHidden={['work']}
//         language={'customLanguage'}
//         customLanguage={ptBR}
//       />
//     </div>
//   );
// }

// export default Calendario;