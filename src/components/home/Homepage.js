import React from 'react';
import Navbar from './Navbar';
import CountdownTimer from 'react-component-countdown-timer';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Links from '../Links';
import Chat2 from '../Chat2';
import PairListTable3 from '../PairList3';
import SchedulePage2 from '../SchedulePage2';
import { Card, Button } from 'react-bootstrap';

export class Homepage extends React.Component {

  constructor(props){
    super(props);
    this.state = { }
    //console.log(this.props.location.username);
  }

  render() {
    
    console.log("PROPS : " , this.props);

    return (
      <div>
        <BrowserRouter>
          <div>    
            <div>
              <Navbar />   
            </div>
                <div className="body">
                        <div className="links">
                          <span className="link-schedule">
                            <Link to="/home/schedule">Schedule</Link>
                            {this.state.username}
                          </span>
                          <span className="link-findpair">
                            <Link to="/home/findpair" >Find Pair</Link>
                          </span>
                          <span>
                            <Link to="/home/chat">Chat</Link>
                          </span>
                          <span>
                            <Link to="/home/links">Links</Link>
                          </span>
                        </div>
                        <div className="route-output">
                          <Switch>
                            
                            <Route path="/home/schedule" render={(props) =>
                                        <SchedulePage2 username={this.props.location.username} userId={this.props.location.userId} /> } />

                            <Route path = "/home/findpair" render={(props) => 
                                        <PairListTable3 userId={this.props.location.userId} title={`Props through render`} /> } />                           
                            
                            <Route path="/home/chat" render={(props) => 
                                        <Chat2 username={this.props.location.username} title={`Props through render`} /> } /> 

                            <Route path="/home/links" component={Links} />
                            
                          </Switch>  
                        </div> 
                        <br></br>                       
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="links-container">                         
                          
                          {/* background color of card - lightskyblue */}
                          <Card.Link target="_blank" href="https://discuss.codecademy.com/t/article-pair-programming-what-it-is-why-people-use-it-and-how-you-can-learn-to-pair-program/526299">
                            <Card className="card4" style={{ width: '18.75rem', height: '23rem', background: 'white', cursor: 'pointer' }} >                                                        
                                <Card.Img style={{ width: '14rem'}} variant="top" src="https://live.staticflickr.com/6166/6182435434_b74b10d6bc_b.jpg" fluid />
                                <Card.Body style={{ width: '15rem'}}>
                                  <Card.Title style={{ color: '#0000FF'}}>Pair Programming Intro</Card.Title>
                                    <Card.Text style={{ color: '#8A2BE2'}}>
                                      Great article on how to pair program
                                    </Card.Text>                                  
                                </Card.Body>
                              </Card>
                            </Card.Link>

                          {/* background color of card - lightsalmon */}
                        
                            <Card className="card4" onClick={this.someFunction} style={{ width: '18.75rem', height: '23rem', background: 'white', cursor: 'pointer' }}>
                              <Card.Img style={{ width: '14rem'}} variant="top" src="https://live.staticflickr.com/3008/4557904959_34d7f4a086_b.jpg" fluid />                             
                                <Card.Body style={{ width: '15rem' }}>
                                  <Card.Title style={{ color: '#0000FF'}}>How developer teams actually work</Card.Title>
                                    <Card.Text style={{ color: '#8A2BE2'}}>
                                      Awesome article on how developer teams actually work
                                    </Card.Text>                                  
                                </Card.Body>
                              </Card>
                          
                            
                            
                              <Card className="card4" onClick={this.someFunction} style={{ width: '18.75rem', height: '23rem', background: 'white', cursor: 'pointer' }}>                             
                                <Card.Img style={{ width: '14rem'}} ariant="top" src="https://live.staticflickr.com/7133/7623744452_7222654f38.jpg" fluid />
                                <Card.Body style={{ width: '15rem'}} >
                                  <Card.Title style={{ color: '#0000FF'}}>Asking good programming questions...</Card.Title>
                                    <Card.Text style={{ color: '#8A2BE2'}}>
                                      Or how to not get banned on StackOverflow
                                    </Card.Text>                                  
                                </Card.Body>
                              </Card>
                                                                         
                          
                            
                              <Card className="card4" onClick={this.someFunction} style={{ width: '18.75rem', height: '23rem', background: 'white', cursor: 'pointer' }}>                            
                                <Card.Img style={{ width: '14rem'}} variant="top" src="https://live.staticflickr.com/4112/5041738449_14a488fb97.jpg" fluid /> 
                                <Card.Body style={{ width: '15rem'}} >
                                  <Card.Title style={{ color: '#0000FF'}}>Open Source for Beginners</Card.Title>
                                    <Card.Text style={{ color: '#8A2BE2'}}>
                                      How to get started contributing to Open Source
                                    </Card.Text>                                  
                                </Card.Body>
                              </Card>
                                                                          
                        
                            
                              <Card className="card4" onClick={this.someFunction} style={{ width: '18.75rem', height: '23rem', background: 'white', cursor: 'pointer' }}>
                                <Card.Img style={{ width: '14rem'}} variant="top" src="https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/img/intro.png" fluid />
                                <Card.Body>
                                  <Card.Title style={{ color: '#0000FF'}}>Developer roadmap</Card.Title>
                                  <Card.Text style={{ color: '#8A2BE2'}}>
                                    Infographic on being a frontend and backend developer
                                  </Card.Text>                              
                                </Card.Body>
                              </Card>
                            
                          
                           
                              <Card className="card4" onClick={this.someFunction} style={{ width: '18.75rem', height: '23rem', background: 'white', cursor: 'pointer' }}>
                                <Card.Img style={{ width: '14rem'}} variant="top" src="https://live.staticflickr.com/142/318939943_cf6b9648f1_b.jpg" fluid />
                                <Card.Body>
                                  <Card.Title style={{ color: '#0000FF'}}>Level up by learning to read documentation</Card.Title>
                                  <Card.Text style={{ color: '#8A2BE2'}}>
                                    Become a better developer by learning to read documentation
                                  </Card.Text>                              
                                </Card.Body>
                              </Card>
                            
                            
                          
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        {/* <div className="countdown">
                          <SimpleCountdownTimer /> 
                        </div> */}
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        {/* <div className="footer">
                          <h5>{"Made with"}</h5>
                          <h5>{" "}</h5>
                          <h5 style={{color: "#f1356d"}}>{" ~ <3"}</h5>
                        </div> */}
                        <br></br>
                        <br></br>
                        
              </div>
          </div>
        </BrowserRouter>

          <div className="footer" color="blue">
            
            {'Copyright © '}
            {"Tenbes "}
            {new Date().getFullYear()}
           
          </div>
     
      </div>
       
    );
  }
};

class SimpleCountdownTimer extends React.Component {
  

  getDateTimeFromDB() {
    // API call to DB
    // convert DatTime to seconds
    // store in count
  }

  componentDidMount() {
    // call to API
    // -pull datetime from db
    // -calculate seconds from TODAY till that datetime
    // - place in count below
  }

  render() {
    
    var settings = {
      count: 5432,
      border: true,
      showTitle: true,
      noPoints: false,
    };

    return (
      <CountdownTimer {...settings} />
    );
  }
};

export default Homepage;