import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Skelet() {
  return (
    <div className='skeletBody' 
    style={{ 
       maxWidth: "60px", 
       width: "70%", 
       display: "flex", 
       justifyContent: "center",  
       alignItems: "center", 
       margin: "10rem auto" // Centers horizontally
    }}>
    
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={70} height={60} />
      <Skeleton variant="rectangular" width={450} height={100} />
      <Skeleton variant="rounded" width={450} height={100} />
    </Stack>
    </div>
  );
}
