
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { saveMessage } from "@/utils/storage";

const AtbashCipher: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [messageName, setMessageName] = useState("");
  const { toast } = useToast();

  const atbashCipher = (text: string): string => {
    return text
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) { // Uppercase letters
          return String.fromCharCode(90 - (code - 65));
        } else if (code >= 97 && code <= 122) { // Lowercase letters
          return String.fromCharCode(122 - (code - 97));
        }
        return char;
      })
      .join("");
  };

  useEffect(() => {
    if (inputText) {
      setOutputText(atbashCipher(inputText));
    }
  }, [inputText]);

  const handleSaveMessage = () => {
    if (!inputText || !outputText) {
      toast({
        title: "Cannot Save",
        description: "Please enter text to encrypt first.",
        variant: "destructive",
      });
      return;
    }

    const name = messageName.trim() || `Atbash-${new Date().toLocaleString()}`;
    
    saveMessage({
      name,
      originalText: inputText,
      encryptedText: outputText,
      method: 'caesar',
      key: 'atbash',
    });

    toast({
      title: "Message Saved",
      description: `Your message "${name}" has been saved.`,
    });
    
    setMessageName("");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Atbash Cipher</CardTitle>
        <CardDescription>
          The Atbash cipher is a substitution cipher where each letter is mapped to its reverse in the alphabet (A↔Z, B↔Y, etc.).
          This ancient cipher was originally used for encoding Hebrew text.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="atbash-input">Input Text</Label>
          <Textarea
            id="atbash-input"
            placeholder="Enter text to encrypt or decrypt..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-32"
          />
        </div>

        <div>
          <Label htmlFor="atbash-output">Output Text</Label>
          <Textarea
            id="atbash-output"
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

export default AtbashCipher;
