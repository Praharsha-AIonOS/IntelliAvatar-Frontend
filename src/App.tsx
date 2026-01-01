import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AvatarSyncStudio from "./pages/features/AvatarSyncStudio";
import TextToAvatarStudio from "./pages/features/TextToAvatarStudio";
import WishesGenerator from "./pages/features/WishesGenerator";
import IntelliTutor from "./pages/features/IntelliTutor";
import FeatureLayout from "./components/layout/FeatureLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route element={<FeatureLayout />}>
            <Route path="/feature/avatar-sync" element={<AvatarSyncStudio />} />
            <Route path="/feature/text-to-avatar" element={<TextToAvatarStudio />} />
            <Route path="/feature/wishes-generator" element={<WishesGenerator />} />
            <Route path="/feature/intellitutor" element={<IntelliTutor />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
