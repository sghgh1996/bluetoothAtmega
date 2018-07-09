import React , {Component} from 'react';
import {
    View ,
    Text ,
    StyleSheet
} from 'react-native';
import BluetoothSerial from './react-native-bluetooth-serial';
// import Buffer from 'buffer';

export default class TrafficLight extends Component {
    constructor(props){
        super(props);
        this.state = {
            light1: {
                counter:0,
                color:'red'
            },
            light2: {
                counter:0,
                color: 'red'
            },
            light3: {
                counter:0,
                color: 'red'
            }
        };
    }
    
    componentWillMount(){
        let device = this.props.device;
        BluetoothSerial.connect(device.id)
            .then((res) => {
                console.warn(`Connected to device ${device.name}`)
                this.setState({ device })
            })
            .catch((err) => console.error(err.message))
    }

    componentDidMount(){
        setInterval(function () {
            BluetoothSerial.read()
                .then((res) => {
                    // var myBuffer = [];
                    // var buffer = new Buffer(res, 'utf16le');
                    // for (let i = 0; i < buffer.length; i++) {
                    //     myBuffer.push(buffer[i]);
                    // }
                    // let data = new Uint8Array(myBuffer);
                    // for(let i = 0; i<data.length; i++) {
                    //     data[i] = data[i] & 63
                    // }
                    // for(let i = 0; i < res.length; i++){
                    //
                    // }
                    if(res.length === 1) {
                        console.warn((parseInt(res[0].charCodeAt(0).toString(2), 2) & 31) * 5);
                    }
                    // let data = res & 63;
                    // console.warn((data*5).toString());
                    // let data = [];
                     //for (let i = 0; i < res.length; i++){
                     //    console.warn(i + " : "+ (res[i] & 63));
                     //}
                })
                .catch((err) => console.warn(err.message))
        }, 1000)
    }

    render (){
        return(
            <View style={styles.container}>
                <View style={styles.lightsStatusContainer}>
                    <View>
                        <Text>{this.state.light1.counter}</Text>
                        <Text>{this.state.light1.color}</Text>
                    </View>
                    <View>
                        <Text>{this.state.light2.counter}</Text>
                        <Text>{this.state.light2.color}</Text>
                    </View>
                    <View>
                        <Text>{this.state.light3.counter}</Text>
                        <Text>{this.state.light3.color}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

// styles of tab navigator!
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#FAFAFA'
    },
    lightsStatusContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#E3E3E5'
    }
});