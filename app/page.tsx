import Notes from "@/components/Notes";
import VideoPlayer from "@/components/VideoPlayer";
import VideoTitle from "@/components/VideoTitle";

export default function Home () {
  return (
    <div className="p-4 flex flex-col justify-center">
      <h1 className="w-full font-semibold text-xl pb-4">
        Video Player with Notes
      </h1>
      <VideoPlayer videoId="" />
      <VideoTitle title="Video title goes here" description="This is the description of the video" />
      <div className="border border-gray-200 rounded-xl p-6">
        <Notes notes={[{
          timestamp: new Date().getTime(),
          createdAt: new Date(),
          content: "This is my first note.",
        }]} />
      </div>
    </div>
  );
}
