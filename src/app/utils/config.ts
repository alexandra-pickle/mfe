import { Manifest, RemoteConfig } from '@angular-architects/module-federation';

export type CustomRemoteCongif = RemoteConfig & {
  exposedModule: string;
  displayName: string;
  routePath: string;
  ngModuleName: string;
};

export type CustomManifest = Manifest<CustomRemoteCongif>;
