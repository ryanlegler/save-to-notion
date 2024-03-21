import { NextRequest } from "next/server";

import { isValidUrl } from "@/utils/isValidUrl";

import metaFetcher from "meta-fetcher";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  // could add other properties here on the body to include notion DB
  const { url } = await request.json();

  // early return if url is not valid
  if (!isValidUrl(url)) {
    return new Response("Invalid URL", {
      status: 400,
    });
  }

  const metaData = await metaFetcher(url);

  try {
    return new Response(JSON.stringify(metaData), {
      status: 200,
    });
  } catch (e) {
    return new Response("Request cannot be processed!", {
      status: 400,
    });
  }
}
