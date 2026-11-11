"use client";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker } from "leaflet";

// Lets the client point at the job site: click the map, drag the pin, search an address
// or use their device location. Sends lat / lng / address with the form as hidden fields.
// Map tiles and address lookups come from OpenStreetMap (free, no API key).

type Point = { lat: number; lng: number };
const FRANCE: [number, number] = [46.6, 2.4];
const NOMINATIM = "https://nominatim.openstreetmap.org";

export default function LocationPicker() {
  const mapEl = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const marker = useRef<Marker | null>(null);
  const placePin = useRef<(p: Point, zoom: boolean) => void>(() => {});
  const lookupId = useRef(0);

  const [point, setPoint] = useState<Point | null>(null);
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [mapReady, setMapReady] = useState(false); // false until Leaflet and the first map tiles are in

  // Setters are stable, so the map's event handlers can safely call this.
  function pick(p: Point, opts: { zoom?: boolean; address?: string } = {}) {
    placePin.current(p, !!opts.zoom);
    setPoint(p);
    setNote("");
    const id = ++lookupId.current;
    if (opts.address) {
      setAddress(opts.address);
      return;
    }
    setAddress("");
    fetch(`${NOMINATIM}/reverse?format=jsonv2&zoom=18&accept-language=fr&lat=${p.lat}&lon=${p.lng}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (id === lookupId.current && d?.display_name) setAddress(d.display_name);
      })
      .catch(() => {});
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current) return;
      const m = L.map(mapEl.current, { scrollWheelZoom: false }).setView(FRANCE, 5);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      })
        .once("load", () => setMapReady(true))
        .addTo(m);
      setTimeout(() => setMapReady(true), 6000); // never leave the spinner up if tiles are slow
      const icon = L.divIcon({ className: "", html: '<span class="map-pin"></span>', iconSize: [22, 22], iconAnchor: [11, 27] });

      placePin.current = (p, zoom) => {
        if (!marker.current) {
          marker.current = L.marker(p, { icon, draggable: true, title: "Lieu du chantier" }).addTo(m);
          marker.current.on("dragend", () => {
            const ll = marker.current!.getLatLng();
            pick({ lat: ll.lat, lng: ll.lng });
          });
        } else {
          marker.current.setLatLng(p);
        }
        if (zoom) m.setView(p, Math.max(m.getZoom(), 16));
      };
      m.on("click", (e) => pick({ lat: e.latlng.lat, lng: e.latlng.lng }));
      map.current = m;
    })();
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      marker.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function search() {
    const q = query.trim();
    if (q.length < 3 || busy) return;
    setBusy(true);
    setNote("");
    try {
      const r = await fetch(`${NOMINATIM}/search?format=jsonv2&limit=1&countrycodes=fr&accept-language=fr&q=${encodeURIComponent(q)}`);
      const [hit] = r.ok ? await r.json() : [];
      if (hit) pick({ lat: Number(hit.lat), lng: Number(hit.lon) }, { zoom: true, address: hit.display_name });
      else setNote("Adresse introuvable. Essayez avec la ville, ou cliquez sur la carte.");
    } catch {
      setNote("La recherche ne répond pas. Cliquez directement sur la carte.");
    } finally {
      setBusy(false);
    }
  }

  function locate() {
    if (!navigator.geolocation) return setNote("Votre appareil ne permet pas la géolocalisation.");
    setBusy(true);
    setNote("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setBusy(false);
        pick({ lat: pos.coords.latitude, lng: pos.coords.longitude }, { zoom: true });
      },
      () => {
        setBusy(false);
        setNote("Position indisponible. Cherchez l’adresse ou cliquez sur la carte.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  function clear() {
    lookupId.current++;
    marker.current?.remove();
    marker.current = null;
    setPoint(null);
    setAddress("");
    setNote("");
  }

  const btn = "rounded border border-steel/30 bg-white px-3 py-2 text-sm font-semibold hover:border-mark disabled:opacity-60";

  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-semibold">
        Lieu du chantier <span className="font-normal text-ink/70">(facultatif)</span>
      </legend>
      <div className="flex gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // search instead of submitting the whole form
              search();
            }
          }}
          placeholder="Adresse ou ville"
          aria-label="Rechercher l’adresse du chantier"
          maxLength={200}
          className="min-w-0 flex-1 rounded border border-steel/30 bg-white px-3 py-2 text-base focus:border-mark"
        />
        <button type="button" onClick={search} disabled={busy} className={`${btn} inline-flex items-center gap-2`}>
          {busy && <span className="spinner" aria-hidden="true" />}Chercher
        </button>
      </div>
      <div className="relative">
        <div ref={mapEl} className="h-60 w-full overflow-hidden rounded border border-steel/30 bg-board" />
        {!mapReady && (
          <div className="absolute inset-0 z-[500] flex flex-col items-center justify-center gap-3 rounded bg-board text-sm font-semibold text-ink/70" role="status">
            <span className="spinner text-2xl text-mark" aria-hidden="true" />
            Chargement de la carte…
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <button type="button" onClick={locate} disabled={busy} className={btn}>Utiliser ma position</button>
        {point && <button type="button" onClick={clear} className="font-semibold text-mark underline">Effacer</button>}
      </div>
      <p className="text-sm text-ink/75" aria-live="polite">
        {note ||
          (point
            ? `Repère placé : ${address || `${point.lat.toFixed(5)}, ${point.lng.toFixed(5)}`}`
            : "Cliquez sur la carte pour placer un repère, puis déplacez-le si besoin.")}
      </p>
      <input type="hidden" name="lat" value={point ? point.lat.toFixed(6) : ""} />
      <input type="hidden" name="lng" value={point ? point.lng.toFixed(6) : ""} />
      <input type="hidden" name="address" value={address} />
    </fieldset>
  );
}
