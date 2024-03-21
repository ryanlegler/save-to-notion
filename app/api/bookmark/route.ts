import { notion } from "@/lib/notion";
import { NextRequest } from "next/server";
import { PartialDatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { isValidUrl } from "@/utils/isValidUrl";
import { generatePageParams } from "@/utils/generatePageParams";

export type Properties = PartialDatabaseObjectResponse["properties"];

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

    // generate the bookmark object
    const bookmark = await generatePageParams(url);

    await notion.pages.create(bookmark);

    try {
        return new Response("Request Complete", {
            status: 200,
        });
    } catch (e) {
        return new Response("Request cannot be processed!", {
            status: 400,
        });
    }
}
