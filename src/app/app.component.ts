import { getManifest } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomManifest, CustomRemoteCongif } from './utils/config';
import { buildRoutes } from './utils/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  remotes: CustomRemoteCongif[] = [];

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    const manifest = getManifest<CustomManifest>();
    const routes = buildRoutes(manifest);
    this.router.resetConfig(routes);

    this.remotes = Object.values(manifest);
  }
}
