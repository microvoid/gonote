import * as fs from "fs";
import { MarktionSSR } from "../../ui-editor";

const InitMarkdownContent = fs.readFileSync("./README.md", {
  encoding: "utf-8",
});

export default function MarkdownPreviewPage() {
  return (
    <div className="w-[820px] m-auto py-3">
      <MarktionSSR initialContent={InitMarkdownContent} />
    </div>
  );
}
