import { useState } from "react";

interface ChatResponse {
  answer: string;
  context: Array<{
    content: string;
    source: string;
  }>;
}

export function Chat() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: question }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 p-2 border border-gray-300 rounded"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Thinking..." : "Ask"}
          </button>
        </div>
      </form>

      {response && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold mb-2">Answer:</h3>
            <p>{response.answer}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="font-bold mb-2">Context:</h3>
            <div className="space-y-2">
              {response.context.map((ctx, index) => (
                <div key={index} className="border-l-2 border-gray-300 pl-3">
                  <p className="text-sm">{ctx.content}</p>
                  <p className="text-xs text-gray-500">{ctx.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
