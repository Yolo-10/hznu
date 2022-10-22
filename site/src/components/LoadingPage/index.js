import React, { Component } from 'react';
import Loading from 'react-loading-spinkit';

class LoadingPage extends Component {
  render() {
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <Loading show={true} />
      </div>
    );
  }
}

export default LoadingPage