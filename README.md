# <a href="https://github.com/nestjs/nest" target="blank">Nest</a> + <a href="https://github.com/typeorm/typeorm" target="blank">Typeorm</a> + <a href="https://www.postgresql.org" target="blank">PostgreSQL</a> starter

## Ready to use and extend Nest application with environment validation and custom Typeorm database repository

Basic Nest.js starter for REST API, which includes:

- Validation of environment variables using <a href="https://zod.dev" >Zod</a>
- Easy to extend custom <a href="https://github.com/typeorm/typeorm" target="blank">Typeorm</a> repository
- Default global interceptor which removes all <code>password</code> fields from response
- Validation of request parameters such as <code>body</code>, <code>query</code>, <code>params</code> using <a href="https://github.com/typestack/class-validator" target="blank">class-validator</a> and <a href="https://github.com/typestack/class-transformer" target="blank">class-transformer</a>

## How to get started?

1. Clone starter

```bash
git clone git@github.com:ArtemKurtiak/nest-typeorm-starter.git
```

2. Install dependencies

```bash
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

3. Setup environment

```bash
cp .env-example .env
```

4. Fill <code>.env</code> file template with your parameters

### That's it!

<br />

## How to use it?

### Production start

```bash
# yarn
yarn build && yarn start:prod

# npm
npm run build && npm run start:prod

# pnpm
pnpm build && pnpm start:prod
```

### Development start in watch mode

```bash
# yarn
yarn start:dev

# npm
npm run start:dev

# pnpm
pnpm start:dev
```

### Development start without watch mode

```bash
# yarn
yarn start

# npm
npm run start

# pnpm
pnpm start
```

## How to interact with Typeorm?

### Generate new migration

```bash
# yarn
yarn migration:generate ./src/shared/database/migrations/<name of migration file>

# npm
npm run migration:generate ./src/shared/database/migrations/<name of migration file>

# pnpm
pnpm migration:generate ./src/shared/database/migrations/<name of migration file>
```

### Generate new seed

```bash
# yarn
yarn migration:create ./src/shared/database/seeds/<name of seed file>

# npm
npm run migration:create ./src/shared/database/seeds/<name of seed file>

# pnpm
pnpm migration:create ./src/shared/database/seeds/<name of seed file>
```

### Run pending migrations & seeds

```bash
# yarn
yarn migration:run

# npm
npm run migration:run

# pnpm
pnpm migration:run
```

### Revert latest migration or seed

```bash
# yarn
yarn migration:revert

# npm
npm run migration:revert

# pnpm
pnpm migration:revert
```

### Other commands

```bash
# yarn
yarn typeorm:datasource <your command>

# npm
npm run typeorm:datasource <your command>

# pnpm
pnpm typeorm:datasource <your command>
```
