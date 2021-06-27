import 'date-fns';
import { TextField } from '@material-ui/core';
import React from 'react';

export class NativeMuiTimePickerEnd extends React.Component {

  render() {
    return (
      <div className="NativeMuiTimePicker">   
        <form noValidate>
          <TextField
            id="time"
            label="End Time"
            type="time"
            defaultValue="08:00"
            value={this.props.endTimeChangeView}
            onChange={this.props.onEndTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>
  
      </div >
    );

  }
}

export default NativeMuiTimePickerEnd;