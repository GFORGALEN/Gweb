"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  reason: string;
};

export function MusicRecommendation() {
  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Song[]>([]);

  const handleGetRecommendations = () => {
    if (!mood || !genre) return;
    
    setIsLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      setRecommendations([
        {
          id: "1",
          title: "Imagine",
          artist: "John Lennon",
          album: "Imagine",
          cover: "/placeholder.svg",
          reason: "这首歌的平静旋律与你当前的放松心情相契合，同时它的深刻歌词也能带来思考。"
        },
        {
          id: "2",
          title: "Shape of You",
          artist: "Ed Sheeran",
          album: "÷ (Divide)",
          cover: "/placeholder.svg",
          reason: "轻快的流行节奏，适合你当前的心情，同时具有朗朗上口的旋律。"
        },
        {
          id: "3",
          title: "Believer",
          artist: "Imagine Dragons",
          album: "Evolve",
          cover: "/placeholder.svg",
          reason: "强劲的节奏和鼓舞人心的歌词，与你选择的流行摇滚风格完美匹配。"
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>音乐偏好</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">当前心情</label>
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger>
                <SelectValue placeholder="选择心情" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="happy">愉快</SelectItem>
                <SelectItem value="relaxed">放松</SelectItem>
                <SelectItem value="energetic">充满活力</SelectItem>
                <SelectItem value="melancholic">感伤</SelectItem>
                <SelectItem value="focused">专注</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">喜好的音乐类型</label>
            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue placeholder="选择音乐类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pop">流行</SelectItem>
                <SelectItem value="rock">摇滚</SelectItem>
                <SelectItem value="jazz">爵士</SelectItem>
                <SelectItem value="classical">古典</SelectItem>
                <SelectItem value="electronic">电子</SelectItem>
                <SelectItem value="hiphop">嘻哈</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleGetRecommendations}
            disabled={!mood || !genre || isLoading}
            className="w-full"
          >
            {isLoading ? "生成推荐中..." : "获取音乐推荐"}
          </Button>
        </CardFooter>
      </Card>

      {recommendations.length > 0 && (
        <div className="grid gap-6 md:grid-cols-3">
          {recommendations.map((song) => (
            <Card key={song.id}>
              <div className="aspect-square bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  专辑封面
                </div>
              </div>
              <CardHeader>
                <CardTitle>{song.title}</CardTitle>
                <p className="text-sm text-gray-500">{song.artist} - {song.album}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{song.reason}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">播放预览</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}