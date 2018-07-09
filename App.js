import React , {Component} from 'react';
import {
    View ,
    Text ,
    StyleSheet
} from 'react-native';

import BluetoothPage from './BluetoothPage';
import TrafficLight from './TrafficLight';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      page:'bluetooth',
      device: null
    };
  }

  changeState = (state)=>{
    this.setState(state);
  };
  
  render (){
    let part = null;
    if(this.state.page === 'bluetooth'){
      return <BluetoothPage changeState={this.changeState}></BluetoothPage>
    } else if(this.state.page === 'light'){
      return <TrafficLight changeState={this.changeState} device={this.state.device}></TrafficLight>
    }
    return (<View>Fuck off!</View>)
  }
}