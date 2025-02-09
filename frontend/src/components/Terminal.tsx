import { useState, useEffect, useCallback, KeyboardEvent, useRef } from "react";
import StarryBackground from "./StarryBackground";

interface Message {
  type: "user" | "assistant";
  content: string;
  context?: Array<{
    content: string;
    source: string;
  }>;
}

const Terminal = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setCursorPosition(0);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        type: "assistant",
        content: data.answer,
        context: data.context,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        type: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === "Backspace" && input === "") {
        e.preventDefault();
      }
    },
    [input]
  );

  const handleFocus = () => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  const handleClick = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  const handleMobileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    setInput(newInput);
    setCursorPosition(newInput.length);
  };

  return (
    <>
      <StarryBackground />
      <div
        ref={terminalRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onClick={handleClick}
        className="fixed inset-0 flex flex-col items-start justify-start p-4 outline-none overflow-auto"
        style={{ zIndex: 10 }}
      >
        <div className="font-mono text-base sm:text-xl w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] mx-auto space-y-6">
          {/* Welcome Message */}
          <div className="text-white opacity-70 animate-pulse">
            ☠ CONNECTED TO THE BONE MACHINE 🦴
          </div>

          {/* Messages */}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded ${
                message.type === "user"
                  ? "bg-purple-900/20 text-purple-200"
                  : "bg-blue-900/20 text-cyan-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xs opacity-50">
                  {message.type === "user" ? "YOU" : "BONEMAN"}
                </span>
                <span className="flex-1 border-b border-current opacity-10" />
              </div>
              <div className="mt-2 whitespace-pre-wrap">{message.content}</div>
              {message.context && (
                <div className="mt-2 space-y-2">
                  {message.context.map((ctx, idx) => (
                    <div
                      key={idx}
                      className="text-xs opacity-50 italic border-l-2 border-current pl-2"
                    >
                      <div>{ctx.content}</div>
                      <div className="text-xs opacity-75">{ctx.source}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center space-x-2 text-cyan-200">
              <span className="animate-pulse">Processing</span>
              <span className="animate-[pulse_1s_ease-in-out_infinite]">.</span>
              <span className="animate-[pulse_1s_ease-in-out_0.2s_infinite]">
                .
              </span>
              <span className="animate-[pulse_1s_ease-in-out_0.4s_infinite]">
                .
              </span>
            </div>
          )}

          {/* Input line */}
          <div className="flex">
            <span className="mr-2 text-white opacity-70 shrink-0">{">"}</span>
            <div className="relative min-w-[20px] break-words flex-1">
              <span className="text-white whitespace-pre-wrap">
                {input || " "}
              </span>
              {showCursor && (
                <span
                  className="absolute w-[2px] h-5 sm:h-6 bg-white animate-pulse"
                  style={{
                    left: input ? `${cursorPosition * 0.6}em` : 0,
                    top: "1px",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Hidden input for mobile keyboard */}
        <input
          ref={hiddenInputRef}
          type="text"
          value={input}
          onChange={handleMobileInput}
          className="opacity-0 absolute left-0 top-0 w-px h-px"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
        />

        {/* Invisible div for scrolling */}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default Terminal;
