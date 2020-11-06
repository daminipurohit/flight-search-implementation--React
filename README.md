## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
Webpack correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`

It checks for all linting issues.

### `npm run lint:fix`

It fixes auto-fixable linting issues.

### `npm run test`

It runs all testcases. Also made it to give coverage at end for easy development.

### `npm run test:update`

It updates existing snapshot to new one. Please verify new snapshot is correct then only replace existing with it. You can remove coverage and only run testcases by just keeping this command value as jest.

### `npm run test:watch`

It runs testcases on watch mode.

### `npm run test:coverage`

It runs test and gives coverage report.

### `Design Principles`
Composition

Always create meaningful components and compose them together to build up application.
Create components and compose their behavior into it, such that any changes added later to components do not change the way other components need to access them.
Add functionality to a component without causing rippling changes throughout the codebase.
Eg: Adding new local state in a component should not need changing code for the parent components that use it.

Abstraction

Functionalities that can be developed easily should be written from scratch, rather than importing libraries unnecessarily.
Always follow common recommended coding rules amongst team.


Functional programming.

Create functions over classes when possible.


Stability

Create applications that stay stable meaning stay working for long, such that when new changes are added , proper documentation / workshop is provided to team to follow up with it.


Developer experience.

Along with user experience, focus on developer experience as well. 
Write code your fellow developer can understand.
Use declarative approach over imperative.


Debugging
Use PropTypes


Verbose Naming

Happy coding!
