import { bootstrap } from './main';

// Add this interface to declare the module hot property
declare const module: any;

void bootstrap().then((app) => {
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => void app.close());
  }
});
