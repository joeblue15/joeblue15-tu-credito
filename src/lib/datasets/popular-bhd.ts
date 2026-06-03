// Dataset of credit cards grouped by bank: popular and BHD
// Used only via dynamic import from the Admin panel import button.

const dataset = {
  popular: [
    {
      "id": "06d5fb1d-9165-4dd6-8654-65daa6640a08",
      "annualFee": 900,
      "highlight": "Tu primera tarjeta ideal para compras diarias y para comenzar a construir tu crédito con total respaldo.",
      "idealFor": "Personas que buscan su primera tarjeta de crédito o un producto sencillo para consumos básicos mensuales.",
      "approval": "Alta",
      "bankSlug": "popular",
      "slug": "clasica-popular",
      "benefits": [
        "Skybox gratis* Disfruta Skybox gratis desde el momento de la subscripción y durante 12 meses. (Aplica a VISA).",
        "Asistencia global Asistencia de emergencia relacionada con la tarjeta en cualquier lugar las 24h.",
        "Protección de precio* Te reembolsamos la diferencia de precio en caso de encontrar el producto a mejor precio. (Aplica a VISA).",
        "Acumulación de Millas Popular por cada dólar o su equivalente en pesos consumidos."
      ],
      "type": "tradicional",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$25,000",
        "Ser mayor de edad y tener entre 18 a 34 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/Tarjeta-Clasica.webp",
      "incomeMin": 25000,
      "seoDescription": "Tarjeta Clásica Popular, la opción confiable para tus compras cotidianas con amplia aceptación nacional e internacional.",
      "currency": "RD$",
      "name": "Tarjeta De Crédito Clásica"
    },
    {
      "id": "45dd43c8-55d3-4da5-b74d-4b774f812e45",
      "idealFor": "Jóvenes profesionales o estudiantes que buscan una experiencia 100% móvil y sin costos de mantenimiento.",
      "highlight": "La tarjeta digital para jóvenes que quieren empezar su vida financiera con estilo.",
      "annualFee": 0,
      "type": "cashback",
      "bankSlug": "popular",
      "slug": "gnial-popular",
      "benefits": [
        "5% de devolución en comida rápida, juegos digitales, streaming , cines, veterinarias, Airbnb.",
        "2x de millas en deportes, recreación, universidades, librerías, compras en Amazon y Apple. 1x de millas en el resto de consumos ",
        "Hasta un 50%  de valor adicional en canjes de conciertos y presentaciones, planes de entrenamiento y entradas de cine."
      ],
      "approval": "Alta",
      "logo": "https://popularenlinea.com/Personas/Paginas/tarjetas/content-sections/Overview/img/selector_tarjetas/Gnial.webp",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$25,000. ",
        "Ser mayor de edad y tener entre 18 a 34 años. ",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito. "
      ],
      "name": "Tarjeta de Crédito Mastercard Gnial",
      "seoDescription": "arjeta Gnial del Banco Popular, la opción digital ideal para jóvenes y nuevos usuarios.",
      "currency": "RD$",
      "incomeMin": 25000
    },
    {
      "id": "5c7b1ef3-f2b4-4ba5-b748-5e02f8ba5c28",
      "annualFee": 2000,
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/mastercard-mileageplus-01.webp",
      "highlight": "Conecta tus compras diarias directamente con el programa MileagePlus de United Airlines para volar a destinos globales.",
      "seoDescription": "Tarjeta Mastercard United MileagePlus del Banco Popular, acumula millas directamente en tu cuenta MileagePlus con cada consumo.",
      "slug": "mastercard-united-mileageplus-popular",
      "type": "viajes",
      "incomeMin": 20000,
      "bankSlug": "popular",
      "idealFor": "Viajeros frecuentes que prefieren la red de United Airlines y la alianza Star Alliance para sus conexiones internacionales.",
      "benefits": [
        "Acumulación directa de millas MileagePlus por cada dólar de consumo, sin necesidad de transferencias complejas.",
        "Acceso a la red global de Star Alliance, permitiendo redimir millas en múltiples aerolíneas asociadas.",
        "Bonos de millas por bienvenida tras cumplir el consumo mínimo establecido al activar la tarjeta.",
        "Seguros de viaje y protección de compras respaldados por la red Mastercard para mayor tranquilidad en el extranjero."
      ],
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$20,000",
        "Ser mayor de edad y tener entre 18 a 75 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "approval": "Media",
      "name": "MasterCard United MileagePlus",
      "currency": "RD$"
    },
    {
      "id": "8086cc87-d915-4b28-aee9-1a49f4fdde87",
      "highlight": "La cúspide de la exclusividad, diseñada para ofrecerte un servicio personalizado y asistencias de viaje de clase mundial.",
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/TC_VISA_PRESTIGE.webp",
      "annualFee": 10000,
      "slug": "visa-infinite-prestige-popular",
      "seoDescription": "Tarjeta Visa Infinite Prestige Popular, el máximo nivel de distinción con beneficios exclusivos y servicios de concierge global.",
      "benefits": [
        "Bono de 30,000 Millas Popular",
        "Acumulación máxima de Millas Popular y privilegios exclusivos en hoteles y resorts de lujo a nivel global.",
        "Accesos ilimitados a salones VIP en aeropuertos alrededor del mundo a través de Priority Pass.",
        "Servicio de Concierge personal 24/7 para reservas de restaurantes, eventos y planificación de viajes."
      ],
      "bankSlug": "popular",
      "idealFor": "Clientes de banca privada y altos ejecutivos que requieren beneficios ilimitados, atención personalizada y acceso a experiencias de lujo.",
      "incomeMin": 500000,
      "type": "premium",
      "currency": "RD$",
      "approval": "baja",
      "name": "Visa Infinite Prestige",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$500,000",
        "Ser mayor de edad y tener entre 18 a 75 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ]
    },
    {
      "id": "904f5dd1-4783-4583-84ae-6d8e886c0b08",
      "slug": "mastercard-black-popular",
      "seoDescription": "Mastercard Black del Banco Popular, disfruta de un nivel de servicios premium, asistencias de viaje ilimitadas y el mejor programa de recompensas.",
      "highlight": "El máximo estándar de Mastercard, combinando estatus, seguros de viaje superiores y experiencias VIP.",
      "annualFee": 10000,
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/mastercard-black.webp",
      "name": "MasterCard Black",
      "approval": "Baja",
      "currency": "RD$",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$500,000",
        "Ser mayor de edad y tener entre 18 a 75 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "bankSlug": "popular",
      "idealFor": "Viajeros frecuentes y perfiles ejecutivos que demandan coberturas robustas y accesos VIP en sus traslados internacionales.",
      "benefits": [
        "Bono de 30,000 Millas Popular",
        "Accesos a salas LoungeKey",
        "Asistencia del Mastercard Global Service",
        "Trato personalizado"
      ],
      "incomeMin": 500000,
      "type": "premium"
    },
    {
      "id": "93d24b5a-db34-4a94-a66e-848f6b58265d",
      "seoDescription": "Tarjeta Plus CCN del Banco Popular, obtén descuentos y beneficios exclusivos en todas las tiendas del Grupo CCN.",
      "slug": "plus-ccn-popular",
      "logo": "https://popularenlinea.com/Personas/Paginas/tarjetas/content-sections/Overview/img/selector_tarjetas/Plus-CCn.webp",
      "annualFee": 1200,
      "highlight": "Beneficio destacadoLa tarjeta diseñada para quienes hacen sus compras cotidianas en los establecimientos de Grupo CCN.",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$20,000",
        "Ser mayor de edad y tener entre 18 a 34 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "currency": "RD$",
      "name": "Tarjeta Plus CCN Popular",
      "approval": "Media",
      "incomeMin": 20000,
      "type": "cashback",
      "benefits": [
        "8% en consumos realizados a partir de RD$20,000 al mes. ",
        "6% en consumos realizados a partir de RD$8,000 al mes.",
        "5% en consumos realizados hasta RD$8,000 al mes.",
        "Genera Millas Popular en los consumos realizados fuera de tiendas CCN."
      ],
      "bankSlug": "popular",
      "idealFor": "Clientes frecuentes de Supermercados Nacional, Jumbo, Casa Cuesta y Ferretería Cuesta."
    },
    {
      "id": "a1c9e9af-fd9c-4bfc-92f4-252aa8015833",
      "bankSlug": "popular",
      "idealFor": "Viajeros frecuentes hacia Estados Unidos y otros destinos de JetBlue que buscan maximizar la acumulación de millas aéreas rápidamente.",
      "benefits": [
        "Beneficio 12,000 puntos TrueBlue de bienvenida por el primer consumo con tu tarjeta.",
        "2x puntos TrueBlue por cada US$1.00 consumido en JetBlue",
        "1x punto Trueblue por los demás consumos.",
        "Garantía extendida Extensión de hasta 1 año la garantía original ofrecida por el fabricante o tienda."
      ],
      "type": "viajes",
      "incomeMin": 19998,
      "approval": "Media",
      "name": "Mastercard JetBlue Popular",
      "currency": "RD$",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$20,000",
        "Ser mayor de edad y tener entre 18 a 34 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "highlight": "La tarjeta ideal para los fieles viajeros de JetBlue, convirtiendo tus gastos diarios en puntos TrueBlue para tus próximos vuelos.",
      "annualFee": 2000,
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/tcjetblue.webp",
      "slug": "mastercard-jetblue-popular",
      "seoDescription": "Tarjeta Mastercard JetBlue del Banco Popular, acumula puntos TrueBlue en cada compra y viaja más lejos a tus destinos favoritos."
    },
    {
      "id": "b49dfc66-317b-422a-8af4-43b9b3708409",
      "slug": "iberia-popular",
      "name": "Tarjeta de Crédito Iberia Popular",
      "bankSlug": "popular",
      "type": "cashback",
      "incomeMin": 20000,
      "annualFee": 1000,
      "approval": "Media",
      "highlight": "Conviértete en un viajero frecuente y acumula Avios con cada compra para volar a Europa y el mundo.",
      "idealFor": "Viajeros frecuentes hacia España y Europa que buscan optimizar sus viajes a través del programa Avios de Iberia Plus.",
      "benefits": [
        "Acumulación directa de Avios en tu cuenta Iberia Plus por cada dólar de consumo realizado.",
        "Acceso a las ventajas de la alianza Oneworld, permitiendo conexiones globales con múltiples aerolíneas aliadas.",
        "Bonos de Avios por bienvenida tras alcanzar el consumo mínimo requerido en los primeros meses.",
        "Seguros de viaje premium, protección de equipaje y servicios de asistencia global respaldados por la red Mastercard."
      ],
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$20,000",
        "Ser mayor de edad y tener entre 18 a 75 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "seoDescription": "Tarjeta de Crédito Iberia Popular, acumula Avios por tus consumos y disfruta de beneficios exclusivos al volar con Iberia y sus aerolíneas asociadas.",
      "currency": "RD$",
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/iberia.webp"
    },
    {
      "id": "bd9c6603-537b-4a49-8dc2-5e6ce739ea05",
      "idealFor": "Usuarios con nivel de ingresos medio-alto que concentran compras recurrentes en comercios y servicios.",
      "highlight": "Cashback premium diseñado para los gastos de tu estilo de vida y negocios.",
      "annualFee": 900,
      "type": "cashback",
      "bankSlug": "popular",
      "benefits": [
        "Recibe hasta un 10% de devolución de tus consumos al fin de mes.",
        "2% de devolución de tus consumos en comercios electrónicos.",
        "1% de devolución en el resto de tus consumos.",
        "3 viajes gratis en Uber. RD$150 por viaje durante tus primeros 6 meses."
      ],
      "slug": "mastercard-infinia-popular",
      "approval": "Media",
      "logo": "https://popularenlinea.com/Personas/Paginas/tarjetas/content-sections/Overview/img/selector_tarjetas/Infinia.webp",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$25,000. ",
        "Ser mayor de edad y tener entre 18 a 34 años. ",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito. "
      ],
      "name": "Tarjeta de Crédito Mastercard INFINIA",
      "seoDescription": "Mastercard Infinia del Banco Popular, obtén excelentes devoluciones en tus compras premium.",
      "currency": "RD$",
      "incomeMin": 25000
    },
    {
      "id": "c9b32391-bb86-4742-ad59-34b72084cb63",
      "currency": "RD$",
      "approval": "Media",
      "name": "MASTERCARD DE SEGUROS UNIVERSAL",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$20,000",
        "Ser mayor de edad y tener entre 18 a 75 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "benefits": [
        "Descuentos y beneficios exclusivos en el pago de primas de seguros seleccionados de Universal.",
        "Acumulación acelerada de puntos que pueden ser redimidos en servicios de salud y bienestar.",
        "Acceso a asistencias especiales de Universal en caso de emergencia médica o servicios a la propiedad.",
        "Respaldo y protección global de Mastercard, incluyendo seguros de viaje y garantía extendida en compras."
      ],
      "idealFor": "Clientes que ya poseen pólizas de seguro con Universal y buscan convertir sus pagos de primas y gastos diarios en beneficios.",
      "bankSlug": "popular",
      "incomeMin": 20000,
      "type": "cashback",
      "slug": "mastercard-universal-popular",
      "seoDescription": "Tarjeta Mastercard Universal Popular, la mejor forma de pagar tus seguros y obtener recompensas en asistencia y salud.",
      "highlight": "Maximiza tus ahorros al pagar tus seguros Universal y recibe beneficios exclusivos en salud y bienestar.",
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/mastercard-seguros-universal-01.webp",
      "annualFee": 900
    },
    {
      "id": "d5c73a2f-62d4-43c0-870d-c44e24ee266d",
      "highlight": "Mayor capacidad de compra y beneficios extendidos para quienes buscan elevar su nivel de financiamiento.",
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/gold.webp",
      "annualFee": 1700,
      "slug": "gold-popular",
      "seoDescription": "Tarjeta Gold Popular, obtén mayor poder adquisitivo y asistencias globales para tu estilo de vida.",
      "benefits": [
        "Renovación gratis Al tener una facturación anual mínima de RD$864 mil.",
        "7,500 Millas Popular Al facturar RD$90,000 acumulados, los primeros tres meses. Aplica solo para nuevas emisiones.",
        "10% de devolución En salones y barberías, 5% en telecomunicaciones, restaurantes y comida rápida.",
        "2x de millas En salud, educación y servicios."
      ],
      "idealFor": "Profesionales en crecimiento que requieren un límite más holgado para compras recurrentes e imprevistos.",
      "bankSlug": "popular",
      "type": "cashback",
      "incomeMin": 35000,
      "currency": "RD$",
      "approval": "Media",
      "name": "Tarjeta de Crédito Gold",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$35,000",
        "Ser mayor de edad y tener entre 18 a 34 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ]
    },
    {
      "id": "de82d909-3df6-4ea9-ae40-4a9a19f18ca8",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$25,000. ",
        "Ser mayor de edad y tener entre 18 a 34 años. ",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito. "
      ],
      "logo": "https://popularenlinea.com/Personas/Paginas/tarjetas/content-sections/Overview/img/selector_tarjetas/Isi.webp",
      "incomeMin": 25000,
      "name": "Tarjeta de Crédito Visa ISI",
      "currency": "RD$",
      "seoDescription": "Ahorra en gasolina y supermercados con la tarjeta Visa ISI del Banco Popular Dominicano.",
      "highlight": "Ahorra dinero automáticamente al comprar en supermercados y estaciones de combustible.",
      "annualFee": 900,
      "idealFor": "Personas que buscan maximizar el presupuesto de su hogar en compras esenciales.",
      "approval": "Alta",
      "type": "cashback",
      "slug": "visa-isi-popular",
      "benefits": [
        "5% de devolución  en supermercados y estaciones de combustibles",
        "2% de devolución  en compras en línea de comercios internacionales. ",
        "1% de devolución  en el resto de las categorías. ",
        "Tasa de financiamiento preferencial  y bajas comisiones."
      ],
      "bankSlug": "popular"
    },
    {
      "id": "e0825645-369e-4f42-932f-540782490e54",
      "slug": "caminantes-por-la-vida-popular",
      "name": "Tarjeta de Crédito Caminantes por la Vida",
      "bankSlug": "popular",
      "type": "cashback",
      "incomeMin": 20000,
      "annualFee": 1000,
      "approval": "Media",
      "highlight": "Una tarjeta con propósito social que te permite apoyar la lucha contra el cáncer con cada consumo.",
      "idealFor": "Clientes con conciencia social que desean aportar a causas de salud de forma automática a través de sus gastos cotidianos.",
      "benefits": [
        "Aporte automático de un porcentaje de tus consumos a la Fundación Caminantes por la Vida.",
        "Acumulación de Millas Popular que puedes donar directamente a la causa o utilizar para tus necesidades.",
        "Acceso a las promociones y descuentos del Plan de Beneficios Popular en una amplia red de comercios aliados.",
        "Respaldo internacional de la red Visa o Mastercard para tus compras dentro y fuera del país."
      ],
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$20,000",
        "Ser mayor de edad y tener entre 18 a 75 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "seoDescription": "Tarjeta Caminantes por la Vida del Banco Popular, conviértete en agente de cambio y apoya la prevención y lucha contra el cáncer.",
      "currency": "RD$",
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/mastercard-caminantes-por-la-vida-01.webp"
    },
    {
      "id": "f8d9476b-6d54-4891-96c1-7703e9be143f",
      "type": "premium",
      "incomeMin": 109998,
      "bankSlug": "popular",
      "idealFor": "Profesionales y ejecutivos que buscan un balance entre estatus, alta capacidad de pago y coberturas asistenciales.",
      "benefits": [
        "GRATIS 2 accesos a salas LoungeKey en aeropuertos asociados",
        "0€ el seguro médico si viajas a la zona Schengen",
        "Gana millas mientras viajas",
        "15% adicional de tus millas en categorí­a de viajes"
      ],
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$110,000",
        "Ser mayor de edad y tener entre 18 a 34 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "approval": "Media-Baja",
      "name": "Tarjeta de Crédito Titanium",
      "currency": "RD$",
      "annualFee": 3000,
      "logo": "https://popularenlinea.com/Personas/Paginas/tarjetas/content-sections/Overview/img/selector_tarjetas/Titanium.webp",
      "highlight": "Un escalón superior diseñado para quienes valoran el estilo de vida y beneficios de protección en sus viajes.",
      "seoDescription": "Tarjeta Titanium Popular, disfruta de un perfil premium con mayores asistencias de viaje y respaldo global.",
      "slug": "titanium-popular"
    },
    {
      "id": "fb791996-fdd0-49b0-bd31-7baae580270e",
      "approval": "Media",
      "name": "Tarjeta IKEA Family Popular",
      "currency": "RD$",
      "requirements": [
        "Devengar ingresos mínimos mensuales de RD$20,000",
        "Ser mayor de edad y tener entre 18 a 34 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "idealFor": "Clientes entusiastas de IKEA que realizan compras frecuentes de muebles y decoración para el hogar.",
      "bankSlug": "popular",
      "benefits": [
        "Acumulación de puntos en todas tus compras, canjeables por certificados de regalo de IKEA.",
        "Financiamiento especial y tasas preferenciales para compras de mobiliario y artículos del hogar en IKEA.",
        "Acceso a preventas, eventos exclusivos y talleres de diseño dentro de la tienda IKEA.",
        "Descuentos especiales y promociones temporales en el restaurante y mercado de comida sueca de IKEA."
      ],
      "incomeMin": 20000,
      "type": "cashback",
      "slug": "ikea-family-popular",
      "seoDescription": "Tarjeta IKEA Family del Banco Popular, disfruta de financiamiento especial, descuentos y beneficios en tus compras en IKEA.",
      "highlight": "El aliado perfecto para renovar tu hogar con beneficios exclusivos en IKEA República Dominicana.",
      "annualFee": 1000,
      "logo": "https://popularenlinea.com/SiteCollectionImages/personas/tarjetas/tajreta-ikea-family-2022-new.webp"
    }
  ],
  BHD: [
    {
      "id": "098ddf87-126e-40a7-a5fc-87bd2c4ed965",
      "incomeMin": 15000,
      "seoDescription": "Tarjeta Mastercard Standard BHD, realiza tus compras locales e internacionales con financiamiento flexible y seguro.",
      "logo": "https://static.bhd.com.do/TC_mastercard_standar_14b40886c5.png",
      "name": "Tarjeta de Crédito Mastercard Standard",
      "approval": "Alta",
      "slug": "mastercard-standard-bhd",
      "bankSlug": "bhd",
      "requirements": [
        "Ingresos mínimos de RD$15,000 mensuales.",
        " Edad mínima de 18 años.",
        "Estabilidad laboral mínima de seis meses en la empresa."
      ],
      "highlight": "Flexibilidad y control financiero para tus consumos tanto locales como internacionales.",
      "idealFor": "Personas que buscan un producto básico y confiable para realizar compras por internet y viajes ocasionales.",
      "annualFee": 1200,
      "benefits": [
        "Estrellas BHD",
        "Mastercard Traveler Rewards.",
        "Cuotas BHD",
        "Protección y seguridad en compras."
      ],
      "type": "tradicional",
      "currency": "RD$"
    },
    {
      "id": "288d72a2-538d-4d3c-917e-a1152fd3e377",
      "requirements": [
        " Ingresos mínimos de RD$100,000 mensuales",
        "Ser mayor de edad y tener entre 18 a 70 años",
        "En caso de ser extranjero independiente, debes remitir estados bancarios que evidencien tus ingresos"
      ],
      "bankSlug": "bhd",
      "name": "Tarjeta de Crédito Mastercard Platinum",
      "slug": "mastercard-platinum-bhd",
      "approval": "Media-Baja",
      "seoDescription": "Tarjeta Mastercard Platinum BHD, asegura tus compras globales, accede a asistencias premium y financiamiento flexible.",
      "logo": "https://static.bhd.com.do/TC_mastercard_platinum_ef3474f6f3.png",
      "incomeMin": 100000,
      "type": "premium",
      "currency": "RD$",
      "annualFee": 3200,
      "benefits": [
        "Mastercard Traveler Rewards.",
        "Cuotas BHD",
        "Protección MasterAssist para viajes internacionales",
        "Seguro de garantía extendida global."
      ],
      "idealFor": "Ejecutivos y viajeros que priorizan la seguridad en compras de alto valor y coberturas de garantía extendida globales.",
      "highlight": "Distinción, asistencias preferenciales y una sólida protección para tus compras y viajes internacionales."
    },
    {
      "id": "2baa48ea-5911-4bc4-97b1-28447a1c4b5f",
      "incomeMin": 15000,
      "logo": "https://static.bhd.com.do/TC_visa_clasica_cbc2b11f9a.png",
      "seoDescription": "Tarjeta Visa Clásica BHD, financiamiento flexible, aceptación global y control total de tus compras diarias.",
      "slug": "visa-clasica-bhd",
      "approval": "Media",
      "name": "Tarjeta de Crédito Visa Clásica",
      "bankSlug": "bhd",
      "requirements": [
        " Ingresos mínimos de RD$15,000 mensuales.",
        "Edad mínima de 18 años.",
        "Estabilidad laboral mínima de seis meses en la empresa."
      ],
      "idealFor": "Personas que buscan una línea de crédito inicial para consumos cotidianos y compras en línea de forma segura.",
      "highlight": "Una tarjeta esencial y confiable para gestionar tus gastos diarios con total seguridad.",
      "benefits": [
        "Estrellas BHD",
        "Visa Cashback",
        "Cuotas BHD",
        "Reemplazo Urgente de Tarjeta."
      ],
      "annualFee": 1500,
      "type": "tradicional",
      "currency": "RD$"
    },
    {
      "id": "32b76e7e-fa09-44ea-bea5-6f28408749fb",
      "slug": "visa-mi-pais-bhd",
      "name": "Tarjeta de Crédito Visa Mi País BHD",
      "bankSlug": "bhd",
      "type": "cashback",
      "incomeMin": 15000,
      "annualFee": 1600,
      "approval": "Alta",
      "highlight": "Diseñada para la comunidad dominicana en el exterior, facilitando el apoyo económico a sus familias con grandes beneficios.",
      "idealFor": "Dominicanos ausentes o ciudadanos con familiares directos en el extranjero que buscan optimizar el envío de remesas y gastos de soporte familiar.",
      "benefits": [
        { "text": "5% Devolución (Farmacias Restaurantes Fast Food)", "bold": true },
        { "text": "Estrellas BHD", "bold": true },
        { "text": "6% de ahorro en tinedas Corripio", "bold": true },
        { "text": "8% de ahorro  en Listo Ferretería", "bold": true },
        { "text": "Asistencia Vehicular", "bold": true },
        { "text": "Cuotas BHD", "bold": true }
      ],
      "requirements": [
        { "text": " Ingresos mínimos de RD$15,000 mensuales.", "bold": false },
        { "text": " Edad mínima de 18 años.", "bold": false },
        { "text": " Estabilidad laboral mínima de seis meses en la empresa.", "bold": false }
      ],
      "seoDescription": "Tarjeta Visa Mi País BHD, obtén devoluciones especiales y facilidades de pago en el envío de remesas a República Dominicana.",
      "currency": "RD$",
      "logo": "https://static.bhd.com.do/TC_Mi_pais_265x182_f92f2609b6.png"
    },
    {
      "id": "43a68e8e-71ec-4372-9ea4-feaca088a630",
      "slug": "mastercard-black-bhd",
      "name": "Tarjeta de Crédito Mastercard Black",
      "bankSlug": "bhd",
      "type": "premium",
      "incomeMin": 300000,
      "annualFee": 10000,
      "approval": "Baja",
      "highlight": "Un pasaporte de exclusividad y prestigio diseñado para superar las expectativas de los viajeros más exigentes.",
      "idealFor": "Altos ejecutivos y profesionales de ingresos elevados que buscan experiencias VIP exclusivas en aeropuertos y sólidas garantías internacionales.",
      "benefits": [
        { "text": "Before Boarding.", "bold": true },
        { "text": "Beneficios de Compra Mastercard.", "bold": true },
        { "text": "Beneficios Médicos Mastercard.", "bold": true },
        { "text": "Cuotas BHD", "bold": true },
        { "text": "Beneficios Viaje Mastercard.", "bold": true },
        { "text": "Lounge Key", "bold": true },
        { "text": "Seguros y protecciones MasterAssist Black", "bold": true }
      ],
      "requirements": [
        { "text": " Ingresos mínimos de RD$300,000 mensuales.", "bold": false },
        { "text": "Edad mínima de 18 años.", "bold": false },
        { "text": "Es necesario que proveas copias de tus últimos tres estados de cuenta corriente.", "bold": false }
      ],
      "seoDescription": "Tarjeta Mastercard Black BHD, disfruta de acceso a salas VIP a nivel mundial, seguros de viaje robustos y alta acumulación.",
      "currency": "RD$",
      "logo": "https://static.bhd.com.do/TC_mastercard_black_83cd1dc730.png"
    },
    {
      "id": "4ee798f3-c608-4894-9836-39efd7ebeb26",
      "name": "Tarjeta de Crédito Mastercard Standard Pesos",
      "approval": "Alta",
      "slug": "mastercard-standard-pesos-bhd",
      "requirements": [
        " Ingresos mínimos de RD$15,000 mensuales.",
        "Ser mayor de edad y tener entre 18 a 72 años",
        "Estabilidad laboral mínima de seis meses en la empresa."
      ],
      "bankSlug": "bhd",
      "incomeMin": 15000,
      "seoDescription": "Tarjeta Mastercard Standard Pesos BHD, financia tus compras cotidianas de forma segura y accesible.",
      "logo": "https://static.bhd.com.do/TC_mastercard_standar_14b40886c5.png",
      "type": "tradicional",
      "currency": "RD$",
      "idealFor": "Jóvenes profesionales y personas que buscan su primera tarjeta de crédito para consumos básicos en moneda nacional.",
      "highlight": "La opción ideal y accesible para comenzar a construir un historial crediticio sólido.",
      "annualFee": 1000,
      "benefits": [
        "Estrellas BHD",
        "Mastercard Traveler Rewards.",
        "Cuotas BHD",
        "Nuevo beneficio"
      ]
    },
    {
      "id": "51fa9a69-5274-4c74-bec1-6253bbfea3c5",
      "bankSlug": "bhd",
      "requirements": [
        "Ingresos mínimos de RD$20,000 mensuales",
        " Edad mínima de 18 años",
        " Estabilidad laboral mínima de seis meses en la empresa"
      ],
      "name": "Tarjeta de Crédito Emprendedor",
      "slug": "tarjeta-emprendedor-bhd",
      "approval": "Media",
      "seoDescription": "Tarjeta Emprendedor BHD, financia los suministros de tu negocio, controla tus gastos comerciales y aprovecha tasas preferenciales.",
      "logo": "https://static.bhd.com.do/Emprendedor_83b54d55cd.png",
      "incomeMin": 20000,
      "type": "premium",
      "currency": "RD$",
      "annualFee": 1600,
      "benefits": [
        "Estrellas BHD",
        "Asistencia al negocio",
        "Mastercard Traveler Rewards.",
        "Seguro Vida.",
        "Cuotas BHD"
      ],
      "idealFor": "Propietarios de pequeñas empresas, freelancers y emprendedores que necesitan financiamiento comercial y control de flujo de caja.",
      "highlight": "La herramienta financiera ideal para separar tus gastos personales y hacer crecer tu negocio."
    },
    {
      "id": "57c1a558-fb21-49ad-a91e-167dfb963a41",
      "slug": "visa-clasica-pesos-bhd",
      "name": "Tarjeta de Crédito Visa Clásica Pesos",
      "bankSlug": "bhd",
      "type": "tradicional",
      "incomeMin": 15000,
      "annualFee": 1000,
      "approval": "Alta",
      "highlight": "Una herramienta sencilla y accesible para administrar tus gastos diarios exclusivamente en moneda nacional.",
      "idealFor": "Personas que desean una tarjeta de uso local para consumos cotidianos sin manejar fluctuaciones de divisas.",
      "benefits": [
        { "text": "Estrellas BHD", "bold": true },
        { "text": "Beneficios de Compra VISA", "bold": true },
        { "text": "Visa Cashback (Hasta 37% en compras fisicas en EE.UU)", "bold": true },
        { "text": "Cuotas BHD", "bold": true }
      ],
      "requirements": [
        { "text": " Ingresos mínimos de RD$15,000 mensuales.", "bold": false },
        { "text": " Edad mínima de 18 años.", "bold": false },
        { "text": "Estabilidad laboral mínima de seis meses en la empresa.", "bold": false }
      ],
      "seoDescription": "Tarjeta Visa Clásica Pesos BHD, controla tus compras del día a día con financiamiento seguro y local.",
      "currency": "RD$",
      "logo": "https://static.bhd.com.do/TC_visa_clasica_cbc2b11f9a.png"
    },
    {
      "id": "6b8732f3-6e30-4859-939e-6b4db8a1ef82",
      "incomeMin": 30000,
      "logo": "https://static.bhd.com.do/TC_visa_gold_732674d6a8.png",
      "seoDescription": "Tarjeta Visa Gold BHD, incrementa tu poder adquisitivo con amplias asistencias internacionales y el respaldo global de Visa.",
      "name": "Tarjeta de Crédito Visa Gold",
      "approval": "Media",
      "slug": "visa-gold-bhd",
      "bankSlug": "bhd",
      "requirements": [
        "Ingresos mínimos de RD$30,000 mensuales.",
        "Ser mayor de edad y tener entre 18 a 70 años",
        "Estabilidad laboral mínima de seis meses en la empresa."
      ],
      "highlight": "Mayor respaldo financiero y asistencias exclusivas para elevar tu experiencia de compra.",
      "idealFor": "Profesionales y ejecutivos medianos que buscan una línea de crédito flexible y sólida cobertura de seguros para sus transacciones cotidianas y de viaje.",
      "annualFee": 1600,
      "benefits": [
        "Visa Cashback  Recibe hasta 35% de cashback automático al realizar compras físicas en Estados unidos.",
        "Limite adicional a través del cual puedes realizar consumos y avances de efectivo en cómodas cuotas iguales y consecutivas cada mes.",
        "Estrellas BHD.  Por cada RD$ 100 de consumo o su equivalente en dólares, recibe 1 Estrella que equivale a RD$ 1",
        "Al pagar la totalidad de tu compra con tu tarjeta Visa BHD, accedes a:  Protección de Compra Protección de Precio Garantía Extendida"
      ],
      "type": "tradicional",
      "currency": "RD$"
    },
    {
      "id": "70be7293-8f8a-47ac-a950-304887782fcf",
      "type": "cashback",
      "currency": "RD$",
      "highlight": "La tarjeta oficial de las Grandes Ligas que te acerca a tu pasión con devoluciones exclusivas.",
      "idealFor": "Fanáticos del béisbol que consumen eventos deportivos, compran mercancía oficial y buscan beneficios temáticos exclusivos.",
      "benefits": [
        "5% devolución",
        "Estrellas BHD",
        "Mastercard Traveler Rewards",
        "Cuotas BHD"
      ],
      "annualFee": 1200,
      "approval": "Alta",
      "slug": "mastercard-mlb-bhd",
      "name": "Tarjeta de Crédito Mastercard MLB",
      "bankSlug": "bhd",
      "requirements": [
        "Ingresos mínimos de RD$30,000 mensuales.",
        " Edad mínima de 18 años.",
        " Estabilidad laboral mínima de seis meses en la empresa."
      ],
      "incomeMin": 15000,
      "seoDescription": "Tarjeta Mastercard MLB BHD, recibe cashback en deportes, compra mercancía oficial y disfruta de preventas exclusivas de las Grandes Ligas.",
      "logo": "https://static.bhd.com.do/TC_MLB_b12d44ba4b.png"
    },
    {
      "id": "720ce7c9-da6c-4ef6-9d9c-eb0ff33f348d",
      "incomeMin": 300000,
      "seoDescription": "Tarjeta Mastercard Mujer Black BHD, accede a salas VIP globales, alta acumulación de puntos y asistencias médicas exclusivas.",
      "logo": "https://static.bhd.com.do/prueba_III_626e2854c9.png",
      "approval": "Baja",
      "slug": "mastercard-mujer-black-bhd",
      "name": "Tarjeta de Crédito Mastercard Mujer Black",
      "requirements": [
        "Ingresos mínimos de RD$300,000 mensuales",
        "Edad mínima de 18 años",
        "Certificacion de ingresos"
      ],
      "bankSlug": "bhd",
      "idealFor": "Mujeres ejecutivas, empresarias y de altos ingresos que viajan con frecuencia y buscan las mejores coberturas y salas VIP del mundo.",
      "highlight": "El máximo nivel de exclusividad y alta distinción con beneficios y coberturas premium a tu medida.",
      "benefits": [
        "5% Devolución.",
        "Beneficios Mastercard",
        "Lounge Key",
        "Precavida BHD"
      ],
      "annualFee": 10000,
      "type": "premium",
      "currency": "RD$"
    },
    {
      "id": "8181afcf-89ba-406a-8b78-55640075f936",
      "annualFee": 1600,
      "benefits": [
        "Mastercard Traveler Rewards.",
        "Beneficios de Compra Mastercard",
        "Estrellas BHD.",
        "Cuotas BHD"
      ],
      "highlight": "Un balance perfecto entre flexibilidad de pago, seguridad en tus compras y respaldo a nivel mundial.",
      "idealFor": "Profesionales que buscan una línea de crédito confiable con seguros de compra robustos para el día a día y viajes ocasionales.",
      "type": "tradicional",
      "currency": "RD$",
      "logo": "https://static.bhd.com.do/TC_mastercard_gold_e7356b574a.png",
      "seoDescription": "Tarjeta Mastercard Gold BHD, protege tus consumos con garantías extendidas y disfruta de planes de financiamiento flexibles.",
      "incomeMin": 30000,
      "bankSlug": "bhd",
      "requirements": [
        "Ingresos mínimos de RD$30,000 mensuales.",
        "Ser mayor de edad y tener entre 18 a 70  años",
        "Estabilidad laboral mínima de seis meses en la empresa."
      ],
      "name": "Tarjeta de Crédito Mastercard Gold BHD",
      "approval": "Media",
      "slug": "mastercard-gold-bhd"
    },
    {
      "id": "9f0f2930-209e-47ca-8c5a-7393644a71ae",
      "slug": "visa-business-bhd",
      "name": "Tarjeta de Crédito Visa Business",
      "bankSlug": "bhd",
      "type": "premium",
      "incomeMin": 0,
      "annualFee": 1800,
      "approval": "Media",
      "highlight": "Optimiza el flujo de caja de tu empresa y mantén un control riguroso de los gastos operativos de tus empleados.",
      "idealFor": "Medianas y grandes empresas que necesitan asignar líneas de crédito corporativas a su personal para gastos de representación, viajes y viáticos.",
      "benefits": [
        { "text": "1% cashback en comercios seleccionados", "bold": true },
        { "text": "Clarity Business", "bold": true },
        { "text": "Visa Airport Companion", "bold": true },
        { "text": "Control centralizado de gastos corporativos.", "bold": true },
        { "text": "Asistencia en viajes", "bold": true },
        { "text": "Beneficios de Visa", "bold": true }
      ],
      "requirements": [
        { "text": " Fotocopia de la cédula de cada empleado anexo a solicitud.", "bold": false },
        { "text": "Solicitud de Tarjeta Business y Personal debidamente completada por la empresa", "bold": false },
        { "text": " Cuenta corriente en Banco BHD", "bold": false }
      ],
      "seoDescription": "Tarjeta Visa Business BHD, simplifica la contabilidad de tu empresa, financia tus compras operativas y controla los gastos corporativos.",
      "currency": "RD$",
      "logo": "https://static.bhd.com.do/VISA_BUSINESS_BHD_b953e6db9e.png"
    },
    {
      "id": "b14602c2-11fa-4e13-8bec-85ea4a474610",
      "logo": "https://static.bhd.com.do/BHD_PREMIA_ee3704d102.png",
      "seoDescription": "Tarjeta Visa Premia BHD, recibe devoluciones de dinero en efectivo por tus compras cotidianas en República Dominicana.",
      "incomeMin": 20000,
      "bankSlug": "bhd",
      "requirements": [
        "Estabilidad laboral mínima de 6 meses en la empresa.",
        "Ser mayor de edad y tener entre 18 a 34 años",
        "Certificación de ingresos, constancia de autenticidad de empleo y referencias de crédito"
      ],
      "name": "arjeta de Crédito Visa Premia",
      "approval": "Alta",
      "slug": "isa-premia-bhd",
      "annualFee": 1800,
      "benefits": [
        "5% de devolución en supermercados",
        "5% de devolución en empresas de telecomunicaciones.",
        "5% de devolución en plataformas digitales (streaming).",
        "5% de devolución en clínicas veterinarias."
      ],
      "highlight": "Tu aliada perfecta para el día a día que te devuelve dinero por tus consumos cotidianos.",
      "idealFor": "Personas que buscan un producto sencillo y efectivo para optimizar sus gastos mensuales en supermercados, estaciones de combustible y farmacias.",
      "type": "cashback",
      "currency": "RD$"
    },
    {
      "id": "be3a7e74-c77e-43e7-8eb6-2d776399a070",
      "slug": "visa-lifemiles-bhd",
      "approval": "Media",
      "name": "Tarjeta de Crédito Visa LifeMiles",
      "requirements": [
        "Ingresos mínimos de RD$30,000 mensuales.",
        "Ser mayor de edad y tener entre 18 a 70 años",
        "Estabilidad laboral mínima de seis meses en la empresa."
      ],
      "bankSlug": "bhd",
      "incomeMin": 30000,
      "seoDescription": "Tarjeta Visa LifeMiles BHD, acumula millas directamente en tu cuenta y accede a grandes bonos de bienvenida para tus viajes.",
      "logo": "https://static.bhd.com.do/Tarjeta_de_Credito_Life_Miles_Visa_BHD_WEB_8be9d9d42b.png",
      "type": "viajes",
      "currency": "RD$",
      "idealFor": "Viajeros frecuentes que prefieren la red de Avianca y las aerolíneas aliadas para vacacionar o hacer negocios internacionales.",
      "highlight": "Acumula millas en el programa de lealtad de Avianca y viaja a cientos de destinos con Star Alliance.",
      "benefits": [
        "Bono de bienvenida de 5,000 millas",
        "2 Millas por cada dólar (US$) o su equivalente en pesos (RD$) de consumo realizado en aerolínea Avianca y Star Alliance.",
        "1 Milla por cada dólar o su equivalente en pesos de consumo realizado en el resto de los establecimientos",
        "Acceso al sistema de facturación con doble saldo"
      ],
      "annualFee": 2500
    },
    {
      "id": "c87bf6c1-c653-441e-9efc-f5cf93d8e475",
      "approval": "Alta",
      "slug": "mastercard-mujer-red-bhd",
      "name": "Tarjeta de Crédito Mastercard Mujer Red",
      "bankSlug": "bhd",
      "requirements": [
        " Ingresos mínimos de RD$30,000 mensuales.",
        "Ser mayor de edad y tener entre 18 a 70 años",
        "Estabilidad laboral mínima de seis meses en la empresa."
      ],
      "incomeMin": 30000,
      "seoDescription": "Tarjeta Mastercard Mujer Red BHD, obtén cashback en tus compras cotidianas y accede a servicios de asistencia médica y del hogar exclusivos.",
      "logo": "https://static.bhd.com.do/prueba_IV_b93dfcda1c.png",
      "type": "cashback",
      "currency": "RD$",
      "highlight": "Un producto con propósito diseñado para ofrecerte devoluciones y asistencias exclusivas en salud, bienestar y el hogar.",
      "idealFor": "Mujeres que buscan maximizar el rendimiento de su presupuesto mediante reembolsos en compras del hogar y contar con coberturas de salud especializadas.",
      "benefits": [
        "Estrellas BHD",
        "5% Devolución",
        "Precavida BHD",
        "Asistencia Mujer BHD"
      ],
      "annualFee": 2000
    },
    {
      "id": "d3bde22a-201c-4f08-b3f5-c929312ed779",
      "approval": "Alta",
      "slug": "visa-now-bhd",
      "name": "Tarjeta de Crédito Visa NOW",
      "bankSlug": "bhd",
      "requirements": [
        " Ingresos mínimos de RD$15,000 mensuales.",
        "Edad máxima de 30 años.",
        "Estabilidad laboral mínima de 1 año en la empresa."
      ],
      "incomeMin": 15000,
      "seoDescription": "Tarjeta Visa Crédito NOW BHD, sin anualidad y con devoluciones exclusivas en tus apps de streaming, delivery y compras digitales preferidas.",
      "logo": "https://static.bhd.com.do/NOW_1f3650d84a.png",
      "type": "cashback",
      "currency": "RD$",
      "highlight": "La tarjeta digital y física de aprobación instantánea, diseñada para el público joven que busca devolución por sus suscripciones y compras online.",
      "idealFor": "Jóvenes universitarios, nativos digitales y profesionales que inician su historial crediticio y realizan la mayoría de sus consumos en plataformas de streaming, delivery y compras por internet.",
      "benefits": [
        "5% de devolución.",
        "Estrellas BHD",
        "Visa Cashback",
        "Cuotas BHD"
      ],
      "annualFee": 1200
    },
    {
      "id": "d74e6eb9-edd2-4e3b-89d6-e8610b7ecc08",
      "slug": "visa-open-bhd",
      "name": "Tarjeta de Crédito Visa Open",
      "bankSlug": "bhd",
      "type": "premium",
      "incomeMin": 0,
      "annualFee": 1800,
      "approval": "Alta",
      "highlight": "Una tarjeta flexible y digitalizada, ideal para quienes buscan un producto sin cargos fijos y de control total.",
      "idealFor": "Jóvenes y personas que buscan simplicidad financiera, realizando la mayoría de sus transacciones de forma digital y evitando cargos por anualidad.",
      "benefits": [
        { "text": "3 % de devolución mensual (segun tu negocio)", "bold": true },
        { "text": "Before Boarding", "bold": true },
        { "text": "Seguro responsabilidad social", "bold": true },
        { "text": "Beneficios Exclusivos", "bold": true }
      ],
      "requirements": [
        { "text": "Cédula", "bold": false },
        { "text": " Formulario Empleado", "bold": false },
        { "text": " Formulario TC Visa Open", "bold": false }
      ],
      "seoDescription": "Tarjeta Visa Open BHD, dile adiós a la anualidad y mantén el control absoluto de tus compras diarias.",
      "currency": "RD$",
      "logo": "https://static.bhd.com.do/Visa_OPEN_a1eb79eba9.png"
    },
    {
      "id": "dbcbf024-f9ec-46b4-9571-497131990a46",
      "slug": "visa-infinite-bhd",
      "name": "Tarjeta de Crédito Visa Infinite",
      "bankSlug": "bhd",
      "type": "premium",
      "incomeMin": 300000,
      "annualFee": 10000,
      "approval": "Muy Baja",
      "highlight": "El pináculo del prestigio y la asistencia global personalizada para un estilo de vida sin límites.",
      "idealFor": "Altos ejecutivos, empresarios y personas de muy alto patrimonio que viajan constantemente y exigen las máximas coberturas y privilegios mundiales.",
      "benefits": [
        { "text": "Estrellas BHD.", "bold": true },
        { "text": "Visa Cashback", "bold": true },
        { "text": "Cuotas BHD", "bold": true },
        { "text": "Before Boarding.", "bold": true },
        { "text": "Beneficios Emergencia Medica VISA.", "bold": true },
        { "text": "Accesos ilimitados a salas VIP.", "bold": true }
      ],
      "requirements": [
        { "text": " Ingresos mínimos de RD$300,000 mensuales.", "bold": false },
        { "text": " Edad mínima de 18 años.", "bold": false },
        { "text": "Es necesario que proveas copias de tus últimos tres estados de cuenta corriente.", "bold": false }
      ],
      "seoDescription": "Tarjeta Visa Infinite BHD, máxima exclusividad financiera con accesos VIP globales, seguros élite y atención prioritaria.",
      "currency": "RD$",
      "logo": "https://static.bhd.com.do/Untitled_design_7c2f63226f.png"
    },
    {
      "id": "f19830d1-240c-4183-a16a-3013c9b58933",
      "currency": "RD$",
      "type": "premium",
      "benefits": [
        "Beneficios Viaje VISA",
        "Acceso a salas VIP seleccionadas",
        "Visa Cashback  Recibe hasta 35% de cashback ",
        "Beneficios Emergencia Médica VISA"
      ],
      "annualFee": 3200,
      "highlight": "Experiencias exclusivas, mayor capacidad de financiamiento y protecciones superiores en tus viajes.",
      "idealFor": "Profesionales senior y viajeros frecuentes que buscan seguros de viaje robustos y un límite de crédito elevado.",
      "bankSlug": "bhd",
      "requirements": [
        " Ingresos mínimos de RD$100,000 mensuales.",
        "Edad mínima de 18 años.",
        "Comprobante de tus últimos tres estados de cuenta corriente."
      ],
      "slug": "visa-platinum-bhd",
      "approval": "Media-Baja",
      "name": "Tarjeta de Crédito Visa Platinum",
      "seoDescription": "Tarjeta Visa Platinum BHD, accede a servicios de asistencia global, seguros de viaje premium y financiamiento flexible.",
      "logo": "https://static.bhd.com.do/TC_Visa_platinum_e711ab4ce9.png",
      "incomeMin": 100000
    },
    {
      "id": "fefae360-d669-41ad-8870-a320573be427",
      "slug": "mastercard-mujer-white-bhd",
      "name": "Tarjeta de Crédito Mastercard Mujer White",
      "bankSlug": "bhd",
      "type": "premium",
      "incomeMin": 100000,
      "annualFee": 3500,
      "approval": "Muy Baja",
      "highlight": "Una experiencia de opulencia y privilegios sin igual, con el servicio más personalizado del mercado.",
      "idealFor": "Mujeres de altísimo patrimonio, altas ejecutivas y empresarias que demandan el nivel más alto de servicios conserje, viajes globales y total distinción.",
      "benefits": [
        { "text": "Devolucion del 5% en Salones, Combustible y Courier", "bold": true },
        { "text": "Devolucion del 5% e-commerce", "bold": true },
        { "text": "Beneficios Viaje Mastercard.", "bold": true },
        { "text": "Precavida BHD", "bold": true },
        { "text": "Asistencia Mujer BHD", "bold": true }
      ],
      "requirements": [
        { "text": "Ingresos mínimos de RD$100,000 mensuales.", "bold": false },
        { "text": "Edad mínima de 18 años.", "bold": false },
        { "text": "Proveer copias de tus últimos tres estados de cuenta corriente.", "bold": false }
      ],
      "seoDescription": "Tarjeta Mastercard Mujer White BHD, el nivel más exclusivo de crédito con accesos VIP globales prioritarios y asistencias élite.",
      "currency": "RD$",
      "logo": "https://static.bhd.com.do/prueba_V_6ad2d7ceca.png"
    }
  ]
};

export default dataset;
