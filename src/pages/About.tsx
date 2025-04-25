
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-2">About Code Breakers Workbench</h1>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Learn about classical encryption techniques, cryptanalysis methods, and the 
          security principles behind them.
        </p>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Caesar Cipher</h2>
              <p className="mb-2">
                The Caesar cipher is one of the earliest and simplest encryption techniques. 
                It works by replacing each letter in the plaintext by a letter some fixed number 
                of positions down the alphabet.
              </p>
              <p className="mb-2">
                For example, with a shift of 1, A would be replaced by B, B would become C, and so on.
              </p>
              <p>
                While very simple to break in modern times, the Caesar cipher was historically 
                significant and is still used as an educational tool today.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Vigenère Cipher</h2>
              <p className="mb-2">
                The Vigenère cipher is a method of encrypting alphabetic text by using a simple form 
                of polyalphabetic substitution. It uses a keyword to determine different shift values 
                for different parts of the message.
              </p>
              <p className="mb-2">
                This cipher is significantly more secure than the Caesar cipher, as it's resistant 
                to simple frequency analysis attacks.
              </p>
              <p>
                The Vigenère cipher remained unbroken for three centuries, earning it the nickname 
                "le chiffre indéchiffrable" (the indecipherable cipher).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Frequency Analysis</h2>
              <p className="mb-2">
                Frequency analysis is the study of the frequency of letters or groups of letters 
                in ciphertext. It's based on the fact that in any language, certain letters and 
                combinations of letters occur with predictable frequencies.
              </p>
              <p className="mb-2">
                In English, 'E' is the most common letter, followed by 'T', 'A', 'O', and 'I'.
              </p>
              <p>
                This tool helps identify patterns in encrypted text that might reveal the 
                encryption method used or even help crack the code.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Modern Cryptography</h2>
              <p className="mb-2">
                Modern cryptography uses advanced mathematical algorithms that are significantly 
                more complex than classical ciphers. These include symmetric-key cryptography, 
                public-key cryptography, and cryptographic hash functions.
              </p>
              <p className="mb-2">
                Unlike classical ciphers, modern encryption methods are designed to be 
                computationally secure, meaning they can't be broken through brute force 
                within a reasonable timeframe with current computing technology.
              </p>
              <p>
                This tool focuses on classical techniques for educational purposes but acknowledges 
                that these methods are not suitable for real security needs today.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-2">Educational Purpose</h3>
          <p className="mb-3">
            This tool is designed for educational purposes to demonstrate principles of 
            cryptography and cryptanalysis. It helps users understand:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>How encryption transforms plaintext into ciphertext</li>
            <li>Why some encryption methods are more secure than others</li>
            <li>How cryptanalysis techniques can be used to break codes</li>
            <li>The importance of key strength and management</li>
            <li>The evolution of encryption from classical to modern methods</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground italic">
            Note: For actual sensitive data, always use modern, standardized encryption 
            algorithms implemented by security experts.
          </p>
        </div>
      </main>
      <footer className="bg-muted/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Code Breakers Workbench — A multi-layer encryption tool for education and security</p>
          <p className="mt-1">© {new Date().getFullYear()} Project By Adhar Battulwar</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
