import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Sparkles } from "lucide-react";

const HEART_PATH =
  "M 50 90 C 43 83 8 61 8 35 C 8 18 20 8 33 8 C 42 8 48 13 50 21 C 52 13 58 8 67 8 C 80 8 92 18 92 35 C 92 61 57 83 50 90 Z";

export function WeddingScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const previous = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !ctx) return;

    const tokens = getComputedStyle(document.documentElement);
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, tokens.getPropertyValue("--scratch-light").trim());
    gradient.addColorStop(1, tokens.getPropertyValue("--scratch").trim());

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = tokens.getPropertyValue("--primary-foreground").trim();
    for (let x = 10; x < canvas.width; x += 14) {
      for (let y = 10; y < canvas.height; y += 14) {
        ctx.globalAlpha = (x + y) % 3 === 0 ? 0.15 : 0.06;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    ctx.globalAlpha = 1;
  }, []);

  function scratch(event: PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current || revealed) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) * canvas.width) / rect.width;
    const y = ((event.clientY - rect.top) * canvas.height) / rect.height;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 40;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(previous.current?.x ?? x, previous.current?.y ?? y);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    previous.current = { x, y };

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let erased = 0;
    let sampled = 0;
    for (let i = 3; i < pixels.length; i += 64) {
      sampled++;
      if ((pixels[i] ?? 255) < 128) erased++;
    }
    if (erased / sampled > 0.36) setRevealed(true);
  }

  return (
    <div
      className={`scratch-card scratch-card-heart${revealed ? " is-revealed" : ""}`}
      style={{ "--heart-path": `path('${HEART_PATH}')` } as React.CSSProperties}
    >
      <div className="revealed-dates" aria-hidden={!revealed} aria-live="polite">
        <p>Nikah : 01/11/2026</p>
        <p>valima:03/11/2026</p>
      </div>

      <canvas
        ref={canvasRef}
        width={430}
        height={390}
        className="scratch-canvas"
        role="button"
        tabIndex={revealed ? -1 : 0}
        aria-label="Scratch to reveal the wedding dates, or press Enter"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setRevealed(true);
          }
        }}
        onPointerDown={(event) => {
          drawing.current = true;
          previous.current = null;
          setStarted(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          scratch(event);
        }}
        onPointerMove={scratch}
        onPointerUp={() => {
          drawing.current = false;
          previous.current = null;
        }}
        onPointerCancel={() => {
          drawing.current = false;
          previous.current = null;
        }}
      />

      {!started && !revealed && (
        <div className="scratch-label">
          <Sparkles size={23} strokeWidth={1} />
          <span>Save the dates</span>
          <small>Scratch to reveal</small>
        </div>
      )}
    </div>
  );
}
