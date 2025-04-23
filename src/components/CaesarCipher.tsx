
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { caesarCipher, autoCaesarDecrypt } from "@/utils/encryption";
import { saveMessage } from "@/utils/storage";
import { useToast } from "@/components/ui/use-toast";

const CaesarCipher: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [shift, setShift] = useState(3);
  const [messageName, setMessageName] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Update output when input or shift changes
    if (inputText) {
      handleEncrypt();
    }
  }, [inputText, shift]);

  const handleEncrypt = () => {
    setOutputText(caesarCipher(inputText, shift, true));
  };

  const handleDecrypt = () => {
    setOutputText(caesarCipher(inputText, shift, false));
  };

  const handleAutomaticDecrypt = () => {
    const result = autoCaesarDecrypt(inputText);
    setShift(result.shift);
    setOutputText(result.text);
    
    toast({
      title: "Auto-Decryption Complete",
      description: `Detected shift value: ${result.shift}`,
      duration: 3000,
    });
  };

  const handleSaveMessage = () => {
    if (!inputText || !outputText) {
      toast({
        title: "Cannot Save",
        description: "Please enter text to encrypt or decrypt first.",
        variant: "destructive",
      });
      return;
    }

    const name = messageName.trim() || `Caesar-${new Date().toLocaleString()}`;
    
    saveMessage({
      name,
      originalText: inputText,
      encryptedText: outputText,
      method: 'caesar',
      key: shift,
    });

    toast({
      title: "Message Saved",
      description: `Your message "${name}" has been saved.`,
    });
    
    setMessageName("");
  };

  const handleBruteForce = () => {
    // Generate all 25 possible shifts and display them
    const allShifts = Array.from({ length: 26 }, (_, i) => {
      const shiftValue = i;
      return {
        shift: shiftValue,
        text: caesarCipher(inputText, shiftValue, false)
      };
    });
    
    // Format the output as a readable list
    setOutputText(allShifts.map(item => 
      `Shift ${item.shift}: ${item.text.substring(0, 50)}${item.text.length > 50 ? '...' : ''}`
    ).join('\n\n'));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Caesar Cipher</CardTitle>
        <CardDescription>
          Shift each letter in your text by a fixed number of positions in the alphabet.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="caesar-input">Input Text</Label>
          <Textarea
            id="caesar-input"
            placeholder="Enter text to encrypt or decrypt..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-32"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="caesar-shift">Shift Value: {shift}</Label>
          </div>
          <Slider
            id="caesar-shift"
            min={0}
            max={25}
            step={1}
            value={[shift]}
            onValueChange={(value) => setShift(value[0])}
            className="w-full"
          />
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleEncrypt} className="flex-1">
            Encrypt
          </Button>
          <Button onClick={handleDecrypt} className="flex-1">
            Decrypt
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleAutomaticDecrypt} variant="outline" className="flex-1">
            Auto Decrypt
          </Button>
          <Button onClick={handleBruteForce} variant="outline" className="flex-1">
            Brute Force (All Shifts)
          </Button>
        </div>

        <div>
          <Label htmlFor="caesar-output">Output Text</Label>
          <Textarea
            id="caesar-output"
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

export default CaesarCipher;
