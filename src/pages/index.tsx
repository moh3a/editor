import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import Button from "../components/Button";
import Editor from "../components/Editor";

type EDITOR_NAMES = "html" | "css" | "js";
const APP_TITLE = "code editor";

const Home: NextPage = () => {
  const [openedEditor, setOpenedEditor] = useState<EDITOR_NAMES>("html");

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const [srcDoc, setSrcDoc] = useState(` `);

  const onTabClick = (editorName: EDITOR_NAMES) => {
    setOpenedEditor(editorName);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
      );
    }, 250);
    return () => clearTimeout(timeOut);
  }, [html, css, js]);

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
      </Head>
      <div className="absolute w-full h-72 top-[15%] bg-sky-100 -skew-y-6 z-0" />
      <div className="w-screen h-screen max-w-full flex justify-center items-center ">
        <div className="w-[50%] z-10">
          <h1 className="font-mono text-center font-extrabold text-6xl text-sky-600">
            {APP_TITLE}
          </h1>
          <div className="flex justify-center">
            <Button title="HTML" onClick={() => onTabClick("html")} />
            <Button title="CSS" onClick={() => onTabClick("css")} />
            <Button title="JavaScript" onClick={() => onTabClick("js")} />
          </div>

          <div>
            {openedEditor === "html" ? (
              <Editor language="xml" value={html} setEditorState={setHtml} />
            ) : openedEditor === "css" ? (
              <Editor language="css" value={css} setEditorState={setCss} />
            ) : (
              <Editor language="javascript" value={js} setEditorState={setJs} />
            )}
          </div>
        </div>
      </div>
      <div className="w-full text-center text-sm font-mono text-sky-600 absolute bottom-2">
        scroll down for result
      </div>
      <div>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          className="w-full h-screen"
          frameBorder="1"
        />
      </div>
    </>
  );
};

export default Home;
