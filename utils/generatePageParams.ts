import { CreatePageParameters } from "@notionhq/client/build/src/api-endpoints";
import metaFetcher from "meta-fetcher";
// get the type of the returned object from metaFetcher
// import type { MetaFetcherResult } from "meta-fetcher";
export async function generatePageParams(url: string) {
    // get meta-data from the url
    const result = await metaFetcher(url);

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

    return bookmark;
}
