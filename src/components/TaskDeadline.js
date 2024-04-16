import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const CustomDateInput = ({ selectedTime, handleTimeChange }) => {
  const [showFormat, setShowFormat] = useState(false);

  const handleFocus = () => {
    setShowFormat(true);
  };

  const handleBlur = () => {
    setShowFormat(false);
  };

  return (
    <TextField
      label="Deadline" // Keep the label on top
      type="date" // Always use type="date"
      sx={{
        width: "75%",
        "& .MuiInputBase-input": { // Style the input field
          color: showFormat ? "black" : "transparent", // Transparent color when not focused
          transition: "color 0.2s ease-in-out",
        },
      }}
      value={selectedTime}
      onChange={handleTimeChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Deadline" // Set placeholder for out-of-focus state
    />
  );
};

export default CustomDateInput;
 