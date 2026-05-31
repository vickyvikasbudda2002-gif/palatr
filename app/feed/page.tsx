"use client";

import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRestaurants } from "@/hooks/useRestaurants";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useReviews } from "@/hooks/useReviews";
import { useFeedStore } from "@/store/feedStore";
import { FeedNavbar } from "@/components/feed/FeedNavbar";
import { RestaurantCard } from "@/components/feed/RestaurantCard";
import { ReviewModal } from "@/components/review/ReviewModal";
import { WatchReviewsModal } from "@/components/review/WatchReviewsModal";
import { ReportModal } from "@/components/feed/ReportModal";
import { AddRestaurantModal } from "@/components/add-restaurant/AddRestaurantModal";
import { NewToCityModal } from "@/components/top-three/NewToCityModal";
import { Top3Modal } from "@/components/top-three/Top3Modal";
import { ProfileModal } from "@/components/auth/ProfileModal";
import { Footer } from "@/components/common/Footer";
import { PageLoader } from "@/components/common/LoadingSpinner";
import { getCuisineLabel } from "@/utils/cuisineMap";
import { SORT_OPTIONS, FILTER_OPTIONS } from "@/utils/constants";
import { debounce } from "@/utils/debounce";
import type { Restaurant } from "@/types/restaurant";
import type { FilterOption } from "@/utils/filterRestaurants";
import type { SortOption } from "@/utils/sortRestaurants";

// Dynamically import FeedMap — Leaflet is browser-only, no SSR
const FeedMap = lazy(() =>
  import("@/components/feed/FeedMap").then((m) => ({ default: m.FeedMap }))
);

type ActiveModal = null | "review" | "watchReviews" | "report" | "addRestaurant" | "newToCity" | "top3" | "profile";

export default function FeedPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { restaurants, isLoading, handleLike } = useRestaurants(user?.id);
  const { requestLocation } = useGeolocation();
  const { setSearchQuery, setFilter, setSort, searchQuery, filter, sort, restaurants: allRestaurants } = useFeedStore();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  // Redirect unauthenticated users — must be in useEffect, not render phase
  useEffect(() => {
    if (!authLoading && !user) {
      window.location.replace("/");
    }
  }, [user, authLoading]);

  // New-to-city popup — show only once per user ever
  // Key is set AFTER user responds (not when modal appears)
  useEffect(() => {
    if (!user) return;
    const key = `palatr_city_shown_${user.id}`;
    if (typeof window !== "undefined" && !localStorage.getItem(key)) {
      const timer = setTimeout(() => setActiveModal("newToCity"), 3000);
      return () => clearTimeout(timer);
    }
  }, [user?.id]);

  // Stable debounced search — recreating on every render breaks debounce
  const handleSearch = useMemo(
    () => debounce((val: string) => setSearchQuery(val), 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const { submitReview } = useReviews(selectedRestaurant?.id ?? "");

  const closeModal = () => setActiveModal(null);
  const modalOpen = activeModal !== null;

  if (authLoading) return <PageLoader />;
  if (!user) return <PageLoader />;

  const cuisineLabel = getCuisineLabel(user.home_state);

  return (
    <div className="min-h-screen pb-36" style={{ background: "var(--bg)" }}>
      <FeedNavbar onProfileClick={() => setActiveModal("profile")} />

      <div className="feed-content-offset px-[5%]">
        {/* Header */}
        <div className="flex justify-between items-end gap-6 mb-10 flex-wrap pt-8">
          <h1
            className="font-black leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 56px)", letterSpacing: "-2px" }}
          >
            Hello {user.first_name},<br />
            <span style={{ color: "var(--muted)", fontWeight: 700 }}>Here is authentic </span>
            <span style={{ color: "var(--primary2)" }}>{cuisineLabel}</span>
            <span style={{ color: "var(--muted)", fontWeight: 700 }}> food Bangalore loves.</span>
          </h1>

          <div className="flex gap-3 flex-wrap items-center">
            <input
              type="text"
              placeholder="Search restaurants..."
              defaultValue={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-5 py-3 rounded-full text-sm text-white outline-none"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                minWidth: "180px",
                fontFamily: "inherit",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterOption)}
              className="px-5 py-3 rounded-full text-sm text-white outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", fontFamily: "inherit", appearance: "none" }}
            >
              {FILTER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select
              value={sort}
              onChange={(e) => {
                const v = e.target.value as SortOption;
                setSort(v);
                if (v === "distance") requestLocation();
              }}
              className="px-5 py-3 rounded-full text-sm text-white outline-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", fontFamily: "inherit", appearance: "none" }}
            >
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Map */}
        <Suspense fallback={
          <div style={{
            height: "420px",
            borderRadius: "24px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div className="w-8 h-8 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#ff2d5e] animate-spin" />
          </div>
        }>
          <FeedMap restaurants={restaurants} />
        </Suspense>

        {/* Restaurant grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-[#ff2d5e] animate-spin" />
          </div>
        ) : restaurants.length === 0 ? (
          <div
            className="py-16 text-center rounded-3xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}
          >
            <p className="text-xl font-semibold mb-2">No {cuisineLabel} restaurants found yet.</p>
            <p className="text-sm">Be the first to add one using the + button below!</p>
          </div>
        ) : (
          <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {restaurants.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                onLike={() => handleLike(r.id, !!r.user_has_liked)}
                onReview={() => { setSelectedRestaurant(r); setActiveModal("review"); }}
                onWatchReviews={() => { setSelectedRestaurant(r); setActiveModal("watchReviews"); }}
                onReport={() => { setSelectedRestaurant(r); setActiveModal("report"); }}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* FABs — hidden when any modal is open to prevent z-index bleed-through */}
      {!modalOpen && (
        <>
          <button className="fab fab-add" onClick={() => setActiveModal("addRestaurant")}>+</button>
          <button className="fab fab-gem" onClick={() => window.location.href = "/hidden-gems"}>💎</button>
        </>
      )}

      <ReviewModal
        isOpen={activeModal === "review"}
        onClose={closeModal}
        targetId={selectedRestaurant?.id ?? ""}
        targetType="restaurant"
        targetName={selectedRestaurant?.name ?? ""}
        onSubmit={async (data) => { await submitReview(data, "restaurant"); }}
      />
      <WatchReviewsModal
        isOpen={activeModal === "watchReviews"}
        onClose={closeModal}
        targetId={selectedRestaurant?.id ?? ""}
        targetType="restaurant"
        targetName={selectedRestaurant?.name ?? ""}
      />
      <ReportModal
        isOpen={activeModal === "report"}
        onClose={closeModal}
        restaurantId={selectedRestaurant?.id ?? ""}
        restaurantName={selectedRestaurant?.name ?? ""}
      />
      <AddRestaurantModal
        isOpen={activeModal === "addRestaurant"}
        onClose={closeModal}
        onSuccess={closeModal}
      />
      <NewToCityModal
        isOpen={activeModal === "newToCity"}
        city={user.current_city}
        onYes={() => {
          localStorage.setItem(`palatr_city_shown_${user.id}`, "1");
          closeModal();
        }}
        onNo={() => {
          localStorage.setItem(`palatr_city_shown_${user.id}`, "1");
          setActiveModal("top3");
        }}
      />
      {/* Pass allRestaurants (unfiltered) so Top3 shows all options */}
      <Top3Modal
        isOpen={activeModal === "top3"}
        onBack={() => setActiveModal("newToCity")}
        onClose={closeModal}
        restaurants={allRestaurants}
        homeState={user.home_state}
        city={user.current_city}
      />
      <ProfileModal isOpen={activeModal === "profile"} onClose={closeModal} />
    </div>
  );
}
