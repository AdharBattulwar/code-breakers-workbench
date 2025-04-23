
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getLetterFrequency, englishLetterFrequency } from "@/utils/encryption";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from "recharts";

const FrequencyAnalysis: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [chartData, setChartData] = useState<Array<{name: string, frequency: number, english: number}>>([]);

  useEffect(() => {
    if (inputText) {
      analyzeFrequency();
    } else {
      setChartData([]);
    }
  }, [inputText]);

  const analyzeFrequency = () => {
    if (!inputText) return;

    const frequency = getLetterFrequency(inputText);
    const totalLetters = inputText.replace(/[^a-zA-Z]/g, "").length || 1;
    
    // Convert to percentage and format data for chart
    const data = Object.keys(frequency)
      .sort()
      .map(char => ({
        name: char,
        frequency: (frequency[char] / totalLetters) * 100,
        english: englishLetterFrequency[char] || 0
      }));

    setChartData(data);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Frequency Analysis</CardTitle>
        <CardDescription>
          Analyze letter frequency patterns to identify encryption methods and potential keys.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="frequency-input">Input Text for Analysis</Label>
          <Textarea
            id="frequency-input"
            placeholder="Enter text to analyze letter frequencies..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="h-32"
          />
        </div>

        {chartData.length > 0 && (
          <div className="h-[400px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis />
                <Tooltip formatter={(value: number) => value.toFixed(2) + '%'} />
                <Legend />
                <Bar dataKey="frequency" name="Current Text" fill="#0ea5e9" />
                <Bar dataKey="english" name="English Standard" fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {chartData.length > 0 && (
          <div className="text-sm text-muted-foreground">
            <p className="mt-2">
              <strong>Hint:</strong> In a Caesar cipher, the frequency distribution maintains the same shape but shifts along the x-axis.
              Look for patterns that match English letter frequency but are shifted.
            </p>
            <p className="mt-1">
              <strong>Common English letter frequencies:</strong> e (12%), t (9.1%), a (8.1%), o (7.7%), i (7.3%)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FrequencyAnalysis;
