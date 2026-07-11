import ChatInterface from '@/components/chat/ChatInterface'

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-100 bg-white">
        <h1 className="font-semibold text-gray-900">Ask AI</h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Grounded answers from IT Act 2025 · Form 3CD · ICAI Standards · GST
        </p>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  )
}
