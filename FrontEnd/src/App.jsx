import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'

const App = () => {
  const [code, setCode] = useState(`function sum(a, b) { 
  return a + b; 
}`);
  const [review, setReview] = useState(``);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Failed to fetch review. Please try again.");
    }
  }

  return (
    <main className="w-screen h-screen bg-gray-400 overflow-hidden p-5">
      <div className="w-full h-full flex justify-between gap-2">
        {/* Left Section (Code Editor) */}
        <div className="left relative w-full h-full bg-gray-900 rounded-md flex flex-col">
          <div className="w-full h-full overflow-auto p-2">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={12}
              className="w-full h-full text-green-400 text-sm font-mono bg-gray-900 focus:outline-none"
            />
          </div>
          <button
            className="absolute bottom-4 right-4 text-white bg-gray-500 px-6 py-2 rounded-md cursor-pointer hover:bg-gray-400"
            onClick={reviewCode}
          >
            Review
          </button>
        </div>

        {/* Right Section (Review) */}
        <div className="right w-full h-full bg-gray-800 rounded-lg p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-2 text-white">Code Review</h2>
          <div className="text-sm text-white whitespace-pre-line">
            <Markdown
            rehypePlugins={[rehypeHighlight]}
            >{review}</Markdown>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
