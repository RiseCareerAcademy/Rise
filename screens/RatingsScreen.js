import React from 'react';
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
        return <Ratings userToRate={userToRate} {...this.props} />;
    }
}
 export default RatingsScreen;
