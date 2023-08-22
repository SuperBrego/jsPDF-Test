var { jsPDF } = window.jspdf;

function runDownload() {
    var pdf = new jsPDF('p', 'in', 'a4');

    // Inch = 72 px
    // Linhas de Margem: A4 =  inch. 
    // Larg: 8.25 / H: 11.75; 11.75 - 0.5; = 11.25
    const width = 8.25;
    const height = 11.75;
    
    pdf.setDrawColor('black');
    pdf.setLineWidth(1 / 72); // 1 pixel

    // line(x1, y1, x2, y2, style)
    pdf.line(.5, .5, .5, 11.25);
    pdf.line(7.75, .5, 7.75, 11.25)
    // x = 0
    // y = 0 → Começa embaixo.
    let hOffset = .5;
    let vOffset = .5;
    let inPadding = .15;
    let lineHeight = 1.5;
    
    let paragraphs = document.querySelectorAll('.outputTxt');
    let textlines;

    for(let i = 0; i < paragraphs.length; i++) {
        textlines = pdf.setFont('Arial')
        .setFontSize(12)
        .splitTextToSize(paragraphs[i].innerHTML, width - (2.5 * hOffset)); // Apenas duas vezes o offset não serve.
        
        pdf.text(textlines, hOffset + inPadding, vOffset + inPadding);
        vOffset += (textlines.length + lineHeight) * (12 / 72); 
        // 12 / 72 = Font Size / Pixels Per Inch
    }
    
    pdf.save("a4_page.pdf");
}