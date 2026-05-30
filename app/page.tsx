"use client";

import { useState } from "react";
import { IntroScreen } from "@/components/intro/IntroScreen";
import { CityModal } from "@/components/auth/CityModal";
import { WaitlistModal } from "@/components/auth/WaitlistModal";
import { SignupModal } from "@/components/auth/SignupModal";
import { LoginModal } from "@/components/auth/LoginModal";

type Screen = "intro" | "city" | "waitlist" | "signup" | "login";

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCitySelect = (city: string, isActive: boolean) => {
    setSelectedCity(city);
    setScreen(isActive ? "signup" : "waitlist");
  };

  // Hard redirect so Next.js middleware sees the fresh session cookie
  const handleAuthSuccess = () => {
    window.location.replace("/feed");
  };

  return (
    <>
      {screen === "intro" && <IntroScreen onEnd={() => setScreen("city")} />}

      {/* Plain dark background — no hero text */}
      <div
        className="min-h-screen"
        style={{
          background: "var(--bg)",
          opacity: screen === "intro" ? 0 : 1,
          transition: "opacity 1s ease",
        }}
      />

      <CityModal isOpen={screen === "city"} onSelectCity={handleCitySelect} />
      <WaitlistModal isOpen={screen === "waitlist"} city={selectedCity} onBack={() => setScreen("city")} />
      <SignupModal isOpen={screen === "signup"} onSuccess={handleAuthSuccess} onSwitchToLogin={() => setScreen("login")} />
      <LoginModal isOpen={screen === "login"} onSuccess={handleAuthSuccess} onSwitchToSignup={() => setScreen("signup")} />
    </>
  );
}
