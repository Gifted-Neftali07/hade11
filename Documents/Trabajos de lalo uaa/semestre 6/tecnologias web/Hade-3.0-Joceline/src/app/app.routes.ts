import { Routes } from '@angular/router';
import { ServiciosComponent } from './servicios/servicios.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { UnvehiculoComponent } from './unvehiculo/unvehiculo.component';
import { SearchComponent } from './search/search.component';
import { ContactoComponent } from './contacto/contacto.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { ReservarComponent } from './reservar/reservar.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { HomeComponent } from './home/home.component';

import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { ListadoDesClientesComponent } from './clientes/listado-des-clientes/listado-des-clientes.component';
import { MasonryGalleryComponent } from './masonry-gallery/masonry-gallery.component';
import { CreditosComponent } from './creditos/creditos.component';
import { authGuard, publicGuard } from './core/guards';
//import {SignUpComponent} from './pages/auth/sign-up/sign-up.component';
import LogInComponent from './pages/auth/log-in/log-in.component';
import {LogComponent} from './pages/auth/log/log.component';
import { SigComponent } from './pages/auth/sig/sig.component';
import { GraficasComponent } from './graficas/graficas.component';
import { PipeComponent } from './pipe/pipe.component';

export const routes: Routes = [
    {path: 'graficas',component:GraficasComponent},
    {path: 'pipe',component:PipeComponent},


    {path: 'servicios',canActivate: [authGuard], component:ServiciosComponent},
    {path: 'vehiculos',canActivate: [authGuard],component: VehiculosComponent},
    {path: 'vehiculo/:id', component: UnvehiculoComponent},
    {path : 'buscador/:nombreh', component: SearchComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'acerca',canActivate: [authGuard], component: AcercaDeComponent},
    {path: 'reserva/:id',canActivate: [authGuard], component: ReservarComponent},
    {path: 'preguntas', component: PreguntasComponent},
    {path: 'home', component: HomeComponent},
    
    {path: 'listado-clientes', component: ListadoClientesComponent},
    {path: 'listado-des-clientes', component: ListadoDesClientesComponent},
    {path: 'masonry-gallery', component: MasonryGalleryComponent},
    {path: 'creditos', component: CreditosComponent},
    {path: 'log', canActivate: [publicGuard],component:LogComponent},
    {path: 'sig',canActivate: [publicGuard],component: SigComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'},
   
    {
        path: '',
        canActivate: [authGuard],component: ReservarComponent
      // loadComponent: () => import('./pages/home/home.component')
      },
      {
        path: 'auth',
       
        children: [
        /*  {
            path: 'sig',component:SignUpComponent
           // loadComponent: () => import('./pages/auth/sign-up/sign-up.component'),
          },*/
          {
            path: 'login',component:LogInComponent
            //loadComponent: () => import('./pages/auth/log-in/log-in.component'),
          },
        ],
      },
    
];
