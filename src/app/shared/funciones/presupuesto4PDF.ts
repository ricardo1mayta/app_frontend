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
import { DecimalPipe } from '@angular/common';
export class Presupuesto4PDF {
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
    const fact = tactura.data;
    const pdf = new PdfMakeWrapper();

    pdf.pageSize({
      width: 250,
      height: 'auto',
    });
    /*pdf.pageSize('A4');*/
    pdf.pageMargins([10, 20, 10, 20]);

    let data = fact;
    let result = [];
    let emisor = tactura.emisor;
    let user = tactura.user;
    pdf.add([
      new Txt(' \n ' + emisor.razon_social)
        .alignment('center')
        .bold()
        .fontSize(18).end,

      new Txt('' + emisor.direccion2 + ' \n' + user.telefono + ' \n\n')
        .alignment('center')
        .bold()
        .fontSize(10)
        .italics().end,

      new Txt('RUC:' + emisor.ruc)
        .alignment('center')
        .bold()

        .fontSize(14).end,
    ]);

    pdf.add([
      new Txt(' Fecha:  ' + Date()).alignment('center').bold().fontSize(7).end,
    ]);
    pdf.add([
      new Txt(' Cliente Bajo  ').alignment('left').bold().fontSize(7).end,
    ]);
    for (let i = 0; i < data.length; i++) {
      let pre = 0;

      pre = Math.round(data[i].precio3);

      result[i] = [i + 1, data[i].descripcion, 's/. ' + pre];
    }

    pdf.add(
      new Table([
        [
          new Table([
            [
              new Cell(new Txt('Item').bold().alignment('right').end).end,
              new Cell(new Txt('Descripcion ').bold().end).end,

              new Cell(new Txt('P. Mayor').bold().end).end,
            ],
            ...result,
          ])
            .fontSize(8)
            .decorationStyle('dotted')
            .layout('lightHorizontalLines').end,
        ],
      ]).layout('noBorders').end
    );
    pdf.add([
      new Txt(' \n ' + emisor.info2).alignment('left').bold().fontSize(10).end,
    ]);
    pdf.create().open();
  }
}
