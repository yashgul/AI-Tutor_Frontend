import React, { useState, useEffect } from "react";
import ProgressSidebar from "./ProgressSidebar";
import Navbar from "../navbar/Navbar";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Typography, TextField, Backdrop } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import StudentText from "../TextContainers/StudentText";
import TeacherText from "../TextContainers/TeacherText";
import lottieData from "../../assets/lottie-data";

import { useParams } from "react-router-dom";
import axios from "axios";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: lottieData,

  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

import Lottie from "react-lottie";
function LearnCourse() {
  let { courseid } = useParams();
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [studentStage, setStudentStage] = useState("doubt"); // doubt or answer
  const [currentModule, setCurrentModule] = useState(0);
  const [lastCompletedModules, setlastCompletedModules] = useState();
  const [studentText, setStudentText] = useState("");
  const [conversationList, setConversationList] = useState([
    {
      sender: "Teacher",
      type: "explanation",
      message:
        " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
    },
    {
      sender: "Student",
      type: "doubt",
      message:
        " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
    },
    {
      sender: "Teacher",
      type: "explanation",
      message:
        " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/course/coursedetails/" + courseid)
      .then(function (response) {
        console.log(response);
        setCourseDetails(response?.data?.coursedetails);

        const curconversation =
          response?.data?.coursedetails?.modules?.[currentModule]?.conversation;
        if (
          curconversation?.length == 0 ||
          curconversation?.[curconversation.length - 1]?.type ===
            "explanation" ||
          curconversation?.[curconversation.length - 1]?.type === "doubt"
        )
          setStudentStage("doubt");
        else setStudentStage("answer");

        console.log(curconversation);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  function studentTextSubmitHandler() {
    setLoading(true);
    switch (studentStage) {
      case "doubt":
        studentDoubtHandler();
        break;

      case "answer":
        studentAnswerHandler();
        break;
      default:
    }
    setStudentText("");
  }
  function studentDoubtHandler() {
    axios
      .post("http://localhost:5000/openai/doubt", {
        topic: "Linear Regression",
        doubt: studentText,
      })
      .then(function (response) {
        console.log(response);
        setCourseDetails((prev) => ({
          ...prev,
          modules: [
            ...prev.modules,
            {
              sender: "Student",
              type: "doubt",
              message: studentText,
            },
            {
              sender: "Teacher",
              type: "explanation",
              message: response?.data?.data?.answer,
            },
          ],
        }));

        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function studentHintHandler() {
    setCourseDetails((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          sender: "Student",
          type: "doubt",
          message: "Hey can I have a hint?",
        },
        {
          sender: "Teacher",
          type: "hint",
          message:
            " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts",
        },
      ],
    }));
  }
  function studentAnswerHandler() {
    //if answer is correct

    setCourseDetails((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          sender: "Student",
          type: "answer",
          message:
            " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
        },
        {
          sender: "Teacher",
          type: "explanation",
          message:
            " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
        },
      ],
    }));
  }
  function studentProceedandler() {
    setStudentStage("answer");
  }

  return (
    <div>
      <Navbar />
      <Grid container sx={{ height: "90vh" }}>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        ></Backdrop>
        <Grid
          xs={12}
          md={3}
          lg={2}
          sx={{
            p: 0,
            m: 0,
            overflowY: "auto",
            height: "100%",
            background: "#202531",
            color: "white",
          }}
        >
          <ProgressSidebar
            currentModule={currentModule}
            setCurrentModule={setCurrentModule}
            courseDetails={courseDetails}
            setCourseDetails={setCourseDetails}
          />
        </Grid>
        <Grid
          xs={12}
          md={9}
          lg={10}
          sx={{
            overflowY: "auto",
            height: "90vh",
            width: "100%",
            background: "#1c1f2a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          container
        >
          {loading && (
            <Lottie
              options={defaultOptions}
              height={400}
              width={400}
              isClickToPauseDisabled={true}
              style={{ position: "absolute" }}
            />
          )}
          {conversationList.map((conversation) => {
            return (
              <>
                {conversation.sender === "Teacher" ? (
                  <TeacherText
                    type={conversation?.type}
                    message={conversation?.message}
                  />
                ) : (
                  <StudentText
                    type={conversation?.type}
                    message={conversation?.message}
                  />
                )}
              </>
            );
          })}

          <Box
            sx={{
              height: "20vh",
              width: "100%",
              pb: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              bgcolor: "#1c1f2a",
              mt: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                bgcolor: "#1c1f2a",
                gap: "20px",
                width: "80%",
                my: "20px",
              }}
            >
              {studentStage == "doubt" ? (
                <>
                  <Typography
                    className="action_item cursor_pointer"
                    onClick={() => {
                      setStudentStage("doubt");
                    }}
                  >
                    Ask a Doubt
                  </Typography>

                  <Typography
                    className="action_item cursor_pointer"
                    onClick={() => {
                      setStudentStage("answer");
                    }}
                  >
                    Proceed ahead
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    className="action_item cursor_pointer"
                    onClick={studentHintHandler}
                  >
                    Ask for a Hint
                  </Typography>
                </>
              )}
            </Box>
            <TextField
              id="outlined-basic"
              label={studentStage}
              variant="filled"
              sx={{ width: "80%", bgcolor: "lightgray" }}
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon
                      className="cursor_pointer"
                      onClick={studentTextSubmitHandler}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default LearnCourse;
