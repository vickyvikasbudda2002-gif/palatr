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

  // Called after setSession() has been called in the modal
  // Hard redirect so Next.js middleware sees the fresh session cookie
  const handleAuthSuccess = () => {
    window.location.replace("/feed");
  };

  return (
    <>
      {screen === "intro" && <IntroScreen onEnd={() => setScreen("city")} />}

      <div
        className="min-h-screen flex items-center px-[7%] relative overflow-hidden"
        style={{ opacity: screen === "intro" ? 0 : 1, transition: "opacity 1s ease" }}
      >
        <div
          className="absolute pointer-events-none"
          style={{
            width: "800px", height: "800px",
            background: "radial-gradient(circle, rgba(255,45,94,0.15), transparent 70%)",
            top: "-400px", right: "-200px",
            filter: "blur(50px)", borderRadius: "50%",
          }}
        />
        <div className="relative z-10">
          <div className="text-sm font-bold uppercase mb-6" style={{ color: "var(--primary2)", letterSpacing: "6px" }}>
            DISCOVER • DINE • DELIGHT
          </div>
          <h1
            className="font-black leading-none text-gradient-primary"
            style={{ fontSize: "clamp(60px, 10vw, 140px)", letterSpacing: "-0.04em", maxWidth: "1000px" }}
          >
            Taste<br />where<br />you belong.
          </h1>
          <p className="mt-9 max-w-2xl leading-relaxed" style={{ fontSize: "clamp(18px, 2vw, 24px)", color: "var(--muted)" }}>
            A premium food discovery platform helping people find restaurants
            loved by their own culture, community and spice identity.
          </p>
        </div>
      </div>

      <CityModal isOpen={screen === "city"} onSelectCity={handleCitySelect} />
      <WaitlistModal isOpen={screen === "waitlist"} city={selectedCity} onBack={() => setScreen("city")} />
      <SignupModal isOpen={screen === "signup"} onSuccess={handleAuthSuccess} onSwitchToLogin={() => setScreen("login")} />
      <LoginModal isOpen={screen === "login"} onSuccess={handleAuthSuccess} onSwitchToSignup={() => setScreen("signup")} />
    </>
  );
}
