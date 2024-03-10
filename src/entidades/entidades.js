export class Tienda {
    constructor(id, totalVentas) {
        this.id = id;
        this.totalVentas = totalVentas;
    }
}

export class Producto {
    constructor(id, sku, nombre, descripcion, unidadesDisponibles, precioUnitario, tienda) {
        this.id = id;
        this.sku = sku;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.unidadesDisponibles = unidadesDisponibles;
        this.precioUnitario = precioUnitario;
        this.tienda = tienda;
    }

    static fromArray(array) {
        return array.map(obj => new Producto(
            obj.id,
            obj.sku,
            obj.nombre,
            obj.descripcion,
            obj.unidades_disponibles,
            parseFloat(obj.precio_unitario),
            obj.tienda
        ));
    }
}


export class Usuario {
    constructor(id, nombre) {
        this.id = id;
        this.nombre=nombre
    }
    static fromArray(array) {
        return array.map(obj => new Usuario(
           obj.id,
           obj.nombre
        ));
    }
}

export class Carrito {
    constructor(id, usuario) {
        this.id = id;
        this.usuario = usuario;
    }
    
}

export class Items {
    constructor(cantidad, precioVenta, descuento, carrito, producto) {
        this.cantidad = cantidad;
        this.precioVenta = precioVenta;
        this.descuento = descuento;
        this.carrito = carrito;
        this.producto = producto;
    }
}
