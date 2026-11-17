import os, re, glob, collections

files = sorted(glob.glob("*.html"))
issues = []

def add(sev, f, msg):
    issues.append((sev, f, msg))

raw = {}
for f in files:
    raw[f] = open(f, encoding="utf-8").read()

# 1. link + anchor check
href_re = re.compile(r'(?:href|src)="([^"]*)"')
for f, txt in raw.items():
    for href in href_re.findall(txt):
        if href.startswith(("mailto:", "http://", "https://", "tel:")):
            continue
        if href == "#":
            add("HIGH", f, "dead link href='#'")
            continue
        if href == "":
            add("HIGH", f, "empty href")
            continue
        if href.startswith("#"):
            target_file, anchor = f, href[1:]
        else:
            parts = href.split("#", 1)
            target_file = parts[0]
            anchor = parts[1] if len(parts) > 1 else None
            if not os.path.exists(target_file):
                add("CRITICAL", f, f"broken link -> {href} (file missing)")
                continue
        if anchor:
            if f'"{anchor}"' not in raw.get(target_file, ""):
                add("CRITICAL", f, f"missing anchor #{anchor} in {target_file}")

# 2. duplicate ids
for f, txt in raw.items():
    ids = re.findall(r'id="([^"]+)"', txt)
    for i, c in collections.Counter(ids).items():
        if c > 1:
            add("HIGH", f, f"duplicate id '{i}' x{c}")

# 3. escaping artifacts
for f, txt in raw.items():
    if '\\"' in txt:
        add("HIGH", f, 'literal backslash-quote in output')
    if "&amp;amp;" in txt or "&amp;#39;" in txt:
        add("MED", f, "double-escaped entity")

# 4. tag balance
tag_re = re.compile(r"<(/?)([a-zA-Z][a-zA-Z0-9]*)\b[^>]*?(/?)>")
void = {"meta","link","br","hr","img","input","source","col","area","base","wbr","circle","line","rect","path","use","stop","polygon","polyline","ellipse"}
for f, txt in raw.items():
    counts = collections.Counter()
    for m in tag_re.finditer(txt):
        closing, tag, selfclose = m.group(1), m.group(2).lower(), m.group(3)
        if tag in void or selfclose:
            continue
        counts[tag] += -1 if closing else 1
    for tag, n in counts.items():
        if n != 0:
            add("HIGH", f, f"unbalanced <{tag}> (net {n:+d})")

# 5. document requirements
for f, txt in raw.items():
    if "<html" not in txt or 'lang=' not in txt:
        add("MED", f, "missing lang attribute")
    if "<title>" not in txt:
        add("MED", f, "missing <title>")
    if 'name="description"' not in txt:
        add("LOW", f, "missing meta description")
    if 'name="viewport"' not in txt:
        add("MED", f, "missing viewport meta")

# 6. svg accessibility
for f, txt in raw.items():
    for m in re.finditer(r"<svg\b[^>]*>", txt):
        tag = m.group(0)
        if 'role="img"' in tag and "aria-label" not in tag:
            add("MED", f, "svg role=img without aria-label")
        if 'role="img"' not in tag and "aria-hidden" not in tag:
            add("LOW", f, "svg without role or aria-hidden")

# 7. forms
for f, txt in raw.items():
    for m in re.finditer(r"<form\b[^>]*>", txt):
        add("INFO", f, f"form found: {m.group(0)[:90]}")
    for m in re.finditer(r"<label[^>]*for=\"([^\"]+)\"", txt):
        fid = m.group(1)
        if f'id="{fid}"' not in txt:
            add("HIGH", f, f"label for='{fid}' has no matching input id")

# 8. css/js classes spot check
css = open("styles.css", encoding="utf-8").read()
used = set()
for f, txt in raw.items():
    for cm in re.findall(r'class="([^"]+)"', txt):
        used.update(cm.split())
defined = set(re.findall(r"\.([A-Za-z][\w-]*)", css))
missing = sorted(u for u in used if u not in defined)
if missing:
    add("MED", "styles.css", f"classes used but not styled: {', '.join(missing)}")

# 9. footer/header consistency
for f, txt in raw.items():
    if '<footer class="footer">' not in txt:
        add("MED", f, "no footer")
    if 'class="header"' not in txt:
        add("MED", f, "no header")
    if "main.js" not in txt:
        add("MED", f, "main.js not referenced")
    if "styles.css" not in txt:
        add("MED", f, "styles.css not referenced")

sev_order = {"CRITICAL": 0, "HIGH": 1, "MED": 2, "LOW": 3, "INFO": 4}
issues.sort(key=lambda x: (sev_order[x[0]], x[1]))
for sev, f, msg in issues:
    print(f"[{sev}] {f}: {msg}")
print(f"\nTotal: {len(issues)} findings across {len(files)} files")
