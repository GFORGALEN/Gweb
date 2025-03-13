"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export function AIAssistant() {
  const [assistantType, setAssistantType] = useState("general");
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // 模拟AI回复
    setTimeout(() => {
      let response = "";
      
      switch(assistantType) {
        case "general":
          response = "我是一个通用AI助手，很高兴能帮助你！你有什么问题我可以回答？";
          break;
        case "coding":
          response = "作为编程助手，我可以帮你解决代码问题、解释概念或提供示例。请告诉我你需要什么帮助？";
          break;
        case "writing":
          response = "我是写作助手，可以帮助你润色文章、提供创意建议或改进表达。你正在处理什么类型的写作项目？";
          break;
        default:
          response = "我能帮你做什么呢？";
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>选择助手类型</CardTitle>
          <CardDescription>
            选择适合你当前需求的AI助手类型
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={assistantType} onValueChange={setAssistantType}>
            <SelectTrigger>
              <SelectValue placeholder="选择助手类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">通用助手</SelectItem>
              <SelectItem value="coding">编程助手</SelectItem>
              <SelectItem value="writing">写作助手</SelectItem>
              <SelectItem value="learning">学习助手</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      <Card className="mb-4 min-h-80">
        <CardHeader>
          <CardTitle>对话</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              向AI助手发送消息开始对话
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id} 
                className={`p-3 rounded-lg max-w-[80%] ${
                  message.role === "user" 
                    ? "bg-blue-100 ml-auto" 
                    : "bg-gray-100"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <Textarea
            placeholder="输入消息..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="min-h-24 resize-none"
            disabled={isLoading}
          />
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="ml-auto"
          >
            发送
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}