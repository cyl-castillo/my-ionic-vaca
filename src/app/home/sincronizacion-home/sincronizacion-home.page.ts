import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {Tables} from 'src/app/models/enums';
import {Insomnia} from '@ionic-native/insomnia/ngx';
import {DbcontextService} from 'src/app/services/dbcontext.service';
import {NetworkService} from 'src/app/services/network.service';
import {AlertController, LoadingController, ModalController, NavController, ToastController} from '@ionic/angular';
import {ApiService} from 'src/app/services/api.service';
import {ModalSustitucionesPage} from '../modal-sustituciones/modal-sustituciones.page';

@Component({
    selector: 'app-sincronizacion-home',
    templateUrl: './sincronizacion-home.page.html',
    styleUrls: ['./sincronizacion-home.page.scss'],
})
export class SincronizacionHomePage implements OnInit {

    isConnected: any
    arrayData: any[] = []
    arraySincro: any[] = []


    loading = false

    sincronizacion = {
        nombre: null,
        codigo_remoto: null,
        fecha: moment().format('DD/MM/YYYY'),
        id_usuario: null,
        data: null,
        accion: null
    };
    model = {
        code: null,
        name: null,
        jefe: null,
        telf: null,
        number: null,
        idFarm: null,
        fecha: null,
        parto: null,
        motivoId: null,
        cliente_codigo: null,
        animal_codigo: null,
        enfermedadId: null,
        condicionId: null,
        locomocionId: null,
        peso: null,
        fincaId: null,
        loteId: null,
        sexo: null,
        codigoCria: null,
        codigoMadre: null,
        razaId: null,
        animal_inseminador: null,
        servicioId: null,
        animal_inseminado: null,
        codigo_semen: null,
        inseminador_codigo: null,
        leche: null,
        concentrado: null,
        id_rol: null,
        btn_eventos: null,
        btn_historico: null,
        btn_inventario: null,
        btn_controldefinca: null,
        btn_salud: null,
        btn_produccion: null,
        btn_terneras: null,
        btn_reproduccion: null,
        btn_ingresoafinca: null,
        btn_configuracion: null,
        btn_sincronizacion: null,
        btn_IngresoAFincas: null,
        btn_Ventas: null,
        btn_Muertes: null,
        btn_Enfermedades: null,
        btn_MedicionesFisicas: null,
        btn_Lactancia: null,
        btn_Partos: null,
        btn_Servicios: null,
        btn_Celo: null,
        btn_Palpacion: null,
        tipo_evento: null,
        usuario: null,
        clave: null,
        rolId: null,
        idFinca: null,
        lote_nacimientoId: null,
        lote_actual_Id: null,
        madreId: null,
        padreId: null,
        idTemporal: null,
        idInventario: null,
        active: null,
        celos: null,
        nota: null,
        nombre: null,
        codigo: null,
        temp: null,
        ultimo_estado: null,
        negocioId: null
    }


    public nomenclators: Array<{ name: string, table: Tables }> = [
        {
            name: 'Negocios',
            table: Tables.Negocio
        },
        {
            name: 'Fincas',
            table: Tables.Finca
        },
        {
            name: 'Lote',
            table: Tables.Lote
        },
        {
            name: 'Clientes',
            table: Tables.Clientes
        },
        {
            name: 'Motivos de venta',
            table: Tables.Motivo_Venta
        },
        {
            name: 'Motivos de muerte',
            table: Tables.Motivo_Muerte
        },
        {
            name: 'Inseminadores',
            table: Tables.Inseminadores
        },
        {
            name: 'Raza',
            table: Tables.Raza
        },
        {
            name: 'Enfermedades',
            table: Tables.Enfermedad
        },
        {
            name: 'Condición corporal',
            table: Tables.Condicion_Corporal
        },
        {
            name: 'Locomoción',
            table: Tables.Locomocion
        },
        {
            name: 'Servicios',
            table: Tables.Tipo_Servicios
        },
        {
            name: 'Eventos',
            table: Tables.Eventos
        },
        {
            name: 'Produccion',
            table: Tables.Produccion
        },
        {
            name: 'Parto',
            table: Tables.Parto
        },
        {
            name: 'Celos',
            table: Tables.Celos
        },
        {
            name: 'Palpacion',
            table: Tables.Palpacion
        },
        {
            name: 'Animal',
            table: Tables.Animal
        }
    ];
    arrayNegocio: any[] = [];
    arrayFinca: any[] = [];
    arrayLote: any[] = [];
    arrayCliente: any[] = [];
    arrayMM: any[] = [];
    arrayInsem: any[] = [];
    arrayRaza: any[] = [];
    arrayEnferm: any[] = [];
    arrayCC: any[] = [];
    arrayLocom: any[] = [];
    arrayTipo: any[] = [];
    arrayEvent: any[] = [];
    arrayParto: any[] = [];
    arrayCelo: any[] = [];
    arrayPalpacion: any[] = [];
    arrayAnimal: any[] = [];
    arrayMV: any;
    arrayProd: any;


    p_bar_value: number;
    arrayLactancia: any[] = [];
    arrayLeche: any[] = [];
    arrayVentas: any[] = [];
    arrayMuerte: any[] = [];
    arrayIngreso: any[] = [];
    btn_eventos = true
    btn_historico = true
    btn_inventario = true
    btn_controldefinca = true
    btn_salud = true
    btn_produccion = true
    btn_terneras = true
    btn_reproduccion = true
    btn_configuracion = true
    btn_sincronizacion = true
    nosync = true
    idNegocio: any;

    model1 = {
        code: null,
        fecha_generacion: null,
        codigo_usuario: null,
        codigo_generado: null,
        entidad: null,
        usuario_id: null,
    }
    arrayBitacora: any[] = [];
    lista: string;
    showLoader: boolean;
    bitacora: boolean;

    error = false
    usuario: any
    clave: any
    usuarioId: any

    constructor(private router: Router, public modalCtrl: ModalController, public navCtrl: NavController, private insomnia: Insomnia, private alertCtrl: AlertController, private dbContext: DbcontextService, private networkService: NetworkService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private api: ApiService) {
        this.usuario = localStorage.getItem("usuario")
        this.clave = localStorage.getItem("clave")
        this.usuarioId = JSON.parse(localStorage.getItem("usuarioId"))
        if (this.usuario != undefined && this.clave != undefined) {
            if (this.usuario == 'SuperAdmin') {
                this.api.login('apk@test.com', 'apktest123').then(res => {
                    console.log(res)
                })
            } else {
                this.api.login(this.usuario, this.clave).then(res => {
                    console.log(res)
                })
            }
        }

    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.insomnia.keepAwake().then(() => {
            console.log('success')
        })
    }


    navigateTo(page) {
        this.router.navigateByUrl(page);
    }


    async loadTable(table) {
        switch (Tables[table]) {

            case Tables[Tables.Finca]:
                this.arrayFinca = await this.dbContext.getDataFromTable(Tables.Finca);
                if (this.arrayFinca.length !== 0) {
                    this.arrayFinca.forEach(element => {
                        this.sincronizacion.nombre = 'fincas'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Lote]:
                this.arrayLote = await this.dbContext.getDataFromTable(Tables.Lote);
                if (this.arrayLote.length !== 0) {
                    this.arrayLote.forEach(element => {
                        this.sincronizacion.nombre = 'lotes'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Clientes]:
                this.arrayCliente = await this.dbContext.getDataFromTable(Tables.Clientes);
                if (this.arrayCliente.length !== 0) {
                    this.arrayCliente.forEach(element => {
                        this.sincronizacion.nombre = 'clientes'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Motivo_Muerte]:
                this.arrayMM = await this.dbContext.getDataFromTable(Tables.Motivo_Muerte);
                if (this.arrayMM.length !== 0) {
                    this.arrayMM.forEach(element => {
                        this.sincronizacion.nombre = 'motivos_muertes'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Motivo_Venta]:
                this.arrayMV = await this.dbContext.getDataFromTable(Tables.Motivo_Venta);
                if (this.arrayMV.length !== 0) {
                    this.arrayMV.forEach(element => {
                        this.sincronizacion.nombre = 'motivos_ventas'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Inseminadores]:
                this.arrayInsem = await this.dbContext.getDataFromTable(Tables.Inseminadores);
                if (this.arrayInsem.length !== 0) {
                    this.arrayInsem.forEach(element => {
                        this.sincronizacion.nombre = 'inseminadores'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Raza]:
                this.arrayRaza = await this.dbContext.getDataFromTable(Tables.Raza);
                if (this.arrayRaza.length !== 0) {
                    this.arrayRaza.forEach(element => {
                        this.sincronizacion.nombre = 'razas'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Enfermedad]:
                this.arrayEnferm = await this.dbContext.getDataFromTable(Tables.Enfermedad);
                if (this.arrayEnferm.length !== 0) {
                    this.arrayEnferm.forEach(element => {
                        this.sincronizacion.nombre = 'enfermedades'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Condicion_Corporal]:
                this.arrayCC = await this.dbContext.getDataFromTable(Tables.Condicion_Corporal);
                if (this.arrayCC.length !== 0) {
                    this.arrayCC.forEach(element => {
                        this.sincronizacion.nombre = 'condiciones_corporales'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Locomocion]:
                this.arrayLocom = await this.dbContext.getDataFromTable(Tables.Locomocion);
                if (this.arrayLocom.length !== 0) {
                    this.arrayLocom.forEach(element => {
                        this.sincronizacion.nombre = 'locomociones'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

            case Tables[Tables.Tipo_Servicios]:
                this.arrayTipo = await this.dbContext.getDataFromTable(Tables.Tipo_Servicios);
                if (this.arrayTipo.length !== 0) {
                    this.arrayTipo.forEach(element => {
                        this.sincronizacion.nombre = 'tipos_servicios'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Eventos]:
                this.arrayEvent = await this.dbContext.getDataFromTable(Tables.Eventos);
                if (this.arrayEvent.length !== 0) {
                    this.arrayEvent.forEach(element => {
                        this.sincronizacion.nombre = 'eventos'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Produccion]:
                this.arrayProd = await this.dbContext.getDataFromTable(Tables.Produccion);
                if (this.arrayProd.length !== 0) {
                    this.arrayProd.forEach(element => {
                        this.sincronizacion.nombre = 'producciones'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        // alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Parto]:
                this.arrayParto = await this.dbContext.getDataFromTable(Tables.Parto);
                if (this.arrayParto.length !== 0) {
                    this.arrayParto.forEach(element => {
                        this.sincronizacion.nombre = 'partos'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Celos]:
                this.arrayCelo = await this.dbContext.getDataFromTable(Tables.Celos);
                if (this.arrayCelo.length !== 0) {
                    this.arrayCelo.forEach(element => {
                        this.sincronizacion.nombre = 'celos'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Palpacion]:
                this.arrayPalpacion = await this.dbContext.getDataFromTable(Tables.Palpacion);
                if (this.arrayPalpacion.length !== 0) {
                    this.arrayPalpacion.forEach(element => {
                        this.sincronizacion.nombre = 'palpaciones'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Animal]:
                this.arrayAnimal = await this.dbContext.getDataFromTable(Tables.Animal);
                if (this.arrayAnimal.length !== 0) {
                    this.arrayAnimal.forEach(element => {
                        this.sincronizacion.nombre = 'animales'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Lactancia]:
                this.arrayLactancia = await this.dbContext.getDataFromTable(Tables.Lactancia);
                if (this.arrayLactancia.length !== 0) {
                    this.arrayLactancia.forEach(element => {
                        this.sincronizacion.nombre = 'lactancias'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Leche]:
                this.arrayLeche = await this.dbContext.getDataFromTable(Tables.Leche);
                if (this.arrayLeche.length !== 0) {
                    this.arrayLeche.forEach(element => {
                        this.sincronizacion.nombre = 'leches'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Ventas]:
                this.arrayVentas = await this.dbContext.getDataFromTable(Tables.Ventas);
                if (this.arrayVentas.length !== 0) {
                    this.arrayVentas.forEach(element => {
                        this.sincronizacion.nombre = 'ventas'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;

                }

            case Tables[Tables.Muertes]:
                this.arrayMuerte = await this.dbContext.getDataFromTable(Tables.Muertes);
                if (this.arrayMuerte.length !== 0) {
                    this.arrayMuerte.forEach(element => {
                        this.sincronizacion.nombre = 'muertes'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }


            case Tables[Tables.Ingreso_Finca]:
                this.arrayIngreso = await this.dbContext.getDataFromTable(Tables.Ingreso_Finca);
                if (this.arrayIngreso.length !== 0) {
                    this.arrayIngreso.forEach(element => {
                        this.sincronizacion.nombre = 'ingresos'
                        this.sincronizacion.data = JSON.stringify(element)
                        this.sincronizacion.accion = 'INSERT'
                        this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                        //  alert("Sincro"+JSON.stringify(this.dbContext.getDataFromTable(Tables.Sincronizacion)))
                    })
                    break;
                }

        }
    }

    async sync() {
        this.showProgressBar();
        for (let index = 0; index <= 100; index++) {
            this.setPercentBar(+index);
        }
        /*this.nomenclators.forEach(element=>{
      this.loadTable(element.table)
    })*/
        this.arrayData = await this.dbContext.getDataFromTable(Tables.Sincronizacion)
        if (this.arrayData.length > 0) {
            let data: any
            this.arrayData.forEach(element => {
                if (this.usuario == 'SuperAdmin') {
                    data = {
                        "tabla": element.nombre,
                        "accion": element.accion,
                        "data": element.data,
                        "user_id": 2
                    }
                } else if (this.usuario != 'SuperAdmin' && this.usuarioId != undefined) {
                    data = {
                        "tabla": element.nombre,
                        "accion": element.accion,
                        "data": element.data,
                        "user_id": this.usuarioId
                    }
                }

                this.api.uploadData(data).then(res => {

                }).catch(err => {
                    if (err) {
                        this.error = true
                        alert('Ocurrió un problema durante la sincronización' + err)
                    }
                })
            })
            if (this.error == false) {
                const alerta = await this.alertCtrl.create({
                    header: '',
                    message: ' <strong>Los datos se subieron correctamente. Se procederá a actualizar la Base de Datos desde la nube',
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {
                            }
                        }, {
                            text: 'Aceptar',
                            handler: () => {
                                this.download()
                            }
                        }
                    ]
                });
                await alerta.present();
            }

        } else {
            const alerta = await this.alertCtrl.create({
                header: '',
                message: ' <strong>No hay datos para subir, se procederá a actualizar la Base de Datos desde la nube',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: 'Aceptar',
                        handler: () => {
                            this.download()
                        }
                    }
                ]
            });
            await alerta.present();
        }
    }

    async download() {
        /*this.showProgressBar();
  for (let index = 0; index <= 100; index++) {
    this.setPercentBar(+index);
  }*/

        this.presentLoading()
    }

    setPercentBar(i) {
        setTimeout(() => {
            let apc = (i / 100)
            console.log(apc);
            this.p_bar_value = apc;
        }, 30 * i);
    }

    showProgressBar() {
        this.showLoader = true;
    }

    hideProgressBar() {
        this.showLoader = false;
    }

    async showSustitucion() {
        const modal = await this.modalCtrl.create({
            component: ModalSustitucionesPage,
            cssClass: 'searchmodal',
            backdropDismiss: false
        });
        modal.onWillDismiss().then(dataReturned => {

        });
        return await modal.present().then(_ => {

        });
    }


    testconnetion() {
        this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
            this.isConnected = connected;
            console.log(this.isConnected)
            if (!this.isConnected) {
                this.presentToast('No hay conexión a Internet en este momento para sincronizar');
            } else {
                this.presentToast('Hay conexión a Internet en este momento para sincronizar');
            }
        });

    }

    async presentToast(message: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 3000
        });
        return await toast.present();
    }


    async presentLoading() {
        const loading = await this.loadingCtrl.create({
            spinner: 'bubbles',
            message: '',
            duration: 2000
        });
        return await loading.present().then(() => {
            this.idNegocio = JSON.parse(localStorage.getItem("negocio"))
            if (this.idNegocio == undefined) {
                alert('Debe escoger una Empresa en el menú hamburguesa')
            }
            this.api.downloadData(this.idNegocio).then(res => {
                this.dbContext.deletedAllTable()
                if (res['data'].fincas !== undefined) {
                    res['data'].fincas.forEach(element => {
                        this.model.number = element.numero
                        this.model.name = element.nombre
                        this.model.negocioId = element.negocio_id
                        this.model.code = element.code
                        this.model.active = element.active
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Finca, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].lotes !== undefined) {
                    res['data'].lotes.forEach(element => {
                        this.model.number = element.numero
                        this.model.name = element.nombre
                        this.model.idFarm = element.finca_id
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Lote, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].motivo_muertes !== undefined) {
                    res['data'].motivo_muertes.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Motivo_Muerte, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].motivo_ventas !== undefined) {
                    res['data'].motivo_ventas.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Motivo_Venta, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].inseminadores !== undefined) {
                    res['data'].inseminadores.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Inseminadores, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].razas !== undefined) {
                    res['data'].razas.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Raza, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].enfermedades !== undefined) {
                    res['data'].enfermedades.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Enfermedad, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].condiciones_corporales !== undefined) {
                    res['data'].condiciones_corporales.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Condicion_Corporal, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].locomociones !== undefined) {
                    res['data'].locomociones.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Locomocion, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].tipos_servicios !== undefined) {
                    res['data'].tipos_servicios.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Tipo_Servicios, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].eventos !== undefined) {
                    res['data'].eventos.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.animal_codigo = element.animal_id
                        this.model.tipo_evento = element.tipo_evento
                        this.model.active = element.active
                        this.model.code = element.id
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Eventos, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].producciones !== undefined) {
                    res['data'].producciones.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.peso = element.peso
                        this.model.animal_codigo = element.animal_id
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Produccion, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].partos !== undefined) {
                    res['data'].partos.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.sexo = element.sexo
                        this.model.codigoCria = element.animal_nacido
                        this.model.codigoMadre = element.madre_code
                        this.model.razaId = element.raza_id
                        this.model.code = element.code
                        this.model.parto = element.positivo
                        this.model.active = element.active
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Parto, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                /*if(res['data'].configuraciones.length !== 0){
        res['data'].configuraciones.forEach(element=>{
             this.dbContext.insertDataSync(Tables.Database_Conexion,this.model);
             this.model = {
              code:null,
              name:null,
              jefe:null,
              telf:null,
              number:null,
              idFarm: null,
              fecha:null,
              motivoId:null,
              cliente_codigo:null,
              animal_codigo:null,
              enfermedadId:null,
              condicionId:null,
              locomocionId:null,
              peso:null,
              fincaId:null,
              loteId:null,
              sexo:null,
              codigoCria:null,
              codigoMadre:null,
              razaId:null,
              animal_inseminador:null,
              servicioId:null,
              animal_inseminado:null,
              codigo_semen:null,
              inseminador_codigo:null,
              leche:null,
              concentrado:null,
              id_rol:null,
              btn_eventos:null,
              btn_historico:null,
              btn_inventario:null,
              btn_controldefinca:null,
              btn_salud:null,
              btn_produccion:null,
              btn_terneras:null,
              btn_reproduccion:null,
              btn_ingresoafinca:null,
              btn_configuracion:null,
              btn_sincronizacion:null,
              btn_IngresoAFincas:null,
              btn_Ventas:null,
              btn_Muertes:null,
              btn_Enfermedades:null,
              btn_MedicionesFisicas:null,
              btn_Lactancia:null,
              btn_Partos:null,
              btn_Servicios:null,
              btn_Celo:null,
              btn_Palpacion:null,
              tipo_evento:null,
              usuario:null,
              clave:null,
              rolId:null,
              idFinca:null,
              lote_nacimientoId:null,
              lote_actual_Id:null,
              madreId:null,
              padreId:null,
              idTemporal:null,
              idInventario:null,
              celos:null,
              nota:null,
              nombre:null,
              codigo:null,
              temp:null,
              ultimo_estado:null,
              negocioId:null
            }
           })
      }*/

                if (res['data'].celos !== undefined) {
                    res['data'].celos.forEach(element => {
                        this.model.animal_codigo = element.animal_code
                        this.model.active = element.active
                        this.model.fecha = element.fecha
                        this.model.code = element.code
                        this.model.celos = null
                        this.dbContext.insertDataSync(Tables.Celos, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].palpaciones !== undefined) {
                    res['data'].palpaciones.forEach(element => {
                        this.model.animal_codigo = element.animal_code
                        this.model.celos = element.celo_id
                        this.model.fecha = element.fecha
                        this.model.active = element.active
                        this.model.code = element.code
                        this.dbContext.insertDataSync(Tables.Palpacion, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].servicios !== undefined) {
                    res['data'].servicios.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.animal_inseminador = element.animal_inseminador
                        this.model.servicioId = element.tipo_servicio_id
                        this.model.animal_inseminado = element.animal_inceminado
                        this.model.codigo_semen = element.semen_id
                        this.model.inseminador_codigo = element.personal_inseminador
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Servicios, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].lactancias !== undefined) {
                    res['data'].lactancias.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.leche = element.leche
                        this.model.concentrado = element.concentrado
                        this.model.peso = element.peso
                        this.model.animal_codigo = element.animal_code
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Lactancia, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].leches !== undefined) {
                    res['data'].leches.forEach(element => {
                        this.model.animal_codigo = element.animal_code
                        this.model.peso = element.peso
                        this.model.fecha = element.fecha
                        this.model.active = element.active
                        this.model.code = element.code
                        this.dbContext.insertDataSync(Tables.Leche, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }
                if (res['data'].clientes !== undefined) {
                    res['data'].clientes.forEach(element => {
                        this.model.name = element.nombre
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Clientes, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].ventas !== undefined) {
                    res['data'].ventas.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.motivoId = element.motivo
                        this.model.cliente_codigo = element.cliente_code
                        this.model.animal_codigo = element.animal_code
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Ventas, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].muertes !== undefined) {
                    res['data'].muertes.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.motivoId = element.motivo_id
                        this.model.animal_codigo = element.animal_code
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Muertes, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].registros_enfermedades !== undefined) {
                    res['data'].registros_enfermedades.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.enfermedadId = element.id_enfermedad
                        this.model.animal_codigo = element.animal_code
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Enfermedades, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].estados_fisicos !== undefined) {
                    res['data'].estados_fisicos.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.condicionId = element.condicion_id
                        this.model.locomocionId = element.locomocion_id
                        this.model.animal_codigo = element.animal_code
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Mediciones_Fisicas, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].ingresos !== undefined) {
                    res['data'].ingresos.forEach(element => {
                        this.model.fecha = element.fecha
                        this.model.animal_codigo = element.animal_code
                        this.model.loteId = element.lote_id
                        this.model.active = element.active
                        this.model.code = element.code
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Ingreso_Finca, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].animales !== undefined) {
                    res['data'].animales.forEach(element => {
                        this.model.code = element.code
                        this.model.animal_codigo = element.code
                        this.model.fecha = element.fecha_nacimiento
                        this.model.sexo = element.sexo
                        this.model.lote_nacimientoId = element.lote_nacimiento_id
                        this.model.lote_actual_Id = element.lote_actual_id
                        this.model.razaId = element.raza_codigo
                        this.model.madreId = element.madre_codigo
                        this.model.padreId = element.padre_codigo
                        this.model.idTemporal = element.temporal_id
                        this.model.idInventario = element.inventario_id
                        this.model.active = element.active
                        this.model.temp = element.temporal
                        this.model.ultimo_estado = element.estado_id
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Animal, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].tratamientos !== undefined) {
                    res['data'].tratamientos.forEach(element => {
                        this.model.code = element.code
                        this.model.animal_codigo = element.animal_code
                        this.model.fecha = element.fecha
                        this.model.nota = element.nota
                        this.model.active = element.active
                        console.log(this.model)
                        this.dbContext.insertDataSync(Tables.Tratamiento, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                if (res['data'].usuarios !== undefined) {
                    res['data'].usuarios.forEach(element => {
                        this.model.code = element.id
                        this.model.usuario = element.email
                        this.model.clave = element.password
                        this.model.negocioId = element.negocio_id
                        this.model.idFinca = element.finca_id
                        this.model.active = true
                        this.dbContext.insertDataSync(Tables.Usuario, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }

                /*if(res['data'].roles !== undefined){
            res['data'].roles.forEach(element=>{
        this.model.nombre = element.nombre
        this.model.code = element.id
        this.dbContext.insertDataSync(Tables.Rol,this.model);
        this.model = {
          code:null,
          name:null,
          jefe:null,
          telf:null,
          number:null,
          idFarm: null,
          fecha:null,
          motivoId:null,
          cliente_codigo:null,
          animal_codigo:null,
          enfermedadId:null,
          condicionId:null,
          locomocionId:null,
          peso:null,
          fincaId:null,
          loteId:null,
          sexo:null,
          codigoCria:null,
          codigoMadre:null,
          razaId:null,
          animal_inseminador:null,
          servicioId:null,
          animal_inseminado:null,
          codigo_semen:null,
          inseminador_codigo:null,
          leche:null,
          concentrado:null,
          id_rol:null,
          btn_eventos:null,
          btn_historico:null,
          btn_inventario:null,
          btn_controldefinca:null,
          btn_salud:null,
          btn_produccion:null,
          btn_terneras:null,
          btn_reproduccion:null,
          btn_ingresoafinca:null,
          btn_configuracion:null,
          btn_sincronizacion:null,
          btn_IngresoAFincas:null,
          btn_Ventas:null,
          btn_Muertes:null,
          btn_Enfermedades:null,
          btn_MedicionesFisicas:null,
          btn_Lactancia:null,
          btn_Partos:null,
          btn_Servicios:null,
          btn_Celo:null,
          btn_Palpacion:null,
          tipo_evento:null,
          usuario:null,
          clave:null,
          rolId:null,
          idFinca:null,
          lote_nacimientoId:null,
          lote_actual_Id:null,
          madreId:null,
          padreId:null,
          idTemporal:null,
          idInventario:null,
          celos:null,
          nota:null,
          nombre:null,
          codigo:null,
          temp:null,
          ultimo_estado:null,
          negocioId:null
        }
      })
       }*/

                if (res['data'].rol_botons !== undefined) {
                    res['data'].rol_botons.forEach(element => {
                        this.model.btn_eventos = element.nombre
                        this.model.btn_historico = element.nombre
                        this.model.btn_inventario = element.nombre
                        this.model.btn_controldefinca = element.nombre
                        this.model.btn_salud = element.nombre
                        this.model.btn_produccion = element.nombre
                        this.model.btn_terneras = element.nombre
                        this.model.btn_reproduccion = element.nombre
                        this.model.btn_ingresoafinca = element.nombre
                        this.model.btn_configuracion = element.nombre
                        this.model.btn_sincronizacion = element.nombre
                        this.model.btn_IngresoAFincas = element.nombre
                        this.model.btn_Ventas = element.nombre
                        this.model.btn_Muertes = element.nombre
                        this.model.btn_Enfermedades = element.nombre
                        this.model.btn_MedicionesFisicas = element.nombre
                        this.model.btn_Lactancia = element.nombre
                        this.model.btn_Partos = element.nombre
                        this.model.btn_Servicios = element.nombre
                        this.model.btn_Celo = element.nombre
                        this.model.btn_Palpacion = element.nombre
                        this.model.code = element.code

                        this.dbContext.insertDataSync(Tables.Rol_Botones, this.model);
                        this.model = {
                            code: null,
                            name: null,
                            jefe: null,
                            telf: null,
                            number: null,
                            idFarm: null,
                            fecha: null,
                            parto: null,
                            motivoId: null,
                            cliente_codigo: null,
                            animal_codigo: null,
                            enfermedadId: null,
                            condicionId: null,
                            locomocionId: null,
                            peso: null,
                            fincaId: null,
                            loteId: null,
                            sexo: null,
                            codigoCria: null,
                            codigoMadre: null,
                            razaId: null,
                            animal_inseminador: null,
                            servicioId: null,
                            animal_inseminado: null,
                            codigo_semen: null,
                            inseminador_codigo: null,
                            leche: null,
                            concentrado: null,
                            id_rol: null,
                            btn_eventos: null,
                            btn_historico: null,
                            btn_inventario: null,
                            btn_controldefinca: null,
                            btn_salud: null,
                            btn_produccion: null,
                            btn_terneras: null,
                            btn_reproduccion: null,
                            btn_ingresoafinca: null,
                            btn_configuracion: null,
                            btn_sincronizacion: null,
                            btn_IngresoAFincas: null,
                            btn_Ventas: null,
                            btn_Muertes: null,
                            btn_Enfermedades: null,
                            btn_MedicionesFisicas: null,
                            btn_Lactancia: null,
                            btn_Partos: null,
                            btn_Servicios: null,
                            btn_Celo: null,
                            btn_Palpacion: null,
                            tipo_evento: null,
                            usuario: null,
                            clave: null,
                            rolId: null,
                            idFinca: null,
                            lote_nacimientoId: null,
                            lote_actual_Id: null,
                            madreId: null,
                            padreId: null,
                            idTemporal: null,
                            idInventario: null,
                            active: null,
                            celos: null,
                            nota: null,
                            nombre: null,
                            codigo: null,
                            temp: null,
                            ultimo_estado: null,
                            negocioId: null
                        }
                    })
                }
                if (res['data'].bitacoras !== undefined) {
                    res['data'].bitacoras.forEach(element => {
                        this.model1.fecha_generacion = element.fecha_generacion
                        this.model1.codigo_usuario = element.code_usuario
                        this.model1.codigo_generado = element.code_generado
                        this.model1.entidad = element.entidad
                        this.model1.usuario_id = element.usuario_id
                        this.model1.code = element.id
                        this.dbContext.insertDataSync(Tables.Bitacora, this.model1);
                        this.bitacora = true
                        this.model1 = {
                            code: null,
                            fecha_generacion: null,
                            codigo_usuario: null,
                            codigo_generado: null,
                            entidad: null,
                            usuario_id: null,
                        }
                    })
                }
            }).finally(() => {
                //this.hideProgressBar();
                loading.dismiss()
                this.p_bar_value = 1
                if (this.bitacora) {
                    this.showSustitucion()
                }
            })
        });
    }

}
