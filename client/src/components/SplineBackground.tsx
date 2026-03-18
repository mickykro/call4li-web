import { Suspense, lazy, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const SCENE_URL =
  "https://prod.spline.design/QSzvhIZhCStglzcw/scene.splinecode";

export default function SplineBackground() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Dark base so content stays readable before/during load */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "oklch(0.15 0.02 260)",
        }}
      />

      {/* Spline scene — fades in once loaded */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <Suspense fallback={null}>
          <Spline
            scene={SCENE_URL}
            onLoad={() => setLoaded(true)}
            style={{ width: "100%", height: "100%" }}
          />
        </Suspense>
      </div>

      {/* Overlay to keep text readable over the 3D scene */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "oklch(0.15 0.02 260 / 60%)",
        }}
      />
    </div>
  );
}
