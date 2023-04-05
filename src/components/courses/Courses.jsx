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

  const [items, setItems] = useState([
    {
      id: "1",
      name: "Machine Learning using Python",
      about:
        "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
      image:
        "https://i.ibb.co/YW6krBY/andrea-de-santis-zwd435-ewb4-unsplash.jpg",
      rating: "4.2",
      ratingnum: "377",
      registered: true,
      what_learn: [
        "Harness The Power Of Anaconda/iPython For Practical Data Science",
        "Read In Data Into The Python Environment From Different Sources",
        "Carry Out Basic Data Pre-processing & Wrangling In Python",
        "Implement Unsupervised/Clustering Techniques Such As k-means Clustering",
        "Implement Dimensional Reduction Techniques (PCA) & Feature Selection",
        "Implement Supervised Learning Techniques/Classification ",
      ],
    },
    {
      id: "2",
      name: "FullStack MERN Develpopment",
      about:
        "A MERN stack full stack course covers the development of web applications using MongoDB, Express.js, React.js, and Node.js. It teaches learners how to create dynamic, scalable, and robust web applications with features such as user authentication, data storage and retrieval, and real-time updates. ",
      image: "https://i.ibb.co/WsL3B0N/MERN.webp",
      rating: "4.7",
      ratingnum: "792",
      registered: false,
      what_learn: [
        "Harness The Power Of Anaconda/iPython For Practical Data Science",
        "Read In Data Into The Python Environment From Different Sources",
        "Carry Out Basic Data Pre-processing & Wrangling In Python",
        "Implement Unsupervised/Clustering Techniques Such As k-means Clustering",
        "Implement Dimensional Reduction Techniques (PCA) & Feature Selection",
        "Implement Supervised Learning Techniques/Classification ",
      ],
    },
  ]);

  const userdata = JSON.parse(localStorage.getItem("userdata") || null);
  useEffect(() => {
    console.log(userdata);
    // axios
    //   .get("http://localhost:5000/products/userproducts/" + userdata?.id)
    //   .then(function (response) {
    //     console.log(response);
    //     setItems(response.data.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth={false}>
        <Grid container spacing={6} sx={{ p: 6 }}>
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
                <Card sx={{ width: "100%" }}>
                  <CardActionArea onClick={(e) => handleOpen(e, item)}>
                    <CardMedia
                      component="img"
                      height="190"
                      image={item?.image}
                      alt={item?.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item?.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.disabled"
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
                          {item?.rating}
                        </Typography>
                        <Rating
                          size="small"
                          name="half-rating-read"
                          defaultValue={item?.rating}
                          precision={0.5}
                          readOnly
                        />
                        <Typography
                          sx={{ ml: 1 }}
                          variant="body2"
                          color="text.disabled"
                        >
                          ({item?.ratingnum})
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
                variant="h6"
                component="h2"
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
                  {selectedCourse?.rating}
                </Typography>
                <Rating
                  size="small"
                  name="half-rating-read"
                  defaultValue={selectedCourse?.rating}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  sx={{ ml: 1 }}
                  variant="body2"
                  color="text.disabled"
                >
                  ({selectedCourse?.ratingnum})
                </Typography>
              </Box>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {selectedCourse?.about}
              </Typography>

              <Grid
                container
                spacing={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ p: 6 }}
              >
                {selectedCourse?.what_learn?.map((objective) => (
                  <Grid xs={12} md={6} sx={{ display: "flex" }} key={objective}>
                    <DoneIcon sx={{ mr: "10px" }} />
                    {objective}
                  </Grid>
                ))}

                <Grid xs={11} md={3}>
                  <Card sx={{ width: "100%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="190"
                        image="https://i.ibb.co/Kjfm5Kq/beginner.png"
                        alt="beginner image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Beginner
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.disabled"
                          className="truncate-3"
                        >
                          Suitable for beginners with little to no experience
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>

                <Grid xs={12} md={3}>
                  <Card sx={{ width: "100%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="190"
                        image="https://i.ibb.co/tbtXMQf/intermediate.png"
                        alt="beginner image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Intermediate
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.disabled"
                          className="truncate-3"
                        >
                          Suitable for learners with some experience
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>

                <Grid xs={12} md={3}>
                  <Card sx={{ width: "100%" }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="190"
                        image="https://i.ibb.co/Xb2KFST/advanced.png"
                        alt="beginner image"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Advanced
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.disabled"
                          className="truncate-3"
                        >
                          Suitable for experienced learners up for a challenge
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button sx={{ mx: "auto" }} variant="contained" color="success">
                  Start Learning
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
}

export default Courses;
