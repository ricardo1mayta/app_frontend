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
  Stack,
} from 'pdfmake-wrapper';
export class GuiaRemisionPDF {
  deltenull(maybeNull) {
    if (maybeNull === undefined || maybeNull === null) {
      return '';
    }
    return maybeNull;
  }
  async generatePdf(tactura) {
    const fact = tactura;
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageMargins([40, 60, 40, 60]);

    let nombredoc = '';
    let nombredoc2 = '';

    nombredoc = 'GUÍA REMISIÓN ELECTRÓNICA';
    nombredoc2 = 'Guía Remisión ';

    new Img('../../assets/images/' + fact.emisor.logo_impresion)
      .build()
      .then((img) => {
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
                  nombredoc +
                    '  No:' +
                    fact.serie_comprobante +
                    '-' +
                    fact.numero_comprobante
                )
                  .alignment('center')
                  .bold()
                  .margin([30, 0])
                  .fontSize(14).end,
               
              ],
            ],
          ]).layout('noBorders').end,
        ]);

        pdf.add(pdf.ln(1));

        pdf.add(
          new Table([
            ['DESTINATARIO'],
            [
              new Table([
                [
                  'Nombre/Razòn Social',
                  ': ' + this.deltenull(fact.cliente_nombre),
                  'Fecha de emisiòn',
                  ': ' + this.deltenull(fact.fecha_comprobante),
                ],
                [
                  'RUC',
                  ': ' + this.deltenull(fact.cliente_numerodocumento),
                  '',
                  '',
                ],
              ])

                .fontSize(10)
                .layout('noBorders')
                .margin([10, 10, 10, 10])
                .widths('*').end,
            ],
          ])
            .fontSize(10)
            .layout('lightHorizontalLines')
            .widths('*').end
        );

        pdf.add(
          new Table([
            ['ENVIO'],
            [
              new Table([
                [
                  'Motivo Traslado',
                  ': ' + this.deltenull(fact.motivo_traslado),
                  'Modalidad de Transporte',
                  ': ' + this.deltenull(fact.codtipo_transportista),
                ],
                [
                  'Peso Bruto Total (KGM)',
                  ': ' + this.deltenull(fact.peso),
                  'Número de Paquetes',
                  ':' + this.deltenull(fact.numero_paquetes),
                ],
                [
                  'P. Partida',
                  ': ' +
                    this.deltenull(fact.ubigeo_partida) +
                    ' - ' +
                    this.deltenull(fact.dir_partida),
                  'P. Llegada',
                  ':' +
                    this.deltenull(fact.ubigeo_destino) +
                    ' - ' +
                    this.deltenull(fact.dir_destino),
                ],
              ])

                .fontSize(10)
                .layout('noBorders')
                .margin([10, 10, 10, 10])
                .widths('*').end,
            ],
          ])
            .fontSize(10)
            .layout('lightHorizontalLines')
            .widths('*').end
        );

        pdf.add(
          new Table([
            ['TRANSPORTE'],
            [
              new Table([
                [
                  'Razón Social',
                  ': ' + this.deltenull(fact.razon_social_transporte),
                  'RUC',
                  ': ' + this.deltenull(fact.nro_documento_transporte),
                ],
                [
                  'Vehiculo:',
                  ': ................',
                  'Conductor: ',
                  ': ................',
                ],
              ])

                .fontSize(10)
                .layout('noBorders')
                .margin([10, 10, 10, 10])
                .widths('*').end,
            ],
          ])
            .fontSize(10)
            .layout('lightHorizontalLines')
            .widths('*').end
        );
        pdf.add(pdf.ln(3));

        let data = fact.detalle;
        let result = [];
        let series = fact.series;

        for (let i = 0; i < data.length; i++) {
          let auz = 0;
          let res2 = '';
          for (let j = 0; j < series.length; j++) {
            let idp = series[j].idprodcuto;
            let p = data[i].CODIGO_PRODUCTO;
            if (idp === p) {
              if (auz === 4) {
                res2 = res2 + '\r';
                auz = 0;
              } else {
                auz++;
                res2 = res2 + this.deltenull(series[j].serie) + '\t';
              }
            }
          }
          result[i] = [
            new Cell(new Txt('' + data[i].ITEM).bold().end).end,

            new Cell(new Txt('' + data[i].CODIGO_PRODUCTO).bold().end).end,
            [
              new Txt(data[i].DESCRIPCION).bold().end,
              new Cell(new Txt(res2).end).fontSize(7).rowSpan(3).end,
            ],

            new Txt(data[i].CANTIDAD).bold().end,
          ];
        }

        pdf.add(
          new Table([
            [
              new Table([
                [
                  new Cell(new Txt('Item').bold().end).end,
                  new Cell(new Txt('Codigo ').bold().end).end,
                  new Cell(new Txt('Descripcion ').bold().end).margin([150, 0])
                    .end,

                  new Cell(new Txt('Cantidad').bold().end).end,
                ],
                ...result,
                ['', '', '', ''],
              ])
                .fontSize(10)
                .decorationStyle('dotted')
                .layout('lightHorizontalLines').end,
            ],
          ])
            .width('100%')
            .widths('*')
            .layout('noBorders').end
        );

        pdf.add(
          new Txt(
            'Representación impresa de la ' +
              nombredoc2 +
              ' de Venta Electrónica.'
          )
            .alignment('center')
            .fontSize(10)
            .italics()
            .bold().end
        );
        pdf.add(
          new Txt(
            'Autorizado mediante Resolución de Intendencia Nº 034-005-0006241/SUNAT.'
          )
            .alignment('center')
            .fontSize(8)
            .italics().end
        );
        pdf.add(pdf.ln(3));

        pdf.create().open();
      });
  }
}
