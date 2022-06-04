import os

with open("dist/index.html", encoding='utf-8') as f:
    html = f.read()

js_file = list(filter(lambda x:x.endswith(".js"), os.listdir("dist/")))[0]

with open(f"dist/{js_file}", encoding='utf-8') as f:
    js = f.read()

html = html.replace(f'<script type="module" src="/editor/{js_file}"></script>', f'<script type="module">\n{js}\n</script>')

with open("dist/inkpad_editor.html", "wt", encoding='utf-8') as f:
    f.write(html)