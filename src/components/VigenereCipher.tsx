
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { vigenereCipher, estimatePasswordStrength } from "@/utils/encryption";
import { saveMessage } from "@/utils/storage";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const VigenereCipher: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [keyword, setKeyword] = useState("");
  const [messageName, setMessageName] = useState("");
  const [keyStrength, setKeyStrength] = useState({ score: 0, timeToBreak: "", suggestions: [] });
  const { toast } = useToast();

  useEffect(() => {
    if (inputText && keyword) {
      handleEncrypt();
    }
    
    if (keyword) {
      setKeyStrength(estimatePasswordStrength(keyword));
    }
  }, [inputText, keyword]);

  const handleEncrypt = () => {
    if (!keyword) {
      toast({
        title: "Missing Keyword",
        description: "Please enter a keyword for encryption.",
        variant: "destructive",
      });
      return;
    }
    setOutputText(vigenereCipher(inputText, keyword, true));
  };

  const handleDecrypt = () => {
    if (!keyword) {
      toast({
        title: "Missing Keyword",
        description: "Please enter a keyword for decryption.",
        variant: "destructive",
      });
      return;
    }
    setOutputText(vigenereCipher(inputText, keyword, false));
  };

  const handleSaveMessage = () => {
    if (!inputText || !outputText || !keyword) {
      toast({
        title: "Cannot Save",
        description: "Please enter text and a keyword first.",
        variant: "destructive",
      });
      return;
    }

    const name = messageName.trim() || `Vigenere-${new Date().toLocaleString()}`;
    
    saveMessage({
      name,
      originalText: inputText,
      encryptedText: outputText,
      method: 'vigenere',
      key: keyword,
    });

    toast({
      title: "Message Saved",
      description: `Your message "${name}" has been saved.`,
    });
    
    setMessageName("");
  };

  const getStrengthColor = (score: number) => {
    if (score < 30) return "bg-red-500";
    if (score < 60) return "bg-yellow-500";
    if (score < 80) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Vigenère Cipher</CardTitle>
        <CardDescription>
          Use a keyword to encrypt your text with multiple shifts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="vigenere-input">Input Text</Label>
          <Textarea
            id="vigenere-input"
            placeholder="Enter text to encrypt or decrypt..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-32"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="vigenere-keyword">Keyword</Label>
          <Input
            id="vigenere-keyword"
            placeholder="Enter a keyword (e.g. 'SECRET')"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          
          {keyword && (
            <div className="mt-2">
              <div className="flex justify-between text-sm">
                <span>Key Strength</span>
                <span>{keyStrength.score}%</span>
              </div>
              <Progress 
                value={keyStrength.score} 
                className={`h-2 mt-1 ${getStrengthColor(keyStrength.score)}`} 
              />
              <div className="mt-1 text-sm text-muted-foreground">
                Estimated time to crack: {keyStrength.timeToBreak}
              </div>
              {keyStrength.suggestions.length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <details className="cursor-pointer">
                    <summary>Suggestions to improve key strength</summary>
                    <ul className="list-disc pl-5 mt-1">
                      {keyStrength.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </details>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleEncrypt} className="flex-1">
            Encrypt
          </Button>
          <Button onClick={handleDecrypt} className="flex-1">
            Decrypt
          </Button>
        </div>

        <div>
          <Label htmlFor="vigenere-output">Output Text</Label>
          <Textarea
            id="vigenere-output"
            value={outputText}
            readOnly
            className="h-32 code-font"
          />
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Name your message (optional)"
            value={messageName}
            onChange={(e) => setMessageName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSaveMessage}>Save Message</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VigenereCipher;
