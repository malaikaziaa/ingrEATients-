import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = async () => {
  if (inputMessage.trim() !== '') {
    setMessages(prevMessages => [...prevMessages, { text: inputMessage, sender: 'user' }]);
    setInputMessage('');

    try {
      const response = await fetch('https://api.spoonacular.com/food/converse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputMessage,
          apiKey: 'YOUR_SPOONACULAR_API_KEY',
          // Add any additional parameters required by the API
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessages(prevMessages => [...prevMessages, { text: result.answer, sender: 'bot' }]);
      } else {
        throw new Error('Failed to fetch chatbot response');
      }
    } catch (error) {
      console.error(error);
      // Handle error scenarios here
    }
  }
};


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              {
                alignSelf: message.sender === 'bot' ? 'flex-start' : 'flex-end',
                backgroundColor: message.sender === 'bot' ? '#F0F0F0' : '#DCF8C6',
              },
            ]}
          >
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  messagesContainer: {
    flexGrow: 1,
  },
  message: {
    maxWidth: '70%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default ChatbotScreen;
