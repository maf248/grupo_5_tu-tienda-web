INSERT INTO products (name, type, title_banner, subtitle_banner, image) VALUES
('Tienda Web','tienda_web','UN CATÁLOGO\, TODOS LOS CANALES DE VENTA','Conectá tu catálogo con Tu Tienda Web y no te pierdas ni una venta','store-color-borde.png'),
('Página Web','pagina_web','EL LUGAR PERFECTO PARA CREAR TU PÁGINA WEB PROFESIONAL','Empezá a crear tu página web ya totalmente gratis','web-color-borde.png');

INSERT INTO categories (name, image, price, transaction_cost_percent, web_sections) VALUES
('Oro','plan-oro.png',6999,0.5,20),
('Plata','plan-plata.png',2999,1,10),
('Bronce','plan-bronce.png',1799,2,5);

INSERT INTO users (hash_id, first_name, last_name, email, password, image, role, product_id, category_id) VALUES 
('$2a$10$1EHxHf5rQ.gyJ2xnJ55sFeHVnMlxbXReGoaFC1ID/dhumC8mGG8Ii','Tobias','Blaksley','tobias.blaksley@hotmail.com','$2a$10$nY9qIx.MJ4cXVG5csGpFFeQzQl4J2h0zhT.VndbdlnZOGzYjdbcmW','Usuario-1_1610562779647.jfif','admin',1,1),
('$2a$10$qpbUssE9j0VlJYCAlUeDweZLwvsKpHYOM9aJ7TjAAGyBLH.5xmmbu','Marcelo','Fanego','maf_248@hotmail.com','$2a$10$/hWEc7y3EoCeSEhnVgkMPOKQJvccgJUlx5xTwMbQquUgEQwEvPw0y','Usuario-2_1611071885248.png','admin',2,1),
('$2a$10$sXa4gEy5HjWWl/BokcMd1e0wgNAXzl3sfyRmGLfa.PfFqhmN5jBpO','Sergio','Casas','sergio.casasr@utadeo.edu.co','$2a$10$A4iqY8lnKfLXCcH38AM/MeOcVkDzG1mxcRf/VllprSbUlFYNwvcg2','Usuario-3_1611147303044.jpeg','admin',2,1),
('$2a$10$y4PFWqy9lA0agnmPmeOrOOgTt6M8f2m1461QT4edtwWMmz3ZHnfte','Marcelo','Fanego','mafmaggot@gmail.com','$2a$10$MHA8vyzxjf4h8rg.WVSPEeXvh9ZX5Uv/a9s58zz70WrnOQdkNLMhW','Usuario-4_1611071905072.png','user',NULL,NULL); 

INSERT INTO sections (products_id, title, image) VALUES
(1,'Todo lo que tu negocio necesita para vender','My-Support-Team-63-Shopper.png'),
(1,'Tu marca. Tu tienda.','tumarca-tutienda.jpg'),
(1,'Tus locales\, conectados.','tus-locales-conectados.jpg'),
(1,'Integración con los mayores marketplaces.','integracion-con-los-mayores-marketplaces.jpg'),
(1,'Tus seguidores. Tus clientes.','tus-seguidores-tus-clientes.jpg'),
(2,'Construye una presencia online única','pointing-left3.png'),
(2,'Libertad plena.','apuntando-derecha.png'),
(2,'Editor simple y profesional de Tu Tienda Web:','2.png'),
(2,'Tu Tienda Web IDA:','pointing-right1.png'),
(2,'Corvid de Tu Tienda Web','pointing-left2.png');

INSERT INTO contents (section_id, type, text) VALUES
(1,'icon','tasks-solid.svg'),
(1,'subtitle','Gestioná tus productos'),
(1,'description','Subí tus productos y actualizá el stock de forma simple'),
(1,'icon','robot-solid.svg'),
(1,'subtitle','Automatizá tus ventas'),
(1,'description','Activá medios de pago para cobrar de forma segura.'),
(1,'icon','truck-solid.svg'),
(1,'subtitle','Enviá tus pedidos'),
(1,'description','Tu tienda conectada con los medios de envío que necesitas.'),
(1,'icon','money-bill-wave-solid.svg'),
(1,'subtitle','Vendé en más canales'),
(1,'description','Integrá tus productos con instagram\, Facebook o con tu local.'),
(2,'icon','palette-solid.svg'),
(2,'subtitle','Tienda de diseños'),
(2,'description','Tu marca es única\, tu tienda también. Elegí un diseño y customizalo para que tus productos se luzcan.'),
(2,'icon','network-wired-solid.svg'),
(2,'subtitle','Tu tienda. Tu dominio.'),
(2,'description','Conectá tus propios dominios a tu tienda.'),
(2,'icon','envelope-solid.svg'),
(2,'subtitle','Gestión de envíos y pagos simplificada'),
(2,'description','Cobrá por tus ventas y enviá tus pedidos de forma rápida y práctica.'),
(2,'icon','pencil-ruler-solid.svg'),
(2,'subtitle','Creador de logos profesional'),
(2,'description','Creá el logo perfecto para tu marca con nuestra herramienta.'),
(3,'icon','align-center-solid.svg'),
(3,'subtitle','Centralizá todas tus ventas'),
(3,'description','Cargá\, cobrá y enviá tus pedidos sin importar donde vendas.'),
(3,'icon','credit-card-solid.svg'),
(3,'subtitle','Medios de pago'),
(3,'description','Utilizá todos los medios de pago disponibles para todos tus locales.'),
(3,'icon','store-solid.svg'),
(3,'subtitle','Stock unificado'),
(3,'description','Unificá el stock de todos los locales en un mismo lugar.'),
(3,'icon','shipping-fast-solid.svg'),
(3,'subtitle','Servicio Fast! Tu Tienda Web'),
(3,'description','Utilizá nuestro sistema de correo y nuestros depósitos para enviar más rápido y barato'),
(4,'icon','google-brands.svg'),
(4,'subtitle','Google Shopping'),
(4,'description','Con el comparador de precios de Google vas a poder mostrar todos tus productos en los resultados de google.'),
(4,'icon','amazon-brands.svg'),
(4,'subtitle','Amazon'),
(4,'description','Integración con Amazon. Lo que mostrás en Tu Tienda Web lo mostrás también en Amazon.'),
(4,'icon','carrot-solid.svg'),
(4,'subtitle','MercadoLiebre'),
(4,'description','Integración con MercadoLiebre. Lo que mostrás en Tu Tienda Web lo mostrás también en MercadoLiebre.'),
(1,'icon','store-alt-solid.svg'),
(4,'subtitle','Falabella'),
(4,'description','Integración con Falabella. Lo que mostrás en Tu Tienda Web lo mostrás también en Falabella.'),
(5,'icon','instagram-brands.svg'),
(5,'subtitle','Instagram Shop'),
(5,'description','Conectá tus productos con Instagram y aumentá el tráfico de tu tienda online.'),
(5,'icon','whatsapp-brands.svg'),
(5,'subtitle','Whatsapp'),
(5,'description','Compartí tus productos directamente dentro de whatsapp con el teclado TuTiendaWeb.'),
(5,'icon','facebook-brands.svg'),
(5,'subtitle','Facebook Store'),
(5,'description','Aumenta tus ventas sincronizando tus productos con tu página de Facebook.'),
(5,'icon','mailchimp-brands.svg'),
(5,'subtitle','Mailchimp News'),
(5,'description','Creá un newsletter y enviá a tus clientes los últimos lanzamientos y promociones'),
(6,'icon','user-friends-solid.svg'),
(6,'subtitle','Personalizá tu sitio web'),
(6,'description','Elegí una plantilla y personalizala como quieras\, o responde algunas preguntas y obtené una página web gratis y exclusiva de forma automática'),
(6,'icon','rocket-solid.svg'),
(6,'subtitle','Agregá funciones avanzadas'),
(6,'description','Creá un blog\, hacé una página de noticias o armá tu presentación personal web para potenciar tu trabajo. Siempre podés agregar más funcionalidad a medida que crecés. No hay límites para tu creatividad ni tu crecimiento.'),
(6,'icon','magic-solid.svg'),
(6,'subtitle','Web Responsive Design'),
(6,'description','Te dejamos todas las herramientas necesarias para que crees una página web que responda de manera automática y que se vea bien en los diferentes tipos de pantalla.'),
(6,'icon','google-brands-2.svg'),
(6,'subtitle','Optimizá para los buscadores'),
(6,'description','Te ayudamos en tu plan de SEO para que todo el mundo te encuentre en Google. Respondé algunas preguntas sobre tu sitio web\, ubicación y palabras clave\, y recibí un plan de SEO personalizado para destarcarte online.'),
(7,'icon','tree-solid.svg'),
(7,'subtitle','La libertad de crear la página web que quieras'),
(7,'description','Diseñá y creá tu propia página web con calidad profesional. Ya sea que estés mostrando tu trabajo o comenzando un blog\, puedes hacerlo todo con el editor de páginas web de Tu Tienda Web.'),
(7,'icon','blog-solid.svg'),
(7,'subtitle','Creá un blog profesional'),
(7,'description','Creá tu propio blog para escribir tus pensamientos más profundos o tus historias más graciosas.'),
(7,'icon','newspaper-solid.svg'),
(7,'subtitle','Creá tu propio noticiero'),
(7,'description','Creá una página web profesional de noticias.'),
(7,'icon','briefcase-solid.svg'),
(7,'subtitle','Mostrá tu trabajo a todo el mundo'),
(7,'description','Creá una página para mostrar a todo el mundo tus habilidades profesionales'),
(8,'icon','palette-solid-2.svg'),
(8,'subtitle','Libertad total de diseño fácil de aplicar'),
(8,'description','Comenzá desde cero o elegí entre una de nuestras plantillas hechas por diseñadores profesionales para crear tu propio sitio.'),
(8,'icon','mouse-pointer-solid.svg'),
(8,'subtitle','Diseñá con un solo movimiento'),
(8,'description','Con el sistema de arrastrar y soltar más innovador del mercado\, podés personalizar o cambiar cualquier cosa.'),
(8,'icon','heartbeat-solid.svg'),
(8,'subtitle','Living Website'),
(8,'description','Hacé que tu sitio web cobre vida con fondos de video\, efectos de desplazamiento y animaciones.'),
(8,'icon','tools-solid.svg'),
(8,'subtitle','100% Intuitive Tools'),
(8,'description','Con el editor de Tu Tienda Web podés crear una hermosa página web profesional sin ayuda de nadie y sin pagar a terceros.'),
(9,'icon','brain-solid.svg'),
(9,'subtitle','Tu página web en minutos'),
(9,'description','Respondé algunas preguntas simples y nuestra inteligencia de diseño artificial (IDA) construirá instantáneamente una página web a tu medida\, con textos e imágenes personalizados.'),
(9,'icon','clock-regular.svg'),
(9,'subtitle','¿No tenés tiempo?'),
(9,'description','Elegí tu estilo\, cambiá el diseño y agregá las funciones que necesites. Cuando estés listo\, ¡estarás live con un solo click!'),
(9,'icon','memory-solid.svg'),
(9,'subtitle','¿Algo no te gustó?'),
(9,'description','Nuestra IDA te permite editar la página con nuevas preguntas para volver al aire en no menos de 10 minutos.'),
(9,'icon','hands-helping-solid.svg'),
(9,'subtitle','Sugerencias IDA'),
(9,'description','Nuestra IDA te sugerirá en base a los recursos web más utilizados del momento.'),
(10,'icon','server-solid.svg'),
(10,'subtitle','Plataforma de desarrollo abierto'),
(10,'description','Creá aplicaciones web profesionales con serverless computing (arquitectura sin servidor) y codificación sin complicaciones.'),
(10,'icon','robot-solid.svg'),
(10,'subtitle','Aportá funcionalidad a tu página Web'),
(10,'description','Administrá todo tu contenido desde base de datos integradas\, agregá tu propio codigo IDE incorporado o trabajá en tu propio entorno y conectate a cientos de API.'),
(10,'icon','building-regular.svg'),
(10,'subtitle','Aplicaciones empresariales optimizadas'),
(10,'description','Obtené total libertad de diseño con el editor de Tu Tienda Web y las aplicaciones empresariales optimizadas.'),
(10,'icon','object-group-solid.svg'),
(10,'subtitle','Herramientas avanzadas de diseño'),
(10,'description','Agregá a tu página scrolls de foto y video\, menúes desplegables y ¡mucho mas!');

INSERT INTO benefits (name) VALUES
('Hosting gratuito'),
('Diseño responsive'),
('Plantillas ilimitadas'),
('Integración con medios de pago'),
('Integración con medios de envío'),
('Gestión de productos y manejo de stock'),
('Configuración de dominio propio'),
('Seguimiento de estadísticas con Google Analytics'),
('Configuración de códigos de tracking y conversión'),
('Hosting y certificado SSL incluido'),
('Aplicación de Tu Tienda Web para Android e iOS'),
('Carritos abandonados'),
('Configuración de puntos de entrega'),
('Carga y actualización masiva de los textos de productos'),
('Productos\, visitas y ventas ilimitados'),
('Soporte via email'),
('Promociones 2x1 y 3x2'),
('Cupones de descuento'),
('Personalización del SEO'),
('Estadísticas avanzadas de tu negocio'),
('Instagram shopping\, Facebook Store\, Mailchimp y Google Shopping'),
('Soporte vía Whatsapp a partir del primer pago'),
('Múltiples idiomas y monedas'),
('Integración con Marketplaces'),
('Inteligencia de diseño artificial (IDA)'),
('Corvid de aplicaciones profesionales'),
('Creador de logos'),
('Dominio con tu marca personalizada'),
('Atención personalizada de nuestro equipo de marketing'),
('Plan SEO de Google'),
('Carrito de compras');

INSERT INTO carts (user_id, product_id, category_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 1);

INSERT INTO category_product (product_id, category_id) VALUES
(1,1),
(1,2),
(1,3),
(2,1),
(2,2),
(2,3);

INSERT INTO benefit_category (category_id, benefit_id) VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10),
(1,11),
(1,12),
(1,13),
(1,14),
(1,15),
(1,16),
(1,17),
(1,18),
(1,19),
(1,20),
(1,21),
(1,22),
(1,23),
(1,24),
(1,25),
(1,26),
(1,27),
(1,28),
(1,29),
(1,30),
(1,31),
(2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(2,6),
(2,7),
(2,8),
(2,9),
(2,10),
(2,11),
(2,12),
(2,13),
(2,14),
(2,15),
(2,16),
(2,17),
(2,18),
(2,19),
(2,20),
(2,21),
(2,22),
(2,23),
(2,24),
(2,25),
(2,26),
(2,27),
(3,1),
(3,2),
(3,3),
(3,4),
(3,5),
(3,6),
(3,7),
(3,8),
(3,9),
(3,10),
(3,11),
(3,12),
(3,13),
(3,14),
(3,15),
(3,16),
(3,17),
(3,18),
(3,19),
(3,20);