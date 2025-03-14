'use client';

'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function EnglishLearningAssistant() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeText = async () => {
    if (!text.trim()) {
      toast.error('请输入文本');
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/english/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('分析请求失败');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      toast.success('文本分析已完成');
    } catch (error) {
      console.error('分析文本时出错:', error);
      toast.error('分析失败，请稍后再试');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const saveVocabulary = async (word: string, definition: string) => {
    try {
      const response = await fetch('/api/english/vocabulary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word, definition }),
      });

      if (!response.ok) {
        throw new Error('保存单词失败');
      }

      toast({
        title: '单词已保存',
        description: `"${word}" 已添加到你的词汇表`,
      });
    } catch (error) {
      console.error('保存单词时出错:', error);
      toast({
        title: '保存失败',
        description: '保存单词时出错，请稍后再试',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">英语学习助手</h1>
      
      <div className="grid gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>输入英语文本</CardTitle>
            <CardDescription>
              输入你想要分析的英语文本，我们将提供语法分析、词汇解释和改进建议
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="在此输入英语文本..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[150px] mb-4"
            />
            <Button 
              onClick={analyzeText} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? '分析中...' : '分析文本'}
            </Button>
          </CardContent>
        </Card>

        {analysis && (
          <Card>
            <CardHeader>
              <CardTitle>分析结果</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="grammar">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="grammar">语法分析</TabsTrigger>
                  <TabsTrigger value="vocabulary">词汇解释</TabsTrigger>
                  <TabsTrigger value="suggestions">改进建议</TabsTrigger>
                  <TabsTrigger value="exercises">练习题</TabsTrigger>
                </TabsList>
                
                <TabsContent value="grammar" className="mt-4">
                  <div className="prose dark:prose-invert">
                    <h3>语法分析</h3>
                    <div dangerouslySetInnerHTML={{ __html: analysis.grammar }} />
                  </div>
                </TabsContent>
                
                <TabsContent value="vocabulary" className="mt-4">
                  <div className="prose dark:prose-invert">
                    <h3>词汇解释</h3>
                    <ul className="space-y-2">
                      {analysis.vocabulary && analysis.vocabulary.map((item: any, index: number) => (
                        <li key={index} className="flex justify-between items-start border-b pb-2">
                          <div>
                            <strong>{item.word}</strong>: {item.definition}
                            {item.example && <p className="text-sm italic mt-1">{item.example}</p>}
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => saveVocabulary(item.word, item.definition)}
                          >
                            保存
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="suggestions" className="mt-4">
                  <div className="prose dark:prose-invert">
                    <h3>改进建议</h3>
                    <div dangerouslySetInnerHTML={{ __html: analysis.suggestions }} />
                  </div>
                </TabsContent>
                
                <TabsContent value="exercises" className="mt-4">
                  <div className="prose dark:prose-invert">
                    <h3>练习题</h3>
                    <ol className="space-y-4">
                      {analysis.exercises && analysis.exercises.map((exercise: any, index: number) => (
                        <li key={index}>
                          <p>{exercise.question}</p>
                          {exercise.options && (
                            <ul className="mt-2 space-y-1">
                              {exercise.options.map((option: string, optIndex: number) => (
                                <li key={optIndex}>{option}</li>
                              ))}
                            </ul>
                          )}
                          <details className="mt-2">
                            <summary className="cursor-pointer text-blue-500">查看答案</summary>
                            <p className="mt-1">{exercise.answer}</p>
                            {exercise.explanation && (
                              <p className="mt-1 text-sm">{exercise.explanation}</p>
                            )}
                          </details>
                        </li>
                      ))}
                    </ol>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}