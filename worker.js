/*
 * Cloudflare Worker: the app itself is served as static assets (see wrangler.jsonc).
 * Firmware packages are bigger than the 25 MiB a static asset can be, so they live in the
 * R2 bucket and this worker serves them at the same path the page asks for: firmware/<file>.dashfw.
 */
export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const match = pathname.match(/^\/firmware\/([^/]+\.dashfw)$/);
    if (!match || (request.method !== 'GET' && request.method !== 'HEAD')) return env.ASSETS.fetch(request);

    const key = decodeURIComponent(match[1]);
    const object = request.method === 'HEAD'
      ? await env.FIRMWARE.head(key)
      : await env.FIRMWARE.get(key, { onlyIf: request.headers });
    // The page says "not published yet" on a 404
    if (!object) return new Response('Not found', { status: 404 });

    const headers = new Headers({
      'content-type': 'application/octet-stream',
      'content-length': String(object.size),
      'cache-control': 'no-cache',
      etag: object.httpEtag,
    });
    // get() returns the object without a body when the browser's copy is still current
    if (request.method === 'GET' && !('body' in object)) {
      headers.delete('content-length');
      return new Response(null, { status: 304, headers });
    }
    return new Response(request.method === 'HEAD' ? null : object.body, { headers });
  },
};
