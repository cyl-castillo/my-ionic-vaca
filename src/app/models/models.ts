export interface Usuario{
    codigo?:number;
    usuario?:string;
    clave?:string;
    rolId?:number
    negocioId?:number
    idFinca?:number
    active?:number
  }

  export interface Rol{
    codigo?:number,
    nombre?:string,
    active?:number,
    sync?:number
  }


  export interface Inventory {
    codigo:number
    animal_codigo: number,
    raza:number,
    sexo:string,
    semen:number,
    finca:number,
    lote: number,
    fecha:Date,
  }

  export interface Evento {
    codigo:number
    fecha:Date
    animal_codigo: number,
    tipo_evento: string,
  }

  export interface Tipo_Evento{
    codigo:number
    nombre:string
  }