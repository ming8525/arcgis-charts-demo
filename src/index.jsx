import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getPalatteFromImage, rgbArrayToRgbaString } from './color-utils'
import './root.css';


const App = () => {
  const [image, setImage] = React.useState(null);
  const [colors, setColors] = React.useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const image = e.target.result
        setImage(image);
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const rgbs = getPalatteFromImage(img);
          const colors = rgbArrayToRgbaString(rgbs);
          console.log(rgbs);
          setColors(rgbs);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  }

  return (
    <Box>
      <TextField type='file' accept="image/*" onChange={handleUpload} />
      {
        !!colors?.length && (
          <Stack sx={{ display: 'flex', flexDirection: 'row' }}>
            {colors.map((color, index) => (
              <Box key={index} sx={{ width: 50, height: 50, backgroundColor: color }} />
            ))}
          </Stack>
        )
      }
      {image && <img src={image} alt="Uploaded Image" />}
    </Box>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));