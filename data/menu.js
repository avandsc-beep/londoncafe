export const categories = [
  { id: "desayunos", name: "Desayunos" },
  { id: "calientes", name: "Café y bebidas calientes" },
  { id: "frias", name: "Bebidas frías" },
  { id: "horneados", name: "Horneados típicos" },
  { id: "postres", name: "Postres" },
  { id: "frappes", name: "Frappés" },
  { id: "noches", name: "Para disfrutar por las noches" },
  { id: "london-meat", name: "London Meat Nights", schedule: { days: [4,5,6], hour: 18.5 } }
];

export const products = [
  { id:"emp-queso", name:"Empanada de queso", category:"desayunos", alsoIn:["horneados"], price:6, description:"Horneada de queso." },
  { id:"emp-pollo", name:"Empanada de pollo", category:"desayunos", alsoIn:["horneados"], price:7, description:"Horneada de pollo." },
  { id:"omelette", name:"Omelette con tocino", category:"desayunos", price:18, description:"Omelette acompañado con tocino." },
  { id:"huevos-revueltos", name:"Huevos revueltos", category:"desayunos", price:15, description:"Huevos revueltos." },
  { id:"croissant", name:"Croissant", category:"desayunos", price:7, description:"Croissant horneado." },
  { id:"queque", name:"Queque", category:"desayunos", price:5, description:"Porción de queque." },
  { id:"sand-jamon", name:"Sándwich de jamón y queso", category:"desayunos", price:10, description:"Jamón y queso." },
  { id:"sand-pollo", name:"Sándwich de pollo", category:"desayunos", price:null, description:"Sándwich de pollo.", needsPrice:true },
  { id:"panini-pollo", name:"Panini de pollo", category:"desayunos", price:17, description:"Panini de pollo." },

  { id:"espresso", name:"Espresso", category:"calientes", price:10, description:"Café espresso." },
  { id:"americano", name:"Americano", category:"calientes", price:10, description:"Espresso con agua caliente." },
  { id:"capuchino", name:"Capuchino", category:"calientes", price:12, description:"Espresso, leche y espuma." },
  { id:"mocaccino", name:"Mocaccino", category:"calientes", price:12, description:"Café con chocolate y leche." },
  { id:"chocolate", name:"Chocolate caliente", category:"calientes", price:10, description:"Chocolate caliente." },
  { id:"te", name:"Té", category:"calientes", price:5, description:"Té caliente." },

  { id:"jugo-verde", name:"Jugo verde", category:"frias", price:10, description:"Jugo verde natural." },
  { id:"jugo-frutas", name:"Jugo natural de frutas", category:"frias", price:5, description:"Jugo natural de frutas.", variants:[{name:"Pequeño",price:5},{name:"Grande",price:10}] },
  { id:"jugo-leche", name:"Jugo con leche", category:"frias", price:10, description:"Jugo preparado con leche." },
  { id:"mocochinchi", name:"Mocochinchi", category:"frias", price:5, description:"Bebida tradicional." },
  { id:"chicha", name:"Chicha", category:"frias", price:5, description:"Bebida tradicional." },
  { id:"agua-gas", name:"Agua con gas", category:"frias", price:7, description:"Agua mineral con gas." },
  { id:"agua-sin-gas", name:"Agua sin gas", category:"frias", price:5, description:"Agua mineral sin gas." },
  { id:"gaseosa-peque", name:"Gaseosa pequeña", category:"frias", price:5, description:"Gaseosa en presentación pequeña." },

  { id:"emp-carne", name:"Empanada de carne", category:"horneados", price:7, description:"Empanada horneada de carne." },
  { id:"emp-charque", name:"Empanada de charque", category:"horneados", price:7, description:"Empanada horneada de charque." },
  { id:"tamales", name:"Tamales", category:"horneados", price:11, description:"Tamales tradicionales." },
  { id:"masaco", name:"Masaco", category:"horneados", price:7, description:"Masaco tradicional." },
  { id:"cunape", name:"Cuñape", category:"horneados", price:5, description:"Cuñape recién horneado." },

  { id:"arroz-leche", name:"Arroz con leche", category:"postres", price:5, description:"Postre tradicional." },
  { id:"flan", name:"Flan", category:"postres", price:10, description:"Flan casero." },
  { id:"budin", name:"Budín de frutilla y chocolate", category:"postres", price:5, description:"Budín de frutilla y chocolate." },
  { id:"ensalada-frutas", name:"Ensalada de frutas", category:"postres", price:10, description:"Frutas frescas." },

  { id:"frappe-cafe", name:"Frappé de café", category:"frappes", price:15, description:"Frappé de café." },
  { id:"frappe-frutas", name:"Frappé de frutas", category:"frappes", price:15, description:"Frappé de frutas." },

  { id:"hamb-london", name:"Hamburguesa London", category:"noches", price:25, description:"Acompañada con papas fritas." },
  { id:"lomitos", name:"Lomitos", category:"noches", price:25, description:"Acompañados con papas fritas." },
  { id:"panchitos", name:"Panchitos", category:"noches", price:10, description:"Acompañados de choclo y papas fritas." },
  { id:"salchipapas", name:"Salchipapas", category:"noches", price:10, description:"Porción de salchipapas.", variants:[{name:"Regular",price:10},{name:"Grande",price:15}] },

  { id:"milanesa-picada", name:"Milanesa picada", category:"london-meat", price:30, description:"Acompañada de papas y salsas." },
  { id:"nachos-supremos", name:"Nachos supremos", category:"london-meat", price:25, description:"Nachos supremos." }
];

export const whatsapp = "59170000000"; // Reemplazar por el número real.
