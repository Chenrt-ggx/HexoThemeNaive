import os


def solve(name):
    os.chdir(name)
    for i in os.listdir():
        if i.startswith('app.') and i.endswith('.' + name):
            os.rename(i, 'app.' + name)
        if i.startswith('chunk-vendors.') and i.endswith('.' + name):
            os.rename(i, 'chunk-vendors.' + name)
    os.chdir('../')


def clean():
    for i in os.listdir():
        if i.endswith('.html') or i.endswith('.py') or i.endswith('.svg'):
            os.remove(i)


if __name__ == '__main__':
    solve('js')
    solve('css')
    clean()
