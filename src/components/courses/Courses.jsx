import { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Navbar from "../navbar/Navbar";
import Container from "@mui/material/Container";
import Rating from "@mui/material/Rating";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "auto",
  p: 4,
  maxHeight: "90vh",
  bgcolor: "#1c1f2a",
};

function Courses() {
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({});

  const handleOpen = (e, item) => {
    setmodalVisibility(true);
    setSelectedCourse(item);
  };
  const handleClose = (e, item) => {
    setmodalVisibility(false);
    setSelectedCourse({});
  };

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/course")
      .then(function (response) {
        console.log(response);
        setItems(response?.data?.courses);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ display: "flex" }}>
        <Grid container spacing={6} sx={{ p: 6, height: "100%" }}>
          {items.map((item) => (
            <Grid xs={11} md={6} lg={3} xl={3} key={item._id}>
              <motion.div
                initial="hidden"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.1,
                    },
                  },
                }}
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    width: "100%",
                    bgcolor: "#1c1f2a",
                  }}
                >
                  <CardActionArea onClick={(e) => handleOpen(e, item)}>
                    <CardMedia
                      component="img"
                      height="190"
                      image={item?.image}
                      alt={item?.name}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        sx={{ color: "secondary.light" }}
                      >
                        {item?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="gray"
                        className="truncate-3"
                      >
                        {item?.about}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          mt: 2,
                        }}
                      >
                        <Typography
                          sx={{ mr: 1, color: "#faaf00", fontSize: "14px" }}
                        >
                          {item?.ratingNum}
                        </Typography>
                        <Rating
                          size="small"
                          name="half-rating-read"
                          defaultValue={item?.ratingNum}
                          precision={0.5}
                          readOnly
                        />
                        <Typography sx={{ ml: 1 }} variant="body2" color="gray">
                          ({item?.rating})
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={modalVisibility}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modalVisibility}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h4"
                color="secondary.light"
              >
                {selectedCourse?.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography sx={{ mr: 1, color: "#faaf00", fontSize: "14px" }}>
                  {selectedCourse?.ratingNum}
                </Typography>
                <Rating
                  size="small"
                  name="half-rating-read"
                  defaultValue={selectedCourse?.ratingNum}
                  precision={0.5}
                  readOnly
                />
                <Typography sx={{ ml: 1 }} variant="body2" color="gray">
                  ({selectedCourse?.rating})
                </Typography>
              </Box>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, color: "gray" }}
              >
                {selectedCourse?.about}
              </Typography>

              <Typography
                id="transition-modal-description"
                variant="h5"
                sx={{ mt: 2, color: "secondary.light" }}
              >
                What will you learn?
              </Typography>
              <Grid
                container
                spacing={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ p: 2 }}
              >
                {selectedCourse?.what_learn?.map((objective) => (
                  <Grid
                    xs={12}
                    md={4}
                    sx={{ display: "flex", color: "gray" }}
                    key={objective}
                  >
                    <DoneIcon sx={{ mr: "10px", color: "#ab47bc" }} />
                    {objective}
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <NavLink to={"../learn-course/" + selectedCourse._id}>
                  <Button
                    sx={{ mx: "auto" }}
                    variant="outlined"
                    color="secondary"
                  >
                    {selectedCourse?.registered ? "Continue" : "Register"}
                  </Button>
                </NavLink>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}

export default Courses;
