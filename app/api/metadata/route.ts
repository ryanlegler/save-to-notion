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

const healRelativeLink = ({ imageUrl, websiteUrl }: { imageUrl: string; websiteUrl: string }) => {
    if (imageUrl.startsWith("http")) {
        return imageUrl;
    }
    const url = new URL(websiteUrl);
    return `${url.protocol}//${url.hostname}${imageUrl}`;
};

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

    if (!metaDataResponse?.metadata?.banner || !metaDataResponse?.metadata?.title) {
        const alternate = await fetch(`http://iframely.server.crestify.com/iframely?url=${url}`);

        const data = await alternate.json();

        const imageLink =
            data.links.find((value: { type: string }) => value.type.startsWith("image/"))?.href ||
            "";

        const mergedMetaData = {
            ...metaDataResponse,
            metadata: {
                ...metaDataResponse.metadata,
                banner: healRelativeLink({ imageUrl: imageLink, websiteUrl: url }),
            },
        };

        return NextResponse.json(mergedMetaData, {
            status: 200,
            headers: corsHeaders,
        });
    }

    const mergedMetaData = {
        ...metaDataResponse,
        metadata: {
            ...metaDataResponse.metadata,
            banner: healRelativeLink({
                imageUrl: metaDataResponse.metadata.banner,
                websiteUrl: url,
            }),
        },
    };

    return NextResponse.json(mergedMetaData, {
        status: 200,
        headers: corsHeaders,
    });
}
