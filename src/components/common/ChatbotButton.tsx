import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { askGECBot, pollStatus } from '../../utils/gecBotService';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../main.tsx'; // Assuming main.tsx exports db
import { useAuth } from '../../contexts/AuthContext.tsx';

export const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [threadId, setThreadId] = useState<string>();
  const { user } = useAuth();

  const sendMessage = async () => {
    if (!input.trim() || !user) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    let currentThreadId = threadId;
    if (!currentThreadId) {
        // Try to fetch existing threadId from Firestore
        const threadDocRef = doc(db, 'chatThreads', user.uid);
        const threadDoc = await getDoc(threadDocRef);
        if (threadDoc.exists()) {
            currentThreadId = threadDoc.data().threadId;
        }
    }

    const result = await askGECBot(input, currentThreadId);
    if (result.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
        return;
    }
    const { threadId: newThreadId, runId } = result;
    setThreadId(newThreadId);
    
    // Persist new threadId
    if (!currentThreadId) {
        await setDoc(doc(db, 'chatThreads', user.uid), {
            threadId: newThreadId,
            userId: user.uid,
            createdAt: new Date().toISOString()
        });
    }

    if (runId) {
        const interval = setInterval(async () => {
            const status = await pollStatus(newThreadId, runId);
            if (status.status === 'completed') {
                clearInterval(interval);
                setMessages(prev => [...prev, { role: 'assistant', content: status.messages[0].content[0].text.value }]);
            }
        }, 2000);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all z-50"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-slate-200">
          <div className="p-4 border-b flex justify-between items-center bg-indigo-50">
            <h3 className="font-semibold text-indigo-900">GEC Campus Assistant</h3>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((m, i) => (
                <div key={i} className={`p-2 my-2 rounded ${m.role === 'user' ? 'bg-indigo-100 text-right' : 'bg-slate-100 text-left'}`}>
                    {m.content}
                </div>
            ))}
          </div>
          <div className="p-4 border-t flex">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 border rounded-l px-3 py-2" />
            <button onClick={sendMessage} className="bg-indigo-600 text-white px-4 py-2 rounded-r"><Send size={18} /></button>
          </div>
        </div>
      )}
    </>
  );
};
