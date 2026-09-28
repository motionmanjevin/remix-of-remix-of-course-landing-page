# Project architecture rules

- Keep high-volume UAESP reference coordinates in a curated typed data module and render them as clustered Mapbox layers, because thousands of DOM markers would obscure worker operations and hurt performance.
