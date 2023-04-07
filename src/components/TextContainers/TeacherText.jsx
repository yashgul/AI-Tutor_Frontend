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
              color: "aqua",
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
