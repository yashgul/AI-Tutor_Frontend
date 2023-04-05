import React, { useState, useEffect } from "react";
import ProgressSidebar from "../ProgressSidebar/ProgressSidebar";
import Navbar from "../navbar/Navbar";
import Grid from "@mui/material/Unstable_Grid2";
function LearnCourse() {
  return (
    <div>
      <Navbar />
      <Grid container sx={{ height: "89vh" }}>
        <Grid xs={12} md={3} lg={2} sx={{ pt: 0 }}>
          <ProgressSidebar />
        </Grid>
        <Grid
          xs={12}
          md={9}
          sx={{ borderLeft: "1px solid lightgray" }}
          container
        >
          MAIN
        </Grid>
      </Grid>
    </div>
  );
}

export default LearnCourse;
