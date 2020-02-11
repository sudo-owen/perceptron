import argparse
import os
from misaka import Markdown, HtmlRenderer

def to_html(file_path):
  with open(file_path, 'r+') as f:
    p = f.read()
    r = HtmlRenderer()
    md = Markdown(r, extensions=('fenced-code','math', 'math-explicit'))
    html = md(p)
    file_name = os.path.splitext(file_path)[0] + '.html'
    with open(file_name, 'w') as outfile:
      outfile.write(html)

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('file_path', nargs=1)
  file_path = parser.parse_args().file_path[0]
  to_html(file_path)
