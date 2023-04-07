import { Box, Typography } from "@mui/material";

function StudentText({ type, message }) {
  return (
    <>
      <Box
        sx={{
          px: "min(200px,10%)",
          py: "70px",
          color: "lightgray",
          background: "#1c1f2a",
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
        >
          <Typography sx={{ background: "#2a2b32", p: 2, borderRadius: "5px" }}>
            Student
          </Typography>
          <Typography
            sx={{
              color: "lightgreen",
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

export default StudentText;
