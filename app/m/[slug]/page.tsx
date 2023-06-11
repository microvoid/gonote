import * as fs from "fs";
import dayjs from "dayjs";
import Image from "next/image";
import { TimerIcon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import relativeTime from "dayjs/plugin/relativeTime";
import { MarktionSSR } from "../../ui-editor";

dayjs.extend(relativeTime);

const InitMarkdownContent = fs.readFileSync("./README.md", {
  encoding: "utf-8",
});

export default function MarkdownPreviewPage() {
  const isStar = false;

  return (
    <div className="w-full px-5 md:w-[720px] md:p-0 m-auto mb-10">
      <div className="py-6">
        <h1 className="text-4xl mb-2 font-extrabold">Marktion</h1>

        <div className="flex justify-between text-slate-500">
          <div className="flex items-center">
            <Image
              className="w-[32px] h-[32px] rounded-full mr-2"
              src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
              alt="user name"
              width={128}
              height={128}
            />
            <div>
              <div className=" text-slate-800">nickname</div>
              <div className="text-sm">
                <TimerIcon className="mr-1 inline" /> {dayjs().fromNow()}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isStar ? <StarFilledIcon /> : <StarIcon />}
          </div>
        </div>
      </div>

      <MarktionSSR initialContent={InitMarkdownContent} />
    </div>
  );
}
