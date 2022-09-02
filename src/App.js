import { Box, Grid, Typography } from "@mui/material";
import { GameContainer } from "components/GameContainer";
import React from "react";

function App() {
  return (
    <Grid container={true}>
      <Grid item xs={12}>
        <Box sx={{ padding: '16px' }}>
          <Typography
            variant="h4"
            align="center"
          >
            Memory Game
          </Typography>   
        </Box> 
      </Grid>
      <Grid item xs={1} md={2} lg={3} />
      <Grid item xs={10} md={8} lg={6} >
        <GameContainer />
      </Grid>
      <Grid item xs={1} md={2} lg={3} />
    </Grid>
  );
}

export default App;
