module.exports = {
    // testEnvironment: "enzyme",
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    setupFilesAfterEnv: [
        './node_modules/jest-enzyme/lib/index.js',
        '<rootDir>/jest.setup.js',
        // 'jest-enzyme',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
    },
    transformIgnorePatterns: [
        '/node_modules/',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/$1",
        '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    },
}