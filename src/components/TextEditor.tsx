import React, { useMemo, Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
// import ReactQuill, { Quill } from 'react-quill';
import { TextEditorToolbar, formats, modules } from './TextEditorToolbar';

interface TextEditorProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const TextEditor = ({ label, value, setValue }: TextEditorProps) => {
  return (
    <div className="flex items-start flex-col gap-5">
      <label
        htmlFor="content"
        className="text-md text-text font-medium mb-3 lg:mb-0"
      >
        {label}
      </label>
      <TextEditorToolbar />
      <ReactQuill
        preserveWhitespace
        id="content"
        className="w-full h-full rounded-md"
        theme="snow"
        style={{ height: 600, position: 'relative', top: -20 }}
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
