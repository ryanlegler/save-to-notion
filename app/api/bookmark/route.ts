import { notion } from "@/lib/notion";
import { NextRequest } from "next/server";
import metaFetcher from "meta-fetcher";

import {
    CreatePageParameters,
    PartialDatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type Properties = PartialDatabaseObjectResponse["properties"];

export const runtime = "edge";

const isValidUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

export async function POST(request: NextRequest) {
    const { url } = await request.json();

    if (!isValidUrl(url)) {
        return new Response("Invalid URL", {
            status: 400,
        });
    }
    const result = await metaFetcher(url);

    console.warn(
        "process.env.NOTION_BOOKMARKS_DATABASE_ID",
        process.env.NOTION_BOOKMARKS_DATABASE_ID
    );

    const bookmark: CreatePageParameters = {
        parent: {
            database_id: process.env.NOTION_BOOKMARKS_DATABASE_ID as string,
        },
        properties: {
            Name: {
                title: [
                    {
                        type: "text",
                        text: {
                            content: result?.metadata?.title,
                        },
                    },
                ],
            },
            Description: {
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: result?.metadata?.description || "",
                        },
                    },
                ],
            },
            Image: {
                type: "files",
                files: [
                    {
                        name: "favicon",
                        type: "external",
                        external: {
                            url: result?.metadata?.banner || result?.favicons[0],
                        },
                    },
                ],
            },
            Url: {
                url: url,
            },
        },
    };

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
