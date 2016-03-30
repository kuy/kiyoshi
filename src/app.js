import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { app: { list } } = this.props;
    return <ul>
      {list.map(item =>
        <li>{item}</li>
      )}
    </ul>;
  }
}

function select({ app }) {
  return { app };
}

export default connect(select)(App);
