# Dependencies Scout

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

This package aims to provide some insights into the maintainability of a project. 
It can be used to gather information about a specific library or the entire list of project dependencies, with the objective of identifying potential risks associated with them.

## Usage

To use the Dependencies Scout, the easiest way is install it globally, using
```
npm i -g deps-scout
```

Then, just run the `scout` command in your project's root directory to analyze all it's dependencies.

If you want to check a single library just use `scout <library> <version>`.
Alternativelly, you can run the package usign `npx deps-scout` command.

When running in a local project, the `scout` can evaluate various indicators/metrics by requesting data from different data sources and comparing the obtained values with predefined thresholds. Both the thresholds and the desired indicators are configurable. To do this, simply add a file called `scout.config.json` to the root folder, an example of the JSON structure is shown below.

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
    "maxAlerts": 2
  }
}
```

The full list of indicators that can be evaluated, along with their thresholds, is shown below.

| Indicator name | Description | Thresholds |
| ---- | ----- | ----- |
| `is-last-version` | Verify whether used version the last released version. | None |
| `is-same-major-version` | Verify if the major version matches the last release. | None |
| `is-same-minor-version` | Verify if the minor version matches the last release. | None |
| `was-released-recently` | Check if the library was released recently according to defined thresholds. | `warningThreshold` and `alertThreshold` <br>set the maximum number of days since last release |
| `is-released-frequently` | Analyze the average time between releases. | `warningThreshold` and `alertThreshold` <br>set the number of days between releases |
| `is-downloaded-frequently` | Check the number of weekly downloads that a library has in the public registry. | `warningThreshold` and `alertThreshold` <br>set the minimum number of weekly downloads |
| `is-long-living-project` | Check the library's creation date to determine if it has been open to the public long enough. | `warningThreshold` and `alertThreshold` <br>set the minimum time in days since its creation |
| `is-starred-repo` | Look over the number of stars the project repository has in Github. | `warningThreshold` and `alertThreshold` <br>set the minimum number of stars |
| `has-open-issues` | Look over the number of open issues the project repository has. | `warningThreshold` and `alertThreshold` <br>set the maximum number of open issues |
| `has-forks` | Consider the number of forks the project repository has. | `warningThreshold` and `alertThreshold` <br>set the minimum number of forks |
| `has-enough-observers` | Scan the number of observers the repo has. | `warningThreshold` and `alertThreshold` <br>set the minimum number of observers |
| `repo-owner-type` | Verify the type of owner of the repository, which can be "Organization" or "User" | `desiredOwnerType` set the repository owner type when one is preferred |
| `is-healthy-repo` | Inspect the healt score of the repo based on the Github community profile. | `warningThreshold` and `alertThreshold` <br>set the minimum percentage of repo healt score |

Besides the indicators and their thresholds, you can configure conditions to stop the analysis of a library. The possible conditions are:

| Condition name | Value type | Description |
| ---- | ----- | ----- |
| `mustBeOk` | `string[]` | All the indicators in the list must be OK, i.e. not Alert nor Warning |
| `shallNotAlert` | `string[]` | The analysis stops if any of the indicators in the list is evaluated as Alert |
| `maxAlerts` | `number` | Number of alerts that trigger the analysis stop condition |
| `maxWarnings` | `number` | Number of warnings that trigger the stop condition |

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request. Make sure to follow the [contribution guidelines](docs/CONTRIBUTING.md) and abide by the [code of conduct](docs/CODE_OF_CONDUCT.md) when contributing to this project.

## License

This project is licensed under the [ISC License](LICENSE).

