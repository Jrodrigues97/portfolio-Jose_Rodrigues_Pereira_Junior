/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { MainLayout } from "./components/layout/MainLayout";
import { QRConfig } from "./components/qr/QRConfig";
import { QRPreview } from "./components/qr/QRPreview";
import { QROptions, INITIAL_QR_OPTIONS } from "./types";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthScreen } from "./components/auth/AuthScreen";
import { Loader2 } from "lucide-react";

function AppContent() {
  const { user, loading } = useAuth();
  const [options, setOptions] = useState<QROptions>(INITIAL_QR_OPTIONS);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return (
    <MainLayout>
      <div className="flex flex-row gap-2 sm:gap-6 items-start justify-center max-w-5xl mx-auto px-1 sm:px-4">
        {/* Left: Preview (Always visible on the side) */}
        <div className="w-[35%] sm:w-[40%] sticky top-4 sm:top-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 px-0.5">
              <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-blue-600 rounded-full" />
              <h3 className="text-[10px] sm:text-sm font-bold text-gray-900 truncate">Visualização</h3>
            </div>
            <QRPreview options={options} />
          </div>
        </div>

        {/* Right: Customization */}
        <div className="w-[65%] sm:w-[60%]">
          <QRConfig options={options} setOptions={setOptions} />
        </div>
      </div>
    </MainLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


