import { Dispatch, SetStateAction, useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/material.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/night.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { Controlled as ControlledEditorComponent } from "react-codemirror2";

interface EditorProps {
  language: "javascript" | "css" | "xml";
  value: string;
  setEditorState: Dispatch<SetStateAction<string>>;
}

const CODEMIRROR_THEMES = [
  "mdn-like",
  "dracula",
  "material",
  "monokai",
  "the-matrix",
  "night",
];

const Editor = ({ language, value, setEditorState }: EditorProps) => {
  const [theme, setTheme] = useState("mdn-like");

  const handleChange = (editor: any, data: any, value: string) => {
    setEditorState(value);
  };

  return (
    <div className="pt-4">
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="cars">Choose a theme: </label>
        <select
          name="theme"
          onChange={(el) => {
            setTheme(el.target.value);
          }}
        >
          {CODEMIRROR_THEMES.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <code className="block italic font-thin text-sky-800 text-right">
        {language === "css" && "CSS"}
        {language === "xml" && "HTML"}
        {language === "javascript" && "JavaScript"}
      </code>

      <ControlledEditorComponent
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          theme,
        }}
      />
    </div>
  );
};

export default Editor;
