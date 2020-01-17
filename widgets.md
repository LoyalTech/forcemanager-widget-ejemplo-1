## Full Widget creation process

### 1) Create new widget

- Go to [ForceManager Setup Widgets](https://setup.forcemanager.net/#/app/widgets) and 'Create Widget'.
- Set the Title and select if you want to host the widget in the default ForceManager Server or you want to put the URL or your own Server.

### 2) Install ForceManager CLI

`yarn add global forcemanager-cli` or `npm install -g forcemanager-cli`

### 3) Create new project

- Go to the folder where you want to create the project.

`fm-cli create <new-project-name>`

- Select Type: Form.

An empty project will be created in the specified <new-project-name> directory.

- Go to project directory and install dependencies.

`cd <new-project-name>`

`yarn` or `npm install`

### 4) Start Dev mode

`yarn start` or `npm start`

Runs the app in the development mode with the context and BrigeBackend listening for Bridge calls.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### 5) Get development API keys

- Go to 'Manage Keys' section of the new [ForceManager Setup](https://setup.forcemanager.net/#/app/apikeys).
- Select 'Thirt party integraions' tab and click to 'Create API keys'.
- Set Name and Description to 'Fragments Develompent' and select 'external_basic' for the plan.

### 6) Configure Dev mode

- Click on the gear icon on the top right corner to see the config panel.
- Set de Entitiy ID with the ID of the account you want to use.
- Go to Login tab and set the Public and Private Keys you generated previously.

### 7) Code

Widgets are React projects that uses Bridge library to comunicate with ForceManager and Hoi-Poi-ui as UI library.
Start modifying App.jsx!

### 8) Build

`yarn build` or `npm build`

Builds the app for production to the `build` folder.
PUBLIC_URL constant is defined in .env file.

### 9) Deploy

#### Via CLI (Not working yet)

`yarn deploy` or `npm deploy`

To deploy the code to the standard ForceManager server form fragments https://fmfragments.s3.amazonaws.com/fmfragments/code/{GUID}
Not working yet.

### Manually

Copy files to any Server/FTP you can access with https.
In this case you should set Custom URL in Form config in [ForceManager Setup](https://setup.forcemanager.net/#/app/forms).
