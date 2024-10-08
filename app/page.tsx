import Image from "next/image";
import Link from "next/link";
import Calculator from "../components/Calculator";
import FriesClick from "@/components/FriesClick";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        <Link href="/">
          mcdcalculator
        </Link>
      </h1>
      <p className="text-xl mb-8">
        A calculator to see what&apos;s the most optimal way to spend your McDonald&apos;s points.
      </p>
      <Calculator />
      <p className="text-sm mt-8">
        Disclaimer: We are not affiliated with, endorsed, or sponsored by McDonald&apos;s. All data utilized by our calculator is derived from publicly available information and personal analysis based on the McDonald&apos;s app and our local McDonald&apos;s location. We are not responsible for any discrepancies in the data. All trademarks and copyrights related to McDonald&apos;s are the property of their respective owners. Please use this tool at your own risk.
      </p>
      <footer>
        <p className="text-sm mt-8">
          made by <Link href="https://jarrensj.com" className="text-blue-500 hover:underline" target="_blank">
            kwaji 🍣
          </Link> and <Link href="https://x.com/CryptoMaoZeLong" className="text-blue-500 hover:underline" target="_blank">
            maozelong 🐧
          </Link>
        </p>
      </footer>
      <FriesClick />
    </main>
  );
}
