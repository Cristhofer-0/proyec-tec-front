"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function GsapWrapper({ children }: { children: React.ReactNode }) {
  const el = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isStickyPage = pathname.includes("/eventos/"); // o lo que uses

  useEffect(() => {
    if (!isStickyPage) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      });
      return () => ctx.revert();
    }
  }, [pathname]);


  return (
    <div ref={el}>
      {children}
    </div>
  );
}
