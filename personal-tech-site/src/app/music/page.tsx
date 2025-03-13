import { MusicRecommendation } from "@/components/music/music-recommendation";

export default function MusicPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">音乐推荐</h1>
      <MusicRecommendation />
    </div>
  );
}