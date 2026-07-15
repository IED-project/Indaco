"use client";

import { useEffect, useState } from "react";

/*
 * Viewer 3D interattivo (glTF/GLB) basato su <model-viewer>.
 * Metti il tuo modello in public/models/indaco.glb e apparirà qui.
 * Finché il file non c'è, mostra il render come poster.
 */
export default function ModelViewer() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="stage__viewer">
        <img src="/images/render-1.png" alt="Simbolo indaco in 3D" />
      </div>
    );
  }

  return (
    <div className="stage__viewer">
      <model-viewer
        src="/models/indaco.glb"
        poster="/images/render-1.png"
        alt="Simbolo indaco in 3D"
        camera-controls
        auto-rotate
        auto-rotate-delay="1500"
        rotation-per-second="24deg"
        shadow-intensity="0.6"
        exposure="1.1"
        interaction-prompt="none"
        style={{ width: "100%", height: "100%", background: "transparent" }}
      />
    </div>
  );
}
