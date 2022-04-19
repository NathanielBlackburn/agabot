# Installation

1. Clone the project.
2. Create a `config.json` file based on the `config.jsonexample` template.
3. Add:
    - OpenWeather API key from https://openweathermap.org/
    - Giphy API key from https://giphy.com/
4. Create a Google Cloud service account, add a JSON key and place it in the `/config` directory, named `agabot-rand-research-service-account-creds.json`.
5. Deploy via `gcloud app deploy`.