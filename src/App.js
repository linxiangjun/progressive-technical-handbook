import React, { Component } from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const AppStyle = css`
  width: 100%;
  color: hotpink;
`

class App extends Component {
  render() {
    return (
      <div className="App" css={AppStyle}>
        Hello PWA!
      </div>
    );
  }
}

export default App;
