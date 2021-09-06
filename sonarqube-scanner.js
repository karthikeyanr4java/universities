const scanner = require('sonarqube-scanner');
scanner(
    {
        serverUrl: "http://localhost:9000",
        login: "admin",
        password: "sonar",
        options: {
            "sonar.login": "admin",
            "sonar.password": "sonar",
            "sonar.sources": "./src",
            "sonar.language": 'js',
            "sonar.projectName": "UniversitiesSearch",
            "sonar.exclusions": "**/**/**.test.js",
            "sonar.javascript.coveragePlugin": "lcov",
            "sonar.javascript.lcov.reportPaths": 'coverage/lcov.info'
  },
    },
    () => process.exit()
);