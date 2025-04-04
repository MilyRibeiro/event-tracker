import React from 'react'
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import 'kalend/dist/styles/index.css';
// import { useRecoilValue } from 'recoil';
// import { listaDeEventosState } from '../../state/atom';
import useAtualizarEvento from '../../state/hooks/useAtualizarEvento';
import useListaDeEventos from '../../state/hooks/useListaDeEventos';
import { filtroDeEventos } from '../../state/atom';
import { useRecoilValue } from 'recoil';
import { IFiltroDeEventos } from '../../interfaces/IFiltroDeEventos';

interface IKalendEvento {
  id: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

const Calendario: React.FC = () => {

  const eventosKalend = new Map<string, IKalendEvento[]>();
  // const eventos = useRecoilValue(listaDeEventosState);
  // const eventos = useListaDeEventos();
  const todosOsEventos = useListaDeEventos();
  const filtro = useRecoilValue<IFiltroDeEventos>(filtroDeEventos);
  const eventos = todosOsEventos.filter(evento => {
    if (!filtro.data) {
      return true;
    }
    const ehOMesmoDia = filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10);
    return ehOMesmoDia;
  });
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
    kalendEventoInalterado: CalendarEvent,
    kalendEentoAtualizado: CalendarEvent
  ) => {
    const evento = eventos.find(evento => evento.descricao === kalendEentoAtualizado.summary);
    if (evento) {
      const eventoAtualizado = {
        ...evento
      };
      eventoAtualizado.inicio = new Date(kalendEentoAtualizado.startAt);
      eventoAtualizado.inicio = new Date(kalendEentoAtualizado.endAt);
      atualizarEvento(eventoAtualizado);
    }
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