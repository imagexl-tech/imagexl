import { useRef, useState } from "react";

interface Props {
  images: string[];
  startIndex: number;
  alt: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const STEP = 0.5;

export default function ImageLightbox({ images, startIndex, alt, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function resetZoom() {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }

  function go(delta: number) {
    setIndex((i) => (i + delta + images.length) % images.length);
    resetZoom();
  }

  function zoomIn() {
    setScale((s) => Math.min(MAX_SCALE, s + STEP));
  }

  function zoomOut() {
    setScale((s) => {
      const next = Math.max(MIN_SCALE, s - STEP);
      if (next === MIN_SCALE) setPos({ x: 0, y: 0 });
      return next;
    });
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (scale === 1) return;
    dragging.current = true;
    setIsDragging(true);
    last.current = { x: e.clientX, y: e.clientY };
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({ x: p.x + dx, y: p.y + dy }));
  }

  function stopDrag() {
    dragging.current = false;
    setIsDragging(false);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Zoom controls — deliberately buttons, not scroll/pinch, so this
          never fights the browser's own page-zoom gesture. */}
      <div
        className="absolute left-4 top-4 z-10 flex gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={zoomOut}
          disabled={scale <= MIN_SCALE}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 disabled:opacity-30"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          onClick={zoomIn}
          disabled={scale >= MAX_SCALE}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 disabled:opacity-30"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
            aria-label="Next photo"
          >
            ›
          </button>
        </>
      )}

      <div
        className="flex h-full w-full items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onDoubleClick={() => (scale > 1 ? resetZoom() : setScale(2))}
      >
        <img
          src={images[index]}
          alt={`${alt} — photo ${index + 1} of ${images.length}`}
          className="max-h-[85vh] max-w-[90vw] select-none"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
          draggable={false}
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {index + 1} / {images.length} · use +/− to zoom · drag to pan
        </div>
      )}
    </div>
  );
}
