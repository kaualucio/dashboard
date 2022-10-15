import React, { Dispatch, SetStateAction } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { TextEditorToolbar, formats, modules } from './TextEditorToolbar';

interface TextEditorProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const TextEditor = ({ value, setValue }: TextEditorProps) => {
  return (
    <>
      <TextEditorToolbar />
      <ReactQuill
        id="content"
        className="w-full h-full rounded-md"
        theme="snow"
        style={{ height: 600, position: 'relative', top: -20 }}
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

export default TextEditor;
