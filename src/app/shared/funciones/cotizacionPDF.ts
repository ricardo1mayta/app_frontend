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
export class OrdenPDF {
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
    pdf.pageSize('A4');
    pdf.pageMargins([40, 60, 40, 60]);
    let tipo = fact.cod_tipo_documento;
    let nombredoc = '';
    let nombredoc2 = '';
    let guiac = '';
    let guia = '';
    if (tipo === '01') {
      nombredoc = 'FACTURA ELECTRÓNICA';
      nombredoc2 = 'Factura';
      if (parseFloat(this.deltenull(fact.nro_guia_remision)) > 0) {
        guiac = 'Guia de Remisiòn';
        guia =
          this.deltenull(fact.cod_guia_remision) +
          '-' +
          this.deltenull(fact.nro_guia_remision);
      }
    }

    nombredoc = 'COTIZACION';
    nombredoc2 = 'COTIZACION';

    new Img('../../assets/images/' + fact.emisor.logo_impresion)
      .build()
      .then((img) => {
        //new Img('../../assets/images/logo_reyesf.jpg').build().then((img) => {
        pdf.add([
          new Table([
            [
              [
                new Cell(img).margin([0, -3]).width(100).alignment('center')
                  .end,
                new Txt('' + fact.emisor.razon_social)
                  .alignment('center')
                  .bold()
                  .fontSize(18).end,
                new Txt(
                  '' + fact.emisor.direccion + ' \n' + fact.emisor.telefono
                )
                  .alignment('center')
                  .bold()
                  .italics().end,
              ],
              '',
              [
                new Txt('RUC:' + fact.emisor.ruc)
                  .alignment('center')
                  .bold()
                  .margin([30, 13])
                  .fontSize(14).end,
                new Txt(
                  ' No:' +
                    fact.serie_comprobante +
                    '-' +
                    fact.numero_comprobante
                )
                  .alignment('center')
                  .bold()
                  .margin([30, 0])
                  .fontSize(14).end,
                new Canvas([new Rect(20, [220, -90]).end]).end,
              ],
            ],
          ]).layout('noBorders').end,
        ]);
        pdf.add([
          new Txt(nombredoc)
            .alignment('center')
            .bold()

            .fontSize(14).end,
        ]);

        pdf.add(pdf.ln(3));
        pdf.add(
          new Table([
            [
              new Table([
                [
                  'Nombre/Razòn Social',
                  ': ' + this.deltenull(fact.cliente_nombre),
                  'Fecha de emisiòn',
                  ': ' + this.deltenull(fact.fecha_comprobante),
                ],
                [
                  'Direcciòn',
                  ': ' + this.deltenull(fact.cliente_direccion),
                  guiac,
                  ':' + guia,
                ],
                [
                  'RUC',
                  ': ' + this.deltenull(fact.cliente_numerodocumento),
                  '',
                  ' ',
                ],
                ['', '', '', ''],
              ])

                .fontSize(10)
                .layout('noBorders')
                .margin([10, 10, 10, 10])
                .widths('*').end,
            ],
          ])
            .widths('*')
            .layout('noBorders').end
        );

        let data = fact.detalle;
        let result = [];

        for (let i = 0; i < data.length; i++) {
          result[i] = [
            '  ' + data[i].txtITEM,
            data[i].txtDESCRIPCION_DET,
            'S/.' + parseFloat(data[i].txtPRECIO_DET).toFixed(2),
            data[i].txtCANTIDAD_DET,
            'S/.' +
              (
                parseFloat(data[i].txtSUB_TOTAL_DET) +
                parseFloat(data[i].txtIGV)
              ).toFixed(2),
          ];
        }

        const dae = [
          [
            'Item',
            'Descripcion ',
            'Unidad',
            'Precio Unitario',
            'Cantidad',
            'Importe',
          ],
        ];
        pdf.add(
          new Table([
            [
              new Table([
                [
                  new Cell(new Txt('Item').bold().end).end,
                  new Cell(new Txt('Descripcion ').bold().end).margin([110, 0])
                    .end,
                  new Cell(new Txt('Precio Unitario').bold().end).end,
                  new Cell(new Txt('Cantidad').bold().end).end,
                  new Cell(new Txt('Importe').bold().end).end,
                ],
                ...result,
                ['', '', '', '', ''],
              ])
                .fontSize(10)
                .decorationStyle('dotted')
                .layout('lightHorizontalLines').end,
            ],
          ])
            .widths('*')
            .layout('noBorders').end
        );
        pdf.add(pdf.ln(3));
        pdf.add(
          new Table([
            [
              new Table([
                [
                  [''],
                  [
                    new Txt('\n\nRepresentación impresa de la ' + nombredoc2)
                      .alignment('center')
                      .fontSize(10)
                      .italics()
                      .bold().end,
                  ],
                  new Table([['Importe Total', 'S/.' + fact.total]])
                    .layout('lightHorizontalLines')
                    .alignment('right')
                    .widths('*').end,
                ],
              ])
                .fontSize(10)
                .layout('noBorders')
                .margin([0, 10, 10, 10])
                .widths('*').end,
            ],
          ])
            .margin([0, 0])
            .layout('noBorders').end
        );

        pdf.add(pdf.ln(3));
        pdf.create().print();
      });
  }
}
