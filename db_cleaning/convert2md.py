import json
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


if __name__ == "__main__":
    read_index_file()
