// Proxies the eBird API so the key stays server-side.
// GET /api/ebird?locId=L162766  ->  recent observations at that hotspot (last 30 days)

const ALLOWED_LOC_IDS = new Set([
  'L162766', // Union Bay Natural Area
  'L128530', // Discovery Park
  'L195645', // Seward Park
  'L269461', // Magnuson Park
  'L232479', // Juanita Bay Park
  'L351484', // Marymoor Park
  'L374382', // Edmonds Waterfront
  'L374380', // Edmonds Marsh
  'L282253', // Billy Frank Jr. Nisqually NWR
  'L109534', // Crockett Lake
  'L773216', // Fort Ebey State Park
  'L29690471', // Dungeness NWR
]);

export default async (request) => {
  const url = new URL(request.url);
  const locId = url.searchParams.get('locId') || '';

  if (!ALLOWED_LOC_IDS.has(locId)) {
    return Response.json({ error: 'Unknown location' }, { status: 400 });
  }

  const key = process.env.EBIRD_API_KEY;
  if (!key) {
    return Response.json({ error: 'Server not configured' }, { status: 500 });
  }

  const upstream = await fetch(
    `https://api.ebird.org/v2/data/obs/${locId}/recent?back=30`,
    { headers: { 'X-eBirdApiToken': key } }
  );

  if (!upstream.ok) {
    return Response.json({ error: 'eBird unavailable' }, { status: 502 });
  }

  const data = await upstream.json();
  // Trim to what the page needs.
  const slim = data.map((o) => ({
    name: o.comName,
    sci: o.sciName,
    date: o.obsDt,
    count: o.howMany ?? null,
  }));

  return Response.json(slim, {
    headers: {
      // Cache at the CDN for 30 minutes; serve stale while revalidating.
      'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
};
