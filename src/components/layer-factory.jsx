import React from "react";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer'
import styled from "@emotion/styled";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import clsx from "clsx";

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

export const LayerFactory = (props) => {
  const { service, onCreateLayer, className } = props
  const [url, setUrl] = React.useState(service)
  const [created, setCreated] = React.useState(false)

  React.useEffect(() => {
    setUrl(service)
    setCreated(false)
  }, [service])

  const handleURLChange = (e) => {
    const url = e.target.value
    setUrl(service)
    if(created) {
      setCreated(false)
    }
  }

  const handleLayerCreated = () => {
    const fl = createFeatureLayer(url)
    fl && onCreateLayer?.(fl)
    setCreated(true)
  }

  const handleDataSourceCreated = () => {
    const ds = createFeatureLayerDataSource(url)
    onCreateDataSource?.(ds)
  }

  return (<Stack spacing={2} direction="column" className={clsx('layer-factory', className)}>
    <TextField id="standard-basic" label="Please enter service URL" variant="standard" value={url} onChange={handleURLChange} />
    <Stack spacing={2} direction="row">
      <Button className="flex-fill" variant="outlined" disabled={!url} onClick={handleLayerCreated} endIcon={created && <CheckCircleIcon color='success' />}>Create API layer</Button>
    </Stack>
  </Stack>)
}