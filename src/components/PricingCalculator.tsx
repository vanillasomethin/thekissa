"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  { id: "graphic-design", label: "Graphic Design", base: 500, hasTier: true },
  { id: "logo-branding", label: "Logo / Branding", base: 800, hasTier: true },
  { id: "video-production", label: "Video Production", base: 1200, hasTier: true },
  { id: "social-media", label: "Social Media Package", base: 400, hasTier: false, suffix: "/mo" },
  { id: "photography", label: "Photography", base: 600, hasTier: true },
  { id: "website-design", label: "Website Design", base: 1500, hasTier: true },
  { id: "animation", label: "Animation", base: 900, hasTier: true },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];

type Tier = "basic" | "standard" | "premium";
const TIER_MULTIPLIERS: Record<Tier, number> = { basic: 1, standard: 1.5, premium: 2 };
const TIER_LABELS: Record<Tier, string> = { basic: "Basic 1×", standard: "Standard 1.5×", premium: "Premium 2×" };

interface ServiceState {
  checked: boolean;
  tier: Tier;
}

const defaultState = (): Record<ServiceId, ServiceState> =>
  Object.fromEntries(
    SERVICES.map((s) => [s.id, { checked: false, tier: "basic" as Tier }])
  ) as Record<ServiceId, ServiceState>;

function formatPrice(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function PricingCalculator() {
  const [services, setServices] = useState<Record<ServiceId, ServiceState>>(defaultState());
  const [showModal, setShowModal] = useState(false);

  const total = SERVICES.reduce((sum, s) => {
    const state = services[s.id];
    if (!state.checked) return sum;
    const mult = s.hasTier ? TIER_MULTIPLIERS[state.tier] : 1;
    return sum + s.base * mult;
  }, 0);

  const toggleService = (id: ServiceId) => {
    setServices((prev) => ({
      ...prev,
      [id]: { ...prev[id], checked: !prev[id].checked },
    }));
  };

  const setTier = (id: ServiceId, tier: Tier) => {
    setServices((prev) => ({
      ...prev,
      [id]: { ...prev[id], tier },
    }));
  };

  const selectedServices = SERVICES.filter((s) => services[s.id].checked);

  return (
    <section
      style={{
        backgroundColor: "#0A0A0A",
        minHeight: "100vh",
        padding: "4rem 1.5rem",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            color: "#FFD700",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "0.4rem",
          }}
        >
          Estimate Your Project
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: "#888", marginBottom: "2.5rem", fontSize: "1rem" }}
        >
          Select the services you need and choose your tier.
        </motion.p>

        {/* Service cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {SERVICES.map((service, i) => {
            const state = services[service.id];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                style={{
                  backgroundColor: state.checked ? "#141414" : "#111111",
                  border: state.checked
                    ? "1px solid rgba(255,215,0,0.35)"
                    : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                  transition: "background-color 0.2s, border-color 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                  {/* Checkbox + label */}
                  <label
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", flex: 1 }}
                  >
                    <span
                      onClick={() => toggleService(service.id)}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "5px",
                        border: state.checked ? "2px solid #FFD700" : "2px solid #444",
                        backgroundColor: state.checked ? "#FFD700" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "all 0.15s",
                        cursor: "pointer",
                      }}
                    >
                      {state.checked && (
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                          <path d="M1 4L4 7L10 1" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span
                      onClick={() => toggleService(service.id)}
                      style={{
                        color: state.checked ? "#fff" : "#aaa",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        transition: "color 0.15s",
                      }}
                    >
                      {service.label}
                    </span>
                  </label>

                  {/* Base price */}
                  <span style={{ color: "#FF6B35", fontWeight: 700, fontSize: "0.9rem", minWidth: "80px", textAlign: "right" }}>
                    {formatPrice(service.base)}{(service as { suffix?: string }).suffix ?? ""}
                  </span>
                </div>

                {/* Tier selector */}
                <AnimatePresence>
                  {state.checked && service.hasTier && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.9rem", flexWrap: "wrap" }}>
                        {(["basic", "standard", "premium"] as Tier[]).map((tier) => (
                          <button
                            key={tier}
                            onClick={() => setTier(service.id, tier)}
                            style={{
                              padding: "0.3rem 0.8rem",
                              borderRadius: "6px",
                              border: state.tier === tier ? "1.5px solid #FFD700" : "1.5px solid #333",
                              backgroundColor: state.tier === tier ? "rgba(255,215,0,0.12)" : "transparent",
                              color: state.tier === tier ? "#FFD700" : "#666",
                              fontSize: "0.78rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              transition: "all 0.15s",
                            }}
                          >
                            {TIER_LABELS[tier]}
                          </button>
                        ))}
                        <span style={{ color: "#555", fontSize: "0.78rem", alignSelf: "center", marginLeft: "auto" }}>
                          = {formatPrice(service.base * TIER_MULTIPLIERS[state.tier])}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            marginTop: "2.5rem",
            padding: "1.5rem 1.75rem",
            backgroundColor: "#111",
            border: "1px solid rgba(255,215,0,0.15)",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p style={{ color: "#666", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
              Estimated Total
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={total}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: "#FFD700",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                {formatPrice(total)}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={() => total > 0 && setShowModal(true)}
            disabled={total === 0}
            style={{
              padding: "0.85rem 1.8rem",
              borderRadius: "10px",
              border: "none",
              background: total > 0
                ? "linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #FF3CAC 100%)"
                : "#222",
              color: total > 0 ? "#0A0A0A" : "#444",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: total > 0 ? "pointer" : "not-allowed",
              transition: "opacity 0.2s, transform 0.1s",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => { if (total > 0) (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            Request This Quote
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "1.5rem",
            }}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#141414",
                border: "1px solid rgba(255,215,0,0.2)",
                borderRadius: "16px",
                padding: "2rem",
                maxWidth: "460px",
                width: "100%",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #FFD700, #FF3CAC)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "1.5rem",
                }}>
                  ✓
                </div>
                <h3 style={{ color: "#FFD700", fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.4rem" }}>
                  Quote Request Received
                </h3>
                <p style={{ color: "#888", fontSize: "0.9rem" }}>
                  We&apos;ll review your selections and get back to you within 24 hours.
                </p>
              </div>

              <div style={{
                backgroundColor: "#0A0A0A",
                borderRadius: "10px",
                padding: "1rem 1.25rem",
                marginBottom: "1.5rem",
              }}>
                {selectedServices.map((s) => {
                  const state = services[s.id];
                  const mult = s.hasTier ? TIER_MULTIPLIERS[state.tier] : 1;
                  return (
                    <div key={s.id} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.35rem 0",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                      fontSize: "0.88rem",
                    }}>
                      <span style={{ color: "#ccc" }}>
                        {s.label}{s.hasTier ? ` (${state.tier})` : ""}
                      </span>
                      <span style={{ color: "#FF6B35", fontWeight: 600 }}>
                        {formatPrice(s.base * mult)}
                      </span>
                    </div>
                  );
                })}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "0.75rem",
                  marginTop: "0.25rem",
                }}>
                  <span style={{ color: "#fff", fontWeight: 700 }}>Total</span>
                  <span style={{ color: "#FFD700", fontWeight: 900, fontSize: "1.1rem" }}>
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  width: "100%",
                  padding: "0.8rem",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #FF3CAC 100%)",
                  color: "#0A0A0A",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                }}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
