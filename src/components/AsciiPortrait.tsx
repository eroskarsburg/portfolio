"use client";

import { useEffect, useRef } from "react";

const RAMP = " .,:;-=+*#%@";
const GLITCH = "01<>/{}[]#$&@";
const LENS = 92;

type Cell = { x: number; y: number; ch: string; a: number; lum: number };

/**
 * Renders the portrait as red ASCII glyphs. Around the pointer, a circular
 * "x-ray" lens reveals the real photo and nearby glyphs scramble.
 */
export function AsciiPortrait({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new Image();
    img.src = src;

    let cells: Cell[] = [];
    let w = 0;
    let h = 0;
    let cell = 9;
    let drawRect = { x: 0, y: 0, w: 0, h: 0 };
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };
    let lensR = 0;
    let raf = 0;
    let visible = true;
    let start = performance.now();
    const mono =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jetbrains").trim() || "monospace";

    const build = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cell = w < 420 ? 7 : 9;

      // contain the image, anchored to bottom
      const scale = Math.min(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      drawRect = { x: (w - dw) / 2, y: h - dh, w: dw, h: dh };

      const cols = Math.floor(w / cell);
      const rows = Math.floor(h / cell);
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, drawRect.x / cell, drawRect.y / cell, dw / cell, dh / cell);
      const data = octx.getImageData(0, 0, cols, rows).data;

      // histogram-equalize luminance over opaque pixels so dark photos keep detail
      const hist = new Array(256).fill(0);
      let count = 0;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 40) continue;
        hist[Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2])]++;
        count++;
      }
      let lo = 255;
      let hi = 0;
      for (let v = 0; v < 256; v++) {
        if (hist[v]) {
          lo = Math.min(lo, v);
          hi = v;
        }
      }
      const cdf = new Array(256);
      let acc = 0;
      for (let v = 0; v < 256; v++) {
        acc += hist[v];
        cdf[v] = acc / Math.max(1, count);
      }

      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const a = data[i + 3] / 255;
          if (a < 0.15) continue;
          const raw = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
          // blend equalized + linear so the face keeps internal contrast
          const lum = 0.45 * cdf[raw] + 0.55 * ((raw - lo) / Math.max(1, hi - lo));
          const idx = Math.max(1, Math.min(RAMP.length - 1, Math.round(lum * (RAMP.length - 1))));
          cells.push({ x: c * cell + cell / 2, y: r * cell + cell / 2, ch: RAMP[idx], a, lum });
        }
      }
    };

    const draw = (now: number) => {
      const time = (now - start) / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.18;
      pointer.y += (pointer.ty - pointer.y) * 0.18;
      lensR += ((pointer.active ? LENS : 0) - lensR) * 0.12;

      ctx.clearRect(0, 0, w, h);
      ctx.font = `600 ${cell + 1}px ${mono}, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // reveal intro: rows appear top -> bottom
      const reveal = reduced ? 1 : Math.min(1, time / 1.6);
      const revealY = reveal * (h + 40);

      for (const p of cells) {
        if (p.y > revealY) continue;
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < lensR - 4) continue; // photo shows through here

        let ch = p.ch;
        let alpha = (0.22 + p.lum * 0.78) * p.a;
        let color = p.lum > 0.9 ? "255,170,178" : p.lum > 0.72 ? "246,82,102" : "224,33,58";
        const ring = lensR + 46;
        if (dist < ring && lensR > 1) {
          const k = 1 - (dist - lensR) / 46;
          if (Math.random() < k * 0.6) ch = GLITCH[(Math.random() * GLITCH.length) | 0];
          color = "243,238,231";
          alpha = Math.min(1, alpha + k * 0.6);
        } else if (!reduced) {
          // slow scan line sweeping down
          const scan = ((time * 120) % (h + 200)) - 100;
          const sd = Math.abs(p.y - scan);
          if (sd < 18) alpha = Math.min(1, alpha + (1 - sd / 18) * 0.5);
        }
        if (revealY - p.y < 30) {
          ch = GLITCH[(Math.random() * GLITCH.length) | 0];
          color = "243,238,231";
        }
        ctx.fillStyle = `rgba(${color},${alpha})`;
        ctx.fillText(ch, p.x, p.y);
      }

      if (lensR > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, lensR, 0, Math.PI * 2);
        ctx.clip();
        ctx.filter = "grayscale(0.35) contrast(1.15)";
        ctx.drawImage(img, drawRect.x, drawRect.y, drawRect.w, drawRect.h);
        ctx.filter = "none";
        ctx.restore();
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, lensR, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(224,33,58,0.9)";
        ctx.lineWidth = 1;
        ctx.stroke();
        // crosshair ticks
        ctx.beginPath();
        for (const [ax, ay] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          ctx.moveTo(pointer.x + ax * (lensR + 4), pointer.y + ay * (lensR + 4));
          ctx.lineTo(pointer.x + ax * (lensR + 14), pointer.y + ay * (lensR + 14));
        }
        ctx.stroke();
      }

      if (visible) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
      if (!pointer.active) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const ro = new ResizeObserver(() => img.complete && build());
    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) raf = requestAnimationFrame(draw);
    });

    img.onload = () => {
      build();
      start = performance.now();
      ro.observe(wrap);
      io.observe(wrap);
      raf = requestAnimationFrame(draw);
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerup", (e) => e.pointerType !== "mouse" && onLeave());

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [src]);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Retrato de Eros Karsburg em ASCII"
        className="absolute inset-0 touch-pan-y"
        data-hover
      />
    </div>
  );
}
