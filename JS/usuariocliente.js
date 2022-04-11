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
/*============================*/

var products = [
  {id: 1, name: 'Felipe Marquez', description: 'Av. Guadaluoe SPS', price: 99085353, date:'10/10/2022', email:'fm@gmail.com',nota:'Nuevo'},
  {id: 2, name: 'Juan Ventura', description: 'Calle No.10 TGU', price:99061234,date:'10/10/2022',email:'6yshs@gmail.com',nota:'Nuevo'},
  {id: 3, name: 'Maria Molina', description: 'Col pedrera TGU', price: 88932314,date:'10/10/2022',email:'hd6@gmail.com',nota:'Nuevo'}
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