const turndownService = new TurndownService({ 
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-'
});
const gfm = turndownPluginGfm.gfm;
turndownService.use(gfm);

function switchTab(tab) {
    const uiFile = document.getElementById('ui-file');
    const uiPaste = document.getElementById('ui-paste');
    const tabFile = document.getElementById('tab-file');
    const tabPaste = document.getElementById('tab-paste');

    if (tab === 'file') {
        uiFile.classList.remove('hidden');
        uiPaste.classList.add('hidden');
        tabFile.classList.add('text-blue-700', 'bg-white');
        tabPaste.classList.remove('text-blue-700', 'bg-white');
    } else {
        uiFile.classList.add('hidden');
        uiPaste.classList.remove('hidden');
        tabPaste.classList.add('text-blue-700', 'bg-white');
        tabFile.classList.remove('text-blue-700', 'bg-white');
    }
}

async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async function(e) {
        const arrayBuffer = e.target.result;
        try {
            const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
            const markdown = turndownService.turndown(result.value);
            showResult(markdown);
        } catch (err) {
            alert("Error: " + err.message);
        }
    };
    reader.readAsArrayBuffer(file);
}

function convertPastedText() {
    const pasteArea = document.getElementById('paste-area');
    const html = pasteArea.innerHTML;
    if (!html) return alert("Enganxa primer el contingut.");
    const markdown = turndownService.turndown(html);
    showResult(markdown);
}

function showResult(markdown) {
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('resultArea').value = markdown;
    document.getElementById('ui-file').classList.add('hidden');
    document.getElementById('ui-paste').classList.add('hidden');
}

function copyToClipboard() {
    const copyText = document.getElementById("resultArea");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("Copiat!");
}
