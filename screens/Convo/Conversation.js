import React, { Component } from 'react'
import {View, StyleSheet, Text, Image, FlatList} from 'react-native'
import {MessageShort} from '../../src/components/view';
import config from '../../src/config'


class Conversation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            messages: []
        }
    }
    
    // componentDidMount() {
    //     const query = `?fromUser=${"Josh"}`
    //     const url = `${config}api/message${query}`
    //     fetch(`${config.baseUrl}api/message${query}`, {
    //         method: "GET",
    //         headers: {
    //           Accept: 'application/json',
    //           'Content-type' : "application/json"
    //         }
    //       })
    //         .then(response => {
    //             console.log(response)
    //             return response.json();
    //         })
    //         .then(responseJson => {
    //             this.setState({
    //                 messages: responseJson.data,
    //                 showActivityIndicator: false
    //             })
    //             console.log(responseJson)
    //         })
    //         .then(err => {
    //             console.log(err)
    //         })
    // }


    render() {
        this.state.messages = [{"toUser":"Ryan2","fromUser":"Dan","message":"Varun is really nice.","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan3","fromUser":"Tone","message":"I think we'll get an A","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan4","fromUser":"Rita","message":"The Milwaukee Bucks are undefeated through seven games, making them the only remaining unbeaten team in the NBA. Malcolm Brogdon, a former rookie of the year and a key part of the team's starting unit, is hitting his stride as one of the team's many dynamic, play- and shot-making options. Everything's going well in Milwaukee for the hometown team, which will look to continue its winning ways against the Boston Celtics at 7 p.m. Thursday at TD Garden.","dateTime":"2018-10-29T03:19:50.594Z"},
        {"toUser":"Ryan5","fromUser":"Kevin","message":"That's pretty cooool","dateTime":"2018-10-29T03:19:50.594Z"}]
       
        return <View>
             <FlatList data= {this.state.messages}
                keyExtractor = {item => item.id}
                renderItem = {({item})=><Message {...item} navigation={this.props.navigation} />}
            />
            {/* {this.state.messages.map((message, i) => {
                return <MessageShort {...message}/>
            })} */}
            </View>
    }



}

export default Conversation;