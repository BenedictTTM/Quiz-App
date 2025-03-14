import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import '../Styles/Questions.css'; // Ensure the CSS is imported

export default function DescriptionAlerts({ severity, message }) {
  return (
    <div className="alert-container"> {/* Apply CSS to position alert at top */}
      <Stack sx={{ width: '100%' }} spacing={2}>
        {severity === "success" && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {message}
          </Alert>
        )}

        {severity === "error" && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {message}
          </Alert>
        )}
      </Stack>
    </div>
  );
}
