// set the root states
var initPermissionRootState = function (item) {
    var body = $("#permissionsBody");
    var rowCount = body.find("tr").length;
    var perm = item.attr("data-perm");
    var selectCount = body.find("[data-perm=" + perm + "].active").length;

    if (rowCount == selectCount) {
        $("#" + perm).removeClass("multi").addClass("active");
    } else if (selectCount > 0) {
        $("#" + perm).removeClass("active").addClass("multi");
    } else {
        $("#" + perm).removeClass("active").removeClass("multi");
    }
}
$("#permissionWrapper").on("click", "#addUser", function () {
    var template = '<tr class="addState">' +
        '<td><span class="iconUser" contenteditable="true" class="userName"></span></td>' +
        '<td><div class="permissionTag active" data-perm="view">Ver</div></td>' +
        '<td><div class="permissionTag" data-perm="edit">Editar</div></td>' +
        '<td><div class="permissionTag" data-perm="sales">Ventas</div></td>' +
        '<td><div class="permissionTag" data-perm="shopping">Compras</div></td>' +
        '<td><div class="permissionTag" data-perm="inventories">Inventario</div></td>' +
        '<td><div class="permissionTag" data-perm="production">Produccion</div></td>' +
        '<td><div class="permissionTag" data-perm="report">Reporte</div></td>' +
        '<td><div class="permissionTag" data-perm="admin">Administrador</div></td>' +
        '<td><a href="#" class="iconRemove deleteUser" title="Eliminar Usuario"></a></td>' +
        '</tr>';
    var user = $(template);
    $("#permissionsBody").prepend(user);

    setTimeout(function () {
        user.removeClass("addState");
    }, 50);

    initPermissionRootState(user.find("[data-perm=view]"));
    initPermissionRootState(user.find("[data-perm=edit]"));
    initPermissionRootState(user.find("[data-perm=sales]"));
    initPermissionRootState(user.find("[data-perm=shopping]"));
    initPermissionRootState(user.find("[data-perm=inventories]"));
    initPermissionRootState(user.find("[data-perm=production]"));
    initPermissionRootState(user.find("[data-perm=report]"));
    initPermissionRootState(user.find("[data-perm=admin]"));

    user.find(".userName").trigger("focus");
    return false;
});
$("#permissionsBody").on("focusin", ".userName", function () {
    $(this).parent().parent().addClass("focused");
}).on("focusout", ".userName", function () {
    $(this).parent().parent().removeClass("focused");
}).on("click", ".deleteUser", function () {
    var parent = $(this).parent().parent();
    parent.addClass("removeState");
    setTimeout(function () {
        parent.remove();
    }, 400);
});
// trigger root permission state
$("#permissionWrapper").on("click", ".permissionTag", function () {
    var me = $(this);

    if (me.hasClass("active")) {
        me.removeClass("active");
    } else {
        me.addClass("active");
    }

    initPermissionRootState(me);
});
// bind root permission state click and init
$("#permissionsHead").on("click", ".permissionTag", function () {
    var me = $(this);
    var perm = me.attr("data-perm");
    var body = $("#permissionsBody");

    if (me.hasClass("active")) {
        me.removeClass("active");
        body.find("[data-perm=" + perm + "].active:visible").trigger("click");
    } else {
        me.removeClass("multi");
        body.find("[data-perm=" + perm + "]:not(.active):visible").trigger("click");
    }

}).find(".permissionTag").each(function (i, e) {
    initPermissionRootState($(e));
})

// init filter inputs --------------------------------------------------------------------
$("#permissionWrapper").on("keyup", ".listFilterInput", function () {
    var me = $(this);
    var val = $.trim(me.val());
    var items = $("#" + me.attr("id").replace("input", "list")).find("tr");

    if (val.length > 0) {
        var item = null;

        $.each(items, function (i, e) {
            item = $(e);
            if (!item.hasClass("doNotFilter")) {
                (item.text().toUpperCase().indexOf(val.toUpperCase()) >= 0) ? item.show()
                    : item.hide();
            }
        });
    } else {
        items.show();
    }
});