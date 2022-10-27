import React from 'react';

interface MessageProps {
  text: string;
  type: string;
}

const Message = ({ text, type }: MessageProps) => {
  return (
    <div
      className={`${
        type === 'none' ? 'hidden' : 'block'
      } transition duration-300 py-3 w-full min-h-[50px] mb-5 leading-5 text-center border-2 rounded-md ${
        type === 'success'
          ? 'bg-green border-darkGreen'
          : 'bg-red2 border-darkRed2'
      }  text-[#fff]`}
    >
      {text}
    </div>
  );
};

export default Message;
