import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Maximize, Minimize } from "lucide-react";

/**
 * Canvas component separated from editor.
 * Props: { map, setMap, nodes, edges, selected, setSelected }
 */
export default function MindCanvas({ map, setMap, nodes, edges, selected, setSelected }) {
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const dragging = useRef(null);
    const panning = useRef(false);

    const onWheel = (e) => {
        e.preventDefault();
        const z = Math.min(2, Math.max(0.5, zoom - e.deltaY * 0.001));
        setZoom(z);
    };
    const onMouseDown = (e) => {
        if (e.target.closest('[data-node]')) return;
        panning.current = true;
    };
    const onMouseUp = () => { panning.current = false; dragging.current = null; };
    const onMouseMove = (e) => {
        if (panning.current) setPan((p) => ({ x: p.x + e.movementX, y: p.y + e.movementY }));
        if (dragging.current && map) {
            const id = dragging.current;
            const pt = screenToWorld(e.clientX, e.clientY, zoom, pan);
            setMap((m) => ({ ...m, root: setNodePos(m.root, id, pt.x - 80, pt.y - 24) }));
        }
    };

    const screenToWorld = (sx, sy, z, p) => ({ x: (sx - window.innerWidth / 2 - p.x) / z, y: (sy - 144 - p.y) / z });

    return (
        <div className="relative bg-[radial-gradient(ellipse_at_top_left,#eef2ff,transparent_60%)]">
            <svg id="mindmap-svg" className="h-[calc(100vh-3.5rem-4rem)] w-full" onWheel={onWheel} onMouseMove={onMouseMove} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
                <g transform={`translate(${pan.x + window.innerWidth / 2},${pan.y + 144}) scale(${zoom})`}>
                    {edges.map((e, i) => (
                        <line key={i} x1={(e.from.x || 0) + 80} y1={(e.from.y || 0) + 24} x2={(e.to.x || 0) + 80} y2={(e.to.y || 0) + 24} stroke="#94a3b8" strokeWidth={1.2} />
                    ))}
                    {nodes.map((n) => (
                        <foreignObject key={n.id} x={n.x || 0} y={n.y || 0} width={160} height={48} data-node>
                            <div
                                onMouseDown={(e) => { dragging.current = n.id; setSelected(n.id); e.stopPropagation(); }}
                                className={`select-none cursor-move rounded-xl border bg-white shadow-md px-3 py-2 ${selected === n.id ? "ring-2 ring-indigo-500" : ""}`}
                                style={{
                                    borderColor: n.color || "rgba(15,23,42,0.06)",
                                    fontFamily: "'Poppins', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    {n.emoji && <span className="text-lg leading-none">{n.emoji}</span>}
                                    <span className="text-sm font-medium truncate" title={n.title}>{n.title}</span>
                                </div>
                            </div>
                        </foreignObject>
                    ))}
                </g>
            </svg>

            {/* Zoom controls */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border bg-white/80 backdrop-blur px-2 py-1 shadow-sm">
                <Button size="icon" variant="ghost" onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}><Minimize className="h-4 w-4" /></Button>
                <span className="text-xs w-10 text-center">{Math.round(zoom * 100)}%</span>
                <Button size="icon" variant="ghost" onClick={() => setZoom((z) => Math.min(2, z + 0.1))}><Maximize className="h-4 w-4" /></Button>
            </div>

            {/* Minimap (simple) */}
            <div className="absolute bottom-3 right-3 rounded-md border bg-white/80 backdrop-blur p-2 shadow">
                <svg width={200} height={120}>
                    {/** Simple bounding box + nodes */}
                    <g transform={`translate(0,0)`}>
                        {nodes.map((n) => (<rect key={n.id} x={(n.x || 0) / 4 + 10} y={(n.y || 0) / 4 + 10} width={40} height={12} rx={6} fill="#e2e8f0" />))}
                    </g>
                </svg>
            </div>
        </div>
    );
}

/* setNodePos helper same as in editor (small duplication so MindCanvas is self-contained) */
function find(n, id) { if (n.id === id) return n; for (const c of n.children) { const f = find(c, id); if (f) return f; } return null; }
function setNodePos(root, id, x, y) { const node = find(root, id); if (!node) return root; node.x = x; node.y = y; node.pinned = true; return structuredClone(root); }
