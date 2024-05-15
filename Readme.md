# Dependencies Scout

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

This package is intended to provide some insights into the maintainability of a project. By reviewing the chain of dependencies it can pinpoint which ones are at risk of being deprecated or abandoned.

## Features

This tool queries the npm registry to gather statistical data about a single package or a list of dependencies. It explores the data in order to give some insights into their overall health and suitability for inclusion in a project.

## Usage

To use the Dependency Scout, you can install it globally using the `npm i -g deps-scout` command and then run the `scout` command in your project, or you can just run the `npx deps-scout` command directly.

When running in a local project, the `scout`can evaluate various indicators/metrics by requesting data from different data sources and comparing the obtained values with predefined thresholds. Both the thresholds and the desired indicators are configurable. To do this, simply add a file called `scout.config.json` with the structure shown below.

```json
{
  "indicators": [
    "is-last-version",
    "is-same-major-version",
    "..."
  ],
  "thresholds": {
    "is-released-frequently": {
      "warningThreshold": 30,
      "alertThreshold": 90
    }
  }, 
  "conditions": {
    "mustBeOk": ["was-released-recently"],
    "maxAlerts": 2
  }
}
```

The full list of indicators that can be evaluated is shown below.

| Indicator name | Description | Thresholds |
| ---- | ----- | ----- |
| `is-last-version` | Verify whether used version the last released version. | None |
| `is-same-major-version` | Verify if the major version matches the last release. | None |
| `is-same-minor-version` | Verify if the minor version matches the last release. | None |
| `was-released-recently` | Check if the library was released recently according to defined thresholds. | `warningThreshold` and `alertThreshold` <br>set the maximum number of days since last release |
| `is-released-frequently` | Analize the average time between releases. | `warningThreshold` and `alertThreshold` <br>set the number of days between releases |
| `is-downloaded-frequently` | Check the number of weekly downloads that a library has in the public registry. | `warningThreshold` and `alertThreshold` <br>set the minimum number of weekly downloads |
| `is-long-living-project` | Check the library's creation date to determine if it has been open to the public long enough. | `warningThreshold` and `alertThreshold` <br>set the minimum time in days since its creation |
| `is-starred-repo` | Look over the number of stars the project repository has in Github. | `warningThreshold` and `alertThreshold` <br>set the minimum number of stars |
| `has-open-issues` | Look over the number of open issues the project repository has. | `warningThreshold` and `alertThreshold` <br>set the maximum number of open issues |
| `has-forks` | Consider the number of forks the project repository has. | `warningThreshold` and `alertThreshold` <br>set the minimum number of forks |
| `has-enough-observers` | Scan the number of observers the repo has. | `warningThreshold` and `alertThreshold` <br>set the minimum number of observers |
| `repo-owner-type` | Verify the type of owner of the repository, which can be "Organization" or "User" | `desiredOwnerType` set the repository owner type when one is preferred |
| `is-healthy-repo` | Inspect the healt score of the repo based on the Github community profile. | `warningThreshold` and `alertThreshold` <br>set the minimum percentage of repo healt score |

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Make sure to follow the [contribution guidelines](docs/CONTRIBUTING.md) and abide by the [code of conduct](docs/CODE_OF_CONDUCT.md) when contributing to this project.

## License

This project is licensed under the [ISC License](LICENSE).

