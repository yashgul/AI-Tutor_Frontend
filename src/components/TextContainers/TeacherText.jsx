import { Box, Typography } from "@mui/material";

function TeacherText({ type, message }) {
  return (
    <>
      <Box
        sx={{
          px: "min(200px,10%)",
          py: "70px",
          color: "lightgray",
          background: "#2a2b32",
          width: "100%",
          border: "1px solid #1c1f2a",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: "15px",
            alignItems: "center",
            gap: "10px",
          }}
          className="chat_text"
        >
          <Typography sx={{ background: "#1c1f2a", p: 2, borderRadius: "5px" }}>
            Teacher
          </Typography>
          <Typography
            sx={{
              color:
                type === "question"
                  ? "yellow"
                  : type === "explanation"
                  ? "aqua"
                  : type == "hint"
                  ? "#a52992"
                  : "lightgreen", //either question ,explanation or answer
              textTransform: "capitalize",
            }}
          >
            {type}
          </Typography>
        </Box>
        {message}
      </Box>
    </>
  );
}

export default TeacherText;
