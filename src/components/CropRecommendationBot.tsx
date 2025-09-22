import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Leaf, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ApiService from '@/services/api';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface CropRecommendationBotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CropRecommendationBot = ({ open, onOpenChange }: CropRecommendationBotProps) => {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('cropBot.welcomeMessage'),
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open) {
      // Focus input when dialog opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Get current language from i18n
      const currentLang = i18n.language || 'en';
      
      // Send message to AI API
      const response = await ApiService.sendChatMessage(
        inputMessage,
        'crop-recommendation',
        currentLang
      );

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to placeholder response
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: t('cropBot.placeholderResponse'),
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    t('cropBot.question1'),
    t('cropBot.question2'),
    t('cropBot.question3'),
    "Get smart crop recommendation based on my location and weather"
  ];

  const handleSuggestedQuestion = (question: string) => {
    if (question.includes("Get smart crop recommendation")) {
      // Handle smart recommendation directly
      getSmartRecommendation();
    } else {
      setInputMessage(question);
      inputRef.current?.focus();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: t('cropBot.welcomeMessage'),
        role: 'assistant',
        timestamp: new Date()
      }
    ]);
  };

  const getSmartRecommendation = async () => {
    setIsTyping(true);
    
    try {
      // Get current location and weather data
      const location = await ApiService.getLocation();
      const weatherData = await ApiService.getWeather(location.lat, location.lon);
      const soilData = await ApiService.getSoilData();
      
      // Get AI-powered crop recommendation
      const recommendation = await ApiService.getCropRecommendation(soilData, weatherData, location);
      
      const recommendationMessage: Message = {
        id: Date.now().toString(),
        content: recommendation.recommendation,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, recommendationMessage]);
    } catch (error) {
      console.error('Error getting smart recommendation:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: 'Sorry, I could not get the crop recommendation at this time. Please try again later.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-lg">{t('cropBot.title')}</DialogTitle>
              <p className="text-sm text-muted-foreground">{t('cropBot.subtitle')}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearChat}
              className="text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 px-6">
            <div className="py-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="w-4 h-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="bg-secondary">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 mt-1">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="w-4 h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggested Questions (only show if no user messages yet) */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground px-1">{t('cropBot.suggestedQuestions')}</p>
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-left h-auto p-3 justify-start whitespace-normal"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      <span className="text-sm">{question}</span>
                    </Button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('cropBot.inputPlaceholder')}
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {t('cropBot.disclaimer')}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CropRecommendationBot;