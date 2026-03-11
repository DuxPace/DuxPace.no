import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-gray-600 text-sm tracking-wide mb-4">404</p>
        <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="bg-white text-black text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
