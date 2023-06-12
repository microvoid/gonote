import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <div className="mx-auto mb-10 mt-12 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0">
      <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
        Markdown Editor With
        <br />
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          Superpowers
        </span>
      </h1>
      <h2 className="mt-5 text-gray-600 sm:text-xl">
        Marktion is an open-source link management tool for modern marketing
        teams to create, share, and track short links.
      </h2>

      <div className="mx-auto mt-10 flex max-w-fit space-x-4">
        <a
          href="/register"
          className="rounded-full border border-black bg-black px-5 py-2 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-black"
        >
          Start For Free
        </a>
        <a
          className="flex items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 shadow-lg transition-all hover:border-gray-800"
          href="https://github.com/microvoid/marktion"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubLogoIcon className="h-5 w-5 text-black" />
          <p className="text-sm">Star on GitHub</p>
        </a>
      </div>
    </div>
  );
};
