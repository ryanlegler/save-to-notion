import {
    PageObjectResponse,
    PartialDatabaseObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type Properties = PartialDatabaseObjectResponse["properties"];

const temp: Properties = {};
export type Property = (typeof temp)[""];
export type PropertyType =
    | "multi_select"
    | "url"
    | "date"
    | "title"
    | "text"
    | "rich_text"
    | "checkbox"
    | "select"
    | "number"
    | "status"
    | "email"
    | "created_time"
    | "phone_number";

export type Option = {
    id: string;
    name: string;
    color: string;
};

export type PropertyResponse1 = PageObjectResponse["properties"];
const temp2: PropertyResponse1 = {};
export type PropertyResponse = (typeof temp2)[""];
export type Item = {
    id: string;
    imageUrl?: string;
    userId: string;
    name: string;
    properties: PropertyResponse[];
};

type PropertyTypeExhaustive = Properties[""]["type"];

// | "number"
// | "multi_select"
// | "date"
// | "title"
// | "formula"
// | "select"
// | "status"
// | "relation"
// | "rollup"
// | "rich_text"
// | "url"
// | "people"
// | "files"
// | "email"
// | "phone_number"
// | "checkbox"
// | "created_by"
// | "created_time"
// | "last_edited_by"
// | "last_edited_time";
