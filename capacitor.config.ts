import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'tacita_guia',
  webDir: 'www',
  server: {
    cleartext: true,
    allowNavigation: ['http://192.168.80.106']
  }
};

export default config;
