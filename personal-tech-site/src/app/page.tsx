import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container py-12 md:py-24">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          融合AI的个人学习平台
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          集成AI助手、英语学习工具和音乐推荐功能，打造个性化的技术体验。
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">开始使用</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">了解更多</Link>
          </Button>
        </div>
      </div>

      <div id="features" className="py-16 grid md:grid-cols-3 gap-8">
        <FeatureCard 
          title="英语学习助手" 
          description="AI驱动的英语学习体验，提供个性化的学习计划和实时反馈。"
          link="/english"
        />
        <FeatureCard 
          title="音乐推荐" 
          description="基于你的喜好和心情，智能推荐音乐，创造完美的聆听体验。"
          link="/music"
        />
        <FeatureCard 
          title="AI助手" 
          description="多功能AI助手，可帮助编程、写作和学习，让复杂任务变得简单。"
          link="/ai-assistant"
        />
      </div>
    </div>
  );
}

function FeatureCard({ 
  title, 
  description, 
  link 
}: { 
  title: string; 
  description: string; 
  link: string;
}) {
  return (
    <div className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button variant="link" asChild>
        <Link href={link}>了解更多</Link>
      </Button>
    </div>
  );
}