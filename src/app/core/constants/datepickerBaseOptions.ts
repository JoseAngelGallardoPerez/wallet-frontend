export const DATEPICKER_RESPONCE_FORMAT = 'YYYY-MM-DD';

export const DATEPICKER_BASE_OPTIONS = {
  displayFormat: DATEPICKER_RESPONCE_FORMAT,
  dayNamesFormat: 'dd',
  firstCalendarDay: 0,
  addStyle: {
    'height': '25px',
    'width': '100%',
    'font-size': '14px',
    'background': 'none',
    'border': 'none',
    'cursor': 'pointer'
  },
  useEmptyBarTitle: false,
  maxDate: new Date(Date.now())
};
