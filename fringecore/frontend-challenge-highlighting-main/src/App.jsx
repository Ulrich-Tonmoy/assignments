import { useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);
  const viewRef = useRef(null);
  const maxCharacters = 64;
  const hints = ["tomato", "tom cruise", "tetul", "technology"];
  const [matchingHints, setMatchingHints] = useState([]);

  const handleInputChange = () => {
    let content = inputRef.current.innerHTML;
    if (content.length > maxCharacters) {
      content = content.substring(0, maxCharacters);
    }

    content = content.split(/tomato+/);
    content = content.join('<span style="color: red;">tomato</span>');

    viewRef.current.innerHTML = content;

    let matching = [];
    if (!content.endsWith(" <br>"))
      matching = hints.filter((hint) =>
        hint
          .toLowerCase()
          .startsWith(
            content
              .split(" ")
              [content.split(" ").length - 1].split("<br>")[0]
              .toLowerCase(),
          ),
      );

    setMatchingHints(matching);

    moveCursorToEnd();
  };

  const moveCursorToEnd = () => {
    const range = document.createRange();
    range.selectNodeContents(inputRef.current);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="relative  w-2/5 h-12">
        <div
          className="absolute top-0 left-0 w-full h-full border-4 p-2 overflow-x-auto z-10 opacity-30"
          contentEditable
          ref={inputRef}
          onInput={handleInputChange}
        />
        <div
          className="absolute top-0 left-0 w-full h-full border-4 border-black p-2 overflow-x-auto"
          ref={viewRef}
        />
      </div>
      {matchingHints.length > 0 && (
        <div className="flex flex-col justify-center items-center shadow-2xl p-2">
          {matchingHints.map((el, i) => (
            <span key={i}>{el}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
