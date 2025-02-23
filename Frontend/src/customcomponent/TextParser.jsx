import { Text } from "@chakra-ui/react";
import React from "react";
import DOMPurify from 'dompurify';

const TextParser = ({ text }) => {

const parseText = (inputText) => {
    // Replace **text** with <strong> tags
    let parsedText = inputText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Handle newlines and other escape characters
    parsedText = parsedText.replace(/\n/g, '<br />');

    // Sanitize the parsed text to prevent XSS attacks
    return DOMPurify.sanitize(parsedText);
  };

  // Render the parsed text using dangerouslySetInnerHTML
  return (
    <Text
      color="gray.700"
      dangerouslySetInnerHTML={{ __html: parseText(text) }}
      style={{
        whiteSpace: 'pre-wrap', // Preserve line breaks
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.4', // Adjust line height for better readability
      }}
    />
  );
};

export default TextParser;
