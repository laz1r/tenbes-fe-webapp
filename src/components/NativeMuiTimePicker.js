import 'date-fns';
import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

export class NativeMuiTimePicker extends React.Component {

  render() {
    return (
      <div className="NativeMuiTimePicker">   
        <form noValidate>
          <TextField
            id="time"
            label="Start Time"
            type="time"
            defaultValue="07:30"
            value={this.props.startTimeChangeView}
            onChange={this.props.onStartTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
  
      </div >
    );

  }
}

export default NativeMuiTimePicker;