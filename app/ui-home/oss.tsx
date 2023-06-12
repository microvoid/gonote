import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { siteConstants } from "../constants";

const brand = siteConstants.brand.toUpperCase();

export function OSS() {
  return (
    <div className="border-t border-gray-200 bg-white/10 py-20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur">
      <div className="mx-auto max-w-md text-center sm:max-w-xl">
        <h2 className="bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 bg-clip-text font-display text-4xl font-extrabold leading-tight text-transparent sm:text-5xl sm:leading-tight">
          {brand}
        </h2>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Our source code is available on GitHub - feel free to read, review, or
          contribute to it.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-fit space-x-4">
        <a
          className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 shadow-lg transition-all hover:border-primary hover:text-primary"
          href="https://github.com/microvoid/marktion"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubLogoIcon className="h-5 w-5" />
          <p className="text-sm">Star on GitHub</p>
        </a>
      </div>
    </div>
  );
}
