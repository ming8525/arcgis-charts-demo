import React from "react"
import { JsonEditor } from './json-editor'
import { useForkRef } from '../utils'
import defaultConfigs from '../config/default.json'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box"

export const ConfigEditor = (props) => {
  const { defaultValue, editorRef, onChange } = props

  const ref = React.useRef(null)
  const handleRef = useForkRef(ref, editorRef)

  const handlePresetConfigChange = (config) => {
    ref.current.jsonEditor.set(config)
    onChange?.(config)
  }

  return <Stack spacing={2} direction="column" className="config-editor w-100 h-100">
    <Stack spacing={2} direction="row" className="header">
      {
        Object.entries(defaultConfigs).map(([type, config]) => {
          return <Button key={type} variant="outlined" onClick={() => handlePresetConfigChange(config)}>{type}</Button>
        })
      }
    </Stack>
    <Box className="editor-container" sx={{'height': 'calc(100% - 45px)'}}>
      <JsonEditor ref={handleRef} defaultValue={defaultValue} onChange={onChange} />
    </Box>
  </Stack>
}