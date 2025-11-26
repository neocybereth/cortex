# Package Manager Instructions

This project uses **yarn exclusively**. Never use npm commands.

## Required Commands:
- Install dependencies: `yarn install` or `yarn`
- Add packages: `yarn add <package>`
- Add dev dependencies: `yarn add -D <package>`
- Remove packages: `yarn remove <package>`
- Run scripts: `yarn <script-name>`

## Common Scripts:
- Development: `yarn dev`
- Build: `yarn build`
- Start production: `yarn start`
- Lint: `yarn lint`

## Important Notes:
- The project has engine-strict enabled to prevent npm usage
- Always use yarn commands when managing dependencies
- Check package.json for available scripts before running commands