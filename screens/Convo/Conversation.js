import React, { Component } from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import {MessageShort} from '../../src/components/view';
import config from '../../src/config'


class Conversation extends Component {

    constructor() {
        super()
        this.state = {
            messages: []
        }
    }
    
    componentDidMount() {
        const query = `?fromUser=${"Josh"}`
        const url = `${config}api/message${query}`
        fetch(`${config.baseUrl}api/message${query}`, {
            method: "GET",
            headers: {
              Accept: 'application/json',
              'Content-type' : "application/json"
            }
          })
            .then(response => {
                console.log(response)
                return response.json();
            })
            .then(responseJson => {
                this.setState({
                    messages: responseJson.data,
                    showActivityIndicator: false
                })
                console.log(responseJson)
            })
            .then(err => {
                console.log(err)
            })
    }


    render() {
        return <View>
            {this.state.messages.map((message, i) => {
                return <MessageShort {...message}/>
            })}
            </View>
    }



}

export default Conversation;