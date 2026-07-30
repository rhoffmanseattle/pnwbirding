// Leaflet's default icon paths break under bundlers; wire them up explicitly.
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

export const markerIcon = L.icon({
  iconUrl: iconUrl.src ?? iconUrl,
  iconRetinaUrl: iconRetinaUrl.src ?? iconRetinaUrl,
  shadowUrl: shadowUrl.src ?? shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
