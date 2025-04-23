
// Types
export interface SavedMessage {
  id: string;
  name: string;
  originalText: string;
  encryptedText: string;
  method: 'caesar' | 'vigenere';
  key: string | number;
  timestamp: number;
}

const STORAGE_KEY = 'crypto-saved-messages';

// Get all saved messages
export const getSavedMessages = (): SavedMessage[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse saved messages:', e);
    return [];
  }
};

// Save a new message
export const saveMessage = (message: Omit<SavedMessage, 'id' | 'timestamp'>): SavedMessage => {
  const messages = getSavedMessages();
  
  const newMessage: SavedMessage = {
    ...message,
    id: generateId(),
    timestamp: Date.now()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...messages, newMessage]));
  return newMessage;
};

// Delete a saved message
export const deleteMessage = (id: string): void => {
  const messages = getSavedMessages();
  const filteredMessages = messages.filter(msg => msg.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMessages));
};

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
