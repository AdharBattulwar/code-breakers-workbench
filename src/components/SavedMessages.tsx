
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SavedMessage, getSavedMessages, deleteMessage } from "@/utils/storage";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const SavedMessages: React.FC = () => {
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<SavedMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    const savedMessages = getSavedMessages();
    setMessages(savedMessages.sort((a, b) => b.timestamp - a.timestamp));
  };

  const handleDelete = (id: string) => {
    deleteMessage(id);
    loadMessages();
    
    toast({
      title: "Message Deleted",
      description: "The saved message has been removed.",
    });
  };

  const handleViewMessage = (message: SavedMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "Copied to clipboard",
          description: `The ${type} has been copied to your clipboard.`,
          duration: 2000,
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Saved Messages</CardTitle>
          <CardDescription>
            Your encrypted and decrypted messages are stored here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No saved messages yet. Encrypt or decrypt a message and save it to see it here.
            </div>
          ) : (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <Card key={msg.id} className="p-4 transition-shadow hover:shadow-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{msg.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                        <p className="text-sm mt-1">
                          Method: {msg.method === 'caesar' 
                            ? `Caesar (Shift: ${msg.key})` 
                            : `Vigenère (Key: ${msg.key})`}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewMessage(msg)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(msg.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedMessage && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.name}</DialogTitle>
              <DialogDescription>
                {selectedMessage.method === 'caesar' 
                  ? `Caesar cipher with shift value: ${selectedMessage.key}` 
                  : `Vigenère cipher with key: ${selectedMessage.key}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center justify-between">
                  Original Text 
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCopyToClipboard(selectedMessage.originalText, "original text")}
                  >
                    Copy
                  </Button>
                </h3>
                <div className="border rounded p-3 bg-muted/30 whitespace-pre-wrap code-font">
                  {selectedMessage.originalText}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center justify-between">
                  Encrypted/Decrypted Text
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleCopyToClipboard(selectedMessage.encryptedText, "processed text")}
                  >
                    Copy
                  </Button>
                </h3>
                <div className="border rounded p-3 bg-muted/30 whitespace-pre-wrap code-font">
                  {selectedMessage.encryptedText}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground text-right">
                Saved on {new Date(selectedMessage.timestamp).toLocaleString()}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};

export default SavedMessages;
