import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import api from '../axios';

const EventSchedule = ({ eventId }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await api.get(`/schedule`);
        // console.log(response.data);
        setSchedule(response.data);
      } catch (err) {
        console.error('Error fetching schedule:', err);
      }
    };
    fetchSchedule();
  }, [eventId]);

  const calendarEvents = schedule.map((session) => ({
    title: session.sessionTitle,
    start: session.startTime,
    end: session.endTime,
    description: session.description,
  }));

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Event Schedule
      </h1>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridDay"
          events={calendarEvents}
          eventContent={(eventInfo) => (
            <div className="text-sm p-2">
              <b className="text-blue-500">{eventInfo.timeText}</b>
              <p className="text-gray-700 font-semibold">{eventInfo.event.title}</p>
            </div>
          )}
          headerToolbar={{
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day', 
          }}
          height="auto"
          // className="p-4"
        />
      </div>
    </div>
  );
};

export default EventSchedule;

