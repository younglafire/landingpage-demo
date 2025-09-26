import React, { useState } from "react";

interface Tool {
  id: string;
  title: string;
  videoUrl: string;
}

export default function StudyToolsDemo() {
  const tools: Tool[] = [
    {
      id: "code",
      title: "Code",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "plan",
      title: "Plan",
      videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ",
    },
    {
      id: "collaborate",
      title: "Collaborate",
      videoUrl: "https://www.youtube.com/embed/ysz5S6PUM-U",
    },
    {
      id: "automate",
      title: "Automate",
      videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
    },
    {
      id: "secure",
      title: "Secure",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    },
  ];

  const [activeTool, setActiveTool] = useState<Tool>(tools[0]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Video demo area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-gray-950 rounded-xl shadow-lg w-full max-w-5xl h-[500px] overflow-hidden">
          <iframe
            src={activeTool.videoUrl}
            title={activeTool.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-black/40 border-t border-gray-700 py-4 flex justify-center space-x-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool)}
            className={`px-5 py-2 rounded-full transition font-medium ${
              activeTool.id === tool.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {tool.title}
          </button>
        ))}
      </div>
    </div>
  );
}
