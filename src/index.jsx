import React from 'react';
import ReactDOM from 'react-dom';
import styled from "@emotion/styled";
import defaultConfigs from './config/default.json'
import { JsonEditor, ConfigEditor, ChartComponent, LayerFactory } from './components';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './root.css';

const DefaultType = 'histogram'


const defaultRuntimeFilters = { where: '1=1' }

/*
const defaultRuntimeFilters = {
  "where": "1=1",
  "geometry": {
    "hasZ": true,
    "spatialReference": {
      "latestWkid": 3857,
      "wkid": 102100
    },
    "rings": [
      [
        [
          -9769821.647248657,
          5133195.904378366,
          0
        ],
        [
          -9752040.861436835,
          5133195.904378366,
          0
        ],
        [
          -9752040.861436835,
          5125146.139167771,
          0
        ],
        [
          -9769821.647248657,
          5125146.139167771,
          0
        ],
        [
          -9769821.647248657,
          5133195.904378366,
          0
        ]
      ]
    ]
  }
}
*/

const Root = styled(Stack)`
  width: 100%;
  height: 95vh;
  min-height: 800px;
  .left-part {
    height: 100%;
    width: 40%;
  }
  .right-part {
    width: 60%;
    height: 100%;
  }
`

const App = () => {
  const runtimeDataEditorRef = React.useRef(null)
  const [layer, setLayer] = React.useState(null)
  
  const [service, setService] = React.useState(defaultConfigs[DefaultType].service)
  const [rawWebMapWebChart, setRawWebMapWebChart] = React.useState(defaultConfigs[DefaultType].config)
  const [rawRuntimeFilters, setRawRuntimeFilters] = React.useState(defaultConfigs[DefaultType].runtimeDataFilters)

  const [webMapWebChart, setWebMapWebChart] = React.useState()
  const [runtimeFilters, setRuntimeFilters] = React.useState(rawRuntimeFilters)

  const [activeUpdateChart, setActiveUpdateChart] = React.useState(true)

  const updateChartReady = !!layer  && rawWebMapWebChart && rawRuntimeFilters

  const handleRawWebMapWebChartChange = (config, runtimeDataFilters, service) => {
    setRawWebMapWebChart(config)
    if (service) {
      setService(service)
    }
    if(runtimeDataFilters && runtimeDataEditorRef.current){
      runtimeDataEditorRef.current.jsonEditor.set(runtimeDataFilters)
    }
    setActiveUpdateChart(true)
  }

  const handleRawRuntimeFiltersChange = (filtes) => {
    setRawRuntimeFilters(filtes)
    setActiveUpdateChart(true)
  }

  const handleUpdateChart = () => {
    setWebMapWebChart(rawWebMapWebChart)
    setRuntimeFilters(rawRuntimeFilters)
    setActiveUpdateChart(false)
  }

  return <Root className='root' spacing={2} direction="row">
    <div className='left-part'>
      <ConfigEditor defaultValue={rawWebMapWebChart} onChange={handleRawWebMapWebChartChange} />
    </div>
    <Stack spacing={2} className='right-part' direction="column">
      <Stack spacing={2} direction="row" className='w-100'>
        <LayerFactory className='flex-fill' service={service} onCreateLayer={setLayer} />
        <Button variant="outlined" disabled={!updateChartReady} color={activeUpdateChart ? 'primary' : 'inherit'} onClick={handleUpdateChart}>Update Chart</Button>
      </Stack>
      <Stack spacing={2} direction="row" className='flex-fill'>
        <Box className='w-30 h-100'>
          <Typography variant='h5'>Runtime data filters:</Typography>
          <Box className='w-100' sx={{ height: 'calc(100% - 32px)' }}>
            <JsonEditor ref={runtimeDataEditorRef} defaultValue={rawRuntimeFilters} onChange={handleRawRuntimeFiltersChange} />
          </Box>
        </Box>
        <Box className='flex-fill'>
          {(layer || dataSource) && webMapWebChart && <ChartComponent webMapWebChart={webMapWebChart} featureLayer={layer} runtimeDataFilters={runtimeFilters} />}
        </Box>
      </Stack>
    </Stack>
  </Root>
}

ReactDOM.render(<App />, document.getElementById('root'));