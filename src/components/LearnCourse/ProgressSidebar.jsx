import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
function ProgressSidebar({
  currentModule,
  setCurrentModule,
  courseDetails,
  setCourseDetails,
}) {
  return (
    <>
      <Box sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          height="140"
          image={courseDetails?.image}
          alt={courseDetails?.name}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ p: 2, pb: 0 }}
            color={"lightgray"}
          >
            {courseDetails?.name}
          </Typography>

          {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography sx={{ mr: 1, color: "#faaf00", fontSize: "14px" }}>
            {course?.rating}
          </Typography>
          <Rating
            size="small"
            name="half-rating-read"
            defaultValue={course?.rating}
            precision={0.5}
            readOnly
          />
          <Typography sx={{ ml: 1 }} variant="body2" color="text.disabled">
            ({course?.ratingnum})
          </Typography>
        </Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexDirection: "column",
              mt: 3,
            }}
          >
            {courseDetails?.modules?.map((course_module, index) => {
              return (
                <Box
                  className={
                    index === currentModule ? "menuActive" : "menuHover"
                  }
                  variant="outlined"
                  sx={{
                    p: 2,

                    width: "100%",
                    display: "flex",
                  }}
                  onClick={() => {
                    setCurrentModule(index);
                  }}
                >
                  <CheckCircleIcon
                    sx={{
                      color: course_module.status ? "lightgreen" : "lightgray",
                    }}
                  />
                  <Box sx={{ mx: "10px", color: "lightgray" }}>
                    {course_module?.topic}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </CardContent>
      </Box>
    </>
  );
}

export default ProgressSidebar;
