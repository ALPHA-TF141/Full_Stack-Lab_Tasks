import React, { useState } from 'react';

const formatEventSummary = (event) => (
  `${event.name}: ${event.dateTime}, ${event.venue}, Rs.${event.price}, ${event.availableTickets} tickets left`
);

const findMentionedEvent = (text, events) => events.find((event) => {
  const eventName = event.name.toLowerCase();
  const eventWords = eventName.split(/\s+/);

  return text.includes(eventName) || eventWords.some((word) => word.length > 3 && text.includes(word));
});

const getBotReply = (question, selectedEvent, events) => {
  const text = question.toLowerCase();
  const event = findMentionedEvent(text, events) || selectedEvent;

  if (text.includes('all event') || text.includes('list event') || text.includes('browse') || text.includes('different event')) {
    return `Available events: ${events.map(formatEventSummary).join(' | ')}`;
  }

  if (text.includes('which event') || text.includes('what event')) {
    return `You can book ${events.map((availableEvent) => availableEvent.name).join(', ')}. Currently selected: ${selectedEvent.name}.`;
  }

  if (text.includes('price') || text.includes('cost') || text.includes('fee')) {
    return `${event.name} ticket price is Rs.${event.price}.`;
  }

  if (text.includes('ticket') || text.includes('available')) {
    return `${event.name} has ${event.availableTickets} tickets available out of ${event.totalTickets}.`;
  }

  if (text.includes('venue') || text.includes('where') || text.includes('map')) {
    return `${event.name} is at ${event.venue}. Check the venue map above for directions.`;
  }

  if (text.includes('time') || text.includes('date') || text.includes('when')) {
    return `${event.name} is scheduled for ${event.dateTime}.`;
  }

  if (text.includes('department')) {
    return `${event.name} is organized by ${event.department}.`;
  }

  if (text.includes('otp') || text.includes('verify')) {
    return 'Enter your email, click Send OTP, type the demo code shown on screen, and click Verify OTP.';
  }

  if (event && event !== selectedEvent) {
    return formatEventSummary(event);
  }

  return 'I can help with all events, ticket price, live availability, venue, date, department, and OTP verification.';
};

const Chatbot = ({ event, events }) => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me about any event, ticket price, live availability, venue, date, or OTP help.' }
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
      { from: 'bot', text: getBotReply(trimmedQuestion, event, events) }
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
          placeholder="Ask about AI Workshop tickets, all events, venue..."
          value={question}
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
};

export default Chatbot;
