## Daily 10/02/2021
Nos reunimos via Zoom para ponernos al tanto sobre los avances del proyecto, que partes faltaban y que ya estaba hecho. Decidimos como resolver en caso de no llegar a concluir el sprint (aclarando las cosas que quedaron pendientes en el Readme tal como recomendó el profesor Alejandro), y decidiendo que debiamos priorizar.
Priorizamos concluir las tareas del sprint, y postergar mejoras recomendadas en caso de no llegar, tales como: mejoras en cuanto al estilo, reducir la repeticion de ciertos textos, o la division de creacion/edicion de productos en etapas).
Luego tuvimos varias reuniones esporadicas varios días, cuando algunos miembros coincidian en tiempo libre, para ayudarnos mutuamente. Las mismas no han sido incluidas en las dailys.

## Daily 01/02/2021
Nos reunimos via Zoom para instalar Sequelize, configurarlo, crear un modelo (User.js) entre todos.
Nos dividimos los modelos restantes, para realizarlos en los dias siguientes, de la siguiente manera:
MODELS:

Tobias:
- Product.js
- Content.js

Sergio:
- Section.js
- Benefit.js

Marcelo:
- Category.js 
- Cart.js

## Daily 26/01/2021
Nos reunimos via Zoom para continuar trabajando. Nos dividimos las tareas "para mejorar" indicadas en las devoluciones del sprint anterior (5). Las mismas fueron detalladas en Trello con sus correspondientes encargados. Tambien estuvimos trabajando en la estructura de la base de datos. Agregamos una tabla intermedia entre productos y categorias, para que no se repitiera información (varios productos pueden corresponder a la misma categoria, o viceversa).
También la tabla de "sections" la optimizamos para que no se repitiera información (x ej: icon1, icon2, icon3). Creamos una tabla para cada tipo de contenido (iconos, titulos, subtitulos). Luego por sugerencia del profesor Alejandro, optimizamos nuevamente utilizando solamente una tabla "contents" que guarde los distintos contenidos correspondientes a una "section", ya que todos guardaban los mismos tipos de información.

## Daily 22/01/2021
Nos juntamos via zoom para ver el pdf del nuevo sprint, acordar los nuevos objetivos y la forma en que lo vamos a encarar. Vimos la estructura de las tablas en workbench, debatiendo para ver que manera seria mejor la estructura de la base de datos y corrigiendo algunos tipos de valores.
Quedamos en juntarnos en los proximos dias para completar el diagrama de la base de datos.
