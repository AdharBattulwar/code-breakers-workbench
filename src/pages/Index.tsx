
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaesarCipher from "@/components/CaesarCipher";
import VigenereCipher from "@/components/VigenereCipher";
import FrequencyAnalysis from "@/components/FrequencyAnalysis";
import SavedMessages from "@/components/SavedMessages";
import Header from "@/components/Header";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Multi-Layer Encryption Tool</h1>
          <p className="text-muted-foreground mb-6">
            Encrypt and decrypt messages using classical ciphers, analyze letter frequencies, 
            and explore cryptography techniques.
          </p>

          <Tabs defaultValue="caesar" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              <TabsTrigger value="caesar">Caesar Cipher</TabsTrigger>
              <TabsTrigger value="vigenere">Vigenère Cipher</TabsTrigger>
              <TabsTrigger value="frequency">Frequency Analysis</TabsTrigger>
              <TabsTrigger value="saved">Saved Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="caesar" className="animate-fade-in">
              <CaesarCipher />
            </TabsContent>

            <TabsContent value="vigenere" className="animate-fade-in">
              <VigenereCipher />
            </TabsContent>

            <TabsContent value="frequency" className="animate-fade-in">
              <FrequencyAnalysis />
            </TabsContent>

            <TabsContent value="saved" className="animate-fade-in">
              <SavedMessages />
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

export default Index;
