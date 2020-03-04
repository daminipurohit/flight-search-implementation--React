module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['src/common-components/*.{js,jsx}', 'src/container-components/*.{js,jsx}'],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json', 'jsx'],

    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: ['<rootDir>/enzyme.config.js'],
    // enzyme-to-json provides a better component format for snapshot comparison than Enzyme’s internal component representation. snapshotSerializers allows you to minimise code duplication when working with snapshots. Without the serializer each time a component is created in a test it must have the enzyme-to-json method .toJson() used individually before it can be passed to Jest’s snapshot matcher, with the serializer you never use it individually.
    snapshotSerializers: ['enzyme-to-json/serializer'],

    // use moduleNameMapper to mock modules,You should use identity-obj-proxy library to create a mock CSS | SCSS module that returns the expected classnames.
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy'
    },

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // The glob patterns Jest uses to detect test files
    testMatch: ['**/?(*.)+(spec|test).js?(x)'],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules', '/dist'],

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    testURL: 'http://localhost',

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],

    // Indicates whether each individual test should be reported during the run
    verbose: false
};
