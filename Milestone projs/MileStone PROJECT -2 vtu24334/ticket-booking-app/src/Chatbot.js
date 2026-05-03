import React, { useState } from 'react';

const getBotReply = (question, event) => {
  const text = question.toLowerCase();

  if (text.includes('price') || text.includes('cost') || text.includes('fee')) {
    return `Each ticket costs Rs.${event.price}.`;
  }

  if (text.includes('ticket') || text.includes('available')) {
    return `${event.availableTickets} tickets are currently available.`;
  }

  if (text.includes('venue') || text.includes('where') || text.includes('map')) {
    return `The event is at ${event.venue}. Check the venue map above for directions.`;
  }

  if (text.includes('time') || text.includes('date') || text.includes('when')) {
    return `${event.name} is scheduled for ${event.dateTime}.`;
  }

  if (text.includes('otp') || text.includes('verify')) {
    return 'Enter your email, click Send OTP, type the demo code shown on screen, and click Verify OTP.';
  }

  return 'I can help with ticket price, availability, venue, date, and OTP verification.';
};

const Chatbot = ({ event }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me about ticket price, availability, venue, or OTP help.' }
  ]);
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { from: 'user', text: trimmedQuestion },
      { from: 'bot', text: getBotReply(trimmedQuestion, event) }
    ]);
    setQuestion('');
  };

  return (
    <div className="advanced-panel chatbot">
      <h2>Event Chatbot</h2>
      <div className="chat-window">
        {messages.map((message, index) => (
          <p key={`${message.from}-${index}`} className={`chat-message ${message.from}`}>
            <strong>{message.from === 'bot' ? 'Bot' : 'You'}:</strong> {message.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          aria-label="Ask chatbot"
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about price, venue, tickets..."
          value={question}
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
};

export default Chatbot;
