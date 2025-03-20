import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';

const GrowthMantraAI = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      text: "Hello! I'm Growth Mantra AI, your wellness companion. I can help you with mental health, nutrition, and fitness. What would you like guidance on today?"
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // CSS styles
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '80vh',
      maxWidth: '800px', // Wider layout
      margin: '20px auto', // Centered with some margin
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      background: '#f5f5f5'
    },
    header: {
      background: '#4CAF50',
      color: 'white',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center' // Center header content
    },
    headerIcon: {
      marginRight: '10px'
    },
    headerTitle: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: 0
    },
    messagesContainer: {
      flexGrow: 1,
      padding: '16px',
      overflowY: 'auto',
      background: 'white',
      scrollBehavior: 'smooth' // Smooth scrolling
    },
    messageRow: {
      marginBottom: '16px',
      display: 'flex'
    },
    messageUser: {
      justifyContent: 'flex-end'
    },
    messageBot: {
      justifyContent: 'flex-start'
    },
    messageBubble: {
      padding: '12px 16px',
      borderRadius: '18px',
      maxWidth: '70%', // Adjusted for wider layout
      wordBreak: 'break-word',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' // Subtle shadow for bubbles
    },
    userBubble: {
      background: '#4CAF50',
      color: 'white',
      borderBottomRightRadius: '4px'
    },
    botBubble: {
      background: '#ECECEC',
      color: '#333333',
      borderBottomLeftRadius: '4px'
    },
    inputArea: {
      display: 'flex',
      padding: '16px',
      borderTop: '1px solid #ddd',
      background: 'white'
    },
    textInput: {
      flexGrow: 1,
      padding: '12px 16px',
      border: '1px solid #ccc',
      borderRadius: '24px',
      fontSize: '16px',
      marginRight: '8px',
      outline: 'none',
      transition: 'border-color 0.3s'
    },
    textInputFocus: {
      borderColor: '#4CAF50' // Highlight input on focus
    },
    sendButton: {
      background: '#4CAF50',
      color: 'white',
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'background 0.3s'
    },
    sendButtonHover: {
      background: '#45a049' // Darker green on hover
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle bot responses
  const getBotResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // Mental health responses
    if (lowerCaseMessage.includes('stress') || lowerCaseMessage.includes('anxious') || lowerCaseMessage.includes('anxiety')) {
      return "Managing stress and anxiety is important. Try deep breathing exercises - inhale for 4 counts, hold for 4, and exhale for 6. Also consider mindfulness meditation for 10 minutes daily. Regular exercise and adequate sleep can also significantly reduce stress levels.";
    }
    
    if (lowerCaseMessage.includes('depress') || lowerCaseMessage.includes('sad') || lowerCaseMessage.includes('mood')) {
      return "I'm sorry you're feeling this way. Regular physical activity can help boost mood through releasing endorphins. Try to maintain social connections and consider speaking with a mental health professional. Establishing a routine and setting small, achievable goals can also help improve your outlook.";
    }
    
    if (lowerCaseMessage.includes('sleep') || lowerCaseMessage.includes('insomnia')) {
      return "Quality sleep is crucial for mental and physical health. Try to maintain a consistent sleep schedule, avoid screens an hour before bed, keep your bedroom cool and dark, and consider relaxation techniques like progressive muscle relaxation before sleep.";
    }

    // Nutrition responses
    if (lowerCaseMessage.includes('eat') || lowerCaseMessage.includes('diet') || lowerCaseMessage.includes('nutrition')) {
      return "A balanced diet includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Try to limit processed foods, excessive sugar, and salt. Stay hydrated by drinking plenty of water throughout the day. Consider planning your meals in advance to make healthier choices easier.";
    }
    
    if (lowerCaseMessage.includes('weight loss') || lowerCaseMessage.includes('lose weight')) {
      return "Sustainable weight loss comes from a combination of balanced nutrition and regular physical activity. Focus on creating a small calorie deficit through healthier food choices and portion control. Incorporate both cardio and strength training exercises. Remember, slow and steady progress is more sustainable than rapid weight loss.";
    }

    // Fitness responses
    if (lowerCaseMessage.includes('workout') || lowerCaseMessage.includes('exercise') || lowerCaseMessage.includes('fitness')) {
      return "A well-rounded fitness routine includes cardiovascular exercise (like walking, running, or cycling), strength training, and flexibility work. Aim for at least 150 minutes of moderate activity per week. Remember to start gradually if you're new to exercise, and always warm up before and cool down after your workouts.";
    }
    
    if (lowerCaseMessage.includes('muscle') || lowerCaseMessage.includes('strength')) {
      return "Building strength requires progressive overload through resistance training. Include compound exercises like squats, deadlifts, push-ups, and rows. Ensure adequate protein intake (about 1.6-2.2g per kg of bodyweight) and allow muscles time to recover between workouts.";
    }

    // General wellness responses
    if (lowerCaseMessage.includes('habit') || lowerCaseMessage.includes('routine')) {
      return "Building healthy habits takes time. Start small, be consistent, and link new habits to existing routines. Focus on one habit at a time, and celebrate small wins. Remember that occasional setbacks are normal in the process of building lasting change.";
    }
    
    // Default response
    return "I'm here to help with mental health, nutrition, and fitness questions. Could you provide more details about what specific area you'd like guidance on?";
  };

  // Handle sending a new message
  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: input
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    
    // Simulate bot thinking and responding
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        sender: 'bot',
        text: getBotResponse(input)
      };
      setMessages(prev => [...prev, botResponse]);
    }, 600);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <MessageSquare style={styles.headerIcon} size={24} />
        <h1 style={styles.headerTitle}>Growth Mantra AI</h1>
      </div>
      
      {/* Messages container */}
      <div style={styles.messagesContainer}>
        {messages.map((message) => (
          <div 
            key={message.id} 
            style={{
              ...styles.messageRow,
              ...(message.sender === 'user' ? styles.messageUser : styles.messageBot)
            }}
          >
            <div 
              style={{
                ...styles.messageBubble,
                ...(message.sender === 'user' ? styles.userBubble : styles.botBubble)
              }}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSend} style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about mental health, nutrition, or fitness..."
          style={{
            ...styles.textInput,
            ...(input && styles.textInputFocus) // Highlight input when typing
          }}
        />
        <button 
          type="submit" 
          style={{
            ...styles.sendButton,
            ...(input && styles.sendButtonHover) // Darker green when input is active
          }}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default GrowthMantraAI;