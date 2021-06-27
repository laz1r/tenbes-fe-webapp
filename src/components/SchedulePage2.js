import React from 'react';
import NativeMuiDatePicker from './NativeMuiDatePicker';
import NativeMuiTimePicker from './NativeMuiTimePicker';
import NativeMuiTimePickerEnd from './NativeMuiTimePickerEnd';
import { zonedTimeToUtc } from 'date-fns-tz';
import Modal from 'react-bootstrap/Modal';
import Button  from 'react-bootstrap/Button';

export class SchedulePage2 extends React.Component {

  constructor(props){
    super(props);
    this.state = { d: '', startTime: '', dateChangeView: '', startTimeChangeView: '',
                  endTime: '', description: '', datetime: '', userName: props.username, userId: props.userId, isOpen: false}
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.sendSchedule = this.sendSchedule.bind(this); // had to bind this !!,  this was
                      // causing error with 'this.state' undefined **
    this.deleteSchedule = this.deleteSchedule.bind(this);
    //this.onDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  showModal = () => {    
      this.setState({isOpen: true})
  };

  hideModal = () => {      
      this.setState({isOpen: false})
  };

  sendSchedule() {
    // add :00 to time 
    let timeHolder = this.state.startTime + ":00";
    
    // convert to UTC - have to do on client because client knows the local time
    // 1. get local time zone
    //const offset = new Date().getTimezoneOffset(); // minutes from UTC
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // 2. datetime = date + time
    //let datetimeString = this.state.d + "T" + timeHolder;
    // 3. convert to utc
    // ex. datetime = "2012-02-12 09:30:00" - local
    const combinedString = this.state.d + " " + timeHolder;
    const utcDate = zonedTimeToUtc(combinedString,timezoneName); // adds GMT-0700 tag
    // sends "2012-02-12 09:30:00 GMT-0700" 
    console.log(utcDate); 
    console.log(this.state.userName);
    console.log("userId: " + this.state.userId);
           
    const url = 'http://localhost:8080/addS'; // store time in DB as UTC
      fetch(url,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ date: this.state.d, time: timeHolder, description: this.state.description, 
                                   user: { id: localStorage.getItem('userId') }, datetime: utcDate }) 
        })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error))        
  }

  deleteSchedule() {

    let timeHolder = this.state.startTime + ":00";   
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const combinedString = this.state.d + " " + timeHolder;
    const utcDate = zonedTimeToUtc(combinedString,timezoneName); // adds GMT-0700 tag

    const url = 'http://localhost:8080/delS';
      fetch(url,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ user: { id: localStorage.getItem('userId') } , datetime: utcDate }) 
        })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.error(error))

    this.hideModal();
  }  

    handleDateChange (event) {
      console.log(event.target.value); // event.target prints the <tag to console
      this.setState(
        {d: event.target.value}
      )
    }

    handleStartTimeChange (event) {
      console.log(event.target.value);
      this.setState(
        {startTime: event.target.value, startTimeChangeView: event.target.value}
      )
    }

    handleEndTimeChange (event) {
      console.log(event.target.value);
      this.setState(
        {endTime: event.target.value, endTimeChangeView: event.target.value}
      )
    }

    handleDescriptionChange (event) {
      console.log(event.target.value);
      this.setState(
        {description: event.target.value}
      )
    }

    handleDateTimeChange (event) {
      console.log(event.target.value);
      this.setState(
        {datetime: event.target.value}
      )
    }

    render() {
    return (

        <div>   
            <div className="body">

                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <div className="schedule"> 
                  <form className="schedule">                   
                    <NativeMuiDatePicker onDateChange={this.handleDateChange}/>
                    <NativeMuiTimePicker onStartTimeChange={this.handleStartTimeChange}/> 
                    <NativeMuiTimePickerEnd onEndTimeChange={this.handleEndTimeChange}/>                                            
                  </form>                 
                </div>

                <br></br>
                <input type="text" placeholder="What are you working on?   (max 255 characters)" name="description" 
                    value={this.state.description} onChange={event => this.handleDescriptionChange(event)} /> 
                <br></br>
                <div className="addDeleteButtons">
                  <Button variant="primary" onClick={this.sendSchedule}>Add</Button>
                  <Button variant="danger" onClick={this.showModal}>Delete</Button>  
                </div>

            </div>

            <Modal show={this.state.isOpen}>

                    <Modal.Header>
                        <Modal.Title>Are you sure you want to delete this schedule?</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <button onClick={this.deleteSchedule}>Yes</button>
                        <button onClick={this.hideModal}>No</button>                       
                    </Modal.Footer>

            </Modal>

        </div>

        
    );
  }
};

export default SchedulePage2;