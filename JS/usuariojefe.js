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

var products = [
  {id: 1, name: 'Mario Martenez', description: 'Col aleman.', price: 99083533, date:'10/10/2022', email:'fm@gmail.com',nota:'Compras',rol:'G0014',obs:'Ninguna'},
  {id: 2, name: 'Guadalupe Pineda', description: 'Avenida centroamerica.', price: 90654532,date:'10/10/2022',email:'h6h@gmail.com',nota:'Ventas',rol:'G0015',obs:'Ninguna'},
  {id: 3, name: 'Petronila Gamez', description: 'Col 15 septiembre', price: 99865645,date:'10/10/2022', email:'hrg8@gmail.com',nota:'Invenatario',rol:'G0016',obs:'Ninguna'}
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
        nota:product.nota,
        obs:product.obs
      
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
        nota:product.nota,
        obs:product.obs
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