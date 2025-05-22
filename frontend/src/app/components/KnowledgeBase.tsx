"use client";

export default function KnowledgeBase() {
  return (
    <div style={{height: '80vh', width: '100%', border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', marginTop: 24}}>
      <iframe
        src="https://your-outline-instance.com" // TODO: Replace with your Outline URL
        style={{width: '100%', height: '100%', border: 'none'}}
        title="Outline Knowledge Base"
      />
    </div>
  );
}
