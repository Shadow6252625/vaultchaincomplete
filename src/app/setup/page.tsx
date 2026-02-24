import { SetupForm } from "@/components/setup/SetupForm";

export default function SetupPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 vc-grid opacity-25" />
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 40% 30%, rgba(0,225,255,0.10), transparent 55%), radial-gradient(circle at 65% 50%, rgba(10,116,255,0.12), transparent 55%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        <SetupForm />
      </div>
    </main>
  );
}
