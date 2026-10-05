#!/usr/bin/env python3
"""ABOUTME: Turns a Slides API dump of the deck plus its PDF export into content/presentation and public/slides.
ABOUTME: Usage: scripts/pull-deck.py <presentation.json> <deck.pdf>; shown slides only, in order, notes verbatim."""

import json
import pathlib
import re
import subprocess
import sys
from datetime import date


def runs(node, acc, skip_notes):
    if isinstance(node, dict):
        if "textRun" in node:
            acc.append(node["textRun"].get("content", ""))
        for key, value in node.items():
            if skip_notes and key == "notesPage":
                continue
            runs(value, acc, skip_notes)
    elif isinstance(node, list):
        for value in node:
            runs(value, acc, skip_notes)


# The employer is not named on the site (PRD 8, Michael 2026-10-05): any sentence naming it is dropped from the site copy.
EMPLOYER = re.compile(r"accenture", re.I)


def strip_employer(text: str) -> str:
    kept = [s for s in re.split(r"(?<=[.!?])\s+", text) if not EMPLOYER.search(s)]
    return " ".join(kept).strip()


def main() -> int:
    dump, pdf = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
    data = json.loads(dump.read_text())
    content = data.get("content", data)
    out_dir = pathlib.Path("public/slides")
    out_dir.mkdir(parents=True, exist_ok=True)
    for old in out_dir.glob("*.webp"):
        old.unlink()
    slides = []
    shown = 0
    for position, slide in enumerate(content["slides"], 1):
        if slide.get("slideProperties", {}).get("isSkipped"):
            continue
        shown += 1
        body: list[str] = []
        runs(slide, body, True)
        title = next((t.strip() for t in body if t.strip() and not t.strip().isdigit()), "")
        notes: list[str] = []
        runs(slide.get("slideProperties", {}).get("notesPage", {}), notes, False)
        note = re.sub(r"[ \t]+", " ", "".join(notes)).strip()
        note = strip_employer(note)
        stem = out_dir / f"{shown:02d}"
        subprocess.run(["pdftoppm", "-png", "-f", str(position), "-l", str(position), "-scale-to", "1280", "-singlefile", str(pdf), str(stem)], check=True)
        subprocess.run(["cwebp", "-quiet", "-q", "80", f"{stem}.png", "-o", f"{stem}.webp"], check=True)
        pathlib.Path(f"{stem}.png").unlink()
        slides.append({"n": shown, "slide": position, "objectId": slide["objectId"], "title": title, "notes": note, "image": f"/slides/{shown:02d}.webp"})
        print(f"\rslide {shown}", end="", file=sys.stderr)
    print(file=sys.stderr)
    pathlib.Path("content/presentation").mkdir(parents=True, exist_ok=True)
    pathlib.Path("content/presentation/slides.json").write_text(
        json.dumps({"presentationId": content["presentationId"], "revisionId": content["revisionId"], "read": date.today().isoformat(), "slides": slides}, indent=1, ensure_ascii=False) + "\n"
    )
    words = sum(len(s["notes"].split()) for s in slides)
    print(f"{shown} shown slides, {words} note words, revision {content['revisionId']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
