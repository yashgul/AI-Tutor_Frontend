import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import DoneIcon from "@mui/icons-material/Done";
function ProgressSidebar() {
  const [course, setCourse] = useState({
    id: "1",
    name: "Machine Learning using Python",
    about:
      "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
    image: "https://i.ibb.co/YW6krBY/andrea-de-santis-zwd435-ewb4-unsplash.jpg",
    rating: "4.2",
    ratingnum: "377",
    difficulty: "Medium",
    modules: [
      {
        name: "Linear Regression",
        completed: true,
      },
      {
        name: "Linear Regression",
        completed: true,
      },
      {
        name: "Linear ",
        completed: true,
      },
      {
        name: "Linear Regression",
        completed: true,
      },
    ],
  });
  return (
    <Box sx={{ height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={course?.image}
        alt={course?.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {course?.name}
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
          {course.modules.map((course_module) => {
            return (
              <Button
                variant="outlined"
                sx={{
                  my: 1,
                  textTransform: "capitalize",
                  width: "100%",
                }}
              >
                <DoneIcon sx={{ color: "green" }} />
                <Box sx={{ mx: "auto" }}>{course_module?.name}</Box>
              </Button>
            );
          })}
        </Box>
      </CardContent>
    </Box>
  );
}

export default ProgressSidebar;
