import 'date-fns';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

function NativeMuiTimePicker1 () {

    const [selectedTime, setSelectedTime] = useState('07:30');

    const handleTimeChange = (event) => {
      console.log(event.target.value);
      setSelectedTime(event.target.value);
    };
  
  
    return (
      <div className="NativeMuiTimePicker">
  
        <form noValidate>
          <TextField
            id="time"
            label="Start Time"
            type="time"
            defaultValue="07:30"
            value={selectedTime}
            onChange={handleTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
  
      </div >
    );
}

export default NativeMuiTimePicker1;