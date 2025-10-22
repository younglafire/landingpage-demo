# Study VHU Chatbot

An intelligent chatbot widget for the Study VHU landing page that helps visitors learn about the platform's features, study tools, AI tools, and materials.

## Overview

The chatbot is a custom-built React component that provides instant answers to questions about Study VHU. It uses pattern matching to understand user queries and respond with relevant information about the platform.

## Features

- **Floating Widget**: Non-intrusive chat button that expands into a full chat interface
- **Quick Actions**: Pre-defined question buttons for common queries
- **Pattern Matching**: Intelligent response system based on keywords
- **Smooth Animations**: Built with Framer Motion for delightful interactions
- **Vietnamese Language**: Fully localized for Vietnamese users
- **Registration Integration**: Can trigger the registration form when asked about signing up
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Knowledge Base

The chatbot can answer questions about:

### 1. Study Tools (Công cụ học tập)
- **Pomodoro Timer**: Focus sessions and break management
- **Smart Notes**: Cloud-synced note-taking
- **Schedule**: Academic planning and reminders
- **Analytics**: Learning progress tracking

### 2. AI Tools (Công cụ AI)
- ChatGPT - General AI assistant
- Grammarly - English grammar checker
- Wolfram Alpha - Math and science solver
- Notion AI - Note and project management
- QuillBot - Paraphrasing and summarization
- Photomath - Math problem solver

### 3. Study Materials (Tài liệu học tập)
- Computer Science - 156 resources
- Mathematics & Statistics - 234 resources
- Economics & Management - 189 resources
- Science & Engineering - 298 resources
- Languages & Literature - 167 resources
- Medicine & Health - 203 resources

### 4. Registration (Đăng ký)
- How to sign up
- Account requirements
- Platform benefits

### 5. General Information
- Platform features
- Benefits for students
- Pricing (free platform)
- Contact information

## Usage

The chatbot is integrated into the main App component:

```tsx
import { Chatbot } from './components/Chatbot/Chatbot';

function App() {
  const handleRegisterNow = () => {
    setShowRegistrationModal(true);
  };
  
  return (
    <div>
      {/* Your app content */}
      <Chatbot onRegisterClick={handleRegisterNow} />
    </div>
  );
}
```

## Component Props

```typescript
interface ChatbotProps {
  onRegisterClick?: () => void;  // Optional callback to open registration form
}
```

## Customization

### Adding New Responses

To add new responses to the chatbot, edit the `getResponse()` function in `Chatbot.tsx`:

```typescript
const getResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  // Add your new pattern matching here
  if (lowerMessage.includes('your keyword')) {
    return 'Your response here';
  }

  // ... rest of the patterns
};
```

### Modifying Quick Actions

Update the `quickActions` array to change the quick action buttons:

```typescript
const quickActions = [
  { label: '📚 Your Label', action: 'Your question text' },
  // Add more quick actions
];
```

### Styling

The chatbot uses Tailwind CSS classes. You can modify the styling by editing the className props in the component. The chatbot matches the landing page's purple/blue gradient theme.

## Example Queries

Users can ask questions like:

**Vietnamese:**
- "Công cụ học tập là gì?" - What are the study tools?
- "Tài liệu có gì?" - What study materials are available?
- "Làm sao để đăng ký?" - How do I register?
- "Công cụ AI có gì?" - What AI tools are there?
- "Có miễn phí không?" - Is it free?
- "Pomodoro là gì?" - What is Pomodoro?

**English:**
- "hello" - Greeting
- "help" - Get help topics
- "contact" - Contact information

## Technical Details

### Dependencies
- React 18
- TypeScript
- Framer Motion (animations)
- Lucide React (icons)

### State Management
The component uses React hooks for state management:
- `isOpen`: Controls chat window visibility
- `messages`: Array of conversation messages
- `inputText`: Current input field value
- `isTyping`: Shows typing indicator

### Animation
Uses Framer Motion for:
- Chat button entrance/exit
- Chat window open/close
- Message animations
- Typing indicator

## Future Enhancements

Potential improvements for future versions:

1. **AI Integration**: Connect to a real AI service (OpenAI API, etc.)
2. **Multi-language**: Add English language support
3. **Voice Input**: Allow voice questions
4. **History**: Save conversation history
5. **Analytics**: Track common questions
6. **Learning**: Improve responses based on user feedback
7. **Rich Media**: Support images and videos in responses
8. **Export**: Allow users to export conversation

## Accessibility

- Keyboard navigation support
- Enter key to send messages
- Focus management when opening/closing
- ARIA labels for screen readers

## Performance

- Lightweight component (~16KB)
- No external API calls
- Instant responses
- Smooth 60fps animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Part of the Study VHU platform. All rights reserved.

## Support

For questions or issues with the chatbot, please contact the development team or refer to the main project documentation.

---

**Note for Beginners**: This is a pattern-matching chatbot, which means it looks for specific keywords in user questions to provide predefined answers. It doesn't use real AI or machine learning. To make it "smarter," you would need to integrate with an AI service like OpenAI's GPT API, but that would require API keys and may have costs associated with it.
