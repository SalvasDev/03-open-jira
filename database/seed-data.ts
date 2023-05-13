interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}


export const seedData:SeedData  = {
  entries: [
    {
      
      description: 'Pendiente: Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      
      description: 'En-Progreso Numquam a labore deleniti beatae, non maiores exercitationem cum? Pariatur enim rem aut asperiores recusandae, magnam quam eveniet soluta accusantium quisquam molestiae!', 
      status: 'in-progress',
      createdAt: Date.now() -  1000000
    },
    {
      
      description: 'Terminado Pariatur enim rem aut asperiores recusandae, magnam quam eveniet soluta accusantium quisquam molestiae!',
      status: 'finished',
      createdAt: Date.now() - 100000
     }    
  ]
}