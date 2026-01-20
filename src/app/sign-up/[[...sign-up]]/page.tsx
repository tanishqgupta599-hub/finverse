import { SignUp } from "@clerk/nextjs";
import { Sparkles, TrendingUp, PieChart } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-white">
      {/* Left Panel - Branding & Creative */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-zinc-900 p-12 lg:flex">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-[20%] -top-[20%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute -bottom-[20%] -right-[20%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-2xl font-bold text-emerald-500">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            Finvx
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            Join the Future of <br />
            <span className="text-emerald-500">Personal Finance.</span>
          </h1>
          <p className="text-lg text-zinc-400">
            Create an account today and start your journey towards financial freedom.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-8">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 backdrop-blur">
              <TrendingUp className="mb-3 h-6 w-6 text-purple-500" />
              <div className="font-semibold">Growth Tools</div>
              <div className="text-xs text-zinc-500">Advanced analytics for your investments.</div>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 backdrop-blur">
              <PieChart className="mb-3 h-6 w-6 text-emerald-500" />
              <div className="font-semibold">Visual Budgeting</div>
              <div className="text-xs text-zinc-500">See where your money goes.</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-zinc-500">
          © {new Date().getFullYear()} Finvx. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2">
        <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-emerald-500 lg:hidden">
          <Sparkles className="h-6 w-6" />
          Finvx
        </div>
        <SignUp />
      </div>
    </div>
  );
}
