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


def generate_index_page(entry_list):
    md = """\
# 旧 LBT Wikiに掲載していたコンテンツのアーカイブ

## このページは？
これは2017年ごろにlbt-wiki.webcrow.jp及びlbt-wiki.magcho.comに掲載していたコンテンツのアーカイブです。

上記のサイトが今後更新されることはありませんがリンクを残すために掲載を続けます。

コンテンツの内容に関しての連絡は(githubページ)[https://github.com/magcho/LBT_Wiki_Archive/issue]へお願いします。

## コンテンツ一覧
"""

    for entry in entry_list:


if __name__ == "__main__":
    entry_list = read_index_file()

    # for entry in entryList:
    #     title = entry["title"]
    #     id = entry["id"]
    #     html = load_html(id, entry["version"])
    #     md = html2text.html2text(html)

    #     try:
    #         with open("dataset/md/" + title + "-" + str(id) + ".md", "x") as fp:
    #             fp.writelines(md)
    #     except Exception as e:
    #         print(e)

    create_index_page(entry_list)
