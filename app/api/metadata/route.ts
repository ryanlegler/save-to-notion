import { NextRequest, NextResponse } from "next/server";
import { isValidUrl } from "@/utils/isValidUrl";
import metaFetcher from "meta-fetcher";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url") || "";

  if (!isValidUrl(url)) {
    return new Response("Invalid URL", {
      status: 400,
      headers: corsHeaders,
    });
  }

  const metaDataResponse = await metaFetcher(url);

  if (!metaDataResponse?.metadata?.banner) {
    const alternate = await fetch(
      `http://iframely.server.crestify.com/iframely?url=${url}`
    );

    const data = await alternate.json();
    const imageLink =
      data.links.find((value: { type: string }) =>
        value.type.startsWith("image/")
      )?.href || "";

    const mergedMetaData = {
      ...metaDataResponse,
      metadata: {
        ...metaDataResponse.metadata,
        banner: imageLink,
      },
    };

    return NextResponse.json(mergedMetaData, {
      status: 200,
      headers: corsHeaders,
    });
  }

  return NextResponse.json(metaDataResponse, {
    status: 200,
    headers: corsHeaders,
  });
}
