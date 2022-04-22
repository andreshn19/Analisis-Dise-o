
var idioma =

{
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "NingÃºn dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Ãšltimo",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copyTitle": 'Informacion copiada',
        "copyKeys": 'Use your keyboard or menu to select the copy command',
        "copySuccess": {
            "_": '%d filas copiadas al portapapeles',
            "1": '1 fila copiada al portapapeles'
        },

        "pageLength": {
            "_": "Mostrar %d filas",
            "-1": "Mostrar Todo"
        }
    }
};

$(document).ready(function () {


    var table = $('#ejemplo').DataTable({

        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        "language": idioma,
        "lengthMenu": [[5, 10, 20, -1], [5, 10, 50, "Mostrar Todo"]],
        dom: 'Bfrt<"col-md-6 inline"i> <"col-md-6 inline"p>',


        buttons: {
            dom: {
                container: {
                    tag: 'div',
                    className: 'flexcontent'
                },
                buttonLiner: {
                    tag: null
                }
            },




            buttons: [


                {
                    extend: 'copyHtml5',
                    text: '<i class="fa fa-clipboard"></i>Copiar',
                    messageTop: 'Empresa de Servicios JPLSL',
                    titleAttr: 'Copiar',
                    className: 'btn btn-app export barras',
                    title: 'Reporte de compras emitido por  usuario: G657f',
                    messageBottom: ' ====== Fin de reporte #89389 ========',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    },
                  
                },

                {
                    extend: 'pdfHtml5',
                    text: '<i class="fa fa-file-pdf-o"></i>PDF',
                    title: 'Empresa de Servicios múltiples JPLS',
                    messageTop: 'Reporte de compras emitido por  usuario: G657f',
                    titleAttr: 'PDF',
                    className: 'btn btn-app export pdf',
                    messageBottom: ' ====== Fin de reporte #89389 ========',

                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]

                    },
                    customize: function (doc) {

                        var cols = [];
                        cols[0] = { text: 'Emitido el : 10/08/2022', alignment: 'left', margin: [20] };
                        cols[1] = { text: 'Emitido por: G67ty', alignment: 'left', margin: [20] };
                        cols[2] = { text: 'Valido hasta:  12/08/2022', alignment: 'left', margin: [20] };
                        var objFooter = {};
                        objFooter['columns'] = cols;
                        doc['footer'] = objFooter;

                        doc.styles.title = {
                            color: '#4c8aa0',
                            fontSize: '30',
                            alignment: 'center'
                        },

                            doc.styles['td:nth-child(2)'] = {
                                width: '100px',
                                'max-width': '100px'
                            },
                            doc.styles.tableHeader = {
                                fillColor: '#4c8aa0',
                                color: 'white',
                                alignment: 'center'
                            },
                            doc.content[1].margin = [10, 0, 10, 0]



                    }

                },

                {
                    extend: 'excelHtml5',
                    text: '<i class="fa fa-file-excel-o"></i>Excel',
                    title: 'Empresa de Serivicios Multiples JPLSL',
                    titleAttr: 'Excel',
                    className: 'btn btn-app export excel',
                    messageTop: 'Reporte de compras emitido por  usuario: G657f',
                    messageBottom: ' ====== Fin de reporte #89389 ========',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    },

                   
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fa fa-file-text-o"></i>CSV',
                    title: 'Empresa de Servicos Multiples JPLSL',
                    titleAttr: 'CSV',
                    messageTop: 'Reporte de compras emitido por  usuario: G657f',
                    messageBottom: ' ====== Fin de reporte #89389 ========',
                    className: 'btn btn-app export csv',
                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    }
                },
                
                {
                    extend: 'print',
                    text: '<i class="fa fa-print"></i>Imprimir',
                    title: 'Empresa de Servicios Multiples Jovenes Profesionales',
                    titleAttr: 'Imprimir',
                    messageTop: 'Reporte de compras emitido por  usuario: G657f',
                    messageBottom: ' ====== Fin de reporte #89389 ========',
                    className: 'btn btn-app export imprimir',

                    exportOptions: {
                        columns: [0, 1, 2, 3, 4, 5]
                    },
                    customize: function (doc) {

                        var cols = [];
                        cols[0] = { text: 'Emitido el : 10/08/2022', alignment: 'left', margin: [20] };
                        cols[1] = { text: 'Emitido por: G67ty', alignment: 'left', margin: [20] };
                        cols[2] = { text: 'Valido hasta:  12/08/2022', alignment: 'left', margin: [20] };
                        var objFooter = {};
                        objFooter['columns'] = cols;
                        doc['footer'] = objFooter;





                    }
                },
                {
                    extend: 'pageLength',
                    titleAttr: 'Registros a mostrar',
                    className: 'selectTable'
                }
            ]


        }














    });


});