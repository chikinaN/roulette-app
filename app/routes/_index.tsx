import type { MetaFunction } from "@remix-run/node";
import Roulette from "src/components/roulette";
import { RouletteOptionType } from "src/types/roulette";

export const meta: MetaFunction = () => {
  return [
    { title: "ルーレット アプリ" },
    { name: "description", content: "テスト" },
  ];
};

export default function Index() {
  const options: RouletteOptionType[] = [
    { id: 1, name: "オプション1", range: 1 },
    { id: 2, name: "オプション2", range: 2 },
    { id: 3, name: "オプション3", range: 3 },
    { id: 4, name: "オプション4", range: 4 },
    { id: 5, name: "オプション5", range: 5 },
    { id: 6, name: "オプション6", range: 6 },
    { id: 7, name: "オプション7", range: 7 },
    { id: 8, name: "オプション8", range: 8 },
    { id: 9, name: "オプション9", range: 9 },
    { id: 10, name: "オプション10", range: 10 },
  ]
  // const options: RouletteOptionType[] = [
  //   { id: 1, name: "オプション1", range: 1 },
  //   { id: 2, name: "オプション2", range: 1 },
  // ]
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">ルーレットアプリ</h1>
      <Roulette options={options} vulnerability={false} />
      <ul className="list-disc mt-4 pl-6 space-y-2">
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/quickstart"
            rel="noreferrer"
          >
            5m Quick Start
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/start/tutorial"
            rel="noreferrer"
          >
            30m Tutorial
          </a>
        </li>
        <li>
          <a
            className="text-blue-700 underline visited:text-purple-900"
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
