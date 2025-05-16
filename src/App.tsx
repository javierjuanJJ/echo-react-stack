
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {SignIn, SignUp, useAuth} from '@clerk/clerk-react';

// Layout components
import MainLayout from "@/layouts/MainLayout";

// Page components
import HomePage from "@/pages/HomePage";
import MessagesPage from "@/pages/MessagesPage";
import HistoryPage from "@/pages/HistoryPage";
import TrashPage from "@/pages/TrashPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userId, isLoaded } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-screen w-screen">Cargando...</div>;
  }

  if (!userId) {
    return <SignInPage />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={< SignUpPage/>} />

        {/* Protected routes with MainLayout */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route index element={<HomePage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="trash" element={<TrashPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
