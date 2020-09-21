import React from 'react';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <KeyboardDatePicker
      margin="normal"
      id="date-picker-dialog"
      label="Date picker dialog"
      format="MM/dd/yyyy"
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  );
};

export default DatePicker;
