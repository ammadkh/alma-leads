"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignOutPage() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const handleSignOut = async () => {
      setIsSigningOut(true);
      await signOut({ redirect: false });
      router.push("/");
    };

    handleSignOut();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Signing Out
          </h2>
          <p className="text-gray-600">
            {isSigningOut
              ? "Please wait while we sign you out..."
              : "You have been signed out successfully."}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
}
