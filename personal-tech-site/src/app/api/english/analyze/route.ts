// src/app/api/english/analyze/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db/connect';
import { EnglishLearningSession } from '@/lib/db/models';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    await connectDB();
    const { text, userId } = await request.json();
    
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: '请提供文本内容' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `你是一位英语教师，请分析以下英语文本...`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysisResult = JSON.parse(response.choices[0].message.content || '{}');
    
    // 保存到数据库
    if (userId) {
      await EnglishLearningSession.create({
        userId,
        text,
        analysis: analysisResult
      });
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error('英语分析API错误:', error);
    return NextResponse.json(
      { error: '分析过程中发生错误' },
      { status: 500 }
    );
  }
}