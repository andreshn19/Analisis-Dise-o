//+++++++++++++
$("select#metodo_pago").change(function(e) {
  var metodo = $("#metodo_pago option:selected").val();
  if(metodo=="Efectivo") {
    $(".cheque, .vale-vista").fadeOut().find("input, select").removeClass("tabber");
    $(".efectivo").fadeIn().find("input, select").addClass("tabber");
  } else if(metodo=="Transbank") {
    $(".efectivo, .cheque, .vale-vista").fadeOut().find("input, select").removeClass("tabber");
    $(".transbank").fadeIn().find("input, select").addClass("tabber");
  } else {
    $(".efectivo").fadeOut().find("input, select").removeClass("tabber");
    $(".cheque, .vale-vista").fadeIn().find("input, select").addClass("tabber");
  }
});


$(function () {
  var operation = "C"; //"C"=Crear
  var selected_index = -1; // Indice do elemento selecionado na lista
  var tblPersons = localStorage.getItem("tblPersons"); //retornar os dados armazenados
  tblPersons = JSON.parse(tblPersons); //converteer string em objeto
  if (tblPersons === null) // se não tem dados iniciar um array vazio
      tblPersons = [];

  function Create() {
    //Obter os valores inputados no html e converte-los em string
    var person = JSON.stringify({
       Nome: $("#Nome").val(),
        CPF: $("#CPF").val(),
        Telefone: $("#Telefone").val(),
        Email: $("#Email").val(),
        Latitude: $("#Lat").val(),
        Longitude: $("#Lng").val()
    }); 
    //Inserir o objeto na tabela
    tblPersons.push(person);
    //Armazenar os dados localStorage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Os dados foram armazenados"); //Mensageme de alerta
    return true;
  }

  function Edit() {
    // Editar o item selecionado na tabela
    tblPersons[selected_index] = JSON.stringify({
        Nome: $("#Nome").val(),
        CPF: $("#CPF").val(),
        Telefone: $("#Telefone").val(),
        Email: $("#Email").val(),
        Latitude: $("#Lat").val(),
        Longitude: $("#Lng").val()
    });
    //Armazenar os itens em localStorage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Los datos han sido editados"); //Mensaje de alerta
    return true;
  }

  function Delete() {
    //Eliminar el elemento seleccionado en la tabla
    tblPersons.splice(selected_index, 1); 
    //Actualizar los datos del Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Persona Eliminada"); //Mensaje de alerta
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Nombre</th>" +
            "<th>Dirección</th>" +
            "<th>Telefono</th>" +
            "<th>Email</th>" +
             "<th>Fecha de registro</th>" +
             "<th>Nota</th>" +
            "<th> </th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Agregar a tabela a estrutura HTML
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Nome + "</td>" +
                "<td>" + per.CPF + "</td>" +
                "<td>" + per.Telefone + "</td>" +
                "<td>" + per.Email + "</td>" +
                 "<td>" + per.Lat + "</td>" + 
                  "<td>" + per.Lng + "</td>" +                  
                                   
                 "<td><img src='http://res.cloudinary.com/demeloweb/image/upload/v1497537879/edit_n51oto.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='http://res.cloudinary.com/demeloweb/image/upload/v1497537882/delete_ntuxjl.png' alt='Delete" + i + "' class='btnDelete'/></td>" +                  
                
                "</tr>"
                );
    } //carregar e inserir os itens na tabela
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  }); 
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; //"E" = Editar
    //Obter o identificador do item a ser editado
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    //Converter JSON no formato adequado para os itens serem editados
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#Nome").val(per.Nome);
    $("#CPF").val(per.CPF);
    $("#Telefone").val(per.Telefone);
    $("#Email").val(per.Email);
     $("#Lat").val(per.Lat);
     $("#Lng").val(per.Lng);
  
  });

  $(".btnDelete").bind("click", function () {
    //OObter o identificador do item a ser deletado
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); //eliminar o item
    List(); //Voltar aos itens listados na tabela
  });
});
var products = [
  {id: 1, name: 'Mario Martenez', description: 'Av republica de Honduras', price: 99083533, date:'9/10/2022', email:'fm@gmail.com',nota:'activo',rol:'G0012'},
  {id: 2, name: 'Guadalupe Pineda', description: 'Col el pedregal', price: 92929100, date:'9/10/2022', email:'gtd@gmail.com',nota:'activo',rol:'G0012'},
  {id: 3, name: 'Petronila Gamez', description: 'Col Las lomas', price: 98764567, date:'9/10/2022', email:'tyb@gmail.com',nota:'activo',rol:'G0012'}
];

function findProduct (productId) {
  return products[findProductKey(productId)];
};

function findProductKey (productId) {
  for (var key = 0; key < products.length; key++) {
    if (products[key].id == productId) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#product-list',
  data: function () {
    return {products: products, searchKey: ''};
  },
  computed: {
    filteredProducts: function () {
      return this.products.filter(function (product) {
        return this.searchKey=='' || product.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Product = Vue.extend({
  template: '#product',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  }
});

var ProductEdit = Vue.extend({
  template: '#product-edit',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    updateProduct: function () {
      var product = this.product;
      products[findProductKey(product.id)] = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        email:product.email,
        date:product.date,
        nota:product.nota
      };
      router.push('/');
    }
  }
});

var ProductDelete = Vue.extend({
  template: '#product-delete',
  data: function () {
    return {product: findProduct(this.$route.params.product_id)};
  },
  methods: {
    deleteProduct: function () {
      products.splice(findProductKey(this.$route.params.product_id), 1);
      router.push('/');
    }
  }
});

var AddProduct = Vue.extend({
 template: '#add-product',

  data: function () {
    return {product: {name: '', description: '', price: ''}}
  },
  methods: {
    createProduct: function() {
      var product = this.product;
      products.push({
        id: Math.random().toString().split('.')[1],
        name: product.name,
        description: product.description,
        price: product.price,
        email:product.email,
        date:product.date,
        nota:product.nota
      });
      router.push('/');
    }
  }
  
});



var router = new VueRouter({routes:[
  { path: '/', component: List},
  { path: '/product/:product_id', component: Product, name: 'product'},
  { path: '/add-product', component: AddProduct},
  { path: '/product/:product_id/edit', component: ProductEdit, name: 'product-edit'},
  { path: '/product/:product_id/delete', component: ProductDelete, name: 'product-delete'}
]});
app = new Vue({
  router:router
}).$mount('#app')