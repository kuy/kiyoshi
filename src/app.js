import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { app: { list } } = this.props;
    return <div>
      {list.map(item =>
        <span>{item}</span>
      )}
    </div>;
  }
}

function select({ app }) {
  return { app };
}

export default connect(select)(App);
