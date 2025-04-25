
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import AtbashCipher from "@/components/AtbashCipher";
import ROT13Cipher from "@/components/ROT13Cipher";

const Historical: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Historical Ciphers</h1>
          <p className="text-muted-foreground mb-6">
            Explore classical encryption methods that shaped the history of cryptography.
          </p>

          <Tabs defaultValue="atbash" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="atbash">Atbash Cipher</TabsTrigger>
              <TabsTrigger value="rot13">ROT13 Cipher</TabsTrigger>
            </TabsList>

            <TabsContent value="atbash" className="animate-fade-in">
              <AtbashCipher />
            </TabsContent>

            <TabsContent value="rot13" className="animate-fade-in">
              <ROT13Cipher />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <footer className="bg-muted/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Code Breakers Workbench — A multi-layer encryption tool for education and security</p>
          <p className="mt-1">© {new Date().getFullYear()}Project By Adhar Battulwar</p>
        </div>
      </footer>
    </div>
  );
};

export default Historical;
