// Legacy case-study and project URLs now resolve to the curated Case Studies index.
const LEGACY_CASE_URL =
  /^\/(?:case-studies(?:\/.*)?|case-study(?:\/.*)?|projects?(?:\/.*)?|portfolio(?:\/.*)?)$/i;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (LEGACY_CASE_URL.test(url.pathname)) {
      return Response.redirect(new URL("/case-studies.html", url).toString(), 301);
    }

    // Serve static assets from the ASSETS binding
    return env.ASSETS.fetch(request);
  },
};
