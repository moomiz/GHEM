import React from 'react'
import { css } from '@emotion/react';

function ForthContainer() {
  return (
    <div css={Layout} >
        <div >ForthContainer</div>
        <div>ForthContainer</div>
    </div>
    
  )
}

const Layout = css`
  scroll-snap-align: start;
  width: 100%;
  height: 100vh;
  font-size: 1em;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default ForthContainer