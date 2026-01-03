# node-test-pattern

This app demonstrates a test organization pattern in Node.js:
- unit tests live next to the file under test (e.g., `src/models/Address.ts` and `src/models/Address.test.ts`)
- integration tests live under `tests/integration`
- if end-to-end (e2e) tests are needed, it should be implemented under `tests/e2e`

## Scripts

- `npm test`: runs all unit tests with Vitest in single-run mode (no watch)
- `npm run test:watch`: runs unit tests in watch mode
- `npm run test:integration`: runs only integration tests using the dedicated config in `tests/integration/vitest.config.ts`
- `npm run test:integration:watch`: runs integration tests in watch mode
