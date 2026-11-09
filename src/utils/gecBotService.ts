
export async function askGECBot(message: string, threadId?: string) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, threadId }),
  });
  return response.json();
}

export async function pollStatus(threadId: string, runId: string) {
  const response = await fetch('/api/chat/status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ threadId, runId }),
  });
  return response.json();
}
