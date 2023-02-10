import React from 'react';
import ReactDOM from 'react-dom';
import styled from "@emotion/styled";
import defaultConfig from './config/default.json'
import { ChartComponent } from './components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './root.css';

const Root = styled(Stack)`
  width: 100%;
  height: 500px;
`

const App = () => {
  const [inlineData, setInlineData] = React.useState()
  const [config, setConfig] = React.useState()

  React.useEffect(() => {
    setConfig(defaultConfig.default.config)
    setInlineData(defaultConfig.default.inlineData)
  }, [])



  const handleUpdateSeriesSlices = () => {
    setConfig(defaultConfig.updated.config)
    setTimeout(() => {
      setConfig(defaultConfig.updated.config)
      setInlineData(defaultConfig.updated.inlineData)
    }, 500)
  }


  return <Root className='root' spacing={2} direction="column">
    {config && <ChartComponent config={config} inlineData={inlineData} />}
    <Button variant="outlined" color='primary' onClick={handleUpdateSeriesSlices}>Update Series Slices</Button>
  </Root>
}


ReactDOM.render(<App />, document.getElementById('root'));