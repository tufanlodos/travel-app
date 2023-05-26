"use client";

import { useEffect, useState } from "react";

export function FooterText() {
  const [currentYear, setCurrentYear] = useState(2023);
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return <p>&copy; {currentYear} Hostshare</p>;
}
