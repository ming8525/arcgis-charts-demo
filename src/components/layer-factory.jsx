import React from "react";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import styled from "@emotion/styled";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import clsx from "clsx";

const DefaultServices = ['https://servicesdev.arcgis.com/f126c8da131543019b05e4bfab6fc6ac/arcgis/rest/services/ChicagoCr/FeatureServer/0',
  'https://services9.arcgis.com/pJENMVYPQqZZe20v/arcgis/rest/services/Ontario_Daily_Case_Progression/FeatureServer/0']

const CacheLayers = {}
const createFeatureLayer = (url) => {
  if (!url) return null
  if (!CacheLayers[url]) {
    const fl = new FeatureLayer({ url })
    CacheLayers[url] = fl
    return fl
  } else {
    return CacheLayers[url]
  }
}

const createFeatureLayerDataSource = (url) => {
  return {
    type: 'featureLayer',
    featureLayer: {
      layerType: 'ArcGISFeatureLayer',
      id: "",
      url
    }
  }
}

export const LayerFactory = (props) => {
  const { onCreateDataSource, onCreateLayer, className } = props
  const [url, setUrl] = React.useState(DefaultServices[0])

  const handleLayerCreated = () => {
    const fl = createFeatureLayer(url)
    fl && onCreateLayer?.(fl)
  }

  const handleDataSourceCreated = () => {
    const ds = createFeatureLayerDataSource(url)
    onCreateDataSource?.(ds)
  }

  return (<Stack spacing={2} direction="column" className={clsx('layer-factory', className)}>
    <TextField id="standard-basic" label="Please enter service URL" variant="standard" value={url} onChange={e => setUrl(e.target.value)} />
    <Stack spacing={2} direction="row">
      <Button className="w-50" variant="outlined" disabled={!url} onClick={handleLayerCreated}>Create API layer</Button>
      <Button className="w-50" variant="outlined" disabled={!url} onClick={handleDataSourceCreated}>Create Feature Layer data source</Button>
    </Stack>
  </Stack>)
}