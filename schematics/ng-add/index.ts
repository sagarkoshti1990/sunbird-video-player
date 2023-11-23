import {Rule, SchematicContext, SchematicsException, Tree} from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';

import {getWorkspace} from '@schematics/angular/utility/workspace';

import {Schema} from './schema';
import * as messages from './messages';
import {addPackageToPackageJson} from '../utils/package-config';

const VERSIONS = {
  // automatically filled from package.json during the build
  'client-services': '^4.9.1',
  'sb-styles': '0.0.7',
  '@types/video.js': '7.3.45',
  'jquery': '^3.6.0',
  'lodash-es': '^4.17.21',
  'ngx-bootstrap': '^6.2.0',
  'video.js': '^7.18.1',
  'sunbird-quml-player-v9': '^4.9.7',
  'videojs-http-source-selector': '>= 1.1.6',
  'videojs-contrib-quality-levels': '>= 2.1.0',
  "reflect-metadata": "^0.1.13"
};

/**
 * This is executed when `ng add @project-sunbird/sunbird-video-player-v9` is run.
 * It installs all dependencies in the 'package.json' and runs 'ng-add-setup-project' schematic.
 */
export default function ngAdd(options: Schema): Rule {
  return async (tree: Tree, context: SchematicContext) => {

    // Checking that project exists
    const {project} = options;
    if (project) {
      const workspace = await getWorkspace(tree);
      const projectWorkspace = workspace.projects.get(project);

      if (!projectWorkspace) {
        throw new SchematicsException(messages.noProject(project));
      }
    }

    // Installing dependencies
    addPackageToPackageJson(tree, '@project-sunbird/client-services', VERSIONS['client-services']);
    addPackageToPackageJson(tree, '@project-sunbird/sb-styles', VERSIONS['sb-styles']);
    addPackageToPackageJson(tree, '@types/video.js', VERSIONS['@types/video.js']);
    addPackageToPackageJson(tree, 'jquery', VERSIONS['jquery']);
    addPackageToPackageJson(tree, 'lodash-es', VERSIONS['lodash-es']);
    addPackageToPackageJson(tree, 'ngx-bootstrap', VERSIONS['ngx-bootstrap']);
    addPackageToPackageJson(tree, 'video.js', VERSIONS['video.js']);
    addPackageToPackageJson(tree, '@project-sunbird/sunbird-quml-player-v9', VERSIONS['sunbird-quml-player-v9']);
    addPackageToPackageJson(tree, 'videojs-http-source-selector', VERSIONS['videojs-http-source-selector']);
    addPackageToPackageJson(tree, 'videojs-contrib-quality-levels', VERSIONS['videojs-contrib-quality-levels']);
    context.logger.info('Installing dependencies...');
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [
      context.addTask(new NodePackageInstallTask()),
    ]);
  };
}
