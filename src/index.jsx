import React from 'react';
import ReactDOM from 'react-dom';
import styled from "@emotion/styled";
import configs from './config/default.json'
import { JsonEditor, ConfigEditor, ChartComponent, LayerFactory } from './components';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './root.css';

const defaultConfigs = configs.default

const DefaultServices = ['https://servicesdev.arcgis.com/f126c8da131543019b05e4bfab6fc6ac/arcgis/rest/services/ChicagoCr/FeatureServer/0',
  'https://services9.arcgis.com/pJENMVYPQqZZe20v/arcgis/rest/services/Ontario_Daily_Case_Progression/FeatureServer/0']


const defaultRuntimeFilters = { where: '1=1' }
// const defaultRuntimeFilters = { timeExtent: [1579564800000, 1582243200000] }

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
  const editorRef = React.useRef(null)
  const [service, setService] = React.useState(DefaultServices[0])
  const [layer, setLayer] = React.useState(null)
  const [dataSource, setDataSource] = React.useState(null)

  const [rawWebMapWebChart, setRawWebMapWebChart] = React.useState(defaultConfigs.bar)
  const [rawRuntimeFilters, setRawRuntimeFilters] = React.useState(defaultRuntimeFilters)

  const [webMapWebChart, setWebMapWebChart] = React.useState()
  const [runtimeFilters, setRuntimeFilters] = React.useState(rawRuntimeFilters)

  const [activeUpdateChart, setActiveUpdateChart] = React.useState(true)

  const updateChartReady = (!!layer || !!dataSource?.featureLayer) && rawWebMapWebChart && rawRuntimeFilters

  const handleRawWebMapWebChartChange = (config, service) => {

    setRawWebMapWebChart(config)
    if (service) {
      setService(service)
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
        <LayerFactory className='flex-fill' service={service} onCreateLayer={setLayer} onCreateDataSource={setDataSource} />
        <Button variant="outlined" disabled={!updateChartReady} color={activeUpdateChart ? 'primary' : 'inherit'} onClick={handleUpdateChart}>Update Chart</Button>
      </Stack>
      <Stack spacing={2} direction="row" className='flex-fill'>
        <Box className='w-30 h-100'>
          <Typography variant='h5'>Runtime data filters:</Typography>
          <Box className='w-100' sx={{ height: 'calc(100% - 32px)' }}>
            <JsonEditor defaultValue={rawRuntimeFilters} onChange={handleRawRuntimeFiltersChange} />
          </Box>
        </Box>
        <Box className='flex-fill'>
          {(layer || dataSource) && webMapWebChart && <ChartComponent dataSource={dataSource} webMapWebChart={webMapWebChart} featureLayer={layer} runtimeDataFilters={runtimeFilters} />}
        </Box>
      </Stack>
    </Stack>
  </Root>
}

ReactDOM.render(<App />, document.getElementById('root'));