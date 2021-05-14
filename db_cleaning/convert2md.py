import json
import html2text
from pprint import pprint


def read_index_file():
    entry_list = []
    with open("./dataset/all_entry_list.json") as fp:
        all_entry_list = json.load(fp)
        entry_list = list(
            map(
                lambda entry: {
                    "id": entry["id"],
                    "title": entry["title"],
                    "category": entry["category"][0],
                    "version": entry["last-ver"],
                },
                all_entry_list,
            )
        )
    return entry_list


def load_html(id, version):
    with open("./dataset/entry/body/" + str(id) + "_" + str(version) + ".json") as fp:
        try:
            body = json.load(fp)
            return body["html"]
        except Exception as e:
            print(
                "json parse error:",
                "./dataset/entry/body/" + str(id) + "_" + str(version) + ".json",
                e,
            )


if __name__ == "__main__":
    entryList = read_index_file()

    for entry in entryList:
        title = entry["title"]
        id = entry["id"]
        html = load_html(id, entry["version"])
        md = html2text.html2text(html)

        try:
            with open("dataset/md/" + title + "-" + str(id) + ".md", "x") as fp:
                fp.writelines(md)
        except Exception as e:
            print(e)
