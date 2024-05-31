import Link from 'next/link';
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { FlipWords } from "@/components/flip-words";
import { Button } from "@/components/moving-border";
import { TextRevealCard, TextRevealCardTitle, TextRevealCardDescription } from '@/components/text-reveal-card';


export default function Home() {
  const words = ["Stories_Connect", "Voices_Resonate", "Creativity_Grows"];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-6 md:py-10 overflow-hidden">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={"text-[700%] text-pink-500"}>Buffer&nbsp;</h1>
        <span className="text-[300%] "> Where Ideas Flow 💡</span><br />
      </div>
      <div className=" items-center justify-center rounded-2xl hidden lg:inline-block md:inline-block ">
        <TextRevealCard
          text=      "Reading is passport to countless worlds."
          revealText="While writing is compass guiding the journey. "
        >
        </TextRevealCard>
      </div>
      <div className="flex gap-3 ">
      </div>
      <Link href="/write" passHref>
        <Button className="text-white text-[70%]">
          Start Reading...
        </Button>
      </Link>
      <div className="mt-6">
        <Snippet hideCopyButton hideSymbol className="bg-transparent text-black">
          <span>
            Created By <Code color="danger"><span className="font-extrabold"><a href="">Idealistraj09 with 💘</a></span></Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
