import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button } from '@mui/material';
import * as React from 'react';

export default function ButtonCustom({ video }) {
  return (
    <Button
      href={`https://www.youtube.com/watch?v=${video}`}
      style={{ background: 'gold' }}
      variant="outlined"
    >
      <span style={{ color: 'red', fontSize: '1.4rem' }}>Watch Trailer</span>
      <YouTubeIcon style={{ color: 'red', fontSize: '2.4rem' }} />
    </Button>
  );
}
