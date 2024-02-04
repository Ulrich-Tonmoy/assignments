const weirdExpressions = [
  "a othoba b",
  "b ebong c othoba d",
  "ebong ebong othoba othoba ebong",
  "((ebong) othoba ebong) ebong othoba",
  "(ebong othoba (ebong ebong ((othoba)othoba(ebong))))",
  "ebong",
];

for (const expression of weirdExpressions) {
  const javascriptExpression = convertToJS(expression);
  console.log(javascriptExpression);
}

function convertToJS(txt) {
  let tokens = txt.split(" ");

  for (let i = 0; i < tokens.length; i++) {
    if (i > 0) {
      if (
        (tokens[i] === "ebong" || tokens[i] === "othoba") &&
        tokens[i + 1] !== "&&" &&
        tokens[i + 1] !== "||" &&
        tokens[i - 1] !== "&&" &&
        tokens[i - 1] !== "||"
      ) {
        tokens[i] = tokens[i] === "ebong" ? "&&" : "||";
      } else if (tokens[i].includes("(") || tokens[i].includes(")")) {
        let temp = tokens[i].split(/(\(|\))/);

        for (let j = 0; j < temp.length; j++) {
          if (
            (temp[j] === "ebong" || temp[j] === "othoba") &&
            temp[j + 1] === "(" &&
            temp[j - 1] === ")"
          ) {
            temp[j] = temp[j] === "ebong" ? " && " : " || ";
          }
        }
        tokens[i] = temp.join("");
      }
    }
  }

  return tokens.join(" ");
}
