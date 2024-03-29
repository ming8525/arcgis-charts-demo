import React from "react"
import { JsonEditor } from './json-editor'
import { useForkRef } from '../utils'
import defaultConfigs from '../config/default.json'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box"

const defaultRuntimeDataFilters = {
  where: '1=1'
}

export const ConfigEditor = (props) => {
  const { defaultValue, editorRef, onChange } = props

  const ref = React.useRef(null)
  const handleRef = useForkRef(ref, editorRef)

  const handlePresetConfigChange = (json) => {
    ref.current.jsonEditor.set(json.config)
    onChange?.(json.config, json.runtimeDataFilters ?? defaultRuntimeDataFilters, json.service)
  }
  

  return <Stack spacing={2} direction="column" className="config-editor w-100 h-100">
    <Stack spacing={2} direction="row" className="header">
      {
        Object.entries(defaultConfigs).map(([type, json]) => {
          return <Button key={type} variant="outlined" onClick={() => handlePresetConfigChange(json)}>{type}</Button>
        })
      }
    </Stack>
    <Box className="editor-container" sx={{'height': 'calc(100% - 45px)'}}>
      <JsonEditor ref={handleRef} defaultValue={defaultValue} onChange={onChange} />
    </Box>
  </Stack>
}