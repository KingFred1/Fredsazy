"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { LogOut, Mail, Calendar, Shield } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Access Denied</h1>
            <p className="mt-2 text-gray-600">Please sign in to view your profile</p>
          </div>
          <Link
            href="/auth/signin"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  const user = session.user;
  const joinDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-800"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5 -mt-16">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full border-4 border-white bg-indigo-600 flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">
                      {(user?.name || "U")[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="mt-6 sm:mt-0 sm:flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.name || "User"}
                </h1>
                <p className="text-gray-600 flex items-center mt-1">
                  <Mail className="h-4 w-4 mr-2" />
                  {user?.email}
                </p>
              </div>

              {/* Logout Button */}
              <div className="mt-6 sm:mt-0">
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{loading ? "Signing out..." : "Sign Out"}</span>
                </button>
              </div>
            </div>

            {/* Account Information */}
            <div className="mt-8 space-y-6">
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <p className="mt-1 text-gray-900 font-medium">
                      {user?.name || "N/A"}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <p className="mt-1 text-gray-900 font-medium">{user?.email}</p>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Account Role
                    </label>
                    <p className="mt-1 text-gray-900 font-medium capitalize">
                      {user?.role || "user"}
                    </p>
                  </div>

                  {/* Member Since */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Member Since
                    </label>
                    <p className="mt-1 text-gray-900 font-medium">{joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Account Actions */}
              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Account Actions
                </h2>

                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-indigo-100 hover:bg-indigo-200 text-indigo-900 px-4 py-2 rounded-lg font-medium transition"
                  >
                    Send us a Message
                  </Link>
                  <Link
                    href="/"
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium transition"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-3 font-bold">•</span>
              <span>Keep your email updated to receive important notifications</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-3 font-bold">•</span>
              <span>Subscribe to our newsletter for weekly tech insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-3 font-bold">•</span>
              <span>Sign out when using shared devices for security</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
