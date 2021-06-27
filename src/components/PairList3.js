import React from 'react';
import { useState } from 'react';
import 'react-table/react-table.css'
import { zonedTimeToUtc } from 'date-fns-tz';
import Modal from 'react-bootstrap/Modal';
import Media from 'react-bootstrap/Media';
import Button from 'react-bootstrap/Button';
//import ReactTable from 'react-table';

export const PairListTable3 = (props) => {

    console.log("props 1: " , props);

    const [data, setData] = useState([]);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const [datetime, setDatetime] = useState(''); 


    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const showModal2 = () => {
        setIsOpen2(true);
    }

    const hideModal2 = () => {
        setIsOpen2(false);
    };
    
    const sendSchedule = () => {     
        const url = 'http://localhost:8080/addS'; 
        
        console.log("props: "  , props)

        fetch(url,
            {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            
            // need to get datetime from data response
            body: JSON.stringify({ description: description, datetime: datetime, user: { id: props.userId } }) 
                
            })
        .then(response => response.json())
        .then(result => console.log(result))
        
        hideModal();    
    }

    // ** NEED to work on this !!!
    const deleteSchedule = () => {

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

    const fetchData = () => {

        // ** convert local time to utc
        let timezoneName = new Date(date + " " + startTime).toISOString();
            
        // take out .000Z
        // ** find index of '.'
        let pos = timezoneName.indexOf('.');
        let timezoneNameSliced = timezoneName.slice(0, pos);
    
        // format timezone with "+00:00"
        timezoneNameSliced = timezoneNameSliced + "+00:00";
        console.log("timezone sliced: " + timezoneNameSliced);
        setDatetime(timezoneNameSliced);
    
    
        const url = `http://localhost:8080/findSchedule2`; // find by datetime
        fetch(url,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ datetime: timezoneNameSliced })
            })
            .then(response => response.json())  
            .then(response => {         
                setData(response);  
            })
    
        console.log(datetime); // on second state change this will log !
    }
    
    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    
    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    }
    
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    // // used for React Table
    // const columns = [{
    //     Header: 'User', // Header of column
    //     accessor: 'userName' // value accessor
    // }, {
    //     Header: 'Description',
    //     accessor: 'description',    
    // }, {
    //     // ** FIX THESE. MERGE ADD AND DELETE !!
    //     Header: 'Add',
    //     id: 'add-button',
    //     Cell: <button onClick={showModal}>Pair</button>, 
    // }, {
    //     Header: 'Delete',
    //     id: 'delete-button',
    //     Cell: <button>Unpair</button>
    // }]
      
    return (
        
            <div className="PairListTable">
                <br></br>
                <br></br>
                <div className="Datetitle">
                    <h3 style={{color: "#6495ED"}}>Find partner to program with!</h3>
                    <br></br>
                    <br></br>
                </div>
                
                <div className='findpair'>
                    
                    <Button variant="primary" onClick={fetchData}>Search</Button>
                    <input type="text" placeholder="Enter date" name="date" onChange={handleDateChange} /> 
                    <input type="text" placeholder="Enter time" name="start_time" onChange={handleStartTimeChange} /> 

                </div>
                {/* <div className='test-button'>
                    <button onClick={fetchUsers}>Users</button>
                </div> */}
                <br></br>
                <br></br>

                 {/* <ReactTable data={data} columns={columns} />     */}
               
                <div className="user-list">                   
                    {data.map((media, index) => {                   
                        return (
                            <div>
                                <Media className="one">
                                    <img
                                    width={64}
                                    height={64}
                                    className="align-self-start mr-3"
                                    src={"data:image/png;base64," + media.user.profilePic} //
                                    alt="placeH"
                                    />

                                    <Media.Body>
                                    <h5>{media.user.userName}</h5>
                                    <p>
                                        {media.description}                          
                                    </p>                        
                                    </Media.Body>
                                    
                                    <Button variant="primary" onClick={showModal}>Pair</Button>{' '}
                                    <Button variant="danger" onClick={showModal2}>Unpair</Button>{' '} 
                                </Media>
                                <br></br>
                            </div>
                    )})}

                </div>

                <Modal show={isOpen} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title>What are you working on?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input type="text" onChange={handleDescriptionChange}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <button onClick={sendSchedule}>Submit</button>
                        <button onClick={hideModal}>Cancel</button>                       
                    </Modal.Footer>
                </Modal>

                <Modal show={isOpen2} onHide={hideModal2}>
                    <Modal.Header>
                        <Modal.Title>Are you sure you wish to unpair?</Modal.Title>
                    </Modal.Header>

                    <Modal.Footer>
                        <button onClick={deleteSchedule}>Yes</button>
                        <button onClick={hideModal2}>No</button>                       
                    </Modal.Footer>
                </Modal>
                             
            </div>
           
     
    );
};

export default PairListTable3;