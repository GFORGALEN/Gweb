import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          个人技术站点
        </Link>
        <nav className="flex gap-4">
          <Link href="/english">
            <Button variant="ghost">英语学习</Button>
          </Link>
          <Link href="/music">
            <Button variant="ghost">音乐推荐</Button>
          </Link>
          <Link href="/ai-assistant">
            <Button variant="ghost">AI助手</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">登录</Button>
          </Link>
          <Link href="/register">
            <Button>注册</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}