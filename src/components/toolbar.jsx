import React from "react";
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import clsx from "clsx";


export const Toolbar = (props) => {
  const { className, useAPILayer = true, onUseAPILayerChange } = props

  const [isRTL, setIsRTL] = React.useState(false)

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', 'en')
  }, [])

  const handleRTLChange = (evt) => {
    const checked = evt.target.checked
    if (checked) {
      document.documentElement.setAttribute('lang', 'ar')
    } else {
      document.documentElement.setAttribute('lang', 'en')
    }
    setIsRTL(checked)
  }



  return (<Stack spacing={2} className={clsx('toolbar', className)} direction="row">
    <FormControlLabel control={<Switch checked={isRTL} onChange={handleRTLChange} />} label={isRTL ? 'RTL' : 'LTR'} />
    <FormControlLabel control={<Switch checked={useAPILayer} onChange={(evt) => onUseAPILayerChange?.(evt.target.checked)} />} label={useAPILayer ? 'Use Feature Layer Datasource' : 'Don\'t Use Feature Layer Datasource'} />
  </Stack>)
}