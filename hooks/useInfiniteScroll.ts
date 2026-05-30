"use client";

import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(items: T[], pageSize = 12) {
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const visibleItems = items.slice(0, page * pageSize);
  const hasMore = visibleItems.length < items.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  // Reset page when items change (e.g. filter/search)
  useEffect(() => {
    setPage(1);
  }, [items.length]);

  return { visibleItems, hasMore, loaderRef };
}
