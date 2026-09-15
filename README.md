# 🚀 MultiConvert - Suite de Conversió Gratuïta i Privada

MultiConvert és una eina web basada en el navegador que permet convertir fitxers de diversos formats de manera instantània i totalment privada. A diferència d'altres convertidors en línia, **MultiConvert no puja cap fitxer a cap servidor**; tot el processament es fa directament al client (navegador).

## ✨ Funcionalitats

- **DOCX $\rightarrow$ Markdown**: Convertiu documents de Word a Markdown, mantenint la estructura de tables i encapçalaments.
- **Conversió d'Imatges**: Canvieu el format de les vostres imatges entre **PNG, JPEG i WebP**.
- **PDF $\leftrightarrow$ Word**: 
  - Word a PDF via renderització HTML.
  - PDF a Word mitjançant l'extracció de text.

## 🔒 Privacitat i Seguretat

La privacitat és el nucli d'aquest projecte. Gràcies a l'ús de llibreries JavaScript en el client, els vostres documents mai abandonen el vostre ordinador. No hi ha bases de dades, no hi ha registres i no hi ha upload de fitxers.

## 🛠️ Tecnologies Utilitzades

- **Frontend**: HTML5, Tailwind CSS.
- **Libreries de Conversió**:
  - `mammoth.js` (DOCX $\rightarrow$ HTML)
  - `turndown` & `turndown-plugin-gfm` (HTML $\rightarrow$ Markdown)
  - `html2pdf.js` (HTML $\rightarrow$ PDF)
  - `pdf.js` (PDF $\rightarrow$ Text)
  - `docx.js` (Text $\rightarrow$ DOCX)
  - `Canvas API` (Processament d'imatges)

## 🚀 Instal·lació i Desplegament

Aquest projecte està dissenyat per ser desplegat a **GitHub Pages**.

1. Cloneu el repositori:
   ```bash
   git clone https://github.com/SEU_USUARI/nom-del-repo.git
   ```
2. Activeu GitHub Pages a la configuració del repositori:
   `Settings` $\rightarrow$ `Pages` $\rightarrow$ `Deploy from a branch` $\rightarrow$ `main`.
