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
    let tipo = fact.cod_tipo_documento;
    let nombredoc = '';
    let nombredoc2 = '';
    let guiac = '';
    let guia = '';
    let total=0;
    let subtotal=0;
    let igv=0;
    let exonerada=0;
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

    if (tipo === '03') {
      nombredoc = 'BOLETA ELECTRÓNICA';
      nombredoc2 = 'Boleta';
    }
    new Img('../../assets/images/' + fact.emisor.logo_impresion)

      .build()
      .then((img) => {
        pdf.add([
          new Cell(img).margin([0, -3]).width(100).alignment('center').end,
          new Txt(' \n ' + fact.emisor.razon_social)
            .alignment('center')
            .bold()
            .fontSize(18).end,

          new Txt(
            '' + fact.emisor.direccion + ' \n' + fact.emisor.telefono + ' \n\n'
          )
            .alignment('center')
            .bold()
            .fontSize(10)
            .italics().end,

          new Txt('RUC:' + fact.emisor.ruc)
            .alignment('center')
            .bold()

            .fontSize(14).end,
          new Txt(
            nombredoc + ' \n No:' + 'B001' + '-' + fact.numero_comprobante
          )
            .alignment('center')
            .bold()
            .margin([30, 0])
            .fontSize(14).end,
        ]);

        pdf.add(pdf.ln(1));

        pdf.add(
          new Table([
            ['Cliente', ': ' + this.deltenull(fact.cliente_nombre)],

            ['Direcciòn', ': ' + this.deltenull(fact.cliente_direccion)],
            ['RUC', ': ' + this.deltenull(fact.cliente_numerodocumento)],
            ['Fecha', ': ' + this.deltenull(fact.fecha_comprobante)],
          ])

            .fontSize(10)
            .layout('noBorders')
            .margin([10, 10, 10, 10]).end
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

        pdf.add(
          new Table([
            [
              new Table([
                [
                  new Cell(new Txt('Item').bold().alignment('right').end).end,
                  new Cell(new Txt('Descripcion ').bold().end).end,
                  new Cell(new Txt('P. Unit').bold().end).end,
                  new Cell(new Txt('Cant').bold().end).end,
                  new Cell(new Txt('Impt').bold().end).end,
                ],
                ...result,
              ])
                .fontSize(8)
                .decorationStyle('dotted')
                .layout('lightHorizontalLines').end,
            ],
          ]).layout('noBorders').end
        );

        const qr =
          fact.emisor.ruc +
          '|03|' +
          fact.serie_comprobante +
          '|' +
          fact.numero_comprobante +
          '|' +
          fact.total_igv +
          '|' +
          fact.total +
          '|' +
          fact.fecha_comprobante +
          '|' +
          fact.cliente_tipodocumento +
          '|' +
          fact.cliente_numerodocumento +
          '|';

        pdf.add([
          new Cell(new Txt(' ').bold().end).margin([40, 0]).end,
          new Table([
            ['Op.Exonerada','S/.'+ fact.total_exoneradas],
            ['Op. Gravadas', 'S/.' + fact.total_gravadas],
                    ['Descuentos', 'S/.' + fact.total_descuento],
                    ['IGV', 'S/.' + fact.total_igv],
                    ['Importe Total', 'S/.' + fact.total],
          ])
            .layout('noBorders')
            .fontSize(9)
            .alignment('left').end,
        ]);
        pdf.add(pdf.ln(1));
        pdf.add([
          new Ol([new QR(qr).alignment('center').fit(130).end]).end,
          new Txt('\nHASH:' + this.deltenull(fact.hash_cpe) + '')
            .fontSize(7)
            .alignment('center')
            .bold()
            .italics().end,

          new Txt(
            '\n\nRepresentación impresa de la ' +
              nombredoc2 +
              ' de Venta Electrónica.'
          )
            .alignment('center')
            .fontSize(10)
            .italics()
            .bold().end,
        ]);
        pdf.add(pdf.ln(1));

        pdf.add(
          new Txt(
            'La garantía del producto será válida solo por falla de fábrica y con el comprobante de pago. Su revisión, diagnóstico y solución se realizará en un plazo no mayor a 10 días hábiles.\n PERIODO DE GRANTIA - Celulares y vehículos eléctricos 1 AÑO * Accesorios (Beterías u otros) 6 MESES* - Power Banks tv box, Otros: 6 MESES* – Audífonos bluetooth: 3 MESES* –Cables y audífonos cableados 15 días. Todo cambio se realiza dentro de los 5 días representando el producto en su empaque original y sin señales de uso- No hay devolución de dinero.'
          )
            .alignment('justify')
            .fontSize(7)
            .italics().end
        );
        pdf.create().print();
      });
  }
}
