
# Prerequisites
## API Key
Setup a notion integration, taking note of the "NOTION_API_KEY" associated with this integration
::screenshot here::

## Notion Database
Configure a database in potion with the following properties name and type combinations:
1. Name: `string`- i think this uses the built in id...
1. Url: `Url`
1. Image: `File`
1. Description: `string`

Add a the connection to your database using the "Add Connection' menu item.

Find your database ID

## Local Setup
Configure a `.env` at the project root containing the following secrets:

```bash
NOTION_API_KEY=""
NOTION_BOOKMARKS_DATABASE_ID=""

```
## Develop + Local testing

First, run the development server:

```bash
pnpm dev
# or
```




Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
