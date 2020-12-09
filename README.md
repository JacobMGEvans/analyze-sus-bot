# analyze-sus-bot

> A GitHub App built with [Probot](https://github.com/probot/probot) that will analyze suspicious URLs & Files (currently manually triggered)

## Setup

```sh
# Install dependencies
npm install

# Compile
npm run build

# Run
npm run start
```

## Docker

```sh
# 1. Build container
docker build -t analyze-sus-bot .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> analyze-sus-bot
```
## Commands 
CMD Target_Type Target
### Issues Comments
!analyze URL Your_URL
  
## Contributing

If you have suggestions for how analyze-sus-bot could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2020 Jacob Evans <jacobmgevans@gmail.com>
