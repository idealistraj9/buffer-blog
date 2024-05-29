import Link from 'next/link';
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { FlipWords } from "@/components/flip-words";
import { Button } from "@/components/moving-border";

export default function Home() {
  const words = ["Stories_Connect", "Minds_Expand", "Voices_Resonate", "Creativity_Grows"];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-6 md:py-10 overflow-hidden">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={"text-[700%] text-secondary"}>Buffer&nbsp;</h1>
        <span className="text-[300%]">Where Ideas Flow and</span><br />
        <FlipWords words={words} className="text-[40px] font-bold " /> <br />
      </div>

      <div className="flex gap-3 ">
      </div>
      <Link href="/write" passHref>
        <Button className="text-white text-[80%]">
          Start writing...
        </Button>
      </Link>
      <div className="mt-12">
        <Snippet hideCopyButton hideSymbol className="bg-transparent text-black">
          <span>
            Created By <Code color="danger"><span className="font-extrabold"><a href="">Idealistraj09 with 💘</a></span></Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
