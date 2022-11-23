import * as React from 'react';
import './Spinner.css';

class Spinner extends React.Component {
  render() {
    return (
      <div
        id="Loader"
        className={'loader'}
        style={{
          zIndex: 100,
          position: 'absolute',
          left: '50%',
        }}
      ></div>
    );
  }
}

export default Spinner;
