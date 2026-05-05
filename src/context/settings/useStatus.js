import {
  addDays,
  addMinutes,
  eachMinuteOfInterval,
  endOfDay,
  format,
  getDay,
  isAfter,
  isBefore,
  isTomorrow,
  isWithinInterval,
  set,
  startOfDay,
} from "date-fns";

const settings = {
  id: 1,
  regularOpenHours: [
    {
      label: "星期一",
      dayOfWeek: "Mon",
      timeSlots: [
        {
          openTime: {
            label: "00:00",
            value: "2024-12-31T16:00:00.000Z",
          },
          closeTime: {
            label: "23:59",
            value: "2025-01-01T15:59:59.999Z",
          },
        },
      ],
      isBusinessDay: true,
    },
    {
      label: "星期二",
      dayOfWeek: "Tue",
      timeSlots: [
        {
          openTime: {
            label: "00:00",
            value: "2024-12-31T16:00:00.000Z",
          },
          closeTime: {
            label: "23:59",
            value: "2025-01-01T15:59:59.999Z",
          },
        },
      ],
      isBusinessDay: true,
    },
    {
      label: "星期三",
      dayOfWeek: "Wed",
      timeSlots: [
        {
          openTime: {
            label: "00:00",
            value: "2024-12-31T16:00:00.000Z",
          },
          closeTime: {
            label: "23:59",
            value: "2025-01-01T15:59:59.999Z",
          },
        },
      ],
      isBusinessDay: true,
    },
    {
      label: "星期四",
      dayOfWeek: "Thu",
      timeSlots: [
        {
          openTime: {
            label: "00:00",
            value: "2024-12-31T16:00:00.000Z",
          },
          closeTime: {
            label: "23:59",
            value: "2025-01-01T15:59:59.999Z",
          },
        },
      ],
      isBusinessDay: true,
    },
    {
      label: "星期五",
      dayOfWeek: "Fri",
      timeSlots: [
        {
          openTime: {
            label: "00:00",
            value: "2024-12-31T16:00:00.000Z",
          },
          closeTime: {
            label: "23:59",
            value: "2025-01-01T15:59:59.999Z",
          },
        },
      ],
      isBusinessDay: true,
    },
    {
      label: "星期六",
      dayOfWeek: "Sat",
      timeSlots: [
        {
          openTime: {
            label: "00:00",
            value: "2024-12-31T16:00:00.000Z",
          },
          closeTime: {
            label: "23:59",
            value: "2025-01-01T15:59:59.999Z",
          },
        },
      ],
      isBusinessDay: true,
    },
    {
      label: "星期日",
      dayOfWeek: "Sun",
      timeSlots: [
        {
          openTime: {
            label: "00:00",
            value: "2024-12-31T16:00:00.000Z",
          },
          closeTime: {
            label: "23:59",
            value: "2025-01-01T15:59:59.999Z",
          },
        },
      ],
      isBusinessDay: true,
    },
  ],
  specialOpenHours: [
    {
      dateRange: {
        to: "2026-05-29T16:00:00.000Z",
        from: "2026-05-29T16:00:00.000Z",
      },
      timeSlots: [
        {
          openTime: "",
          closeTime: "",
        },
      ],
      isBusinessDay: false,
    },
    {
      dateRange: {
        to: "2026-06-29T16:00:00.000Z",
        from: "2026-06-27T16:00:00.000Z",
      },
      timeSlots: [
        {
          openTime: {
            label: "00:10",
            value: "2024-12-31T16:10:00.000Z",
          },
          closeTime: {
            label: "00:15",
            value: "2024-12-31T16:15:00.000Z",
          },
        },
      ],
      isBusinessDay: true,
    },
    {
      dateRange: {
        to: "2026-09-25T16:00:00.000Z",
        from: "2026-09-17T16:00:00.000Z",
      },
      timeSlots: [
        {
          openTime: {
            label: "00:00",
            value: "2024-12-31T16:00:00.000Z",
          },
          closeTime: {
            label: "00:55",
            value: "2024-12-31T16:55:00.000Z",
          },
        },
        {
          openTime: {
            label: "10:00",
            value: "2025-01-01T02:00:00.000Z",
          },
          closeTime: {
            label: "14:50",
            value: "2025-01-01T06:50:00.000Z",
          },
        },
      ],
      isBusinessDay: true,
    },
  ],
  dineInTableConfig: [
    {
      zoneName: "A",
      tableCount: 10,
    },
  ],
  storeInfo: {
    phone: "",
    taxId: "",
    address: "",
  },
};

function useStatus() {
  const now = new Date();
  const { regularOpenHours, specialOpenHours } = settings;
  // settings.regularOpenHours.at(now.getDay() - 1)
}

export default useStatus;
