/**
 * Copyright 2019 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

function main(
  projectId = 'YOUR_PROJECT_ID',
  location = 'us-central1',
  displayName = 'YOUR_DISPLAY_NAME'
) {
  // [START automl_translate_create_dataset]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // const projectId = 'YOUR_PROJECT_ID';
  // const location = 'us-central1';
  // const displayName = 'YOUR_DISPLAY_NAME';

  // Imports the Google Cloud AutoML library
  const {AutoMlClient} = require(`@google-cloud/automl`).v1;

  // Instantiates a client
  const client = new AutoMlClient();

  async function createDataset() {
    // Construct request
    const request = {
      parent: client.locationPath(projectId, location),
      dataset: {
        displayName: displayName,
        translationDatasetMetadata: {
          sourceLanguageCode: 'en',
          targetLanguageCode: 'ja',
        },
      },
    };

    // Create dataset
    const [operation] = await client.createDataset(request);

    // Wait for operation to complete.
    const [response] = await operation.promise();

    console.log(`Dataset name: ${response.name}`);
    console.log(`
      Dataset id: ${
        response.name
          .split('/')
          [response.name.split('/').length - 1].split('\n')[0]
      }`);
  }

  createDataset();
  // [END automl_translate_create_dataset]
}

main(...process.argv.slice(2));