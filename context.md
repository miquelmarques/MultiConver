# 📝 Context del Projecte: MultiConvert

Aquest document serveix per mantenir el rastreig de les decisions tècniques, l'estat del projecte i la informació necessària per a futures sessions de desenvolupament.

## 🎯 Objectiu
Crear una suite d'eines de conversió de fitxers que sigui 100% gratuïta, sense servidor (serverless) i que garanteixi la privacitat de l'usuari processant tot al navegador.

## 🛠️ Arquitectura Tècnica
- **Model**: Pàgina estàtica (Static Site).
- **Hosting**: GitHub Pages.
- **Processament**: Client-side JavaScript.

## ✅ Implementacions Realitzades
- [x] **Interfície**: Landing page moderna amb Tailwind CSS.
- [x] **Navegació**: Sistema de pestanyes i menus unificats.
- [x] **DOCX 2 MD**: Implementat amb Mammoth i Turndown.
- [x] **Imatges**: Implementat amb Canvas API (PNG, JPG, WebP).
- [x] **PDF 2 Word**: Implementat amb PDF.js i docx.js.
- [x] **Word 2 PDF**: Implementat amb html2pdf.js.
- [x] **Nomenclatures**: Unificat tot sota l'estil "2" (ex: PDF 2 Word).

## ⚠️ Decisions Clau i Limitacions
- **PDF $\rightarrow$ Word**: S'ha optat per l'extracció de text pur. No es manté el layout original perquè el format PDF no és estructurat, cosa que és una limitació inherent al processament purament client.
- **Seguretat**: S'ha advertit a l'usuari que el projecte no funciona obrint fitxers `file://` localment a causa de les restriccions de CORS dels navegadors, requerint un servidor (GitHub Pages o Live Server).

## 🚀 Pròxims Passos (Roadmap)
- [ ] Afegir suport per a més formats d'imatge (SVG).
- [ ] Millorar la preservació de taules en la conversió PDF $\rightarrow$ Word.
- [ ] Implementar un mode nocturn (Dark Mode).
