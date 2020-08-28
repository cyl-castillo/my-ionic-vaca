import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Tables} from '../../models/enums';
import {DbcontextService} from '../../services/dbcontext.service';
import {AlertController, ModalController} from '@ionic/angular';
import * as moment from 'moment';
import {Insomnia} from '@ionic-native/insomnia/ngx';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

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
        active: true,
        celos: null,
        nota: null,
        nombre: null,
        codigo: null,
        temp: null,
        ultimo_estado: null,
        negocioId: null
    }

    data = {
        code: null,
        numero: null,
        descripcion: null,
        nombre: "",
        finca_id: -1,
        telefono: null,
        negocio_id: null,
    }

    sincronizacion = {
        nombre: null,
        codigo_remoto: null,
        fecha: moment().format('DD/MM/YYYY'),
        id_usuario: null,
        data: null,
        accion: null,
        active: true,
    };

    arrayList: Array<string> = [];
    arrayFarm: Array<any> = [];
    arrayLote: Array<any> = [];
    arrayLote_Parto: Array<any> = [];
    arrayEvent: Array<any> = [];

    finca = ''
    fincaA = ''
    fincaId: any
    lote = ''
    loteA = ''
    edit = false
    lote_parto = false


    @Input()
    name: string;

    @Input()
    tabla: Tables;

    @Output()
    add: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    remove: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('farmElement') farmElement: ElementRef;

    public isMenuOpen = false;
    requiredFinca = true
    requiredLote = true
    numbers = true
    names = false
    favorite = false


    constructor(private dbContext: DbcontextService, private insomnia: Insomnia, private modalController: ModalController, private alertCtrl: AlertController) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.insomnia.keepAwake().then(() => {
            console.log('success')
        })
        this.loadData();
    }

    selectFinca() {
        this.requiredFinca = false
    }

    selectLote() {
        this.requiredLote = false
        //localStorage.setItem("lote",JSON.stringify(this.model.idLote))
    }

    number(number) {
        this.numbers = false
    }

    namess(name) {
        this.names = false
    }

    async presentAlertConfirm(item) {
        const alert = await this.alertCtrl.create({
            header: 'Confirmar!',
            message: ' <strong>¿Seguro que desea eliminar?</strong>!!!',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.loadData()
                    }
                }, {
                    text: 'Aceptar',
                    handler: () => {
                        this.broadcastRemove(item)
                    }
                }
            ]
        });

        await alert.present();
    }

    showFieldNumber() {
        return (Tables[this.tabla] == Tables[Tables.Finca] || Tables[this.tabla] == Tables[Tables.Lote]);
    }


    showFieldSelect() {
        return (Tables[this.tabla] == Tables[Tables.Lote]);
    }


    showTabla(id) {
        this.favorite = true
        this.arrayFarm.forEach(element => {
            if (element.idfinca == id) {
                this.finca = element.nombre
            }
        })
        return (Tables[this.tabla] == Tables[Tables.Lote]);
    }

    async favorites(item) {
        this.arrayLote = await this.dbContext.getDataFromTable(Tables.Lote)
        let pos = this.arrayLote.findIndex(element => element.favorite == 'star')
        if (pos == -1 && item.favorite == 'star-half') {
            this.dbContext.insertLote_Parto(Tables.Lote_Parto, item.idLote)
            this.dbContext.favoriteLote(Tables.Lote, item.idLote)
            localStorage.setItem("lote", JSON.stringify(item.idLote))
            item.favorite = 'star'
        }
    }


    showTablaAnother() {
        return (Tables[this.tabla] !== Tables[Tables.Lote]);
    }


    async toggleAccordion() {
        this.isMenuOpen = !this.isMenuOpen;
        this.loadData()
        if (this.arrayFarm.length === 0) {
            await this.dbContext.getDataFromTable(Tables.Finca).then(res => {
                this.arrayFarm = res
            });
        }
    }

    async loadData() {
        switch (Tables[this.tabla]) {
            case Tables[Tables.Finca]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Finca);
                break;
            case Tables[Tables.Lote]:
                if (this.arrayFarm.length === 0) {
                    this.arrayFarm = await this.dbContext.getDataFromTable(Tables.Finca);
                }
                // this.arrayFarm = await  this.dbContext.getDataFromTable(Tables.Finca);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Lote);
                break;
            case Tables[Tables.Clientes]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Clientes);

                break;
            case Tables[Tables.Motivo_Muerte]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Motivo_Muerte);

                break;
            case Tables[Tables.Motivo_Venta]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Motivo_Venta);

                break;
            case Tables[Tables.Inseminadores]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Inseminadores);

                break;
            case Tables[Tables.Raza]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Raza);

                break;
            case Tables[Tables.Enfermedad]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Enfermedad);

                break;
            case Tables[Tables.Condicion_Corporal]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Condicion_Corporal);

                break;
            case Tables[Tables.Locomocion]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Locomocion);

                break;
            case Tables[Tables.Tipo_Servicios]:
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Tipo_Servicios);

                break;
        }
    }

    public async broadcastAdd(name: string): Promise<void> {
        if (name == null || name == undefined) {
            this.names = false
        } else {
            this.names = true
            switch (Tables[this.tabla]) {
                case Tables[Tables.Finca]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Finca)
                    await this.dbContext.insertDataInto(Tables.Finca, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Finca);
                    this.arrayFarm = await this.dbContext.getDataFromTable(Tables.Finca);
                    this.add.emit(name);
                    this.edit = false
                    this.names = false

                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'fincas'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);


                    break;
                case Tables[Tables.Lote]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Lote);
                    await this.dbContext.insertDataInto(Tables.Lote, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Lote);
                    this.arrayLote = await this.dbContext.getDataFromTable(Tables.Lote);
                    this.edit = false
                    this.names = false

                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.finca_id = this.model.idFarm
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'lotes'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    this.add.emit(name);
                    break;
                case Tables[Tables.Clientes]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Clientes)
                    await this.dbContext.insertDataInto(Tables.Clientes, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Clientes);
                    this.edit = false
                    this.names = false


                    this.data.nombre = this.model.name
                    this.data.descripcion = ""
                    this.data.telefono = "53235750"
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))

                    this.sincronizacion.nombre = 'clientes'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    this.add.emit(name);
                    break;
                case Tables[Tables.Motivo_Venta]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Motivo_Venta)
                    await this.dbContext.insertDataInto(Tables.Motivo_Venta, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Motivo_Venta);
                    this.add.emit(name);
                    this.edit = false
                    this.names = false

                    this.data.nombre = this.model.name
                    this.data.descripcion = ""
                    this.sincronizacion.nombre = 'motivo_ventas'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    break;
                case Tables[Tables.Motivo_Muerte]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Motivo_Muerte)
                    await this.dbContext.insertDataInto(Tables.Motivo_Muerte, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Motivo_Muerte);
                    this.add.emit(name);
                    this.edit = false
                    this.names = false

                    this.data.nombre = this.model.name
                    this.data.descripcion = ""
                    this.sincronizacion.nombre = 'motivo_muertes'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    break;
                case Tables[Tables.Inseminadores]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Inseminadores)
                    await this.dbContext.insertDataInto(Tables.Inseminadores, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Inseminadores);
                    this.add.emit(name);
                    this.edit = false
                    this.names = false


                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'inseminadores'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Raza]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Raza)
                    await this.dbContext.insertDataInto(Tables.Raza, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Raza);
                    this.edit = false
                    this.names = false


                    this.data.nombre = this.model.name
                    this.sincronizacion.nombre = 'razas'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    this.add.emit(name);
                    break;
                case Tables[Tables.Enfermedad]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Enfermedad)
                    await this.dbContext.insertDataInto(Tables.Enfermedad, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Enfermedad);
                    this.add.emit(name);
                    this.edit = false
                    this.names = false


                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.descripcion = ""
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'enfermedades'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    break;
                case Tables[Tables.Condicion_Corporal]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Condicion_Corporal)
                    await this.dbContext.insertDataInto(Tables.Condicion_Corporal, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Condicion_Corporal);
                    this.add.emit(name);
                    this.edit = false
                    this.names = false


                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.descripcion = ""
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'condiciones_corporales'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    break;
                case Tables[Tables.Locomocion]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Locomocion)
                    await this.dbContext.insertDataInto(Tables.Locomocion, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Locomocion);
                    this.add.emit(name);
                    this.edit = false
                    this.names = false


                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.descripcion = ""
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))

                    this.sincronizacion.nombre = 'locomociones'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    break;
                case Tables[Tables.Tipo_Servicios]:
                    this.data.code = await this.dbContext.getNextCode(Tables.Tipo_Servicios)
                    await this.dbContext.insertDataInto(Tables.Tipo_Servicios, this.model);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Tipo_Servicios);
                    this.add.emit(name);
                    this.edit = false
                    this.names = false


                    this.data.nombre = this.model.name
                    this.data.descripcion = ""
                    this.sincronizacion.nombre = 'tipos_servicios'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'INSERT'
                    this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    break;
            }

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
                active: true,
                celos: null,
                nota: null,
                nombre: null,
                codigo: null,
                temp: null,
                ultimo_estado: null,
                negocioId: null
            }

        }
    }

    public async broadcastUpdate(name: string): Promise<void> {

        if (name == null || name == undefined) {
            this.names = false
        } else {
            this.names = true
            switch (Tables[this.tabla]) {
                case Tables[Tables.Finca]:
                    await this.dbContext.updateDataInto(Tables.Finca, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Finca);
                    this.arrayFarm = await this.dbContext.getDataFromTable(Tables.Finca);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'fincas'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Lote]:
                    await this.dbContext.updateDataInto(Tables.Lote, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Lote);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.finca_id = this.model.idFarm
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'lotes'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Clientes]:
                    await this.dbContext.updateDataInto(Tables.Clientes, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Clientes);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.data.descripcion = ""
                    this.data.telefono = "53235750"
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))

                    this.sincronizacion.nombre = 'clientes'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);
                    break;
                case Tables[Tables.Motivo_Venta]:
                    await this.dbContext.updateDataInto(Tables.Motivo_Venta, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Motivo_Venta);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.nombre = this.model.name
                    this.data.descripcion = ""
                    this.sincronizacion.nombre = 'motivo_ventas'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Motivo_Muerte]:
                    await this.dbContext.updateDataInto(Tables.Motivo_Muerte, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Motivo_Muerte);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.nombre = this.model.name
                    this.data.descripcion = ""
                    this.sincronizacion.nombre = 'motivo_muertes'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Inseminadores]:
                    await this.dbContext.updateDataInto(Tables.Inseminadores, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Inseminadores);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'inseminadores'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    break;
                case Tables[Tables.Raza]:
                    await this.dbContext.updateDataInto(Tables.Raza, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Raza);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.sincronizacion.nombre = 'razas'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Enfermedad]:
                    await this.dbContext.updateDataInto(Tables.Enfermedad, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Enfermedad);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.descripcion = ""
                    this.sincronizacion.nombre = 'enfermedades'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Condicion_Corporal]:
                    await this.dbContext.updateDataInto(Tables.Condicion_Corporal, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Condicion_Corporal);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.descripcion = ""
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))
                    this.sincronizacion.nombre = 'condiciones_corporales'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Locomocion]:
                    await this.dbContext.updateDataInto(Tables.Locomocion, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Locomocion);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.data.numero = this.model.number
                    this.data.descripcion = ""
                    this.data.negocio_id = JSON.parse(localStorage.getItem("negocio"))

                    this.sincronizacion.nombre = 'locomociones'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    await this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
                case Tables[Tables.Tipo_Servicios]:
                    await this.dbContext.updateDataInto(Tables.Tipo_Servicios, this.model, this.model.code);
                    this.arrayList = await this.dbContext.getDataFromTable(Tables.Tipo_Servicios);
                    this.edit = false
                    this.names = false
                    this.add.emit(name);
                    this.data.code = this.model.code
                    this.data.nombre = this.model.name
                    this.data.descripcion = ""
                    this.sincronizacion.nombre = 'tipos_servicios'
                    this.sincronizacion.data = JSON.stringify(this.data)
                    this.sincronizacion.accion = 'UPDATE'
                    this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                    break;
            }

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
                active: true,
                celos: null,
                nota: null,
                nombre: null,
                codigo: null,
                temp: null,
                ultimo_estado: null,
                negocioId: null
            }
        }
    }

    calcular(name) {
        if (name == "") {
            this.names = false
        } else {
            this.names = true
        }
    }

    public async broadcastRemove(item): Promise<void> {
        switch (Tables[this.tabla]) {
            case Tables[Tables.Finca]:
                await this.dbContext.deleteFromTable(Tables.Finca, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Finca);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'fincas'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                break;
            case Tables[Tables.Lote]:
                await this.dbContext.deleteFromTable(Tables.Lote, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Lote);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'lotes'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                break;
            case Tables[Tables.Clientes]:
                await this.dbContext.deleteFromTable(Tables.Clientes, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Clientes);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'clientes'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                break;
            case Tables[Tables.Motivo_Venta]:
                await this.dbContext.deleteFromTable(Tables.Motivo_Venta, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Motivo_Venta);


                this.data.code = item.codigo
                this.sincronizacion.nombre = 'motivo_ventas'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                break;
            case Tables[Tables.Motivo_Muerte]:
                await this.dbContext.deleteFromTable(Tables.Motivo_Muerte, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Motivo_Muerte);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'motivo_muertes'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);

                break;
            case Tables[Tables.Inseminadores]:
                await this.dbContext.deleteFromTable(Tables.Inseminadores, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Inseminadores);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'iseminadores'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);


                break;
            case Tables[Tables.Raza]:
                await this.dbContext.deleteFromTable(Tables.Raza, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Raza);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'razas'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);


                break;
            case Tables[Tables.Enfermedad]:
                await this.dbContext.deleteFromTable(Tables.Enfermedad, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Enfermedad);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'enfermedades'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);


                break;
            case Tables[Tables.Condicion_Corporal]:
                await this.dbContext.deleteFromTable(Tables.Condicion_Corporal, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Condicion_Corporal);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'condiciones_corporales'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);


                break;
            case Tables[Tables.Locomocion]:
                await this.dbContext.deleteFromTable(Tables.Locomocion, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Locomocion);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'locomociones'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);


                break;
            case Tables[Tables.Tipo_Servicios]:
                await this.dbContext.deleteFromTable(Tables.Tipo_Servicios, item.codigo);
                this.arrayList = await this.dbContext.getDataFromTable(Tables.Tipo_Servicios);

                this.data.code = item.codigo
                this.sincronizacion.nombre = 'tipos_servicios'
                this.sincronizacion.data = JSON.stringify(this.data)
                this.sincronizacion.accion = 'DELETE'
                this.dbContext.insertDataInto(Tables.Sincronizacion, this.sincronizacion);


                break;

        }
    }

    public async loadcastUpdate(item): Promise<void> {
        console.log(item)
        switch (Tables[this.tabla]) {
            case Tables[Tables.Finca]:
                this.model.code = item.codigo
                this.model.number = item.numero
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Lote]:
                this.model.code = item.codigo
                this.model.number = item.numero
                this.model.name = item.nombre
                this.model.idFarm = item.fincaId
                this.edit = true

                break;
            case Tables[Tables.Clientes]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Motivo_Venta]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Motivo_Muerte]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Inseminadores]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Raza]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Enfermedad]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Condicion_Corporal]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Locomocion]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
            case Tables[Tables.Tipo_Servicios]:
                this.model.code = item.codigo
                this.model.name = item.nombre
                this.edit = true

                break;
        }


    }

}
