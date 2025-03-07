import { useState } from "react";
import tweetImg from "@/assets/tweet2.png";

function InputCard({ placeholder, title, color = "blue" }) {
  const [text, setText] = useState("");

  const underlineColor =
    color === "blue"
      ? "text-blue-500 border-blue-500"
      : "text-green-500 border-green-500";

  return (
    <div className="flex flex-col last:border-r-0 border-r border-gray-800">
      <div className="p-2">
        <h1
          className={`font-bold text-base ${underlineColor} border-b-2 inline-block pb-0.5 px-2`}
        >
          {title}
        </h1>
      </div>
      <div className="p-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-white text-sm resize-none outline-none min-h-[80px]"
        />
      </div>
    </div>
  );
}

export default InputCard;
