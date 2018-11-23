import React from "react";
import Loading from '../components/Loading';

export class LoadingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <Loading />;
  }
}

export default LoadingScreen;
