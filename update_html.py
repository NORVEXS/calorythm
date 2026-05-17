#!/usr/bin/env python3
"""
Idempotent script to update all existing HTML files.
- Injects AdSense + GA4 before </head> (only if not already present)
- Replaces footer-bottom with version including legal links
- Updates home title, meta description, and adds manifest link
- Adds manifest link to subpages
- Adds AdSense ad units before </main> in calculator pages (not home, not tmb)
"""
import re
import os

BASE = "/home/auceda/RubymineProjects/calculadora IMC"

ADSENSE_GA4 = """\
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9067348148288028" crossorigin="anonymous"></script>
  <!-- Google Analytics 4 — reemplaza G-XXXXXXXXXX con tu Measurement ID -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script>"""

FOOTER_HOME = """    <div class="footer-bottom">
      <p>© 2026 Calorythm · Todos los derechos reservados.</p>
      <p>Solo orientativo · No sustituye el consejo médico · Criterios OMS</p>
      <nav aria-label="Aviso legal" style="margin-top:0.5rem;display:flex;gap:1.25rem;flex-wrap:wrap;justify-content:center">
        <a href="./privacidad/" style="color:var(--text-muted);font-size:0.8rem;text-decoration:none">Privacidad</a>
        <a href="./aviso-legal/" style="color:var(--text-muted);font-size:0.8rem;text-decoration:none">Aviso Legal</a>
        <a href="./cookies/" style="color:var(--text-muted);font-size:0.8rem;text-decoration:none">Cookies</a>
      </nav>
    </div>"""

FOOTER_SUB = """    <div class="footer-bottom">
      <p data-en="© 2026 Calorythm · All rights reserved.">© 2026 Calorythm · Todos los derechos reservados.</p>
      <p data-en="For guidance only · Not a substitute for medical advice · WHO criteria">Solo orientativo · No sustituye el consejo médico · Criterios OMS</p>
      <nav aria-label="Aviso legal" style="margin-top:0.5rem;display:flex;gap:1.25rem;flex-wrap:wrap;justify-content:center">
        <a href="../privacidad/" style="color:var(--text-muted);font-size:0.8rem;text-decoration:none" data-en="Privacy">Privacidad</a>
        <a href="../aviso-legal/" style="color:var(--text-muted);font-size:0.8rem;text-decoration:none" data-en="Legal Notice">Aviso Legal</a>
        <a href="../cookies/" style="color:var(--text-muted);font-size:0.8rem;text-decoration:none" data-en="Cookies">Cookies</a>
      </nav>
    </div>"""

AD_UNIT = """<!-- AdSense: bloque contenido — reemplaza data-ad-slot="auto" con tu ad-slot ID real de AdSense -->
<div style="margin:2rem auto;max-width:48rem;padding:0 1rem;text-align:center" class="no-print">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-9067348148288028"
       data-ad-slot="auto"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
</div>"""

# Files: (path, is_home, is_tmb, add_ads)
files = [
    (os.path.join(BASE, "index.html"),                    True,  False, False),
    (os.path.join(BASE, "imc/index.html"),                False, False, True),
    (os.path.join(BASE, "peso-ideal/index.html"),         False, False, True),
    (os.path.join(BASE, "calorias-diarias/index.html"),   False, False, True),
    (os.path.join(BASE, "calorias-quemadas/index.html"),  False, False, True),
    (os.path.join(BASE, "macros/index.html"),             False, False, True),
    (os.path.join(BASE, "ffmi/index.html"),               False, False, True),
    (os.path.join(BASE, "grasa-corporal/index.html"),     False, False, True),
    (os.path.join(BASE, "agua-diaria/index.html"),        False, False, True),
    (os.path.join(BASE, "tmb/index.html"),                False, True,  False),
]

for path, is_home, is_tmb, add_ads in files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # ── 1. Inject AdSense + GA4 before </head> (idempotent) ──────────────────
    if "pagead2.googlesyndication.com" not in content:
        content = content.replace("</head>", ADSENSE_GA4 + "\n</head>", 1)
        print(f"  [+] AdSense+GA4 added: {os.path.basename(os.path.dirname(path))}/{os.path.basename(path)}")
    else:
        print(f"  [=] AdSense+GA4 already present: {os.path.basename(os.path.dirname(path))}/{os.path.basename(path)}")

    # ── 2. TMB: only head scripts, skip footer ────────────────────────────────
    if is_tmb:
        if content != original:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  [W] Written: {path}")
        continue

    # ── 3. Replace footer-bottom (idempotent: check for legal links) ──────────
    if 'href="./privacidad/"' in content or 'href="../privacidad/"' in content:
        print(f"  [=] footer-bottom legal links already present")
    else:
        # Match the <div class="footer-bottom">...</div> block
        # We look for the block and replace it
        footer_pattern = re.compile(
            r'<div class="footer-bottom">.*?</div>',
            re.DOTALL
        )
        replacement = FOOTER_HOME if is_home else FOOTER_SUB
        new_content, count = footer_pattern.subn(replacement, content, count=1)
        if count:
            content = new_content
            print(f"  [+] footer-bottom updated")
        else:
            print(f"  [!] footer-bottom not found in {path}")

    # ── 4. Home-specific changes ──────────────────────────────────────────────
    if is_home:
        # Update title
        old_title = '<title>Calculadoras de Salud y Fitness gratis 2026 — IMC, Calorías, Peso Ideal, Macros y más</title>'
        new_title = '<title>Calculadoras de Salud y Fitness Gratis | Calorythm</title>'
        if old_title in content:
            content = content.replace(old_title, new_title, 1)
            print(f"  [+] title updated (home)")

        # Update meta description
        old_desc_pattern = re.compile(
            r'<meta name="description" content="8 calculadoras de salud y fitness gratuitas:[^"]*" />'
        )
        new_desc = '<meta name="description" content="8 calculadoras gratis: IMC, calorías diarias TDEE, peso ideal, macros, grasa corporal US Navy, FFMI y agua diaria. Sin registro, sin datos almacenados." />'
        if old_desc_pattern.search(content):
            content = old_desc_pattern.sub(new_desc, content, count=1)
            print(f"  [+] meta description updated (home)")
        elif '8 calculadoras gratis: IMC' in content:
            print(f"  [=] meta description already updated (home)")
        else:
            print(f"  [!] meta description pattern not matched in home")

        # Add manifest link before </head>
        if 'rel="manifest"' not in content:
            content = content.replace(
                "</head>",
                '  <link rel="manifest" href="./manifest.json" />\n</head>',
                1
            )
            print(f"  [+] manifest link added (home)")
        else:
            print(f"  [=] manifest link already present (home)")

    # ── 5. Subpages: add manifest link ───────────────────────────────────────
    elif not is_tmb:
        if 'rel="manifest"' not in content:
            content = content.replace(
                "</head>",
                '  <link rel="manifest" href="../manifest.json" />\n</head>',
                1
            )
            print(f"  [+] manifest link added (subpage)")
        else:
            print(f"  [=] manifest link already present (subpage)")

    # ── 6. Add ad units before </main> (calculator pages only) ───────────────
    if add_ads:
        if "adsbygoogle" in content and 'data-ad-slot="auto"' in content:
            print(f"  [=] ad units already present")
        else:
            # Insert before </main>
            content = content.replace("</main>", AD_UNIT + "\n</main>", 1)
            print(f"  [+] ad unit added before </main>")

    # ── Write if changed ──────────────────────────────────────────────────────
    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [W] Written: {path}")
    else:
        print(f"  [-] No changes needed: {path}")

print("\nDone.")
