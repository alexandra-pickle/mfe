import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { routes } from '../app-routing.module';
import { CustomManifest } from './config';

export function buildRoutes(options: CustomManifest): Routes {
  const lazyRoutes: Routes = Object.keys(options).map((key) => {
    const entry = options[key];

    if (entry.isOverride) {
      console.log(entry);
      return {
        path: entry.routePath,
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: entry.remoteEntry,
            exposedModule: entry.exposedModule,
          }).then((m) => {
            console.log('module', m);
            return m[entry.ngModuleName];
          }),
      };
    }

    return {
      path: entry.routePath,
      loadChildren: () =>
        loadRemoteModule({
          type: 'manifest',
          remoteName: key,
          exposedModule: entry.exposedModule,
        }).then((m) => m[entry.ngModuleName]),
    };
  });

  return [...routes, ...lazyRoutes];
}
