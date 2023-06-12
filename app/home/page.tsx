import * as fs from "fs";
import dynamic from "next/dynamic";

import { Hero } from "../ui-home/hero";
import { OSS } from "../ui-home/oss";
import { Nav } from "../ui-home/nav";

const ShareEditor = dynamic(() => import("../ui-home/share-editor"), {
  ssr: false,
});

const InitMarkdownContent = fs.readFileSync("./README.md", {
  encoding: "utf-8",
});

export default async function Home() {
  return (
    <>
      <Nav />

      <OSS />

      <ShareEditor initialContent={InitMarkdownContent} />

      {/* <Hero /> */}
    </>
  );
}
