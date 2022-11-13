import React, { useRef, useState, ReactElement } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Title } from '../../src/components/Title';
import AddToCalendarModal from '../../src/components/AddToCalendarModal';
import { Layout } from '../../src/components/Layout';

const Calendar = () => {
  const calendarRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  function handleOpenModal() {
    setOpenModal((prevState) => !prevState);
  }
  function addEventToCalendar() {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      api.addEvent({
        id: '1',
        title: 'The Title8',
        start: '2022-10-16',
      });
    }
  }

  return (
    <section className="w-full p-5 h-full">
      {openModal && <AddToCalendarModal handleOpenModal={handleOpenModal} />}
      <div className="flex items-center justify-between">
        <Title title="Calendário" size="xl" />
        <button
          onClick={handleOpenModal}
          className="px-5 py-2 bg-blue text-[#fff] transition duration-300 hover:brightness-90 font-medium text-sm rounded-md"
        >
          Adicionar novo
        </button>
      </div>
      <div className="mt-10">
        <FullCalendar
          dayMaxEvents={4}
          events={[
            {
              title: 'The Title The Title The Title The Title',
              start: '2022-10-13',
              end: '2022-10-13',
            },
            {
              title: 'The Title2',
              start: '2022-10-13',
              end: '2022-10-13',
            },
            {
              title: 'The Title3',
              start: '2022-10-13',
              end: '2022-10-13',
            },
          ]}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin,
          ]}
          initialView="dayGridMonth"
          ref={calendarRef}
          editable
          selectable
          locale="pt-br"
          headerToolbar={{
            right: 'today prevYear,prev,next,nextYear',
            center: 'title',
            left: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{
            today: 'Hoje',
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
          }}
          themeSystem="bootstrap"
          height={800}
        />
      </div>
    </section>
  );
};

Calendar.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Calendar;
