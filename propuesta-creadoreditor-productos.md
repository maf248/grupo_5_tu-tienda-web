Para crear y editar los productos la propuesta es editar la página actual y dividirla en distintas vistas, una para cada tabla de la db.

Primero se editarán los productos, en la sección de editar un producto se incluirá:
  - El nombre del producto.
  -El tipo de producto.
  -El título del banner del producto.
  -El subtítulo del banner del producto.
  -La imagen del producto.
  - Se incluirá un botón que diga siguiente para continuar con el proceso de creación y otro botón que diga terminar si se desea terminar luego de completar esta seccion.
 
El segundo paso será crear las categorías del producto, esta sección incluirá:
  -Nombre de la categoría
   -imagen de la categoría
   -precio de la categoría
   -costo por transacción en dicha categoría
   -cantidad de secciones web que incluye la categoría en cuestión.
   -igual que en el paso anterior, un botón que diga siguiente y te redirija a una nueva vista para continuar con la creación/edición y un boton que diga terminar o continuar después (a definir).
   
El tercer paso será crear o editar los beneficios que incluye ese producto.
  - Cada benefició llevará unicamente un título.
  
LUEGO DE ESTE PASO YA SE PODRÁ RENDERIZAR LA PÁGINA CON EL ID DE PRODUCTO CORRESPONDIENTE PARA QUE LOS USUARIOS LA PUEDAN VER.

secciones optativas para creación del producto.

"Sections": esta es una tabla de la base de datos que incluye información adyacente al producto que luego se muestra en el detalle de producto y que sirve para vender el producto mejor.
No es obligatoria y se puede elegir agregarla o no. Se puede agregar de una sección a la vez.
Las "Sections"incluyen:
  -Título de la sección
  -imagen relacionada al titulo de la sección
  
"contents": Esta tabla incluye información extra sobre el producto y tiene el mismo fin que la de sections. Esta directamente realcionada al titulo de la seccion y brinda información del producto que luego se vuelca en el detalle de producto.
Los contenidos incluyen:
 -  un icono (imagen)
 - un subtitulo (texto)
 - una descripcion (texto)
 
Estas dos ultimas seccines no serán necesarias para renderizar la página de detalle de producto pero si sumarán a la estética y comercialización del mismo.

  
