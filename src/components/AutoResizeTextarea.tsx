import { useState, useRef, useEffect } from "react";

function AutoResizeTextarea({ value, onChange, ...props }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset height
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // expand
    }
  };

  useEffect(() => {
    adjustHeight(); // adjust on mount
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    adjustHeight();
  };

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      style={{
        width: "100%",
        overflow: "hidden", // hides scrollbar
        resize: "none",     // prevent manual resizing
      }}
      {...props}
    />
  );
}

export default AutoResizeTextarea;