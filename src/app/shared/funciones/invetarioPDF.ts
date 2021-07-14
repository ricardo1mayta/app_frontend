import {
  PdfMakeWrapper,
  Txt,
  TextReference,
  Ol,
  Item,
  QR,
  SVG,
  Canvas,
  Line,
  Img,
  Table,
  Columns,
  Rect,
  Cell,
} from 'pdfmake-wrapper';
export class TiketPDF {
  deltenull(maybeNull) {
    if (
      maybeNull === undefined ||
      maybeNull === 'undefined' ||
      maybeNull === null
    ) {
      return '';
    }
    return maybeNull;
  }
  async generatePdf(tactura) {
    const fact = tactura;
    const pdf = new PdfMakeWrapper();

    pdf.pageSize({
      width: 250,
      height: 'auto',
    });
    /*pdf.pageSize('A4');*/
    pdf.pageMargins([10, 20, 10, 20]);

    let data = fact;
    let result = [];

    for (let i = 0; i < data.length; i++) {
      result[i] = [data[i].codigo, data[i].descripcion, data[i].cantidad];
    }

    pdf.add(
      new Table([
        [
          new Table([
            [
              new Cell(new Txt('Item').bold().alignment('right').end).end,
              new Cell(new Txt('Descripcion ').bold().end).end,

              new Cell(new Txt('Cant').bold().end).end,
            ],
            ...result,
          ])
            .fontSize(8)
            .decorationStyle('dotted')
            .layout('lightHorizontalLines').end,
        ],
      ]).layout('noBorders').end
    );

    pdf.create().open();
  }
}
