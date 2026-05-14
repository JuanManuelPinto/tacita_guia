import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.juanmanp.tacitaguia',
  appName: 'Tacita Guía',
  version: '1.0.0',
  webDir: 'www',
  server: {
    cleartext: true,
    allowNavigation: ['http://192.168.80.106']
  }
};

export default config;
