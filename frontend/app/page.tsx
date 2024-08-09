import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to My Next.js App</h1>
      <Link href="/register">
        <span className="text-blue-500 underline">Go to Register</span>
      </Link>
      <Link href="/login">
        <span className="text-blue-500 underline mt-2">Go to Login</span>
      </Link>
    </div>
  );
}
