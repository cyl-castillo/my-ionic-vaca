import {Injectable} from '@angular/core';
import {SQLite, SQLiteObject} from '@ionic-native/sqlite/ngx';
import {Platform} from '@ionic/angular';

import {Tables} from '../models/enums';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

declare var window: any;

const browserDBInstance = (db) => {

    return {
        executeSql: (sql, value) => {
            return new Promise((resolve, reject) => {
                db.transaction((tx) => {
                    tx.executeSql(sql, value, (tx, rs) => {
                        resolve(rs);
                    });
                });
            });
        },
        sqlBatch: (arr) => {
            return new Promise((r, rr) => {
                const batch = [];
                db.transaction((tx) => {
                    for (let i = 0; i < arr.length; i++) {
                        batch.push(new Promise((resolve, reject) => {
                            tx.executeSql(arr[i], [], () => {
                                resolve(true);
                            });
                        }));
                        Promise.all(batch).then(() => r(true));
                    }
                });
            });
        }
    };
};

@Injectable({
    providedIn: 'root'
})
export class DbcontextService {
    databaseObj: any;
    row_data: any = [];
    private dbReady = new BehaviorSubject<boolean>(false);
    readonly database_name: string = 'fincasDB.db';
    idNegocio: number;

    constructor(private platform: Platform,
                private sqlite: SQLite) {
        this.initDB();
    }

    async initDB() {
        if (!this.platform.is('cordova')) {

            const db = window.openDatabase(this.database_name, '1.0', 'Dev Database', 1024 * 1024);
            this.databaseObj = browserDBInstance(db);

            await this.createAllTables();
            if (!this.dbReady.getValue()) {
                await this.insertDataInto(Tables.Negocio, ['NEGOCIO', 'JEFE', '54319922', true]);
                this.idNegocio = await this.getNegocioId();
            }
            console.log('Data Base was created in browser');
        } else {
            this.createDB();
            console.log('Database was created in native device');
        }
    }

    async createDB() {
        this.sqlite.create({
            name: this.database_name,
            location: 'default'
        })
            .then(async (db: SQLiteObject) => {
                this.databaseObj = db;
                await this.createAllTables();
                if (!this.dbReady.getValue()) {
                    await this.insertDataInto(Tables.Negocio, ['NEGOCIO', 'JEFE', '54319922', true]);
                    this.idNegocio = await this.getNegocioId();
                }
            })
            .catch(e => {
                alert("error " + JSON.stringify(e))
            });
    }

    createAllTables() {
        this.createTable(Tables.Negocio);
        this.createTable(Tables.Finca);
        this.createTable(Tables.Lote);
        this.createTable(Tables.Clientes);
        this.createTable(Tables.Motivo_Venta);
        this.createTable(Tables.Motivo_Muerte);
        this.createTable(Tables.Inseminadores);
        this.createTable(Tables.Raza);
        this.createTable(Tables.Enfermedad);
        this.createTable(Tables.Condicion_Corporal);
        this.createTable(Tables.Locomocion);
        this.createTable(Tables.Tipo_Servicios);
        this.createTable(Tables.Ventas);
        this.createTable(Tables.Muertes);
        this.createTable(Tables.Enfermedades);
        this.createTable(Tables.Mediciones_Fisicas);
        this.createTable(Tables.Produccion);
        this.createTable(Tables.Ingreso_Finca);
        this.createTable(Tables.Parto);
        this.createTable(Tables.Servicios);
        this.createTable(Tables.Lactancia);
        this.createTable(Tables.Rol_Botones);
        this.createTable(Tables.Eventos);
        this.createTable(Tables.Usuario);
        this.createTable(Tables.Animal);
        this.createTable(Tables.Database_Conexion);
        this.createTable(Tables.Rol);
        this.createTable(Tables.Validaciones);
        this.createTable(Tables.Sincronizacion);
        this.createTable(Tables.Celos);
        this.createTable(Tables.Leche);
        this.createTable(Tables.Tratamiento);
        this.createTable(Tables.Rango);
        this.createTable(Tables.Palpacion);
        this.createTable(Tables.Inventario);
        this.createTable(Tables.Tipo_Evento);
        this.createTable(Tables.Dia_Evento);
        this.createTable(Tables.Lote_Parto);
        this.createTable(Tables.Estado);
        this.createTable(Tables.Historico);
        this.createTable(Tables.Bitacora);
        this.createTable(Tables.Load);
    }

    deletedAllTable() {
        this.deleteTable(Tables.Finca);
        this.deleteTable(Tables.Lote);
        this.deleteTable(Tables.Motivo_Venta);
        this.deleteTable(Tables.Motivo_Muerte);
        this.deleteTable(Tables.Inseminadores);
        this.deleteTable(Tables.Raza);
        this.deleteTable(Tables.Enfermedad);
        this.deleteTable(Tables.Condicion_Corporal);
        this.deleteTable(Tables.Locomocion);
        this.deleteTable(Tables.Tipo_Servicios);
        this.deleteTable(Tables.Ventas);
        this.deleteTable(Tables.Muertes);
        this.deleteTable(Tables.Enfermedades);
        this.deleteTable(Tables.Mediciones_Fisicas);
        this.deleteTable(Tables.Produccion);
        this.deleteTable(Tables.Ingreso_Finca);
        this.deleteTable(Tables.Parto);
        this.deleteTable(Tables.Servicios);
        this.deleteTable(Tables.Lactancia);
        this.deleteTable(Tables.Rol_Botones);
        this.deleteTable(Tables.Animal);
        // this.deleteTable(Tables.Rol);
        // this.deleteTable(Tables.Usuario);
        this.deleteTable(Tables.Database_Conexion);
        this.deleteTable(Tables.Validaciones);
        this.deleteTable(Tables.Sincronizacion);
        this.deleteTable(Tables.Eventos);
        this.deleteTable(Tables.Celos);
        this.deleteTable(Tables.Palpacion);
        this.deleteTable(Tables.Leche);
        this.deleteTable(Tables.Tratamiento);
        // this.deleteTable(Tables.Rango);
        this.deleteTable(Tables.Inventario);
        this.deleteTable(Tables.Clientes);


        this.createTable(Tables.Finca);
        this.createTable(Tables.Lote);
        this.createTable(Tables.Motivo_Venta);
        this.createTable(Tables.Motivo_Muerte);
        this.createTable(Tables.Inseminadores);
        this.createTable(Tables.Raza);
        this.createTable(Tables.Enfermedad);
        this.createTable(Tables.Condicion_Corporal);
        this.createTable(Tables.Locomocion);
        this.createTable(Tables.Tipo_Servicios);
        this.createTable(Tables.Ventas);
        this.createTable(Tables.Muertes);
        this.createTable(Tables.Enfermedades);
        this.createTable(Tables.Mediciones_Fisicas);
        this.createTable(Tables.Produccion);
        this.createTable(Tables.Ingreso_Finca);
        this.createTable(Tables.Parto);
        this.createTable(Tables.Servicios);
        this.createTable(Tables.Lactancia);
        this.createTable(Tables.Rol_Botones);
        this.createTable(Tables.Animal);
        // this.createTable(Tables.Rol);
        // this.createTable(Tables.Usuario);
        this.createTable(Tables.Database_Conexion);
        this.createTable(Tables.Validaciones);
        this.createTable(Tables.Sincronizacion);
        this.createTable(Tables.Eventos);
        this.createTable(Tables.Celos);
        this.createTable(Tables.Palpacion);
        this.createTable(Tables.Leche);
        this.createTable(Tables.Tratamiento);
        //  this.createTable(Tables.Rango);
        this.createTable(Tables.Inventario);
        // this.createTable(Tables.Lote_Parto);
        // this.createTable(Tables.Estado);
        this.createTable(Tables.Clientes);
    }

    async createTable(table) {
        let sqlText;
        let tableName;
        switch (table) {
            case Tables.Negocio:
                tableName = 'negocio';
                sqlText = 'CREATE TABLE IF NOT EXISTS negocio (idNegocio INTEGER PRIMARY KEY, nombre VARCHAR(45) NOT NULL, jefe VARCHAR(45) NULL, telf VARCHAR(45) NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Finca:
                tableName = 'finca';
                sqlText = 'CREATE TABLE IF NOT EXISTS finca (idfinca INTEGER PRIMARY KEY, codigo INT NOT NULL UNIQUE , numero INT NULL, nombre VARCHAR(45) NULL, negocio_id' +
                    ' INT NULL, active TINYINT NOT NULL, FOREIGN KEY (negocio_id) REFERENCES negocio(idNegocio) ON DELETE NO ACTION ON UPDATE NO ACTION)';
                break;
            case Tables.Lote:
                tableName = 'lote';
                sqlText = 'CREATE TABLE IF NOT EXISTS lote (idLote INTEGER PRIMARY KEY, codigo INT NULL, numero INT NULL, nombre VARCHAR(45) NULL,' +
                    'fincaId INT NULL, active TINYINT NOT NULL, favorite VARCHAR(45) NULL, FOREIGN KEY (fincaId) REFERENCES finca(idfinca) ON DELETE NO ACTION ON UPDATE NO ACTION)';
                break;
            case Tables.Clientes:
                tableName = 'cliente';
                sqlText = 'CREATE TABLE IF NOT EXISTS cliente (codigo INT NOT NULL UNIQUE, nombre VARCHAR(45) NULL, ' +
                    'descripcion VARCHAR(45) NULL, telf VARCHAR(45) NULL, negocio_id INT NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Motivo_Venta:
                tableName = 'motivo_venta';
                sqlText = 'CREATE TABLE IF NOT EXISTS motivo_venta (idmotivo_venta INTEGER PRIMARY KEY, nombre VARCHAR(45) NULL, codigo INT NULL, ' +' descripcion VARCHAR(45) NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Motivo_Muerte:
                tableName = 'motivo_muerte';
                sqlText = 'CREATE TABLE IF NOT EXISTS motivo_muerte (idmotivo_muerte INTEGER PRIMARY KEY, codigo INT NULL, nombre VARCHAR(45) NULL, ' +
                    'descripcion VARCHAR(45) NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Inseminadores:
                tableName = 'inseminador';
                sqlText = 'CREATE TABLE IF NOT EXISTS inseminador (codigo INT NOT NULL UNIQUE, nombre VARCHAR(45) NULL, ' +
                    'negocio_id INT NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Raza:
                tableName = 'raza';
                sqlText = 'CREATE TABLE IF NOT EXISTS raza (codigo INT NOT NULL,nombre VARCHAR(45) NULL,' +
                    'negocio_id INT NULL,active TINYINT NOT NULL)';
                break;
            case Tables.Enfermedad:
                tableName = 'enfermedad';
                sqlText = 'CREATE TABLE IF NOT EXISTS enfermedad (codigo INT NOT NULL, nombre VARCHAR(45) NULL,' +
                    'descripcion VARCHAR(45) NULL,negocio_id INT NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Condicion_Corporal:
                tableName = 'condicion_corporal';
                sqlText = 'CREATE TABLE IF NOT EXISTS condicion_corporal (codigo INT NOT NULL, nombre VARCHAR(45) NULL,' +
                    'descripcion VARCHAR(45) NULL,negocio_id INT NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Locomocion:
                tableName = 'locomocion';
                sqlText = 'CREATE TABLE IF NOT EXISTS locomocion (codigo INT NOT NULL, nombre VARCHAR(45) NULL,' +
                    'descripcion VARCHAR(45) NULL,negocio_id INT NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Tipo_Servicios:
                tableName = 'tipo_servicio';
                sqlText = 'CREATE TABLE IF NOT EXISTS tipo_servicio (idtipo_servicio INTEGER PRIMARY KEY, codigo INT NOT NULL, nombre VARCHAR(45) NULL, ' +
                    'descripcion VARCHAR(45) NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Ventas:
                tableName = 'venta';
                sqlText = 'CREATE TABLE IF NOT EXISTS venta (codigo INT NOT NULL,fecha DATETIME NULL, motivoId INT NULL,' +
                    'cliente_codigo INT NULL,animal_codigo INT NULL,active TINYINT NOT NULL, FOREIGN KEY (motivoId) REFERENCES motivo_venta(idmotivo_venta) ON DELETE NO ACTION ON UPDATE NO ACTION)';
                break;
            case Tables.Muertes:
                tableName = 'muerte';
                sqlText = 'CREATE TABLE IF NOT EXISTS muerte (codigo INT NOT NULL,fecha DATETIME NULL, motivoId INT NULL,' +
                    'animal_codigo INT NULL, FOREIGN KEY (motivoId) REFERENCES motivo_muerte(idmotivo_muerte) ON DELETE NO ACTION ON UPDATE NO ACTION)';
                break;
            case Tables.Enfermedades:
                tableName = 'registro_enfermedad';
                sqlText = 'CREATE TABLE IF NOT EXISTS registro_enfermedad (codigo INT NOT NULL UNIQUE, fecha DATETIME NULL,' +
                    'active TINYINT NOT NULL, enfermedad_codigo INT NULL, animal_codigo INT NULL)';
                break;
            case Tables.Mediciones_Fisicas:
                tableName = 'estado_fisico';
                sqlText = 'CREATE TABLE IF NOT EXISTS estado_fisico (codigo INT NOT NULL UNIQUE,fecha DATETIME NULL, ' +
                    'active TINYINT NOT NULL, condicion_corporal_codigo INT NULL,locomocion_codigo INT NULL,' +
                    'animal_codigo INT NULL)';
                break;
            case Tables.Produccion:
                tableName = 'produccion';
                sqlText = 'CREATE TABLE IF NOT EXISTS produccion (codigo INT NOT NULL UNIQUE, fecha DATETIME NULL, ' +
                    'peso DECIMAL NULL, animal_codigo INT NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Ingreso_Finca:
                tableName = 'ingreso';
                sqlText = 'CREATE TABLE IF NOT EXISTS ingreso (codigo INT NOT NULL UNIQUE, fecha DATETIME NULL, ' +
                    'animal_codigo INT NULL, fincaId INT NULL, loteId INT NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Parto:
                tableName = 'parto';
                sqlText = 'CREATE TABLE IF NOT EXISTS parto (codigo INT NOT NULL UNIQUE, fecha DATETIME NULL, ' +
                    'sexo VARCHAR(45) NULL, animal_nacido_codigo INT NULL, madre_codigo INT NULL, raza_codigo INT NULL,' +
                    'active TINYINT NOT NULL,parto INT NULL)';
                break;
            case Tables.Servicios:
                tableName = 'servicio';
                sqlText = 'CREATE TABLE IF NOT EXISTS servicio (codigo INT NOT NULL, fecha DATETIME NULL, ' +
                    'animal_inseminador_codigo INT NULL, tipoId INT NULL, animal_inseminado_codigo INT NULL, ' +
                    'semen_codigo INT NULL, persona_inseminador_codigo INT NULL, active TINYINT NOT NULL)';
                break;
            case Tables.Lactancia:
                tableName = 'lactancia';
                sqlText = 'CREATE TABLE IF NOT EXISTS lactancia (codigo INT NOT NULL UNIQUE,fecha DATETIME NULL, ' +
                    'leche DECIMAL NULL, concentrado DECIMAL NULL, peso DECIMAL NULL, animal_codigo INT NULL, ' +
                    'active TINYINT NOT NULL)';
                break;

            case Tables.Rol_Botones:
                tableName = 'rol_botones';
                sqlText = 'CREATE TABLE IF NOT EXISTS rol_botones (codigo INT NOT NULL UNIQUE,id_rol INT NULL, ' +
                    'btn_eventos VARCHAR(45) NULL, btn_historico VARCHAR(45) NULL, btn_inventario VARCHAR(45) NULL, btn_controldefinca VARCHAR(45) NULL, ' +
                    'btn_salud VARCHAR(45) NULL, btn_produccion VARCHAR(45) NULL, btn_terneras VARCHAR(45) NULL, btn_reproduccion VARCHAR(45) NULL, btn_ingresoafinca VARCHAR(45) NULL, btn_configuracion VARCHAR(45) NULL, btn_sincronizacion VARCHAR(45) NULL, btn_IngresoAFincas VARCHAR(45) NULL, btn_Ventas VARCHAR(45) NULL,'
                    + 'btn_Muertes VARCHAR(45) NULL, btn_Enfermedades VARCHAR(45) NULL, btn_MedicionesFisicas VARCHAR(45) NULL, btn_Historico_Terneras VARCHAR(45) NULL, btn_Lactancia VARCHAR(45) NULL, btn_Partos VARCHAR(45) NULL, btn_Servicios VARCHAR(45) NULL, btn_Celo VARCHAR(45) NULL, btn_Palpacion VARCHAR(45) NULL,' + 'active TINYINT NOT NULL)';
                break;

            case Tables.Eventos:
                tableName = 'eventos';
                sqlText = 'CREATE TABLE IF NOT EXISTS eventos (codigo INT NOT NULL UNIQUE,fecha DATETIME NULL, ' +
                    'animal_codigo INT NULL, tipo_evento VARCHAR(45) NULL,' +
                    'active INT NOT NULL,completar VARCHAR(45) NULL)';
                break;

            case Tables.Animal:
                tableName = 'animal';
                sqlText = 'CREATE TABLE IF NOT EXISTS animal (codigo INT NOT NULL UNIQUE, ' +
                    'animal_codigo INT NULL,fecha DATETIME NULL, sexo VARCHAR(45) NULL,lote_nacimientoId INT NULL,lote_actual_Id INT NULL,' +
                    'razaId INT NULL,madreId INT NULL,padreId INT NULL,idTemporal INT NULL,idInventario INT NULL,active TINYINT  NOT NULL,temp INT NULL,ultimo_estado INT NULL)';
                break;

            case Tables.Usuario:
                tableName = 'usuario';
                sqlText = 'CREATE TABLE IF NOT EXISTS usuario (codigo INT NOT NULL UNIQUE,usuario VARCHAR(45)  NULL, ' +
                    'clave VARCHAR(45)  NULL, negocio_id INT NULL, idFinca INT  NULL,' +
                    'active TINYINT  NOT NULL)';
                break;

            case Tables.Rol:
                tableName = 'rol';
                sqlText = 'CREATE TABLE IF NOT EXISTS rol (codigo INT NOT NULL UNIQUE,nombre VARCHAR(45)  NULL,active TINYINT  NOT NULL)';
                break;


            case Tables.Database_Conexion:
                tableName = 'database_conexion';
                sqlText = 'CREATE TABLE IF NOT EXISTS database_conexion (codigo INT NOT NULL UNIQUE,url VARCHAR(45)  NULL, ' +
                    'usuario VARCHAR(45)  NULL, contraseña VARCHAR(45)  NULL, puerto INT  NULL,' +
                    'active TINYINT NOT NULL)';
                break;

            case Tables.Validaciones:
                tableName = 'validaciones';
                sqlText = 'CREATE TABLE IF NOT EXISTS validaciones (codigo INT NOT NULL UNIQUE,id_negocio INT  NULL, ' +
                    'nombre VARCHAR(45)  NULL, min INT  NULL, max INT  NULL,' +
                    'active TINYINT  NOT NULL)';
                break;


            case Tables.Sincronizacion:
                tableName = 'sincronizacion';
                sqlText = 'CREATE TABLE IF NOT EXISTS sincronizacion (codigo INT NOT NULL UNIQUE,nombre  VARCHAR(45)  NULL, ' +
                    'codigo_remoto INT  NULL, codigo_actual INT  NULL,fecha DATETIME  NULL, id_usuario INT  NULL, negocio_id INT  NULL, data VARCHAR(45)  NULL, accion VARCHAR(45) NULL,' + ' active TINYINT  NOT NULL)';
                break;

            case Tables.Celos:
                tableName = 'celos';
                sqlText = 'CREATE TABLE IF NOT EXISTS celos (codigo INT NOT NULL UNIQUE,' +
                    'animal_codigo INT NULL, celo INT NULL, fecha DATETIME NULL,id_negocio INT  NULL,' +
                    'active INT NOT NULL)';
                break;

            case Tables.Palpacion:
                tableName = 'palpacion';
                sqlText = 'CREATE TABLE IF NOT EXISTS palpacion (codigo INT NOT NULL UNIQUE,' +
                    'animal_codigo INT NULL, celo INT NULL, fecha DATETIME NULL,id_negocio INT  NULL,' +
                    'active INT NOT NULL)';
                break;

            case Tables.Tratamiento:
                tableName = 'tratamiento';
                sqlText = 'CREATE TABLE IF NOT EXISTS tratamiento (codigo INT NOT NULL UNIQUE,' +
                    'animal_codigo INT NULL, fecha DATETIME NULL,id_negocio INT  NULL,nota VARCHAR(45) NULL,' +
                    'active TINYINT NOT NULL)';
                break;

            case Tables.Rango:
                tableName = 'rango';
                sqlText = 'CREATE TABLE IF NOT EXISTS rango (codigo INT NOT NULL UNIQUE, id_tipo_evento INT NULL,max INT NULL,min INT NULL,' +
                    'active INT NOT NULL)';
                break;

            case Tables.Leche:
                tableName = 'leche';
                sqlText = 'CREATE TABLE IF NOT EXISTS leche (codigo INT NOT NULL UNIQUE,' +
                    'animal_codigo INT NULL, peso DECIMAL NULL, fecha DATETIME NULL,id_negocio INT  NULL,' +
                    'active INT NOT NULL)';
                break;

            case Tables.Inventario:
                tableName = 'inventario';
                sqlText = 'CREATE TABLE IF NOT EXISTS inventario (codigo INT NOT NULL UNIQUE,' +
                    'animal_codigo INT NULL, raza VARCHAR(45) NULL, sexo VARCHAR(45) NULL, semen INT NULL, finca_id INT NULL, lote_id INT NULL, fecha DATETIME NULL,' +
                    'active INT NOT NULL)';
                break;

            case Tables.Tipo_Evento:
                tableName = 'tipo_evento';
                sqlText = 'CREATE TABLE IF NOT EXISTS tipo_evento (codigo INT NOT NULL UNIQUE,nombre VARCHAR(45)  NULL, active TINYINT  NOT NULL)';
                break;

            case Tables.Dia_Evento:
                tableName = 'dia_evento';
                sqlText = 'CREATE TABLE IF NOT EXISTS dia_evento (codigo INT NOT NULL UNIQUE,nombre VARCHAR(45)  NULL,dia INT NULL,active TINYINT  NOT NULL)';
                break;

            case Tables.Lote_Parto:
                tableName = 'lote_parto';
                sqlText = 'CREATE TABLE IF NOT EXISTS lote_parto (codigo INT NOT NULL UNIQUE, loteId INT NULL, active TINYINT NOT NULL)';
                break;

            case Tables.Estado:
                tableName = 'estado';
                sqlText = 'CREATE TABLE IF NOT EXISTS estado (codigo INT NOT NULL UNIQUE, nombre VARCHAR(45)  NULL, active TINYINT NOT NULL)';
                break;

            case Tables.Historico:
                tableName = 'historico';
                sqlText = 'CREATE TABLE IF NOT EXISTS historico (codigo INT NOT NULL UNIQUE, animal_codigo INT NULL, active INT  NULL)';
                break;

            case Tables.Bitacora:
                tableName = 'bitacora';
                sqlText = 'CREATE TABLE IF NOT EXISTS bitacora (codigo INT NOT NULL UNIQUE, fecha_generacion DATETIME NULL,codigo_usuario INT NULL, codigo_generado INT NULL, entidad VARCHAR(45)  NULL, usuario_id INT  NULL, active INT  NULL)';
                break;

            case Tables.Load:
                tableName = 'load';
                sqlText = 'CREATE TABLE IF NOT EXISTS load (codigo INT NOT NULL UNIQUE, load INT NULL, active TINYINT NOT NULL)';
                break;

        }
        await this.databaseObj.executeSql(sqlText, [])
            .then(() => {
                 // alert('Table ' +tableName+ ' Created!');
            })
            .catch(e => {
                alert("Error creando tabla " + tableName + 'error: ' + JSON.stringify(e));
            });
    }

    async deleteTable(table) {
        let sqlText;
        let tableName;
        switch (table) {
            case Tables.Finca:
                tableName = 'finca';
                sqlText = 'DROP TABLE  finca';
                break;
            case Tables.Lote:
                tableName = 'lote';
                sqlText = 'DROP TABLE lote';
                break;
            case Tables.Motivo_Venta:
                tableName = 'motivo_venta';
                sqlText = 'DROP TABLE motivo_venta';
                break;
            case Tables.Motivo_Muerte:
                tableName = 'motivo_muerte';
                sqlText = 'DROP TABLE motivo_muerte';
                break;
            case Tables.Clientes:
                tableName = 'cliente';
                sqlText = 'DROP TABLE cliente';
                break;
            case Tables.Inseminadores:
                tableName = 'inseminador';
                sqlText = 'DROP TABLE inseminador';
                break;
            case Tables.Raza:
                tableName = 'raza';
                sqlText = 'DROP TABLE raza';
                break;
            case Tables.Enfermedad:
                tableName = 'enfermedad';
                sqlText = 'DROP TABLE enfermedad';
                break;
            case Tables.Condicion_Corporal:
                tableName = 'condicion_corporal';
                sqlText = 'DROP TABLE condicion_corporal';
                break;
            case Tables.Locomocion:
                tableName = 'locomocion';
                sqlText = 'DROP TABLE locomocion';
                break;
            case Tables.Tipo_Servicios:
                tableName = 'tipo_servicio';
                sqlText = 'DROP TABLE tipo_servicio';
                break;
            case Tables.Ventas:
                tableName = 'venta';
                sqlText = 'DROP TABLE venta';
                break;
            case Tables.Muertes:
                tableName = 'muerte';
                sqlText = 'DROP TABLE muerte';
                break;
            case Tables.Enfermedades:
                tableName = 'registro_enfermedad';
                sqlText = 'DROP TABLE registro_enfermedad';
                break;
            case Tables.Mediciones_Fisicas:
                tableName = 'estado_fisico';
                sqlText = 'DROP TABLE estado_fisico';
                break;
            case Tables.Produccion:
                tableName = 'produccion';
                sqlText = 'DROP TABLE produccion';
                break;
            case Tables.Ingreso_Finca:
                tableName = 'ingreso';
                sqlText = 'DROP TABLE ingreso';
                break;
            case Tables.Parto:
                tableName = 'parto';
                sqlText = 'DROP TABLE parto';
                break;
            case Tables.Servicios:
                tableName = 'servicio';
                sqlText = 'DROP TABLE  servicio';
                break;
            case Tables.Lactancia:
                tableName = 'lactancia';
                sqlText = 'DROP TABLE lactancia';
                break;
            case Tables.Rol_Botones:
                tableName = 'rol_botones';
                sqlText = 'DROP TABLE rol_botones';
                break;

            case Tables.Eventos:
                tableName = 'eventos';
                sqlText = 'DROP TABLE eventos';
                break;

            case Tables.Animal:
                tableName = 'animal';
                sqlText = 'DROP TABLE animal';
                break;

            case Tables.Usuario:
                tableName = 'usuario';
                sqlText = 'DROP TABLE usuario';
                break;

            case Tables.Rol:
                tableName = 'rol';
                sqlText = 'DROP TABLE rol';
                break;


            case Tables.Database_Conexion:
                tableName = 'database_conexion';
                sqlText = 'DROP TABLE database_conexion';
                break;

            case Tables.Validaciones:
                tableName = 'validaciones';
                sqlText = 'DROP TABLE validaciones';
                break;


            case Tables.Sincronizacion:
                tableName = 'sincronizacion';
                sqlText = 'DROP TABLE sincronizacion';
                break;

            case Tables.Celos:
                tableName = 'celos';
                sqlText = 'DROP TABLE celos';
                break;

            case Tables.Palpacion:
                tableName = 'palpacion';
                sqlText = 'DROP TABLE palpacion';
                break;

            case Tables.Tratamiento:
                tableName = 'tratamiento';
                sqlText = 'DROP TABLE tratamiento';
                break;

            case Tables.Rango:
                tableName = 'rango';
                sqlText = 'DROP TABLE rango';
                break;

            case Tables.Leche:
                tableName = 'leche';
                sqlText = 'DROP TABLE leche';
                break;

            case Tables.Inventario:
                tableName = 'inventario';
                sqlText = 'DROP TABLE inventario';
                break;

        }
        await this.databaseObj.executeSql(sqlText, [])
            .then(() => {
                //  alert('Table ' +tableName+ ' Delete!');
            })
            .catch(e => {
                alert('Error eliminado tabla ' + tableName + 'error: ' + JSON.stringify(e));
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async insertDataInto(table, model) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {
            case Tables.Negocio:
                tableName = 'negocio';
                sqlText = 'INSERT INTO negocio (nombre, jefe, telf, active) VALUES (?,?,?,?)';
                values = ['NEGOCIO', 'JEFE', '54319922', true];
                this.dbReady.next(true);
                break;
            case Tables.Finca:
                tableName = 'finca';
                sqlText = 'INSERT INTO finca (codigo, numero, nombre, negocio_id, active) VALUES (?,?,?,?,?)';
                code = await this.getNextCode(Tables.Finca);
                values = [code, model.number, model.name, this.idNegocio, true];
                break;
            case Tables.Lote:
                tableName = 'lote';
                sqlText = 'INSERT INTO lote (codigo, numero, nombre, fincaId, active, favorite) VALUES (?,?,?,?,?,?)';
                code = await this.getNextCode(Tables.Lote);
                values = [code, model.number, model.name, model.idFarm, true, 'star-half'];
                break;
            case Tables.Clientes:
                tableName = 'cliente';
                code = await this.getNextCode(Tables.Clientes);
                sqlText = 'INSERT INTO cliente (codigo, nombre, descripcion, telf, negocio_id, active) VALUES (?,?,?,?,?,?)';
                values = [code, model.name, '', '', this.idNegocio, true];
                break;
            case Tables.Motivo_Venta:
                tableName = 'motivo_venta';
                sqlText = 'INSERT INTO motivo_venta (nombre, codigo, descripcion, active) VALUES (?,?,?,?)';
                code = await this.getNextCode(Tables.Motivo_Venta);
                values = [model.name, code, '', true];
                break;
            case Tables.Motivo_Muerte:
                tableName = 'motivo_muerte';
                sqlText = 'INSERT INTO motivo_muerte (codigo, nombre, descripcion, active) VALUES (?,?,?,?)';
                code = await this.getNextCode(Tables.Motivo_Muerte);
                values = [code, model.name, '', true];
                break;
            case Tables.Tipo_Servicios:
                tableName = 'tipo_servicio';
                sqlText = 'INSERT INTO tipo_servicio (codigo, nombre, descripcion, active) VALUES (?,?,?,?)';
                code = await this.getNextCode(Tables.Tipo_Servicios)
                values = [code, model.name, '', true];
                break;
            case Tables.Inseminadores:
                tableName = 'inseminador';
                code = await this.getNextCode(Tables.Inseminadores);
                sqlText = 'INSERT INTO inseminador (codigo, nombre, negocio_id, active) VALUES (?,?,?,?)';
                values = [code, model.name, this.idNegocio, true];
                break;
            case Tables.Raza:
                tableName = 'raza';
                code = await this.getNextCode(Tables.Raza);
                sqlText = 'INSERT INTO raza (codigo, nombre, negocio_id, active) VALUES (?,?,?,?)';
                values = [code, model.name, this.idNegocio, true];
                break;
            case Tables.Enfermedad:
                tableName = 'enfermedad';
                code = await this.getNextCode(Tables.Enfermedad);
                sqlText = 'INSERT INTO enfermedad (codigo, nombre, descripcion, negocio_id, active) VALUES (?,?,?,?,?)';
                values = [code, model.name, '', this.idNegocio, true];
                break;
            case Tables.Condicion_Corporal:
                tableName = 'condicion_corporal';
                code = await this.getNextCode(Tables.Condicion_Corporal);
                sqlText = 'INSERT INTO condicion_corporal (codigo, nombre, descripcion, negocio_id, active) VALUES (?,?,?,?,?)';
                values = [code, model.name, '', this.idNegocio, true];
                break;
            case Tables.Locomocion:
                tableName = 'locomocion';
                code = await this.getNextCode(Tables.Locomocion);
                sqlText = 'INSERT INTO locomocion (codigo, nombre, descripcion, negocio_id, active) VALUES (?,?,?,?,?)';
                values = [code, model.name, '', this.idNegocio, true];
                break;
            case Tables.Ventas:
                tableName = 'venta';
                code = await this.getNextCode(Tables.Ventas);
                sqlText = 'INSERT INTO venta (codigo, fecha, motivoId, cliente_codigo, animal_codigo, active) VALUES (?,?,?,?,?,?)';
                values = [code, model.fecha, model.motivoId, model.cliente_codigo, model.animal_codigo, true];
                break;
            case Tables.Muertes:
                tableName = 'muerte';
                code = await this.getNextCode(Tables.Muertes);
                sqlText = 'INSERT INTO muerte (codigo, fecha, motivoId, animal_codigo) VALUES (?,?,?,?)';
                values = [code, model.fecha, model.motivoId, model.animal_codigo];
                break;
            case Tables.Enfermedades:
                tableName = 'registro_enfermedad';
                code = await this.getNextCode(Tables.Enfermedades);
                sqlText = 'INSERT INTO registro_enfermedad (codigo, fecha, active, enfermedad_codigo, animal_codigo) VALUES (?,?,?,?,?)';
                values = [code, model.fecha, true, model.enfermedadId, model.animal_codigo];
                break;
            case Tables.Mediciones_Fisicas:
                tableName = 'estado_fisico';
                code = await this.getNextCode(Tables.Mediciones_Fisicas);
                sqlText = 'INSERT INTO estado_fisico (codigo, fecha, active, condicion_corporal_codigo,locomocion_codigo, animal_codigo) VALUES (?,?,?,?,?,?)';
                values = [code, model.fecha, true, model.condicionId, model.locomocionId, model.animal_codigo];
                break;
            case Tables.Produccion:
                tableName = 'produccion';
                code = await this.getNextCode(Tables.Produccion);
                sqlText = 'INSERT INTO produccion (codigo, fecha, peso, animal_codigo, active) VALUES (?,?,?,?,?)';
                values = [code, model.fecha, model.peso, model.animal_codigo, true];
                break;
            case Tables.Ingreso_Finca:
                tableName = 'ingreso';
                code = await this.getNextCode(Tables.Ingreso_Finca);
                sqlText = 'INSERT INTO ingreso (codigo, fecha, animal_codigo,fincaId, loteId, active) VALUES (?,?,?,?,?,?)';
                values = [code, model.fecha, model.animal_codigo, model.fincaId, model.loteId, true];
                break;
            case Tables.Parto:
                tableName = 'parto';
                code = await this.getNextCode(Tables.Parto);
                sqlText = 'INSERT INTO parto (codigo, fecha, sexo, animal_nacido_codigo ,madre_codigo, raza_codigo, active, parto) VALUES (?,?,?,?,?,?,?,?)';
                values = [code, model.fecha, model.sexo, model.codigoCria, model.codigoMadre, model.razaId, true, model.parto];
                break;
            case Tables.Servicios:
                tableName = 'servicio';
                code = await this.getNextCode(Tables.Servicios);
                sqlText = 'INSERT INTO servicio (codigo, fecha, animal_inseminador_codigo, tipoId, animal_inseminado_codigo ,semen_codigo, persona_inseminador_codigo, active) VALUES (?,?,?,?,?,?,?,?)';
                values = [code, model.fecha, model.animal_inseminador, model.servicioId, model.animal_inseminado, model.codigo_semen, model.inseminador_codigo, true];
                break;
            case Tables.Lactancia:
                tableName = 'lactancia';
                code = await this.getNextCode(Tables.Lactancia);
                sqlText = 'INSERT INTO lactancia (codigo, fecha, leche, concentrado, peso ,animal_codigo, active) VALUES (?,?,?,?,?,?,?)';
                values = [code, model.fecha, model.leche, model.concentrado, model.peso, model.animal_codigo, true];
                break;


            case Tables.Rol_Botones:
                tableName = 'rol_botones';
                code = this.getNextCode(Tables.Rol_Botones);
                sqlText = 'INSERT INTO rol_botones  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                values = [code, model.id_rol, model.btn_eventos, model.btn_historico, model.btn_inventario, model.btn_controldefinca, model.btn_salud, model.btn_produccion, model.btn_terneras, model.btn_reproduccion, model.btn_ingresoafinca, model.btn_configuracion, model.btn_sincronizacion, model.btn_IngresoAFincas, model.btn_Ventas, model.btn_Muertes, model.btn_Enfermedades, model.btn_MedicionesFisicas, model.btn_MedicionesFisicas, model.btn_Lactancia, model.btn_Partos, model.btn_Servicios, model.btn_Celo, model.btn_Palpacion, true];
                break;

            case Tables.Eventos:
                tableName = 'eventos';
                code = await this.getNextCode(Tables.Eventos);
                sqlText = 'INSERT INTO eventos VALUES (?,?,?,?,?,?)';
                values = [code, model.fecha, model.animal_codigo, model.tipo_evento, true, 'close'];
                break;
            case Tables.Usuario:
                tableName = 'usuario';
                code = this.getNextCode(Tables.Usuario);
                sqlText = 'INSERT INTO usuario VALUES (?,?,?,?,?,?,?)';
                values = [code, model.usuario, model.clave, model.rolId, this.idNegocio, model.idFinca, true];
                break;

            case Tables.Animal:
                tableName = 'animal';
                code = await this.getNextCode(Tables.Animal);
                sqlText = 'INSERT INTO animal  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                values = [code, model.animal_codigo, model.fecha, model.sexo, model.lote_nacimientoId, model.lote_actual_Id, model.razaId, model.madreId, model.padreId, model.idTemporal, model.idInventario, true, model.temp, model.ultimo_estado];
                break;

            case Tables.Database_Conexion:
                tableName = 'database_conexion';
                code = this.getNextCode(Tables.Database_Conexion);
                sqlText = 'INSERT INTO database_conexion  VALUES (?,?,?,?,?,?)';
                values = [code, model.url, model.usuario, model.contraseña, model.puerto, true];
                break;

            case Tables.Rol:
                tableName = 'rol';
                code = this.getNextCode(Tables.Rol);
                sqlText = 'INSERT INTO rol VALUES (?,?,?)';
                values = [code, model.nombre, true];
                // values = [1,"Administrador",1,1]
                break;

            case Tables.Validaciones:
                tableName = 'validaciones';
                code = this.getNextCode(Tables.Validaciones);
                sqlText = 'INSERT INTO validaciones  VALUES (?,?,?,?,?,?)';
                values = [code, model.id_negocio, model.nombre, model.min, model.max, true];
                break;

            case Tables.Sincronizacion:
                tableName = 'sincronizacion';
                code = await this.getNextCode(Tables.Sincronizacion);
                sqlText = 'INSERT INTO sincronizacion  VALUES (?,?,?,?,?,?,?,?,?,?)';
                values = [code, model.nombre, model.codigo_remoto, code, model.fecha, null, this.idNegocio, model.data, model.accion, true];
                break;

            case Tables.Celos:
                tableName = 'celos';
                code = await this.getNextCode(Tables.Celos);
                sqlText = 'INSERT INTO celos  VALUES (?,?,?,?,?,?)';
                values = [code, model.animal_codigo, model.celos, model.fecha, this.idNegocio, true];
                break;

            case Tables.Palpacion:
                tableName = 'palpacion';
                code = await this.getNextCode(Tables.Palpacion);
                sqlText = 'INSERT INTO palpacion  VALUES (?,?,?,?,?,?)';
                values = [code, model.animal_codigo, model.celos, model.fecha, this.idNegocio, true];
                break;

            case Tables.Leche:
                tableName = 'leche';
                code = this.getNextCode(Tables.Leche);
                sqlText = 'INSERT INTO leche  VALUES (?,?,?,?,?,?)';
                values = [code, model.animal_codigo, model.peso, model.fecha, this.idNegocio, true];
                break;


            case Tables.Tratamiento:
                tableName = 'tratamiento';
                code = this.getNextCode(Tables.Tratamiento);
                sqlText = 'INSERT INTO tratamiento  VALUES (?,?,?,?,?,?)';
                values = [code, model.animal_codigo, model.fecha, model.nota, this.idNegocio, true];
                break;
            case Tables.Rango:
                tableName = 'rango';
                code = await this.getNextCode(Tables.Rango);
                sqlText = 'INSERT INTO rango  VALUES (?,?,?,?,?)';
                values = [code, model.id_tipo_evento, model.max, model.min, true];
                break;

            case Tables.Inventario:
                tableName = 'inventario';
                code = this.getNextCode(Tables.Inventario);
                sqlText = 'INSERT INTO inventario  VALUES (?,?,?,?,?,?,?,?,?)';
                values = [code, model.animal_codigo, model.raza, model.sexo, model.semen, model.finca, model.lote, model.fecha, true];
                break;

            case Tables.Tipo_Evento:
                tableName = 'tipo_evento';
                code = await this.getNextCode(Tables.Tipo_Evento);
                sqlText = 'INSERT INTO tipo_evento VALUES (?,?,?)';
                values = [code, model.nombre, true];
                break;


            case Tables.Dia_Evento:
                tableName = 'dia_evento';
                code = await this.getNextCode(Tables.Dia_Evento);
                sqlText = 'INSERT INTO dia_evento VALUES (?,?,?,?)';
                values = [code, model.nombre, model.dia, true];
                // values = [1,"Administrador",1,1]
                break;

            case Tables.Estado:
                tableName = 'estado';
                code = await this.getNextCode(Tables.Estado);
                sqlText = 'INSERT OR REPLACE INTO estado  VALUES (?,?,?)';
                values = [model.codigo, model.nombre, true];
                break;

            case Tables.Historico:
                tableName = 'historico';
                code = await this.getNextCode(Tables.Historico);
                sqlText = 'INSERT INTO historico  VALUES (?,?,?)';
                values = [code, model.animal_codigo, true];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
            })
            .catch(e => {
                alert('Error insertando en tabla ' + tableName + ' Error: ' + JSON.stringify(e));
            });
    }


    async insertDataSync(table, model) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {
            case Tables.Negocio:
                tableName = 'negocio';
                sqlText = 'INSERT INTO negocio (nombre, jefe, telf, active) VALUES (?,?,?,?)';
                values = [model.name, model.jefe, model.telf, model.active];
                break;
            case Tables.Finca:
                tableName = 'finca';
                sqlText = 'INSERT INTO finca (codigo, numero, nombre, negocio_id, active) VALUES (?,?,?,?,?)';
                values = [model.code, model.number, model.name, model.negocioId, model.active];
                break;
            case Tables.Lote:
                tableName = 'lote';
                sqlText = 'INSERT INTO lote (codigo, numero, nombre, fincaId, active, favorite) VALUES (?,?,?,?,?,?)';
                values = [model.code, model.number, model.name, model.idFarm, model.active, 'star-half'];
                break;
            case Tables.Clientes:
                tableName = 'cliente';
                sqlText = 'INSERT INTO cliente (codigo, nombre, descripcion, telf, negocio_id, active) VALUES (?,?,?,?,?,?)';
                values = [model.code, model.name, '', '', model.negocioId, model.active];
                break;
            case Tables.Motivo_Venta:
                tableName = 'motivo_venta';
                sqlText = 'INSERT INTO motivo_venta (nombre, codigo, descripcion, active) VALUES (?,?,?,?)';
                values = [ model.name, model.code, '', model.active];
                break;
            case Tables.Motivo_Muerte:
                tableName = 'motivo_muerte';
                sqlText = 'INSERT INTO motivo_muerte (codigo, nombre, descripcion, active) VALUES (?,?,?,?)';
                values = [model.code, model.name, '', model.active];
                break;
            case Tables.Tipo_Servicios:
                tableName = 'tipo_servicio';
                sqlText = 'INSERT INTO tipo_servicio (codigo, nombre, descripcion, active) VALUES (?,?,?,?)';
                values = [model.code, model.name, '', model.active];
                break;
            case Tables.Inseminadores:
                tableName = 'inseminador';
                code = await this.getNextCode(Tables.Ventas);
                sqlText = 'INSERT INTO inseminador (codigo, nombre, negocio_id, active) VALUES (?,?,?,?)';
                values = [model.code, model.name, model.negocioId, model.active];
                break;
            case Tables.Raza:
                tableName = 'raza';
                sqlText = 'INSERT INTO raza (codigo, nombre, negocio_id, active) VALUES (?,?,?,?)';
                values = [model.code, model.name, this.idNegocio, model.active];
                break;
            case Tables.Enfermedad:
                tableName = 'enfermedad';
                sqlText = 'INSERT INTO enfermedad (codigo, nombre, descripcion, negocio_id, active) VALUES (?,?,?,?,?)';
                values = [model.code, model.name, '', model.negocioId, model.active];
                break;
            case Tables.Condicion_Corporal:
                tableName = 'condicion_corporal';
                sqlText = 'INSERT INTO condicion_corporal (codigo, nombre, descripcion, negocio_id, active) VALUES (?,?,?,?,?)';
                values = [model.code, model.name, '', model.negocioId, model.active];
                break;
            case Tables.Locomocion:
                tableName = 'locomocion';
                sqlText = 'INSERT INTO locomocion (codigo, nombre, descripcion, negocio_id, active) VALUES (?,?,?,?,?)';
                values = [model.code, model.name, '', this.idNegocio, model.active];
                break;
            case Tables.Ventas:
                tableName = 'venta';
                sqlText = 'INSERT INTO venta (codigo, fecha, motivoId, cliente_codigo, animal_codigo, active) VALUES (?,?,?,?,?,?)';
                values = [model.code, model.fecha, model.motivoId, model.cliente_codigo, model.animal_codigo, model.active];
                break;
            case Tables.Muertes:
                tableName = 'muerte';
                sqlText = 'INSERT INTO muerte (codigo, fecha, motivoId, animal_codigo) VALUES (?,?,?,?)';
                values = [model.code, model.fecha, model.motivoId, model.animal_codigo];
                break;
            case Tables.Enfermedades:
                tableName = 'registro_enfermedad';
                sqlText = 'INSERT INTO registro_enfermedad (codigo, fecha, active, enfermedad_codigo, animal_codigo) VALUES (?,?,?,?,?)';
                values = [model.code, model.fecha, model.active, model.enfermedadId, model.animal_codigo];
                break;
            case Tables.Mediciones_Fisicas:
                tableName = 'estado_fisico';
                sqlText = 'INSERT INTO estado_fisico (codigo, fecha, active, condicion_corporal_codigo,locomocion_codigo, animal_codigo) VALUES (?,?,?,?,?,?)';
                values = [model.code, model.fecha, model.active, model.condicionId, model.locomocionId, model.animal_codigo];
                break;
            case Tables.Produccion:
                tableName = 'produccion';
                sqlText = 'INSERT INTO produccion (codigo, fecha, peso, animal_codigo, active) VALUES (?,?,?,?,?)';
                values = [model.code, model.fecha, model.peso, model.animal_codigo, model.active];
                break;
            case Tables.Ingreso_Finca:
                tableName = 'ingreso';
                sqlText = 'INSERT INTO ingreso (codigo, fecha, animal_codigo,fincaId, loteId, active) VALUES (?,?,?,?,?,?)';
                values = [model.code, model.fecha, model.animal_codigo, model.fincaId, model.loteId, model.active];
                break;
            case Tables.Parto:
                tableName = 'parto';
                sqlText = 'INSERT INTO parto (codigo, fecha, sexo, animal_nacido_codigo ,madre_codigo, raza_codigo, active, parto) VALUES (?,?,?,?,?,?,?,?)';
                values = [model.code, model.fecha, model.sexo, model.codigoCria, model.codigoMadre, model.razaId, model.active, model.parto];
                break;
            case Tables.Servicios:
                tableName = 'servicio';
                sqlText = 'INSERT INTO servicio (codigo, fecha, animal_inseminador_codigo, tipoId, animal_inseminado_codigo ,semen_codigo, persona_inseminador_codigo, active) VALUES (?,?,?,?,?,?,?,?)';
                values = [model.code, model.fecha, model.animal_inseminador, model.servicioId, model.animal_inseminado, model.codigo_semen, model.inseminador_codigo, model.active];
                break;
            case Tables.Lactancia:
                tableName = 'lactancia';
                sqlText = 'INSERT INTO lactancia (codigo, fecha, leche, concentrado, peso ,animal_codigo, active) VALUES (?,?,?,?,?,?,?)';
                values = [model.code, model.fecha, model.leche, model.concentrado, model.peso, model.animal_codigo, model.active];
                break;


            case Tables.Rol_Botones:
                tableName = 'rol_botones';
                sqlText = 'INSERT INTO rol_botones  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                values = [model.code, model.id_rol, model.btn_eventos, model.btn_historico, model.btn_inventario, model.btn_controldefinca, model.btn_salud, model.btn_produccion, model.btn_terneras, model.btn_reproduccion, model.btn_ingresoafinca, model.btn_configuracion, model.btn_sincronizacion, model.btn_IngresoAFincas, model.btn_Ventas, model.btn_Muertes, model.btn_Enfermedades, model.btn_MedicionesFisicas, model.btn_MedicionesFisicas, model.btn_Lactancia, model.btn_Partos, model.btn_Servicios, model.btn_Celo, model.btn_Palpacion, model.active];
                break;

            case Tables.Eventos:
                tableName = 'eventos';
                sqlText = 'INSERT INTO eventos VALUES (?,?,?,?,?,?)';
                values = [model.code, model.fecha, model.animal_codigo, model.tipo_evento, model.active, 'close'];
                break;
            case Tables.Usuario:
                tableName = 'usuario';
                sqlText = 'INSERT INTO usuario VALUES (?,?,?,?,?,?)';
                values = [model.code, model.usuario, model.clave, model.negocioId, model.idFinca, model.active];
                break;

            case Tables.Animal:
                tableName = 'animal';
                sqlText = 'INSERT INTO animal  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                values = [model.code, model.animal_codigo, model.fecha, model.sexo, model.lote_nacimientoId, model.lote_actual_Id, model.razaId, model.madreId, model.padreId, model.idTemporal, model.idInventario, model.active, model.temp, model.ultimo_estado];
                break;

            case Tables.Database_Conexion:
                tableName = 'database_conexion';
                sqlText = 'INSERT INTO database_conexion  VALUES (?,?,?,?,?,?)';
                values = [model.code, model.url, model.usuario, model.contraseña, model.puerto, model.active];
                break;

            case Tables.Rol:
                tableName = 'rol';
                code = this.getNextCode(Tables.Rol);
                sqlText = 'INSERT INTO rol VALUES (?,?,?)';
                values = [model.code, model.nombre, model.active];
                break;

            case Tables.Validaciones:
                tableName = 'validaciones';
                code = this.getNextCode(Tables.Validaciones);
                sqlText = 'INSERT INTO validaciones  VALUES (?,?,?,?,?,?)';
                values = [model.code, model.id_negocio, model.nombre, model.min, model.max, model.active];
                break;

            case Tables.Sincronizacion:
                tableName = 'sincronizacion';
                sqlText = 'INSERT INTO sincronizacion  VALUES (?,?,?,?,?,?,?,?,?,?)';
                values = [model.code, model.nombre, model.codigo_remoto, code, model.fecha, null, model.negocioId, model.data, model.accion, model.active];
                break;

            case Tables.Celos:
                tableName = 'celos';
                sqlText = 'INSERT INTO celos  VALUES (?,?,?,?,?,?)';
                values = [model.code, model.animal_codigo, model.celos, model.fecha, model.negocioId, model.active];
                break;

            case Tables.Palpacion:
                tableName = 'palpacion';
                sqlText = 'INSERT INTO palpacion  VALUES (?,?,?,?,?,?)';
                values = [model.code, model.animal_codigo, model.celos, model.fecha, model.negocioId, model.active];
                break;

            case Tables.Leche:
                tableName = 'leche';
                sqlText = 'INSERT INTO leche  VALUES (?,?,?,?,?,?)';
                values = [model.code, model.animal_codigo, model.peso, model.fecha, model.negocioId, model.active];
                break;


            case Tables.Tratamiento:
                tableName = 'tratamiento';
                sqlText = 'INSERT INTO tratamiento  VALUES (?,?,?,?,?,?)';
                values = [model.code, model.animal_codigo, model.fecha, model.nota, model.negocioId, model.active];
                break;
            case Tables.Rango:
                tableName = 'rango';
                sqlText = 'INSERT INTO rango  VALUES (?,?,?,?,?)';
                values = [model.code, model.id_tipo_evento, model.max, model.min, model.active];
                break;

            case Tables.Inventario:
                tableName = 'inventario';
                sqlText = 'INSERT INTO inventario  VALUES (?,?,?,?,?,?,?,?,?)';
                values = [model.code, model.animal_codigo, model.raza, model.sexo, model.semen, model.finca, model.lote, model.fecha, model.active];
                break;

            case Tables.Tipo_Evento:
                tableName = 'tipo_evento';
                sqlText = 'INSERT INTO tipo_evento VALUES (?,?,?)';
                values = [model.code, model.nombre, model.active];
                break;


            case Tables.Dia_Evento:
                tableName = 'dia_evento';
                sqlText = 'INSERT INTO dia_evento VALUES (?,?,?,?)';
                values = [model.code, model.nombre, model.dia, model.active];
                // values = [1,"Administrador",1,1]
                break;

            case Tables.Estado:
                tableName = 'estado';
                sqlText = 'INSERT OR REPLACE INTO estado  VALUES (?,?,?)';
                values = [model.code, model.nombre, model.active];
                break;

            case Tables.Bitacora:
                tableName = 'bitacora';
                sqlText = 'INSERT INTO bitacora  VALUES (?,?,?,?,?,?,?)';
                values = [model.code, model.fecha_generacion, model.codigo_usuario, model.codigo_generado, model.entidad, model.usuario_id, model.active];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then((res) => {

            })
            .catch(e => {
                //  alert("Error insertando en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("Fallo  insertando intentelo de nuevo, por favor")
            });
    }

    async updateDataInto(table, model, idElement?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {
            case Tables.Finca:
                tableName = 'finca';
                sqlText = `UPDATE finca SET numero='${model.number}', nombre='${model.name}', negocio_id='${this.idNegocio}', active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Lote:
                tableName = 'lote';
                sqlText = `UPDATE lote SET numero='${model.number}', nombre='${model.name}', fincaId='${model.idFarm}', active='${model.active}', favorite='star-half' WHERE idLote = ${idElement}`;
                values = [];
                break;
            case Tables.Clientes:
                tableName = 'cliente';
                code = await this.getNextCode(Tables.Clientes);
                sqlText = `UPDATE cliente SET nombre='${model.name}', descripcion="", telf='${model.telf}', negocio_id='${this.idNegocio}', active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Motivo_Venta:
                tableName = 'motivo_venta';
                sqlText = `UPDATE motivo_venta SET nombre='${model.name}', descripcion="", active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Motivo_Muerte:
                tableName = 'motivo_muerte';
                sqlText = `UPDATE motivo_muerte SET nombre='${model.name}', descripcion="", active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Tipo_Servicios:
                tableName = 'tipo_servicio';
                sqlText = `UPDATE tipo_servicio SET nombre='${model.name}', descripcion="", active='${model.active}' WHERE idtipo_servicio = ${idElement}`;
                values = [];
                break;
            case Tables.Inseminadores:
                tableName = 'inseminador';
                code = await this.getNextCode(Tables.Inseminadores);
                sqlText = `UPDATE inseminador SET nombre='${model.name}', negocio_id='${this.idNegocio}', active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Raza:
                tableName = 'raza';
                code = await this.getNextCode(Tables.Raza);
                sqlText = `UPDATE raza SET nombre='${model.name}', negocio_id='${this.idNegocio}', active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Enfermedad:
                tableName = 'enfermedad';
                code = await this.getNextCode(Tables.Enfermedad);
                sqlText = `UPDATE enfermedad SET nombre='${model.name}', descripcion="", negocio_id='${this.idNegocio}', active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Condicion_Corporal:
                tableName = 'condicion_corporal';
                code = await this.getNextCode(Tables.Condicion_Corporal);
                sqlText = `UPDATE condicion_corporal SET nombre='${model.name}', descripcion="", negocio_id='${this.idNegocio}', active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Locomocion:
                tableName = 'locomocion';
                code = await this.getNextCode(Tables.Locomocion);
                sqlText = `UPDATE locomocion SET nombre='${model.name}', descripcion="", negocio_id='${this.idNegocio}', active='${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Ventas:
                tableName = 'venta';
                code = await this.getNextCode(Tables.Ventas);
                sqlText = `UPDATE venta SET fecha=?, motivoId=?, cliente_codigo=?, animal_codigo=?, active=? WHERE codigo = ${idElement}`;
                values = [model.fecha, model.motivoId, model.cliente_codigo, model.animal_codigo, model.active];
                break;
            case Tables.Muertes:
                tableName = 'muerte';
                code = await this.getNextCode(Tables.Muertes);
                sqlText = `UPDATE muerte SET fecha=?, motivoId=?, animal_codigo=?,active=? WHERE codigo = ${idElement}`;
                values = [model.fecha, model.motivoId, model.animal_codigo, model.active];
                break;
            case Tables.Enfermedades:
                tableName = 'registro_enfermedad';
                code = await this.getNextCode(Tables.Enfermedades);
                sqlText = `UPDATE registro_enfermedad SET fecha=?, active=?, enfermedad_codigo=?, animal_codigo=? WHERE codigo = ${idElement}`;
                values = [model.fecha, model.active, model.enfermedadId, model.animal_codigo];
                break;
            case Tables.Mediciones_Fisicas:
                tableName = 'estado_fisico';
                code = await this.getNextCode(Tables.Mediciones_Fisicas);
                sqlText = `UPDATE estado_fisico SET fecha=?, active=?, condicion_corporal_codigo=?,locomocion_codigo=?, animal_codigo=? WHERE codigo = ${idElement}`;
                values = [code, model.fecha, model.active, model.condicionId, model.locomocionId, model.animal_codigo];
                break;
            case Tables.Produccion:
                tableName = 'produccion';
                code = await this.getNextCode(Tables.Produccion);
                sqlText = `UPDATE produccion SET fecha=?, peso=?, animal_codigo=?, active=? WHERE codigo = ${idElement}`;
                values = [model.fecha, model.peso, model.animal_codigo, model.active];
                break;
            case Tables.Ingreso_Finca:
                tableName = 'ingreso';
                code = await this.getNextCode(Tables.Ingreso_Finca);
                sqlText = `UPDATE ingreso SET fecha=?, animal_codigo=?,fincaId=?, loteId=?, active=? WHERE codigo = ${idElement}`;
                values = [model.fecha, model.animal_codigo, model.fincaId, model.loteId, model.active];
                break;
            case Tables.Parto:
                tableName = 'parto';
                code = await this.getNextCode(Tables.Parto);
                sqlText = `UPDATE parto SET fecha=?, sexo=?, animal_nacido_codigo=? ,madre_codigo=?, raza_codigo=?, active=? WHERE codigo = ${idElement}`;
                values = [model.fecha, model.sexo, model.codigoCria, model.codigoMadre, model.razaId, model.active];
                break;
            case Tables.Servicios:
                tableName = 'servicio';
                code = await this.getNextCode(Tables.Servicios);
                sqlText = `UPDATE servicio SET fecha=?, animal_inseminador_codigo=?, tipoId=?, animal_inseminado_codigo=? ,semen_codigo=?, persona_inseminador_codigo=?, active=? WHERE codigo = ${idElement}`;
                values = [model.fecha, model.animal_inseminador, model.servicioId, model.animal_inseminado, model.codigo_semen, model.inseminador_codigo, model.active];
                break;
            case Tables.Lactancia:
                tableName = 'lactancia';
                code = await this.getNextCode(Tables.Lactancia);
                sqlText = `UPDATE lactancia SET fecha=?, leche=?, concentrado=?, peso=? ,animal_codigo=?, active=? WHERE codigo = ${idElement}`;
                values = [model.fecha, model.leche, model.concentrado, model.peso, model.animal_codigo, model.active];
                break;

            case Tables.Rol_Botones:
                tableName = 'rol_botones';
                code = await this.getNextCode(Tables.Rol_Botones);
                sqlText = `UPDATE rol_botones SET id_rol=?,btn_eventos=?, btn_historico=?, btn_inventario=?, btn_controldefinca=? ,btn_salud=?, btn_produccion=?,btn_terneras=?,btn_reproduccion=?,btn_ingresoafinca=?,btn_configuracion=?,btn_sincronizacion=?,btn_IngresoAFincas=?,btn_Ventas=?,btn_Muertes=?,btn_Enfermedades=?,btn_MedicionesFisicas=?,btn_MedicionesFisicas=?,btn_Lactancia=?,btn_Partos=?,btn_Servicios=?,btn_Celo=?,btn_Palpacion=?,active=? WHERE codigo = ${idElement}`;
                values = [model.id_rol, model.btn_eventos, model.btn_historico, model.btn_inventario, model.btn_controldefinca, model.btn_salud, model.btn_produccion, model.btn_terneras, model.btn_reproduccion, model.btn_ingresoafinca, model.btn_configuracion, model.btn_sincronizacion, model.btn_IngresoAFincas, model.btn_Ventas, model.btn_Muertes, model.btn_Enfermedades, model.btn_MedicionesFisicas, model.btn_MedicionesFisicas, model.btn_Lactancia, model.btn_Partos, model.btn_Servicios, model.btn_Celo, model.btn_Palpacion, model.active];
                break;

            case Tables.Eventos:
                tableName = 'eventos';
                code = await this.getNextCode(Tables.Eventos);
                sqlText = `UPDATE eventos SET fecha = '${model.fecha}', animal_codigo = '${model.animal_codigo}', tipo_evento = '${model.tipo_evento}', active = '${model.active}', completar = 'close' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Usuario:
                tableName = 'usuario';
                code = await this.getNextCode(Tables.Usuario);
                sqlText = `UPDATE usuario SET usuario=?, clave=?, rolId=?,negocio_id=?,idFinca=?,active=? WHERE codigo = ${idElement}`;
                values = [model.usuario, model.clave, model.rolId, model.negocioId, model.idFinca, model.active];
                break;

            case Tables.Animal:
                tableName = 'animal';
                code = await this.getNextCode(Tables.Animal);
                sqlText = `UPDATE animal SET animal_codigo = '${model.animal_codigo}', fecha = '${model.fecha}', sexo = '${model.sexo}', lote_nacimientoId = '${model.lote_nacimientoId}', lote_actual_Id = '${model.lote_actual_Id}', razaId = '${model.razaId}', madreId = '${model.madreId}', padreId = '${model.padreId}', idTemporal = '${model.idTemporal}', idInventario = '${model.idInventario}',active='${model.active}', temp='${1}', ultimo_estado='${model.ultimo_estado}' WHERE codigo = ${idElement}`;
                values = [];
                break;

            case Tables.Database_Conexion:
                tableName = 'database_conexion';
                code = await this.getNextCode(Tables.Database_Conexion);
                sqlText = `UPDATE database_conexion SET url=?, usuario=?, contraseña=?,puerto=?,active=? WHERE codigo = ${idElement}`;
                values = [model.url, model.usuario, model.contraseña, model.puerto, model.active];
                break;

            case Tables.Rol:
                tableName = 'rol';
                code = await this.getNextCode(Tables.Rol);
                sqlText = `UPDATE rol SET nombre=?,active=? WHERE codigo = ${idElement}`;
                values = [model.nombre, model.active];
                break;

            case Tables.Validaciones:
                tableName = 'validaciones';
                code = await this.getNextCode(Tables.Validaciones);
                sqlText = `UPDATE rol SET id_negocio=?,nombre=?,min=?,max=?,active=? WHERE codigo = ${idElement}`;
                values = [model.id_negocio, model.nombre, model.min, model.max, model.active];
                break;

            case Tables.Sincronizacion:
                tableName = 'sincronizacion';
                code = await this.getNextCode(Tables.Sincronizacion);
                sqlText = `UPDATE rol SET nombre=?,codigo_remoto=?,codigo_actual=?,fecha=?,id_usuario=?,negocio_id=?,data=?,accion=?,active=? WHERE codigo = ${idElement}`;
                values = [model.nombre, model.codigo_remoto, code, model.fecha, model.id_usuario, this.idNegocio, model.data, model.accion, model.active];
                break;

            case Tables.Celos:
                tableName = 'celos';
                code = await this.getNextCode(Tables.Celos);
                sqlText = `UPDATE celos SET animal_codigo=?,celos=?,fecha=?,negocio_id=?,active=? WHERE codigo = ${idElement}`;
                values = [model.animal_codigo, model.celos, model.fecha, model.negocio_id, model.active];
                break;

            case Tables.Palpacion:
                tableName = 'palpacion';
                code = await this.getNextCode(Tables.Palpacion);
                sqlText = `UPDATE palpacion SET animal_codigo=?,celos=?,fecha=?,negocio_id=?,active=? WHERE codigo = ${idElement}`;
                values = [model.animal_codigo, model.celos, model.fecha, model.negocio_id, model.active];
                break;

            case Tables.Leche:
                tableName = 'leche';
                code = await this.getNextCode(Tables.Leche);
                sqlText = `UPDATE leche SET animal_codigo=?,celos=?,fecha=?,negocio_id=?,active=? WHERE codigo = ${idElement}`;
                values = [model.animal_codigo, model.celos, model.fecha, model.negocio_id, model.active];
                break;


            case Tables.Tratamiento:
                tableName = 'tratamiento';
                code = await this.getNextCode(Tables.Tratamiento);
                sqlText = `UPDATE tratamiento SET animal_codigo=?,fecha=?,nota=?,negocio_id=?,active=? WHERE codigo = ${idElement}`;
                values = [model.animal_codigo, model.fecha, model.nota, model.negocio_id, model.active];
                break;
            case Tables.Rango:
                tableName = 'rango';
                code = await this.getNextCode(Tables.Rango);
                sqlText = `UPDATE rango SET id_tipo_evento=?,max=?,min=?,active=? WHERE codigo = ${idElement}`;
                values = [model.id_tipo_evento, model.max, model.min, model.active];
                break;

            case Tables.Inventario:
                tableName = 'inventario';
                code = await this.getNextCode(Tables.Inventario);
                sqlText = `UPDATE inventario SET animal_codigo= '${model.animal_codigo}', raza = '${model.raza}', sexo = '${model.sexo}', semen = '${model.semen}', finca_id = '${model.finca}', lote_id = '${model.lote}', fecha = '${model.fecha}', active = '${model.active}' WHERE codigo = ${idElement}`;
                values = [];
                break;
            case Tables.Tipo_Evento:
                tableName = 'tipo_evento';
                code = await this.getNextCode(Tables.Tipo_Evento);
                sqlText = `UPDATE tipo_evento SET codigo=?,nombre=?,active=?`;
                values = [code, model.nombre, model.active];
                break;
            case Tables.Estado:
                tableName = 'estado';
                code = await this.getNextCode(Tables.Estado);
                sqlText = `UPDATE estado SET codigo=?,nombre=?,active=?`;
                values = [code, model.nombre, model.active];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                alert('Error update en tabla ' + tableName + 'error: ' + JSON.stringify(e));
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }


    async desactiveAnimal(table, idElement?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Animal:
                tableName = 'animal';
                code = await this.getNextCode(Tables.Animal);
                sqlText = `UPDATE animal SET active='${false}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                // alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async estadoAnimal(table, idElement?, estado?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Animal:
                tableName = 'animal';
                code = await this.getNextCode(Tables.Animal);
                sqlText = `UPDATE animal SET ultimo_estado='${estado}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Animal:
                tableName = 'animal';
                sqlText = `UPDATE animal SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate1(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Ventas:
                tableName = 'venta';
                sqlText = `UPDATE venta SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate2(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Muertes:
                tableName = 'muerte';
                sqlText = `UPDATE muerte SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate3(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Enfermedades:
                tableName = 'registro_enfermedad';
                sqlText = `UPDATE registro_enfermedad SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }


    async animal_codigoUpdate4(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Mediciones_Fisicas:
                tableName = 'estado_fisico';
                sqlText = `UPDATE estado_fisico SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }


    async animal_codigoUpdate5(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Produccion:
                tableName = 'produccion';
                sqlText = `UPDATE produccion SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate6(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Ingreso_Finca:
                tableName = 'ingreso';
                sqlText = `UPDATE ingreso SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate7(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Parto:
                tableName = 'parto';
                sqlText = `UPDATE parto SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate8(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Servicios:
                tableName = 'servicio';
                sqlText = `UPDATE servicio SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate9(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Lactancia:
                tableName = 'lactancia';
                sqlText = `UPDATE lactancia SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate10(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Eventos:
                tableName = 'eventos';
                sqlText = `UPDATE eventos SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate11(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Celos:
                tableName = 'celos';
                sqlText = `UPDATE celos SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate12(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Palpacion:
                tableName = 'palpacion';
                sqlText = `UPDATE palpacion SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async animal_codigoUpdate13(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Leche:
                tableName = 'leche';
                sqlText = `UPDATE leche SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }


    async animal_codigoUpdate14(table, idElement?, animal_codigo?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Tratamiento:
                tableName = 'tratamiento';
                sqlText = `UPDATE tratamiento SET animal_codigo='${animal_codigo}' WHERE animal_codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }


    async favoriteLote(table, idElement?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Lote:
                tableName = 'lote';
                // code = await this.getNextCode(Tables.Lote);
                sqlText = 'UPDATE lote SET favorite = ? WHERE idLote = ?';
                values = ['star', idElement];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }


    async insertLote_Parto(table, idElement?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Lote_Parto:
                tableName = 'lote_parto';
                code = await this.getNextCode(Tables.Lote_Parto);
                sqlText = 'INSERT INTO lote_parto  VALUES (?,?,?)';
                values = [code, idElement, true];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                // alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }


    async insertLoad(table) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Load:
                tableName = 'load';
                code = await this.getNextCode(Tables.Load);
                sqlText = 'INSERT INTO load  VALUES (?,?,?)';
                values = [code, 1, 1];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                alert('Row Update in table ' + tableName);
            })
            .catch(e => {
                // alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async completarEvento(table, idElement?) {
        let sqlText;
        let tableName;
        let values;
        let code;
        switch (table) {

            case Tables.Eventos:
                tableName = 'eventos';
                code = await this.getNextCode(Tables.Eventos);
                sqlText = `UPDATE eventos SET completar = 'checkmark' WHERE codigo = ${idElement}`;
                values = [];
                break;

        }
        await this.databaseObj.executeSql(sqlText, values)
            .then(() => {
                //     alert('Row Update in table ' +tableName);
            })
            .catch(e => {
                //  alert("Error update en tabla " + tableName + 'error: ' + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }


    async getAnimalCodigo(table, idElement) {
        let sqlText;
        switch (table) {
            case Tables.Animal:
                sqlText = `SELECT * FROM animal WHERE animal_codigo >=  ${idElement} OR animal_codigo <=  ${idElement}`;
                break;
        }
        await this.databaseObj.executeSql(sqlText, [])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i).animal_codigo);
                    }
                }
                //  alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                // alert("error " + JSON.stringify(e))
                alert('No se encontro una busqueda');
            });
        return this.row_data;
    }

    async getCriaCodigo(table, idElement) {
        let sqlText;
        switch (table) {
            case Tables.Animal:
                sqlText = `SELECT * FROM animal WHERE animal_codigo = ${idElement}`;
                break;
        }
        await this.databaseObj.executeSql(sqlText, [])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i));
                    }
                }
                //  alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                // alert("error " + JSON.stringify(e))
                alert('No se encontro una busqueda');
            });
        return this.row_data;
    }

    async getRango(table, idElement) {
        let sqlText;
        switch (table) {
            case Tables.Animal:
                sqlText = `SELECT * FROM rango WHERE max <= ${idElement}`;
                break;
        }
        await this.databaseObj.executeSql(sqlText, [])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i).id_tipo_evento);
                    }
                }
                //  alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                // alert("error " + JSON.stringify(e))
                alert('No se encontro una busqueda');
            });
        return this.row_data;
    }

    async searchAnimal(table, idElement) {
        let sqlText;
        switch (table) {
            case Tables.Animal:
                sqlText = `SELECT * FROM animal WHERE animal_codigo = ${idElement}`;
                break;
        }
        await this.databaseObj.executeSql(sqlText, [])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i));
                    }
                }
                //  alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                // alert("error " + JSON.stringify(e))
                alert('No se encontro una busqueda');
            });
        return this.row_data;
    }


    async getDataFromTable(table) {
        let sqlText;
        switch (table) {
            case Tables.Negocio:
                sqlText = 'SELECT * FROM negocio WHERE active = ?';
                break;
            case Tables.Finca:
                sqlText = 'SELECT * FROM finca WHERE active = ?';
                break;
            case Tables.Lote:
                sqlText = 'SELECT * FROM lote WHERE active = ?';
                break;
            case Tables.Clientes:
                sqlText = 'SELECT * FROM cliente WHERE active = ?';
                break;
            case Tables.Motivo_Venta:
                sqlText = 'SELECT * FROM motivo_venta WHERE active = ?';
                break;
            case Tables.Motivo_Muerte:
                sqlText = 'SELECT * FROM motivo_muerte WHERE active = ?';
                break;
            case Tables.Tipo_Servicios:
                sqlText = 'SELECT * FROM tipo_servicio WHERE active = ?';
                break;
            case Tables.Inseminadores:
                sqlText = 'SELECT * FROM inseminador WHERE active = ?';
                break;
            case Tables.Raza:
                sqlText = 'SELECT * FROM raza WHERE active = ?';
                break;
            case Tables.Enfermedad:
                sqlText = 'SELECT * FROM enfermedad WHERE active = ?';
                break;
            case Tables.Condicion_Corporal:
                sqlText = 'SELECT * FROM condicion_corporal WHERE active = ?';
                break;
            case Tables.Locomocion:
                sqlText = 'SELECT * FROM locomocion WHERE active = ?';
                break;
            case Tables.Ventas:
                sqlText = 'SELECT * FROM venta WHERE active = ?';
                break;
            case Tables.Muertes:
                sqlText = 'SELECT * FROM muerte';
                break;
            case Tables.Enfermedades:
                sqlText = 'SELECT * FROM registro_enfermedad WHERE active = ?';
                break;
            case Tables.Mediciones_Fisicas:
                sqlText = 'SELECT * FROM estado_fisico WHERE active = ?';
                break;
            case Tables.Produccion:
                sqlText = 'SELECT * FROM produccion WHERE active = ?';
                break;
            case Tables.Ingreso_Finca:
                sqlText = 'SELECT * FROM ingreso WHERE active = ?';
                break;
            case Tables.Parto:
                sqlText = 'SELECT * FROM parto WHERE active = ?';
                break;
            case Tables.Servicios:
                sqlText = 'SELECT * FROM servicio WHERE active = ?';
                break;
            case Tables.Lactancia:
                sqlText = 'SELECT * FROM lactancia WHERE active = ?';
                break;

            case Tables.Rol_Botones:
                sqlText = 'SELECT * FROM rol_botones WHERE active = ?';
                break;
            case Tables.Eventos:
                sqlText = 'SELECT * FROM eventos WHERE active = ? ORDER BY fecha ASC';
                break;

            case Tables.Animal:
                sqlText = 'SELECT * FROM animal WHERE active = ?  ORDER BY animal_codigo ASC';
                break;

            case Tables.Usuario:
                sqlText = 'SELECT * FROM usuario WHERE active = ?';
                break;

            case Tables.Database_Conexion:
                sqlText = 'SELECT * FROM database_conexion WHERE active = ?';
                break;

            case Tables.Rol:
                sqlText = 'SELECT * FROM rol WHERE active = ?';
                break;

            case Tables.Validaciones:
                sqlText = 'SELECT * FROM validaciones WHERE active = ?';
                break;

            case Tables.Sincronizacion:
                sqlText = 'SELECT * FROM sincronizacion WHERE active = ?';
                break;

            case Tables.Celos:
                sqlText = 'SELECT * FROM celos WHERE active = ?';
                break;

            case Tables.Palpacion:
                sqlText = 'SELECT * FROM palpacion WHERE active = ?';
                break;

            case Tables.Tratamiento:
                sqlText = 'SELECT * FROM tratamiento WHERE active = ?';
                break;

            case Tables.Leche:
                sqlText = 'SELECT * FROM leche WHERE active = ?';
                break;

            case Tables.Rango:
                sqlText = 'SELECT * FROM rango WHERE active = ?';
                break;

            case Tables.Inventario:
                sqlText = 'SELECT * FROM inventario WHERE active = ?';
                break;
            case Tables.Tipo_Evento:
                sqlText = 'SELECT * FROM tipo_evento WHERE active = ?';
                break;

            case Tables.Dia_Evento:
                sqlText = 'SELECT * FROM dia_evento WHERE active = ?';
                break;

            case Tables.Historico:
                sqlText = 'SELECT * FROM historico WHERE active = ?';
                break;

            case Tables.Bitacora:
                sqlText = 'SELECT * FROM bitacora WHERE active = ?';
                break;
        }
        await this.databaseObj.executeSql(sqlText, [true])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i));
                    }
                }
            })
            .catch(e => {
                // alert("error" + JSON.stringify(e))
            });
        return this.row_data;
    }

    async getDataFromHistorico(table) {
        let sqlText;
        switch (table) {
            case Tables.Historico:
                sqlText = `SELECT * FROM historico WHERE active = ${true} OR active = ${0}`;
                break;
        }
        await this.databaseObj.executeSql(sqlText, [])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i));
                    }
                }
                //  alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                //  alert("error" + JSON.stringify(e))
            });
        return this.row_data;
    }


    async getDataFromTablebyCodigo(table, idElement) {
        let sqlText;
        switch (table) {
            case Tables.Negocio:
                sqlText = 'SELECT * FROM negocio WHERE idNegocio = ?';
                break;
            case Tables.Finca:
                sqlText = 'SELECT * FROM finca WHERE idfinca = ?';
                break;
            case Tables.Lote:
                sqlText = 'SELECT * FROM lote WHERE idLote = ?';
                break;
            case Tables.Clientes:
                sqlText = 'SELECT * FROM cliente WHERE codigo = ?';
                break;
            case Tables.Motivo_Venta:
                sqlText = 'SELECT * FROM motivo_venta WHERE idmotivo_venta = ?';
                break;
            case Tables.Motivo_Muerte:
                sqlText = 'SELECT * FROM motivo_muerte WHERE idmotivo_muerte = ?';
                break;
            case Tables.Tipo_Servicios:
                sqlText = 'SELECT * FROM tipo_servicio WHERE idtipo_servicio = ?';
                break;
            case Tables.Inseminadores:
                sqlText = 'SELECT * FROM inseminador WHERE codigo = ?';
                break;
            case Tables.Raza:
                sqlText = 'SELECT * FROM raza WHERE codigo = ?';
                break;
            case Tables.Enfermedad:
                sqlText = 'SELECT * FROM enfermedad WHERE codigo = ?';
                break;
            case Tables.Condicion_Corporal:
                sqlText = 'SELECT * FROM condicion_corporal WHERE codigo = ?';
                break;
            case Tables.Locomocion:
                sqlText = 'SELECT * FROM locomocion WHERE codigo = ?';
                break;
            case Tables.Ventas:
                sqlText = 'SELECT * FROM venta WHERE codigo = ?';
                break;
            case Tables.Muertes:
                sqlText = 'SELECT * FROM muerte';
                break;
            case Tables.Enfermedades:
                sqlText = 'SELECT * FROM registro_enfermedad WHERE codigo = ?';
                break;
            case Tables.Mediciones_Fisicas:
                sqlText = 'SELECT * FROM estado_fisico WHERE codigo = ?';
                break;
            case Tables.Produccion:
                sqlText = 'SELECT * FROM produccion WHERE codigo = ?';
                break;
            case Tables.Ingreso_Finca:
                sqlText = 'SELECT * FROM ingreso WHERE codigo = ?';
                break;
            case Tables.Parto:
                sqlText = 'SELECT * FROM parto WHERE codigo = ?';
                break;
            case Tables.Servicios:
                sqlText = 'SELECT * FROM servicio WHERE codigo = ?';
                break;
            case Tables.Lactancia:
                sqlText = 'SELECT * FROM lactancia WHERE codigo = ?';
                break;

            case Tables.Rol_Botones:
                sqlText = 'SELECT * FROM rol_botones WHERE codigo = ?';
                break;
            case Tables.Eventos:
                sqlText = 'SELECT * FROM eventos WHERE codigo = ?';
                break;

            case Tables.Animal:
                sqlText = 'SELECT * FROM animal WHERE codigo = ?';
                break;

            case Tables.Usuario:
                sqlText = 'SELECT * FROM usuario WHERE codigo = ?';
                break;

            case Tables.Database_Conexion:
                sqlText = 'SELECT * FROM database_conexion WHERE codigo = ?';
                break;

            case Tables.Rol:
                sqlText = 'SELECT * FROM rol WHERE codigo = ?';
                break;

            case Tables.Validaciones:
                sqlText = 'SELECT * FROM validaciones WHERE codigo = ?';
                break;

            case Tables.Sincronizacion:
                sqlText = 'SELECT * FROM sincronizacion WHERE codigo = ?';
                break;

            case Tables.Celos:
                sqlText = 'SELECT * FROM celos WHERE codigo = ?';
                break;

            case Tables.Palpacion:
                sqlText = 'SELECT * FROM palpacion WHERE codigo = ?';
                break;

            case Tables.Tratamiento:
                sqlText = 'SELECT * FROM tratamiento WHERE codigo = ?';
                break;

            case Tables.Leche:
                sqlText = 'SELECT * FROM leche WHERE codigo = ?';
                break;

            case Tables.Rango:
                sqlText = 'SELECT * FROM rango WHERE codigo = ?';
                break;

            case Tables.Inventario:
                sqlText = 'SELECT * FROM inventario WHERE codigo = ?';
                break;
            case Tables.Tipo_Evento:
                sqlText = 'SELECT * FROM tipo_evento WHERE codigo = ?';
                break;
        }
        await this.databaseObj.executeSql(sqlText, [idElement])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i));
                    }
                }
                //  alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                //  alert("error " + JSON.stringify(e))
            });
        return this.row_data;
    }

    async deleteFromTable(table, idElement) {
        let sqlText;
        let tableName;
        let values;
        switch (table) {
            case Tables.Negocio:
                tableName = 'negocio';
                sqlText = 'UPDATE negocio SET active = ? WHERE idNegocio = ?';
                values = [false, idElement];
                break;
            case Tables.Finca:
                tableName = 'finca';
                sqlText = 'UPDATE finca SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Lote:
                tableName = 'lote';
                sqlText = 'UPDATE lote SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Clientes:
                tableName = 'cliente';
                sqlText = 'UPDATE cliente SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Motivo_Venta:
                tableName = 'motivo_venta';
                sqlText = 'UPDATE motivo_venta SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Motivo_Muerte:
                tableName = 'motivo_muerte';
                sqlText = 'UPDATE motivo_muerte SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Tipo_Servicios:
                tableName = 'tipo_servicio';
                sqlText = 'UPDATE tipo_servicio SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Inseminadores:
                tableName = 'inseminador';
                sqlText = 'UPDATE inseminador SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Raza:
                tableName = 'raza';
                sqlText = 'UPDATE raza SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Enfermedad:
                tableName = 'enfermedad';
                sqlText = 'UPDATE enfermedad SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Condicion_Corporal:
                tableName = 'condicion_corporal';
                sqlText = 'UPDATE condicion_corporal SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Locomocion:
                tableName = 'locomocion';
                sqlText = 'UPDATE locomocion SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Ventas:
                tableName = 'venta';
                sqlText = 'UPDATE venta SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Enfermedades:
                tableName = 'registro_enfermedad';
                sqlText = 'UPDATE registro_enfermedad SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Mediciones_Fisicas:
                tableName = 'estado_fisico';
                sqlText = 'UPDATE estado_fisico SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Produccion:
                tableName = 'produccion';
                sqlText = 'UPDATE produccion SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Ingreso_Finca:
                tableName = 'ingreso';
                sqlText = 'UPDATE ingreso SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Parto:
                tableName = 'parto';
                sqlText = 'UPDATE parto SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Servicios:
                tableName = 'servicio';
                sqlText = 'UPDATE servicio SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Lactancia:
                tableName = 'lactancia';
                sqlText = 'UPDATE lactancia SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Rol_Botones:
                tableName = 'rol_botones';
                sqlText = 'UPDATE rol_botones SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
            case Tables.Eventos:
                tableName = 'eventos';
                sqlText = 'UPDATE eventos SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Usuario:
                tableName = 'usuario';
                sqlText = 'UPDATE usuario SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Animal:
                tableName = 'animal';
                sqlText = 'UPDATE animal SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Database_Conexion:
                tableName = 'database_conexion';
                sqlText = 'UPDATE database_conexion SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Rol:
                tableName = 'rol';
                sqlText = 'UPDATE rol SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Validaciones:
                tableName = 'validaciones';
                sqlText = 'UPDATE rol SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Celos:
                tableName = 'celos';
                sqlText = 'UPDATE celos SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Palpacion:
                tableName = 'palpacion';
                sqlText = 'UPDATE palpacion SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Tratamiento:
                tableName = 'tratamiento';
                sqlText = 'UPDATE tratamiento SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Leche:
                tableName = 'leche';
                sqlText = 'UPDATE leche SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Rango:
                tableName = 'rango';
                sqlText = 'UPDATE rango SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Inventario:
                tableName = 'inventario';
                sqlText = 'UPDATE inventario SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;

            case Tables.Estado:
                tableName = 'estado';
                sqlText = 'UPDATE estado SET active = ? WHERE codigo = ?';
                values = [false, idElement];
                break;
        }
        await this.databaseObj.executeSql(sqlText, values)
            .then((res) => {

            })
            .catch(e => {
                //  alert("error " + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
    }

    async getNegocioId() {
        const sqlText = 'select n.idNegocio from negocio n';
        let negocioID;
        await this.databaseObj.executeSql(sqlText, [])
            .then((res) => {
                negocioID = res.rows.item(0).idNegocio;
            })
            .catch(e => {
                //   alert("error " + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });

        return negocioID;
    }

    async getNextCode(table) {
        let sqlText;
        let code;
        switch (table) {
            case Tables.Negocio:
                sqlText = 'SELECT MAX(codigo) AS code FROM negocio';
                break;
            case Tables.Finca:
                sqlText = 'SELECT MAX(codigo) AS code FROM finca';
                break;
            case Tables.Lote:
                sqlText = 'SELECT MAX(codigo) AS code FROM lote';
                break;
            case Tables.Clientes:
                sqlText = 'SELECT MAX(codigo) AS code FROM cliente';
                break;
            case Tables.Motivo_Venta:
                sqlText = 'SELECT MAX(codigo) AS code FROM motivo_venta';
                break;
            case Tables.Motivo_Muerte:
                sqlText = 'SELECT MAX(codigo) AS code FROM motivo_muerte';
                break;
            case Tables.Inseminadores:
                sqlText = 'SELECT MAX(codigo) AS code FROM inseminador';
                break;
            case Tables.Raza:
                sqlText = 'SELECT MAX(codigo) AS code FROM raza';
                break;
            case Tables.Load:
                sqlText = 'SELECT MAX(codigo) AS code FROM load';
                break;
            case Tables.Enfermedad:
                sqlText = 'SELECT MAX(codigo) AS code FROM enfermedad';
                break;
            case Tables.Condicion_Corporal:
                sqlText = 'SELECT MAX(codigo) AS code FROM condicion_corporal';
                break;
            case Tables.Locomocion:
                sqlText = 'SELECT MAX(codigo) AS code FROM locomocion';
                break;
            case Tables.Ventas:
                sqlText = 'SELECT MAX(codigo) AS code FROM venta';
                break;
            case Tables.Muertes:
                sqlText = 'SELECT MAX(codigo) AS code FROM muerte';
                break;
            case Tables.Enfermedades:
                sqlText = 'SELECT MAX(codigo) AS code FROM registro_enfermedad';
                break;
            case Tables.Mediciones_Fisicas:
                sqlText = 'SELECT MAX(codigo) AS code FROM estado_fisico';
                break;
            case Tables.Produccion:
                sqlText = 'SELECT MAX(codigo) AS code FROM produccion';
                break;
            case Tables.Ingreso_Finca:
                sqlText = 'SELECT MAX(codigo) AS code FROM ingreso';
                break;
            case Tables.Parto:
                sqlText = 'SELECT MAX(codigo) AS code FROM parto';
                break;
            case Tables.Servicios:
                sqlText = 'SELECT MAX(codigo) AS code FROM servicio';
                break;
            case Tables.Lactancia:
                sqlText = 'SELECT MAX(codigo) AS code FROM lactancia';
                break;

            case Tables.Rol_Botones:
                sqlText = 'SELECT MAX(codigo) AS code FROM rol_botones';
                break;
            case Tables.Eventos:
                sqlText = 'SELECT MAX(codigo) AS code FROM eventos';
                break;

            case Tables.Usuario:
                sqlText = 'SELECT MAX(codigo) AS code FROM usuario';
                break;

            case Tables.Animal:
                sqlText = 'SELECT MAX(codigo) AS code FROM animal';
                break;

            case Tables.Rol:
                sqlText = 'SELECT MAX(codigo) AS code FROM rol';
                break;

            case Tables.Validaciones:
                sqlText = 'SELECT MAX(codigo) AS code FROM validaciones';
                break;

            case Tables.Sincronizacion:
                sqlText = 'SELECT MAX(codigo) AS code FROM sincronizacion';
                break;

            case Tables.Celos:
                sqlText = 'SELECT MAX(codigo) AS code FROM celos';
                break;

            case Tables.Palpacion:
                sqlText = 'SELECT MAX(codigo) AS code FROM palpacion';
                break;

            case Tables.Tratamiento:
                sqlText = 'SELECT MAX(codigo) AS code FROM tratamiento';
                break;

            case Tables.Leche:
                sqlText = 'SELECT MAX(codigo) AS code FROM leche';
                break;

            case Tables.Rango:
                sqlText = 'SELECT MAX(codigo) AS code FROM rango';
                break;

            case Tables.Inventario:
                sqlText = 'SELECT MAX(codigo) AS code FROM inventario';
                break;

            case Tables.Tipo_Evento:
                sqlText = 'SELECT MAX(codigo) AS code FROM tipo_evento';
                break;
            case Tables.Dia_Evento:
                sqlText = 'SELECT MAX(codigo) AS code FROM dia_evento';
                break;

            case Tables.Lote_Parto:
                sqlText = 'SELECT MAX(codigo) AS code FROM lote_parto';
                break;
            case Tables.Estado:
                sqlText = 'SELECT MAX(codigo) AS code FROM estado';
                break;

            case Tables.Historico:
                sqlText = 'SELECT MAX(codigo) AS code FROM historico';
                break;
            case Tables.Tipo_Servicios:
                sqlText = 'SELECT MAX(codigo) AS code FROM tipo_servicio';
                break;
        }
        await this.databaseObj.executeSql(sqlText, [])
            .then((res) => {
                code = res.rows.item(0).code == null ? 1 : res.rows.item(0).code + 1;
            })
            .catch(e => {
                //  alert("error " + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
        return code;
    }

    async getLotesByFinca(idFinca) {
        const sqlText = 'SELECT * FROM lote WHERE fincaId = ?';
        await this.databaseObj.executeSql(sqlText, [idFinca])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i));
                    }
                    alert('data' + JSON.stringify(this.row_data));
                }
                alert('error ' + JSON.stringify(this.row_data));
            })
            .catch(e => {
                // alert("error " + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
        return this.row_data;
    }

    async getElementByAttrTable(attr, value, tableName) {
        const sqlText = 'SELECT * FROM ' + tableName + ' WHERE ' + attr + ' = ?';
        //  alert('sql '+sqlText);
        let obj = null;
        await this.databaseObj.executeSql(sqlText, [value])
            .then((res) => {
                if (res.rows.length > 0) {
                    obj = res.rows.item(0);
                }
            })
            .catch(e => {
                //   alert("error " + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
        return obj;
    }


    async getElementById(table, idElement) {
        let sqlText;
        switch (table) {
            case Tables.Negocio:
                sqlText = 'SELECT * FROM negocio WHERE codigo = ?';
                break;
            case Tables.Finca:
                sqlText = 'SELECT * FROM finca WHERE codigo = ?';
                break;
            case Tables.Lote:
                sqlText = 'SELECT * FROM lote WHERE codigo = ?';
                break;
            case Tables.Clientes:
                sqlText = 'SELECT * FROM cliente WHERE codigo = ?';
                break;
            case Tables.Inseminadores:
                sqlText = 'SELECT * FROM inseminador WHERE codigo = ?';
                break;
            case Tables.Raza:
                sqlText = 'SELECT * FROM raza WHERE codigo = ?';
                break;
            case Tables.Enfermedad:
                sqlText = 'SELECT * FROM enfermedad WHERE codigo = ?';
                break;
            case Tables.Condicion_Corporal:
                sqlText = 'SELECT * FROM condicion_corporal WHERE codigo = ?';
                break;
            case Tables.Locomocion:
                sqlText = 'SELECT * FROM locomocion WHERE codigo = ?';
                break;
            case Tables.Ventas:
                sqlText = 'SELECT * FROM venta WHERE codigo = ?';
                break;
            case Tables.Muertes:
                sqlText = 'SELECT * FROM muerte WHERE codigo = ?';
                break;
            case Tables.Enfermedades:
                sqlText = 'SELECT * FROM registro_enfermedad WHERE codigo = ?';
                break;
            case Tables.Mediciones_Fisicas:
                sqlText = 'SELECT * FROM estado_fisico WHERE codigo = ?';
                break;
            case Tables.Produccion:
                sqlText = 'SELECT * FROM produccion WHERE codigo = ?';
                break;
            case Tables.Ingreso_Finca:
                sqlText = 'SELECT * FROM ingreso WHERE codigo = ?';
                break;
            case Tables.Parto:
                sqlText = 'SELECT * FROM parto WHERE codigo = ?';
                break;
            case Tables.Servicios:
                sqlText = 'SELECT * FROM servicio WHERE codigo = ?';
                break;
            case Tables.Lactancia:
                sqlText = 'SELECT * FROM lactancia WHERE codigo = ?';
                break;
            case Tables.Rol_Botones:
                sqlText = 'SELECT * FROM rol_botones WHERE codigo = ?';
                break;
            case Tables.Eventos:
                sqlText = 'SELECT * FROM eventos WHERE codigo = ?';
                break;

            case Tables.Usuario:
                sqlText = 'SELECT * FROM usuario WHERE codigo = ?';
                break;

            case Tables.Animal:
                sqlText = 'SELECT * FROM animal WHERE codigo = ?';
                break;

            case Tables.Rol:
                sqlText = 'SELECT * FROM rol WHERE codigo = ?';
                break;

            case Tables.Validaciones:
                sqlText = 'SELECT * FROM validaciones WHERE codigo = ?';
                break;

            case Tables.Sincronizacion:
                sqlText = 'SELECT * FROM sincronizacion WHERE codigo = ?';
                break;

            case Tables.Celos:
                sqlText = 'SELECT * FROM celos WHERE codigo = ?';
                break;

            case Tables.Palpacion:
                sqlText = 'SELECT * FROM palpacion WHERE codigo = ?';
                break;

            case Tables.Tratamiento:
                sqlText = 'SELECT * FROM tratamiento WHERE codigo = ?';
                break;

            case Tables.Leche:
                sqlText = 'SELECT * FROM leche WHERE codigo = ?';
                break;

            case Tables.Rango:
                sqlText = 'SELECT * FROM rango WHERE codigo = ?';
                break;

            case Tables.Inventario:
                sqlText = 'SELECT * FROM inventario WHERE codigo = ?';
                break;
        }
        let obj = null;
        await this.databaseObj.executeSql(sqlText, [idElement])
            .then((res) => {
                if (res.rows.length > 0) {
                    obj = res.rows.item(0);
                }
                //   alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                //   alert("error " + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
        return obj;
    }

    async filterAnimal(model) {
        const sqlText = `SELECT * FROM animal WHERE  razaId = ? OR sexo = ? OR animal_codigo = ?`;
        await this.databaseObj.executeSql(sqlText, [model.raza, model.genero, model.number])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i));
                    }
                }
                //  alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                //  alert("error " + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
        return this.row_data;
    }


    async filterEvento(model) {
        const sqlText = 'SELECT * FROM eventos WHERE fecha = ? OR animal_codigo = ? OR tipo_evento = ?';
        await this.databaseObj.executeSql(sqlText, [model.fecha, model.animal_codigo, model.tipo_evento])
            .then((res) => {
                this.row_data = [];
                if (res.rows.length > 0) {
                    for (let i = 0; i < res.rows.length; i++) {
                        this.row_data.push(res.rows.item(i));
                    }
                }
                //  alert("error " + JSON.stringify(this.row_data))
            })
            .catch(e => {
                // alert("error " + JSON.stringify(e))
                // alert("La aplicación se detuvo,intente de nuevo.")
            });
        return this.row_data;
    }

    async getUser(usuario, clave) {
        const sqlText = 'SELECT * FROM usuario WHERE usuario = ? AND clave=?';
        let user;
        await this.databaseObj.executeSql(sqlText, [usuario, clave])
            .then((res) => {
                user = res.rows.item(0);
                // alert("error " + JSON.stringify(res.rows.item(0)))
            })
            .catch(e => {
                //   alert("error " + JSON.stringify(e))
            });
        return user;
    }
}
