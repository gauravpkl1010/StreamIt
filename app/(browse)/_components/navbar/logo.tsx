import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
const font = Poppins({
  subsets: ["devanagari", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const Logo = () => {
  return (
    <Link href="">
      <div className="flex items-center mt-2 gap-x-4 hover:opacity-80 transition">
        <div className="bg-white rounded-full p-3  hidden lg:block">
          <Image src={`/spooky.svg`} alt="StreamIt" height={32} width={32} />
        </div>
        <div className={cn(font.className)}>
          <p className="text-lg font-semibold mr-5 shrink-0 lg:mr-0 lg:shrink ">
            StreamIt
          </p>
          <p className="text-xs text-muted-foreground hidden lg:block">
            Stream anywhere,anytime.
          </p>
        </div>
      </div>
    </Link>
  );
};
