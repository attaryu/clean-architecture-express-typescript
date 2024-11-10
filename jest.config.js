/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@/server$': '<rootDir>/src/server.ts',
    '^@/routes/(.*)$': '<rootDir>/src/presentation/routers/$1',
    '^@/entities/(.*)$': '<rootDir>/src/domain/entities/$1',
    '^@/repositoriesType/(.*)$': '<rootDir>/src/domain/interfaces/repositories/$1',
    '^@/repositories/(.*)$': '<rootDir>/src/domain/repositories/$1',
    '^@/useCasesType/(.*)$': '<rootDir>/src/domain/interfaces/use-cases/$1',
    '^@/useCases/(.*)$': '<rootDir>/src/domain/use-cases/$1',
    '^@/dataSourcesType/(.*)$': '<rootDir>/src/data/interfaces/data-sources/$1',
    '^@/dataSources/(.*)$': '<rootDir>/src/data/data-sources/$1',
  },
};