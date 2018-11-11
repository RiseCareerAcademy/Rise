import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import Ratings from '../components/Ratings';

class RatingsScreen extends React.Component<Props>{
    constructor(props) {
        super(props);
    }

    render() {
        const userToRate = {
            first_name: 'Zing',
            last_name: 'Zeng',
        }
        return <Ratings userToRate={userToRate} />;
    }
}

export default RatingsScreen;