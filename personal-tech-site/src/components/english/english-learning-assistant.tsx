"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function EnglishLearningAssistant() {
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    grammar: { point: string; explanation: string }[];
    vocabulary: { word: string; explanation: string; example: string }[];
    improvement: string;
    exercises: { question: string; hint: string }[];
  }>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // 模拟API调用
    setTimeout(() => {
      setResult({
        grammar: [
          {
            point: "时态使用",
            explanation: "你在这段文字中混用了过去时和现在时。保持时态一致能让表达更清晰。"
          },
          {
            point: "冠词使用",
            explanation: "注意特定名词前的定冠词'the'的使用。"
          }
        ],
        vocabulary: [
          {
            word: "accomplish",
            explanation: "完成，实现（某事物）",
            example: "She accomplished her goal of running a marathon."
          },
          {
            word: "perspective",
            explanation: "观点，看法",
            example: "From my perspective, this is the right decision."
          }
        ],
        improvement: "整体来说，你的表达已经很清晰。建议使用更多连接词来增强段落的连贯性，比如however, therefore, moreover等。",
        exercises: [
          {
            question: "重写以下句子，使用正确的时态: 'Yesterday I go to the store and bought some milk.'",
            hint: "注意动词'go'的过去时形式。"
          },
          {
            question: "在下面的句子中添加适当的冠词: 'I saw ____ movie last night about ____ French Revolution.'",
            hint: "考虑什么时候使用定冠词'the'和不定冠词'a/an'。"
          }
        ]
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>输入英语文本</CardTitle>
          <CardDescription>
            输入你想要分析的英语文本，可以是句子、段落或短文
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="在这里输入英语文本..."
            className="min-h-32"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button 
            className="mt-4"
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
          >
            {isAnalyzing ? "分析中..." : "开始分析"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>分析结果</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grammar">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="grammar">语法</TabsTrigger>
                <TabsTrigger value="vocabulary">词汇</TabsTrigger>
                <TabsTrigger value="improvement">改进建议</TabsTrigger>
                <TabsTrigger value="exercises">练习</TabsTrigger>
              </TabsList>
              
              <TabsContent value="grammar" className="space-y-4 mt-4">
                {result.grammar.map((item, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <h3 className="font-semibold">{item.point}</h3>
                    <p className="text-gray-600">{item.explanation}</p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="vocabulary" className="space-y-4 mt-4">
                {result.vocabulary.map((item, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <h3 className="font-semibold">{item.word}</h3>
                    <p>{item.explanation}</p>
                    <p className="text-gray-600 italic">例句: {item.example}</p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="improvement" className="mt-4">
                <div className="border p-4 rounded-md">
                  <p>{result.improvement}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="exercises" className="space-y-4 mt-4">
                {result.exercises.map((exercise, index) => (
                  <div key={index} className="border p-4 rounded-md">
                    <p className="font-medium">{exercise.question}</p>
                    <p className="text-gray-600 mt-2">提示: {exercise.hint}</p>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}