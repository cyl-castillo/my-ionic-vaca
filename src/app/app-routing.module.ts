import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'reproduction',
    loadChildren: () => import('./reproduction/home-reproduction/home-reproduction.module').then(m => m.HomeReproductionPageModule),
  },
  {
    path: 'production',
    loadChildren: () => import('./production/home-production/home-production.module').then(m => m.HomeProductionPageModule),
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'reproduction/services',
    loadChildren: () => import('./reproduction/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'reproduction/birth',
    loadChildren: () => import('./reproduction/birth/birth.module').then( m => m.BirthPageModule)
  },
  {
    path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then( m => m.ConfigurationPageModule)
  },
  {
    path: 'production/production',
    loadChildren: () => import('./production/production.module').then( m => m.ProductionPageModule)
  },
  {
    path: 'production/leche',
    loadChildren: () => import('./production/leche/leche.module').then( m => m.LechePageModule)
  },
  {
    path: 'health',
    loadChildren: () => import('./health/home-health/home-health.module').then( m => m.HomeHealthPageModule)
  },
  {
    path: 'health/sickness',
    loadChildren: () => import('./health/sickness/sickness.module').then( m => m.SicknessPageModule)
  },
  {
    path: 'health/sickness-complete',
    loadChildren: () => import('./health/sickness-complete/sickness-complete.module').then( m => m.SicknessCompletePageModule)
  },
  {
    path: 'health/physical-measurements',
    loadChildren: () => import('./health/physical-measurements/physical-measurements.module').then( m => m.PhysicalMeasurementsPageModule)
  },
  {
    path: 'farm',
    loadChildren: () => import('./farm/farm.module').then( m => m.FarmPageModule)
  },
  {
    path: 'veal',
    loadChildren: () => import('./veal/home-veal/home-veal.module').then( m => m.HomeVealPageModule)
  },
  {
    path: 'veal/animal-historical',
    loadChildren: () => import('./veal/animal-historical/animal-historical.module').then( m => m.AnimalHistoricalPageModule)
  },
  {
    path: 'veal/feeding',
    loadChildren: () => import('./veal/feeding/feeding.module').then( m => m.FeedingPageModule)
  },
  {
    path: 'control-farm',
    loadChildren: () => import('./control-farm/home-control/home-control.module').then( m => m.HomeControlPageModule)
  },
  {
    path: 'control-farm/sales',
    loadChildren: () => import('./control-farm/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'control-farm/deaths',
    loadChildren: () => import('./control-farm/deaths/deaths.module').then( m => m.DeathsPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory-home/inventory-home.module').then( m => m.InventoryHomePageModule)
  },
  {
    path: 'inventory/add',
    loadChildren: () => import('./inventory/add/add.module').then( m => m.AddPageModule)
  },
    {
    path: 'evento-home/add',
    loadChildren: () => import('./event/add/add.module').then( m => m.AddPageModule)
  },
  {
    path: 'evento-home/edit',
    loadChildren: () => import('./event/edit/edit.module').then( m => m.EditPageModule)
  },
  /*{
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },*/
  /*{
    path: 'conexion',
    loadChildren: () => import('./conexion/conexion.module').then( m => m.ConexionPageModule)
  },*/
  /*{
    path: 'conexion-exitosa',
    loadChildren: () => import('./conexion-exitosa/conexion-exitosa.module').then( m => m.ConexionExitosaPageModule)
  },*/
  {
    path: 'sigin',
    loadChildren: () => import('./sigin/sigin.module').then( m => m.SiginPageModule)
  },
  {
    path: 'animal-historical',
    loadChildren: () => import('./animal/animal-historical/animal-historical.module').then( m => m.AnimalHistoricalPageModule)
  },
  {
    path: 'reproduction/celos',
    loadChildren: () => import('./reproduction/celos/celos.module').then( m => m.CelosPageModule)
  },
  {
    path: 'reproduction/palpacion',
    loadChildren: () => import('./reproduction/palpacion/palpacion.module').then( m => m.PalpacionPageModule)
  },
  {
    path: 'evento-home',
    loadChildren: () => import('./event/evento-home/evento-home.module').then( m => m.EventoHomePageModule)
  },
  {
    path: 'atender',
    loadChildren: () => import('./event/atender/atender.module').then( m => m.AtenderPageModule)
  },
  {
    path: 'rango',
    loadChildren: () => import('./common/rango/rango.module').then( m => m.RangoPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./inventory/edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'search-animal-codigo',
    loadChildren: () => import('./search-animal-codigo/search-animal-codigo.module').then( m => m.SearchAnimalCodigoPageModule)
  },
  {
    path: 'modal-event',
    loadChildren: () => import('./modal-event/modal-event.module').then( m => m.ModalEventPageModule)
  },
  {
    path: 'reproduction/birth-complete',
    loadChildren: () => import('./reproduction/birth-complete/birth-complete.module').then( m => m.BirthCompletePageModule)
  },
  {
    path: 'reproduction/celos-complete',
    loadChildren: () => import('./reproduction/celos-complete/celos-complete.module').then( m => m.CelosCompletePageModule)
  },
  {
    path: 'reproduction/palpacion-complete',
    loadChildren: () => import('./reproduction/palpacion-complete/palpacion-complete.module').then( m => m.PalpacionCompletePageModule)
  },
  {
    path: 'reproduction/services-complete',
    loadChildren: () => import('./reproduction/services-complete/services-complete.module').then( m => m.ServicesCompletePageModule)
  },
  {
    path: 'busignes',
    loadChildren: () => import('./busignes/busignes.module').then( m => m.BusignesPageModule)
  },
  {
    path: 'home/sincronizacion-home',
    loadChildren: () => import('./home/sincronizacion-home/sincronizacion-home.module').then( m => m.SincronizacionHomePageModule)
  },
  {
    path: 'home/sustituciones',
    loadChildren: () => import('./home/sustituciones/sustituciones.module').then( m => m.SustitucionesPageModule)
  },
  {
    path: 'modal-sustituciones',
    loadChildren: () => import('./home/modal-sustituciones/modal-sustituciones.module').then( m => m.ModalSustitucionesPageModule)
  },
  {
    path: 'inventory-home-hm',
    loadChildren: () => import('./inventory/inventory-home-hm/inventory-home-hm.module').then( m => m.InventoryHomeHmPageModule)
  },
  {
    path: 'arete',
    loadChildren: () => import('./inventory/arete/arete.module').then( m => m.AretePageModule)
  },



  




  
  


  


  



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
