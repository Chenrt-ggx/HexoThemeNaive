import os
import json
from rand import *

with open('config.json', 'r', encoding='utf-8') as config_file:
    config = json.loads(config_file.read())


def init() -> None:
    os.system('rm -rf source')
    os.mkdir('source')
    os.mkdir('source/_posts')


def generate(date: datetime.date, time: datetime.time) -> None:
    tags = rand_tag(
        config['tags']['total'],
        config['tags']['iterate'],
        config['tags']['none']
    )
    categories = rand_category(
        config['categories']['total'],
        config['categories']['iterate'],
        config['categories']['none']
    )
    title = rand_title(
        config['word']['from'],
        config['word']['to'],
        config['word']['iterate']
    )
    header = [
        '---',
        'title: ' + title,
        'date: ' + date.strftime('%Y-%m-%d') + ' ' + time.strftime('%H:%M:%S'),
        'categories: ' + ('~' if categories is None else json.dumps(categories).replace('\"', '')),
        'tag: ' + ('~' if tags is None else json.dumps(tags).replace('\"', '')),
        '---'
    ]
    with open('source/_posts/' + title + '.md', 'w', encoding='utf-8') as file:
        file.write('\n'.join(header) + '\n')
        file.write('\n'.join(['', rand_sentence(
            config['word']['from'],
            config['word']['to']
        ), '']) + '\n')
        file.write(rand_paragraphs(
            config['word']['from'],
            config['word']['to'],
            config['word']['iterate'],
            config['paragraph']['from'],
            config['paragraph']['to'],
            config['paragraph']['iterate']
        ))


def solve() -> None:
    left = datetime.date.fromisoformat(config['date']['from'])
    right = datetime.date.fromisoformat(config['date']['to'])
    dates = rand_dates(left, right, config['date']['total'])
    iterate = config['date']['iterate']
    for i in dates:
        percent = 1
        while rand_percent(percent):
            percent *= iterate
            generate(i, rand_time())


if __name__ == '__main__':
    init()
    solve()
