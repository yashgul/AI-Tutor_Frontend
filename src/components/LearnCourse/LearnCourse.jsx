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
  const [expectedSolution, setExpectedSolution] = useState({
    hint: "",
    question: "",
    answer: "",
  }); //state containing hint and answer if student is unable to answer the q
  const [currentModule, setCurrentModule] = useState(0);
  const [studentText, setStudentText] = useState("");
  // const [conversationList, setConversationList] = useState([
  //   {
  //     sender: "Teacher",
  //     type: "explanation",
  //     message:
  //       " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
  //   },
  //   {
  //     sender: "Student",
  //     type: "doubt",
  //     message:
  //       " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
  //   },
  //   {
  //     sender: "Teacher",
  //     type: "explanation",
  //     message:
  //       " Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create MachineLearning Algorithms in Python and RLearn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.Learn to create Machine Learning Algorithms in Python and R",
  //   },
  // ]);

  console.log(courseDetails);
  useEffect(() => {
    setLoading(true);

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
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const curconversation =
      courseDetails?.modules?.[currentModule]?.conversation;

    if (curconversation != undefined && curconversation?.length == 0) {
      setLoading(true);
      //if curconversation  exists and length is zero call chat gpt api to generate questions
      axios
        .post("http://localhost:5000/openai/explain", {
          topic: courseDetails?.modules?.[currentModule]?.topic,
        })
        .then(function (response) {
          console.log(response);
          setCourseDetails((prev) => ({
            ...prev,
            modules: [
              ...prev.modules.slice(0, currentModule),
              {
                ...prev.modules?.[currentModule],
                conversation: [
                  {
                    sender: "Teacher",
                    type: "explanation",
                    message: response?.data?.data?.explanation,
                  },
                ],
              },
              ...prev.modules.slice(currentModule + 1),
            ],
          }));
          setLoading(false);
        })
        .catch(function (err) {
          console.log(err);

          setLoading(false);
        });
    }
  }, [currentModule, courseDetails?.modules?.[currentModule]?.topic]);

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
        topic: courseDetails?.modules?.[currentModule].topic,
        doubt: studentText,
      })
      .then(function (response) {
        console.log(response);

        setCourseDetails((prev) => ({
          ...prev,
          modules: [
            ...prev.modules.slice(0, currentModule),
            {
              ...prev.modules?.[currentModule],
              conversation: [
                ...prev.modules?.[currentModule].conversation,
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
            },
            ...prev.modules.slice(currentModule + 1),
          ],
        }));

        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  }

  function studentHintHandler() {
    setCourseDetails((prev) => ({
      ...prev,
      modules: [
        ...prev.modules.slice(0, currentModule),
        {
          ...prev.modules?.[currentModule],
          conversation: [
            ...prev.modules?.[currentModule].conversation,
            {
              sender: "Teacher",
              type: "hint",
              message: expectedSolution.hint,
            },
          ],
        },
        ...prev.modules.slice(currentModule + 1),
      ],
    }));
  }
  function studentAnswerHandler() {
    //if answer is correct
    setLoading(true);

    axios
      .post("http://localhost:5000/openai/check", {
        // topic: courseDetails?.modules?.[currentModule]?.topic,
        topic: "React",
        question: expectedSolution?.question,
        answer: studentText,
      })
      .then(function (response) {
        if (
          response?.data?.data?.answer_status?.toLowerCase() == "correct" ||
          response?.data?.data?.answer_status?.toLowerCase() == "correct."
        ) {
          setCourseDetails((prev) => ({
            ...prev,
            modules: [
              ...prev.modules.slice(0, currentModule),
              {
                ...prev.modules?.[currentModule],
                status: 1,
                conversation: [
                  ...prev.modules?.[currentModule].conversation,
                  {
                    sender: "Student",
                    type: "answer",
                    message: studentText,
                  },
                  {
                    sender: "Teacher",
                    type: "correction",
                    message:
                      "Well done! You've perfected " +
                      courseDetails?.modules?.[currentModule]?.topic,
                  },
                ],
              },
              ...prev.modules.slice(currentModule + 1),
            ],
          }));
        } else {
          setCourseDetails((prev) => ({
            ...prev,
            modules: [
              ...prev.modules.slice(0, currentModule),
              {
                ...prev.modules?.[currentModule],
                conversation: [
                  ...prev.modules?.[currentModule].conversation,
                  {
                    sender: "Student",
                    type: "answer",
                    message: studentText,
                  },
                  {
                    sender: "Teacher",
                    type: "explanation",
                    message:
                      "You're not quite correct. Feel free to ask me for a hint if you're stuck!",
                  },
                ],
              },
              ...prev.modules.slice(currentModule + 1),
            ],
          }));
        }

        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  }
  function studentProceedandler() {
    setLoading(true);
    setStudentStage("answer");

    axios
      .post("http://localhost:5000/openai/question", {
        topic: courseDetails?.modules?.[currentModule]?.topic,
      })
      .then(function (response) {
        console.log(response);

        setExpectedSolution({
          answer: response?.data?.data?.answer, //if user gives up
          hint: response?.data?.data?.hint,
          question: response?.data?.data?.question,
        });
        setCourseDetails((prev) => ({
          ...prev,
          modules: [
            ...prev.modules.slice(0, currentModule),
            {
              ...prev.modules?.[currentModule],
              conversation: [
                ...prev.modules?.[currentModule].conversation,
                {
                  sender: "Teacher",
                  type: "question",
                  message: response?.data?.data?.question,
                },
              ],
            },
            ...prev.modules.slice(currentModule + 1),
          ],
        }));

        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
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
          <Box sx={{ minHeight: "50vh", width: "100%" }}>
            {courseDetails.modules?.[currentModule]?.conversation.map(
              (conversation) => {
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
              }
            )}
          </Box>
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
              {studentStage == "doubt"
                ? courseDetails?.modules?.[currentModule]?.status == 0 && (
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
                        onClick={studentProceedandler}
                      >
                        Proceed ahead
                      </Typography>
                    </>
                  )
                : courseDetails?.modules?.[currentModule]?.status == 0 && (
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
              color="secondary"
              disabled={courseDetails?.modules?.[currentModule]?.status === 1}
              sx={{ width: "80%", bgcolor: "lightgray" }}
              value={studentText}
              onChange={(e) => setStudentText(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SendIcon
                      className="cursor_pointer"
                      onClick={
                        courseDetails?.modules?.[currentModule]?.status === 1
                          ? () => {}
                          : studentTextSubmitHandler
                      }
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
