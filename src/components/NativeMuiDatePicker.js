import 'date-fns';
import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

export class NativeMuiDatePicker extends React.Component {

  render() {
    return (
      <div className="NativeMuiDatePicker">   
        <form noValidate>
          <TextField
            id="date"
            label="Select Date"
            type="date"
            defaultValue="2017-05-24"
            value={this.props.dateChangeView}
            onChange={this.props.onDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
  
      </div >
    );

  }
}

export default NativeMuiDatePicker;