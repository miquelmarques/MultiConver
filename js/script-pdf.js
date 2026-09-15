pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

function switchTab(tab) {
    const uiW2P = document.getElementById('ui-w2p');
    const uiP2W = document.getElementById('ui-p2w');
    const tabW2P = document.getElementById('tab-w2p');
    const tabP2W = document.getElementById('tab-p2w');

    if (tab === 'w2p') {
        uiW2P.classList.remove('hidden');
        uiP2W.classList.add('hidden');
        tabW2P.classList.add('text-blue-700', 'bg-white');
        tabP2W.classList.remove('text-blue-700', 'bg-white');
    } else {
        uiW2P.classList.add('hidden');
        uiP2W.classList.remove('hidden');
        tabP2W.classList.add('text-blue-700', 'bg-white');
        tabW2P.classList.remove('text-blue-700', 'bg-white');
    }
}

async function convertWordToPdf(event) {
    const file = event.target.files[0];
    if (!file) return;

    const status = document.getElementById('w2p-status');
    status.classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = async function(e) {
        const arrayBuffer = e.target.result;
        try {
            // 1. DOCX -> HTML
            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
            const html = result.value;
            
            if (!html || html.trim() === "") {
                throw new Error("El fitxer Word sembla estar buit o no s'ha pogut extreure el text.");
            }

            // 2. HTML -> PDF
            const opt = {
                margin: [0.5, 0.5],
                filename: file.name.replace('.docx', '.pdf'),
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    useCORS: true,
                    logging: false,
                    letterRendering: true
                },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            
            // Create a wrapper that is visible to the engine but not the user
            const wrapper = document.createElement('div');
            wrapper.id = 'pdf-conversion-wrapper';
            wrapper.style.position = 'fixed';
            wrapper.style.top = '0';
            wrapper.style.left = '0';
            wrapper.style.width = '800px';
            wrapper.style.zIndex = '-1000';
            wrapper.style.opacity = '0';
            wrapper.style.pointerEvents = 'none';
            
            // Create the content div
            const contentDiv = document.createElement('div');
            contentDiv.style.padding = '40px';
            contentDiv.style.backgroundColor = 'white';
            contentDiv.style.color = 'black';
            contentDiv.style.fontFamily = 'Arial, sans-serif';
            contentDiv.innerHTML = html;
            
            wrapper.appendChild(contentDiv);
            document.body.appendChild(wrapper);
            
            // Give the browser a moment to render the DOM
            await new Promise(resolve => setTimeout(resolve, 100));
            
            await html2pdf().set(opt).from(contentDiv).save();
            
            // Clean up
            document.body.removeChild(wrapper);
            status.classList.add('hidden');
        } catch (err) {
            console.error("PDF Error:", err);
            alert("Error: " + err.message);
            status.classList.add('hidden');
        }
    };
    reader.readAsArrayBuffer(file);
}

async function convertPdfToWord(event) {
    const file = event.target.files[0];
    if (!file) return;

    const status = document.getElementById('p2w-status');
    status.classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = async function(e) {
        const typedarray = new Uint8Array(e.target.result);
        try {
            // 1. PDF -> Text
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            let fullText = "";
            
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const strings = content.items.map(item => item.str);
                fullText += strings.join(" ") + "\n\n";
            }

            // 2. Text -> DOCX using docx.js
            const doc = new docx.Document({
                sections: [{
                    properties: {},
                    children: fullText.split('\n').map(line => {
                        return new docx.Paragraph({
                            children: [new docx.TextRun(line)],
                        });
                    }),
                }],
            });

            const blob = await docx.Packer.toBlob(doc);
            saveAs(blob, file.name.replace('.pdf', '.docx'));
            status.classList.add('hidden');
        } catch (err) {
            alert("Error: " + err.message);
            status.classList.add('hidden');
        }
    };
    reader.readAsArrayBuffer(file);
}
