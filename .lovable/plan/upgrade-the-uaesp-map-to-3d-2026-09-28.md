# Upgrade the UAESP map to 3D

## Changes
- Replace the flat dark map with a pitched, satellite-style Bogotá view using terrain relief and extruded 3D buildings.
- Preserve every existing worker marker, route, destination label, selection interaction, and status state above the 3D scene.
- Add a compact map control to switch between the operational 3D view and a top-down view, plus reset orientation through the existing navigation controls.
- Use the uploaded UAESP latitude/longitude guide to show a restrained set of real large-waste-generator locations near the active view, with identifiable place tags that do not overwhelm worker information.
- Update the map legend so workers, destinations, routes, and large generators remain distinguishable.

## Technical details
- Configure Mapbox terrain, sky/atmosphere, pitch, bearing, antialiasing, and 3D building extrusion while retaining the current public Mapbox token.
- Parse a curated coordinate sample from the uploaded 7,456-row guide into lightweight frontend data; do not ship or render thousands of DOM markers.
- Render generator locations as a clustered map layer, with labels/details available on interaction and worker markers kept visually dominant.
- Keep the rest of the dashboard and its mock workforce behavior unchanged.
- Verify the map visually on desktop and mobile, including selection fly-to, tilt controls, marker readability, and clean browser/build logs.
