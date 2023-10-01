import React, { useState } from "react";

const TerminalComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setHistory([...history, `# ${input}`]);
      setInput("");
    }
  };

  return (
    <div style={{ backgroundColor: "#000", color: "#fff", padding: "10px", width: "100%", height: "100%" }}>
      <div>
        {history.map((line, index) => (
          <div key={index} style={{ fontSize: "120px" }}>{line}</div> // 入力後の文字列のサイズを設定
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "left" }}>
        <span style={{ flexShrink: 0 }}>#</span>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          style={{ backgroundColor: "#000", color: "#fff", border: "none", outline: "none", flex: 1 }}
        />
      </div>
    </div>
  );
};

export default TerminalComponent;
