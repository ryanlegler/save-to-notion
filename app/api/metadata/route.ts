import { NextRequest } from "next/server";

import { isValidUrl } from "@/utils/isValidUrl";

import metaFetcher from "meta-fetcher";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  return new Response("Hello", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });

  // could add other properties here on the body to include notion DB
  // const { url } = await request.json();

  // // early return if url is not valid
  // if (!isValidUrl(url)) {
  //   return new Response("Invalid URL", {
  //     status: 400,
  //   });
  // }

  // const metaData = await metaFetcher(url);

  // try {
  //   return new Response(JSON.stringify(metaData), {
  //     status: 200,
  //   });
  // } catch (e) {
  //   return new Response("Request cannot be processed!", {
  //     status: 400,
  //   });
  // }
}
