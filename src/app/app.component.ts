import { getManifest } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from './route.service';
import { CustomManifest, CustomRemoteCongif } from './utils/config';
import { buildRoutes } from './utils/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  remotes: CustomRemoteCongif[] = [];

  constructor(private router: Router, private routeService: RouteService) {}

  async ngOnInit(): Promise<void> {
    const manifest = getManifest<CustomManifest>();
    const routes = buildRoutes(manifest);
    this.router.resetConfig(routes);

    this.remotes = Object.values(manifest);

    this.routeService.overloadRoutes$.subscribe((values) => {
      let newManifest = { ...getManifest<CustomManifest>() };

      Object.keys(values).forEach((key) => {
        if (newManifest[key]) {
          newManifest[key] = values[key];
        }
      });

      const newRoutes = buildRoutes(newManifest);
      this.router.resetConfig(newRoutes);

      this.remotes = Object.values(newManifest);
    });

    this.routeService.overloadRoutes$.next({
      mfe1: {
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './Module',
        ngModuleName: 'Mfe1Module',
        displayName: 'MFE1',
        routePath: 'mfe1',
        type: 'module',
        isOverride: true,
      },
    });
  }
}
