---
title: "CLI Reference"
---

# CLI Reference

> Goldsky's command line interface reference

{/*
  This file is generated. Do not modify.

  To update the file:

  1. Navigate to the goldsky-io/goldsky monorepo
  2. cd packages/cli && pnpm docs:reference:generate
  3. Use the cli-reference.md content
  */}

```
goldsky <cmd> args
```

How to use:

```
goldsky <cmd> args

Commands:
  goldsky            Get started with Goldsky  [default]
  goldsky login      Log in to Goldsky to enable authenticated CLI commands
  goldsky logout     Log out of Goldsky on this computer
  goldsky subgraph   Commands related to subgraphs
  goldsky project    Commands related to project management
  goldsky pipeline   Commands related to Goldsky pipelines
  goldsky dataset    Commands related to Goldsky datasets
  goldsky indexed    Analyze blockchain data with indexed.xyz
  goldsky secret     Commands related to secret management
  goldsky telemetry  Commands related to CLI telemetry

Options:
      --token    CLI Auth Token  [string] [default: ""]
      --color    Colorize output  [boolean] [default: true]
  -v, --version  Show version number  [boolean]
  -h, --help     Show help  [boolean]

```

## login

```
goldsky login
```

How to use:

```
goldsky login

Log in to Goldsky to enable authenticated CLI commands

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

## logout

```
goldsky logout
```

How to use:

```
goldsky logout

Log out of Goldsky on this computer

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

## subgraph

```
goldsky subgraph
```

How to use:

```
goldsky subgraph

Commands related to subgraphs

Commands:
  goldsky subgraph deploy <nameAndVersion>  Deploy a subgraph to Goldsky
  goldsky subgraph list [nameAndVersion]    View deployed subgraphs and tags
  goldsky subgraph delete <nameAndVersion>  Delete a subgraph from Goldsky
  goldsky subgraph tag                      Commands related to tags
  goldsky subgraph webhook                  Commands related to webhooks
  goldsky subgraph log <nameAndVersion>     Tail a subgraph's logs
  goldsky subgraph pause <nameAndVersion>   Pause a subgraph
  goldsky subgraph start <nameAndVersion>   Start a subgraph
  goldsky subgraph update <nameAndVersion>  Update a subgraph
  goldsky subgraph init [nameAndVersion]    Initialize a new subgraph project with basic scaffolding

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### subgraph deploy

```
goldsky subgraph deploy <nameAndVersion>
```

How to use:

```
goldsky subgraph deploy <nameAndVersion>

Deploy a subgraph to Goldsky

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token                 CLI Auth Token  [string] [default: ""]
      --color                 Colorize output  [boolean] [default: true]
      --path                  Path to subgraph  [string]
      --description           Description/notes for the subgraph  [string]
      --from-ipfs-hash        IPFS hash of a publicly deployed subgraph  [string]
      --ipfs-gateway          IPFS gateway to use if downloading the subgraph from IPFS  [string] [default: "https://ipfs.network.thegraph.com"]
      --from-abi              Generate a subgraph from an ABI  [string]
      --from-url              GraphQL endpoint for a publicly deployed subgraph  [string]
      --remove-graft          Remove grafts from the subgraph prior to deployment  [boolean] [default: false]
      --start-block           Change start block of your subgraph prior to deployment. If used in conjunction with --graft-from, this will be the graft block as well.  [number]
      --graft-from            Graft from the latest block of an existing subgraph in the format <name>/<version>  [string]
      --enable-call-handlers  Generate a subgraph from an ABI with call handlers enabled. Only meaningful when used with --from-abi  [boolean] [default: false]
      --tag                   Tag the subgraph after deployment, comma separated for multiple tags  [string]
  -h, --help                  Show help  [boolean]

```

### subgraph list

```
goldsky subgraph list [nameAndVersion]
```

How to use:

```
goldsky subgraph list [nameAndVersion]

View deployed subgraphs and tags

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string]

Options:
      --token    CLI Auth Token  [string] [default: ""]
      --color    Colorize output  [boolean] [default: true]
      --filter   Limit results to just tags or deployments  [choices: "tags", "deployments"]
      --summary  Summarize subgraphs & versions without all their details  [boolean] [default: false]
  -h, --help     Show help  [boolean]

```

### subgraph delete

```
goldsky subgraph delete <nameAndVersion>
```

How to use:

```
goldsky subgraph delete <nameAndVersion>

Delete a subgraph from Goldsky

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -f, --force  Force the deletion without prompting for confirmation  [boolean] [default: false]
  -h, --help   Show help  [boolean]

```

### subgraph tag

```
goldsky subgraph tag
```

How to use:

```
goldsky subgraph tag

Commands related to tags

Commands:
  goldsky subgraph tag create <nameAndVersion>  Create a new tag
  goldsky subgraph tag delete <nameAndVersion>  Delete a tag

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

#### subgraph tag create

```
goldsky subgraph tag create <nameAndVersion>
```

How to use:

```
goldsky subgraph tag create <nameAndVersion>

Create a new tag

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -t, --tag    The name of the tag  [string] [required]
  -h, --help   Show help  [boolean]

```

#### subgraph tag delete

```
goldsky subgraph tag delete <nameAndVersion>
```

How to use:

```
goldsky subgraph tag delete <nameAndVersion>

Delete a tag

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -t, --tag    The name of the tag to delete  [string] [required]
  -f, --force  Force the deletion without prompting for confirmation  [boolean] [default: false]
  -h, --help   Show help  [boolean]

```

### subgraph webhook

```
goldsky subgraph webhook
```

How to use:

```
goldsky subgraph webhook

Commands related to webhooks

Commands:
  goldsky subgraph webhook create <nameAndVersion>         Create a webhook
  goldsky subgraph webhook delete [webhook-name]           Delete a webhook
  goldsky subgraph webhook list                            List webhooks
  goldsky subgraph webhook list-entities <nameAndVersion>  List possible webhook entities for a subgraph

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

#### subgraph webhook create

```
goldsky subgraph webhook create <nameAndVersion>
```

How to use:

```
goldsky subgraph webhook create <nameAndVersion>

Create a webhook

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token   CLI Auth Token  [string] [default: ""]
      --color   Colorize output  [boolean] [default: true]
      --name    Name of the webhook, must be unique  [string] [required]
      --url     URL to send events to  [string] [required]
      --entity  Subgraph entity to send events for  [string] [required]
      --secret  The secret you will receive with each webhook request Goldsky sends  [string]
  -h, --help    Show help  [boolean]

```

#### subgraph webhook delete

```
goldsky subgraph webhook delete [webhook-name]
```

How to use:

```
goldsky subgraph webhook delete [webhook-name]

Delete a webhook

Positionals:
  webhook-name  Name of the webhook to delete  [string]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
      --name   Name of the webhook to delete  [deprecated: Please use the positional argument <webhook-name> instead.] [string]
  -f, --force  Force the deletion without prompting for confirmation  [boolean] [default: false]
  -h, --help   Show help  [boolean]

```

#### subgraph webhook list

```
goldsky subgraph webhook list
```

How to use:

```
goldsky subgraph webhook list

List webhooks

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

#### subgraph webhook list-entities

```
goldsky subgraph webhook list-entities <nameAndVersion>
```

How to use:

```
goldsky subgraph webhook list-entities <nameAndVersion>

List possible webhook entities for a subgraph

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### subgraph log

```
goldsky subgraph log <nameAndVersion>
```

How to use:

```
goldsky subgraph log <nameAndVersion>

Tail a subgraph's logs

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token     CLI Auth Token  [string] [default: ""]
      --color     Colorize output  [boolean] [default: true]
      --since     Return logs newer than a relative duration like now, 5s, 2m, or 3h  [default: "1m"]
      --format    The format used to output logs, use text or json for easier parsed output, use pretty for more readable console output  [choices: "pretty", "json", "text"] [default: "text"]
      --filter    The minimum log level to output  [choices: "error", "warn", "info", "debug"] [default: "info"]
      --levels    The explicit comma separated log levels to include (error, warn, info, debug)
      --interval  The time in seconds to wait between checking for new logs  [number] [default: 5]
  -h, --help      Show help  [boolean]

```

### subgraph pause

```
goldsky subgraph pause <nameAndVersion>
```

How to use:

```
goldsky subgraph pause <nameAndVersion>

Pause a subgraph

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### subgraph start

```
goldsky subgraph start <nameAndVersion>
```

How to use:

```
goldsky subgraph start <nameAndVersion>

Start a subgraph

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### subgraph update

```
goldsky subgraph update <nameAndVersion>
```

How to use:

```
goldsky subgraph update <nameAndVersion>

Update a subgraph

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string] [required]

Options:
      --token             CLI Auth Token  [string] [default: ""]
      --color             Colorize output  [boolean] [default: true]
      --public-endpoint   Toggle public endpoint for the subgraph  [string] [choices: "enabled", "disabled"]
      --private-endpoint  Toggle private endpoint for the subgraph  [string] [choices: "enabled", "disabled"]
      --description       Description/notes for the subgraph  [string]
  -h, --help              Show help  [boolean]

```

### subgraph init

```
goldsky subgraph init [nameAndVersion]
```

How to use:

```
goldsky subgraph init [nameAndVersion]

Initialize a new subgraph project with basic scaffolding

Positionals:
  nameAndVersion  Name and version of the subgraph, e.g. 'my-subgraph/1.0.0'  [string]

Options:
      --token            CLI Auth Token  [string] [default: ""]
      --color            Colorize output  [boolean] [default: true]
      --target-path      Target path to write subgraph files to  [string]
      --force            Overwrite existing files at the target path  [boolean] [default: false]
      --from-config      Path to instant subgraph JSON configuration file  [string]
      --abi              ABI source(s) for contract(s)  [string]
      --contract         Contract address(es) to watch for events  [string]
      --contract-events  Event names to index for the contract(s)  [string]
      --contract-calls   Call names to index for the contract(s)  [string]
      --network          Network(s) to use for contract(s)                        reference our docs for supported subgraph networks:      https://docs.goldsky.com/chains/supported-networks  [string]
      --contract-name    Name of the contract(s)  [string]
      --start-block      Block to start at for a contract on a specific network  [string]
      --description      Subgraph description  [string]
      --call-handlers    Enable call handlers for the subgraph  [boolean]
      --build            Build the subgraph after writing files  [boolean]
      --deploy           Deploy the subgraph after build  [boolean]
  -h, --help             Show help  [boolean]

```

## project

```
goldsky project
```

How to use:

```
goldsky project

Commands related to project management

Commands:
  goldsky project users   Commands related to the users of a project
  goldsky project leave   Leave a project
  goldsky project list    List all of the projects you belong to
  goldsky project update  Update a project
  goldsky project create  Create a project

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### project users

```
goldsky project users
```

How to use:

```
goldsky project users

Commands related to the users of a project

Commands:
  goldsky project users list    List all users for this project
  goldsky project users invite  Invite a user to your project
  goldsky project users remove  Remove a user from your project
  goldsky project users update  Update a user's project permissions

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

#### project users list

```
goldsky project users list
```

How to use:

```
goldsky project users list

List all users for this project

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

#### project users invite

```
goldsky project users invite
```

How to use:

```
goldsky project users invite

Invite a user to your project

Options:
      --token   CLI Auth Token  [string] [default: ""]
      --color   Colorize output  [boolean] [default: true]
      --emails  emails of users to invite  [array] [required]
      --role    desired role of invited user(s)  [string] [required] [choices: "Owner", "Admin", "Editor", "Viewer"] [default: "Viewer"]
  -h, --help    Show help  [boolean]

```

#### project users remove

```
goldsky project users remove
```

How to use:

```
goldsky project users remove

Remove a user from your project

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
      --email  email of user to remove  [string] [required]
  -h, --help   Show help  [boolean]

```

#### project users update

```
goldsky project users update
```

How to use:

```
goldsky project users update

Update a user's project permissions

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
      --email  email of user to remove  [string] [required]
      --role   role of user to update  [string] [required] [choices: "Owner", "Admin", "Editor", "Viewer"]
  -h, --help   Show help  [boolean]

```

### project leave

```
goldsky project leave
```

How to use:

```
goldsky project leave

Leave a project

Options:
      --token      CLI Auth Token  [string] [default: ""]
      --color      Colorize output  [boolean] [default: true]
      --projectId  the ID of the project you want to leave  [string] [required]
  -h, --help       Show help  [boolean]

```

### project list

```
goldsky project list
```

How to use:

```
goldsky project list

List all of the projects you belong to

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### project update

```
goldsky project update
```

How to use:

```
goldsky project update

Update a project

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
      --name   the new name of the project  [string] [required]
  -h, --help   Show help  [boolean]

```

### project create

```
goldsky project create
```

How to use:

```
goldsky project create

Create a project

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
      --name   the name of the new project  [string] [required]
  -h, --help   Show help  [boolean]

```

## pipeline

```
goldsky pipeline
```

How to use:

```
goldsky pipeline

Commands related to Goldsky pipelines

Commands:
  goldsky pipeline get <nameOrConfigPath>                    Get a pipeline
  goldsky pipeline export [name]                             Export pipeline configurations
  goldsky pipeline apply <config-path>                       Apply the provided pipeline yaml config. This command creates the pipeline if it doesn't exist or updates the existing pipeline. This command is idempotent.
  goldsky pipeline get-definition <name>                     [deprecated] Get a shareable pipeline definition. Use "pipeline get <name> --definition" instead.
  goldsky pipeline create <name>                             Create a pipeline
  goldsky pipeline update <name>                             [deprecated] Update a pipeline. Use "pipeline apply" instead.
  goldsky pipeline delete <nameOrConfigPath>                 Delete a pipeline
  goldsky pipeline list                                      List all pipelines
  goldsky pipeline monitor <nameOrConfigPath>                Monitor a pipeline runtime
  goldsky pipeline pause <nameOrConfigPath>                  Pause a pipeline
  goldsky pipeline start <nameOrConfigPath>                  Start a pipeline
  goldsky pipeline stop <nameOrConfigPath>                   Stop a pipeline
  goldsky pipeline info <nameOrConfigPath>                   Display pipeline information
  goldsky pipeline resize <nameOrConfigPath> <resourceSize>  Resize a pipeline
  goldsky pipeline validate [config-path]                    Validate a pipeline definition or config.
  goldsky pipeline cancel-update <nameOrConfigPath>          Cancel in-flight update request
  goldsky pipeline restart <nameOrConfigPath>                Restart a pipeline. Useful in scenarios where pipeline needs to be restarted without any configuration changes.
  goldsky pipeline snapshots                                 Commands related to snapshots  [aliases: snapshot]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### pipeline get

```
goldsky pipeline get <nameOrConfigPath>
```

How to use:

```
goldsky pipeline get <nameOrConfigPath>

Get a pipeline

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token                   CLI Auth Token  [string] [default: ""]
      --color                   Colorize output  [boolean] [default: true]
      --outputFormat, --output  format of the output. Either json or table. Defaults to json.  [deprecated] [string] [choices: "json", "table", "yaml"] [default: "yaml"]
      --definition              print the pipeline's definition only (sources, transforms, sinks)  [boolean]
  -v, --version                 pipeline version. Returns latest version of the pipeline if not set.  [string]
  -h, --help                    Show help  [boolean]

```

### pipeline export

```
goldsky pipeline export [name]
```

How to use:

```
goldsky pipeline export [name]

Export pipeline configurations

Positionals:
  name  pipeline name  [string]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
      --all    Export pipeline configurations for all available pipelines  [boolean]
  -h, --help   Show help  [boolean]

```

### pipeline apply

```
goldsky pipeline apply <config-path>
```

How to use:

```
goldsky pipeline apply <config-path>

Apply the provided pipeline yaml config. This command creates the pipeline if it doesn't exist or updates the existing pipeline. This command is idempotent.

Positionals:
  config-path  path to the yaml pipeline config file.  [string] [required]

Options:
      --token                      CLI Auth Token  [string] [default: ""]
      --color                      Colorize output  [boolean] [default: true]
      --from-snapshot              Snapshot that will be used to start the pipeline. Applicable values are: 'last', 'new', 'none' or a snapshot-id. 'last' uses latest available snapshot. 'new' creates a new snapshot to use. 'none': does not use any snapshot aka starts from scratch. Including the option without any argument will start an interactive mode to select from a list of available snapshots. Defaults to 'new'  [string]
      --save-progress              Attempt a snapshot of the pipeline before applying the update. Only applies if the pipeline already has status: ACTIVE and is running without issues. Defaults to saving progress unless pipeline is being updated to status=INACTIVE.  [deprecated: Use '--from-snapshot'] [boolean]
      --skip-transform-validation  skips the validation of the transforms when updating the pipeline. Defaults to false  [boolean]
      --skip-validation            skips the validation of the transforms when updating the pipeline. Defaults to false  [deprecated] [boolean]
      --use-latest-snapshot        attempts to use the latest available snapshot.  [deprecated: Use '--from-snapshot'] [boolean]
      --status                     Status of the pipeline  [string] [choices: "ACTIVE", "INACTIVE", "PAUSED"]
      --force                      Forces apply without any prompts, useful for using apply in CI  [boolean]
  -h, --help                       Show help  [boolean]

```

### pipeline get-definition

```
goldsky pipeline get-definition <name>
```

How to use:

```
goldsky pipeline get-definition <name>

[deprecated] Get a shareable pipeline definition. Use "pipeline get <name> --definition" instead.

Positionals:
  name  pipeline name  [string] [required]

Options:
      --token                   CLI Auth Token  [string] [default: ""]
      --color                   Colorize output  [boolean] [default: true]
      --outputFormat, --output  format of the output. Either json or yaml. Defaults to yaml.  [deprecated] [string] [choices: "json", "yaml"] [default: "yaml"]
  -h, --help                    Show help  [boolean]

```

### pipeline create

```
goldsky pipeline create <name>
```

How to use:

```
goldsky pipeline create <name>

Create a pipeline

Positionals:
  name  name of the new pipeline  [string] [required]

Options:
      --token                          CLI Auth Token  [string] [default: ""]
      --color                          Colorize output  [boolean] [default: true]
      --output, --outputFormat         format of the output. Either json or table. Defaults to table.  [string] [choices: "json", "table", "yaml"] [default: "yaml"]
      --resource-size, --resourceSize  runtime resource size for when the pipeline runs  [deprecated: Use 'pipeline resize'] [string] [required] [choices: "s", "m", "l", "xl", "xxl", "mem.l", "mem.xl", "mem.xxl"] [default: "s"]
      --skip-transform-validation      skips the validation of the transforms when creating the pipeline.  [boolean]
      --description                    the description of the new pipeline  [deprecated: Use 'pipeline apply'] [string]
      --definition                     definition of the pipeline that includes sources, transforms, sinks. Provided as json eg: `{sources: [], transforms: [], sinks:[]}`  [deprecated: Use 'pipeline apply'] [string]
      --definition-path                path to a json/yaml file with the definition of the pipeline that includes sources, transforms, sinks.  [deprecated: Use 'pipeline apply'] [string]
      --status                         the desired status of the pipeline  [deprecated: Use 'pipeline start/stop/pause'] [string] [choices: "ACTIVE", "INACTIVE"] [default: "ACTIVE"]
      --use-dedicated-ip               Whether the pipeline should use dedicated egress IPs  [boolean] [required] [default: false]
  -h, --help                           Show help  [boolean]

```

### pipeline update

```
goldsky pipeline update <name>
```

How to use:

```
goldsky pipeline update <name>

[deprecated] Update a pipeline. Use "pipeline apply" instead.

Positionals:
  name  name of the pipeline to update.  [string] [required]

Options:
      --token                          CLI Auth Token  [string] [default: ""]
      --color                          Colorize output  [boolean] [default: true]
      --outputFormat, --output         format of the output. Either json or table. Defaults to json.  [deprecated] [string] [required] [choices: "json", "table", "yaml"] [default: "yaml"]
      --resource-size, --resourceSize  runtime resource size for when the pipeline runs  [string] [choices: "s", "m", "l", "xl", "xxl", "mem.l", "mem.xl", "mem.xxl"]
      --status                         status of the pipeline  [string] [choices: "ACTIVE", "INACTIVE", "PAUSED"]
      --save-progress                  takes a snapshot of the pipeline before applying the update. Only applies if the pipeline already has status: ACTIVE. Defaults to saving progress unless pipeline is being updated to status=INACTIVE.  [boolean]
      --skip-transform-validation      skips the validation of the transforms when updating the pipeline.  [boolean]
      --use-latest-snapshot            attempts to use the latest available snapshot.  [boolean]
      --definition                     definition of the pipeline that includes sources, transforms, sinks. Provided as json eg: `{sources: [], transforms: [], sinks:[]}`  [string]
      --definition-path                path to a json/yaml file with the definition of the pipeline that includes sources, transforms, sinks.  [string]
      --description                    description of the pipeline`  [string]
  -h, --help                           Show help  [boolean]

```

### pipeline delete

```
goldsky pipeline delete <nameOrConfigPath>
```

How to use:

```
goldsky pipeline delete <nameOrConfigPath>

Delete a pipeline

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -f, --force  Force the deletion without prompting for confirmation  [boolean] [default: false]
  -h, --help   Show help  [boolean]

```

### pipeline list

```
goldsky pipeline list
```

How to use:

```
goldsky pipeline list

List all pipelines

Options:
      --token                    CLI Auth Token  [string] [default: ""]
      --color                    Colorize output  [boolean] [default: true]
      --output, --outputFormat   format of the output. Either json or table. Defaults to json.  [string] [choices: "json", "table", "yaml"] [default: "table"]
      --outputVerbosity          Either summary or all. Defaults to summary.  [string] [choices: "summary", "usablewithapplycmd", "all"] [default: "summary"]
      --include-runtime-details  includes runtime details for each pipeline like runtime status and errors. Defaults to false.  [boolean] [default: false]
  -h, --help                     Show help  [boolean]

```

### pipeline monitor

```
goldsky pipeline monitor <nameOrConfigPath>
```

How to use:

```
goldsky pipeline monitor <nameOrConfigPath>

Monitor a pipeline runtime

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token                          CLI Auth Token  [string] [default: ""]
      --color                          Colorize output  [boolean] [default: true]
      --update-request                 monitor update request  [boolean]
      --max-refreshes, --maxRefreshes  max. number of data refreshes.  [number]
  -v, --version                        pipeline version, uses latest version if not set.  [string]
  -h, --help                           Show help  [boolean]

```

### pipeline pause

```
goldsky pipeline pause <nameOrConfigPath>
```

How to use:

```
goldsky pipeline pause <nameOrConfigPath>

Pause a pipeline

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### pipeline start

```
goldsky pipeline start <nameOrConfigPath>
```

How to use:

```
goldsky pipeline start <nameOrConfigPath>

Start a pipeline

Positionals:
  nameOrConfigPath  pipeline name or config path  [string] [required]

Options:
      --token                CLI Auth Token  [string] [default: ""]
      --color                Colorize output  [boolean] [default: true]
      --use-latest-snapshot  attempts to use the latest available snapshot.  [deprecated: Use '--from-snapshot'] [boolean]
      --from-snapshot        Snapshot that will be used to start the pipeline. Applicable values are: 'last', 'new', 'none' or a snapshot-id. 'last' uses latest available snapshot. 'new' creates a new snapshot to use. 'none': does not use any snapshot aka starts from scratch. Including the option without any argument will start an interactive mode to select from a list of available snapshots. Defaults to 'new'  [string]
  -h, --help                 Show help  [boolean]

```

### pipeline stop

```
goldsky pipeline stop <nameOrConfigPath>
```

How to use:

```
goldsky pipeline stop <nameOrConfigPath>

Stop a pipeline

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### pipeline info

```
goldsky pipeline info <nameOrConfigPath>
```

How to use:

```
goldsky pipeline info <nameOrConfigPath>

Display pipeline information

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token    CLI Auth Token  [string] [default: ""]
      --color    Colorize output  [boolean] [default: true]
  -v, --version  pipeline version. Returns latest version of the pipeline if not set.  [string]
  -h, --help     Show help  [boolean]

```

### pipeline resize

```
goldsky pipeline resize <nameOrConfigPath> <resourceSize>
```

How to use:

```
goldsky pipeline resize <nameOrConfigPath> <resourceSize>

Resize a pipeline

Positionals:
  nameOrConfigPath             pipeline name or config file path  [string] [required]
  resource-size, resourceSize  runtime resource size  [string] [choices: "s", "m", "l", "xl", "xxl", "mem.l", "mem.xl", "mem.xxl"] [default: "s"]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### pipeline validate

```
goldsky pipeline validate [config-path]
```

How to use:

```
goldsky pipeline validate [config-path]

Validate a pipeline definition or config.

Positionals:
  config-path  path to the yaml pipeline config file.  [string]

Options:
      --token            CLI Auth Token  [string] [default: ""]
      --color            Colorize output  [boolean] [default: true]
      --definition       definition of the pipeline that includes sources, transforms, sinks. Provided as json eg: `{sources: [], transforms: [], sinks:[]}`  [deprecated: use config-path positional instead.] [string]
      --definition-path  path to a json/yaml file with the definition of the pipeline that includes sources, transforms, sinks.  [deprecated: use config-path positional instead.] [string]
  -h, --help             Show help  [boolean]

```

### pipeline cancel-update

```
goldsky pipeline cancel-update <nameOrConfigPath>
```

How to use:

```
goldsky pipeline cancel-update <nameOrConfigPath>

Cancel in-flight update request

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### pipeline restart

```
goldsky pipeline restart <nameOrConfigPath>
```

How to use:

```
goldsky pipeline restart <nameOrConfigPath>

Restart a pipeline. Useful in scenarios where pipeline needs to be restarted without any configuration changes.

Positionals:
  nameOrConfigPath  pipeline name or config path  [string] [required]

Options:
      --token               CLI Auth Token  [string] [default: ""]
      --color               Colorize output  [boolean] [default: true]
      --from-snapshot       Snapshot that will be used to start the pipeline. Applicable values are: 'last', 'new', 'none' or a snapshot-id. 'last' uses latest available snapshot. 'new' creates a new snapshot to use. 'none': does not use any snapshot aka starts from scratch. Including the option without any argument will start an interactive mode to select from a list of available snapshots. Defaults to 'new'  [string] [required]
      --disable-monitoring  Disables monitoring after the command is run. Defaults to false.  [boolean] [default: false]
  -h, --help                Show help  [boolean]

```

### pipeline snapshots

```
goldsky pipeline snapshots
```

How to use:

```
undefined
```

#### pipeline snapshots list

```
goldsky pipeline snapshots list <nameOrConfigPath>
```

How to use:

```
goldsky pipeline snapshots list <nameOrConfigPath>

List snapshots in a pipeline

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token    CLI Auth Token  [string] [default: ""]
      --color    Colorize output  [boolean] [default: true]
  -v, --version  pipeline version. Returns snapshots across all versions if not set.  [string]
  -h, --help     Show help  [boolean]

```

#### pipeline snapshots create

```
goldsky pipeline snapshots create <nameOrConfigPath>
```

How to use:

```
goldsky pipeline snapshots create <nameOrConfigPath>

Attempts to take a snapshot of the pipeline

Positionals:
  nameOrConfigPath  pipeline name or config file path  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

## dataset

```
goldsky dataset
```

How to use:

```
goldsky dataset

Commands related to Goldsky datasets

Commands:
  goldsky dataset get <name>  Get a dataset
  goldsky dataset list        List datasets

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### dataset get

```
goldsky dataset get <name>
```

How to use:

```
goldsky dataset get <name>

Get a dataset

Positionals:
  name  dataset name  [string] [required]

Options:
      --token         CLI Auth Token  [string] [default: ""]
      --color         Colorize output  [boolean] [default: true]
      --outputFormat  the output format. Either json or yaml. Defaults to yaml  [string]
  -v, --version       dataset version  [string]
  -h, --help          Show help  [boolean]

```

### dataset list

```
goldsky dataset list
```

How to use:

```
goldsky dataset list

List datasets

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

## indexed

```
goldsky indexed
```

How to use:

```
goldsky indexed

Analyze blockchain data with indexed.xyz

Commands:
  goldsky indexed sync  Commands related to syncing indexed.xyz real-time raw & decoded crypto datasets

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### indexed sync

```
goldsky indexed sync
```

How to use:

```
goldsky indexed sync

Commands related to syncing indexed.xyz real-time raw & decoded crypto datasets

Commands:
  goldsky indexed sync decoded-logs      Sync decoded logs for a smart contract from a network to this computer
  goldsky indexed sync raw-blocks        Sync all blocks from a network
  goldsky indexed sync raw-logs          Sync all logs from a network
  goldsky indexed sync raw-transactions  Sync all transactions from a network

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

#### indexed sync decoded-logs

```
goldsky indexed sync decoded-logs
```

How to use:

```
goldsky indexed sync decoded-logs

Sync decoded logs for a smart contract from a network to this computer

Options:
      --token             CLI Auth Token  [string] [default: ""]
      --color             Colorize output  [boolean] [default: true]
      --contract-address  The contract address you are interested in  [string] [default: ""]
      --network           The network of indexed.xyz data to synchronize  [string] [default: "ethereum"]
  -h, --help              Show help  [boolean]

```

#### indexed sync raw-blocks

```
goldsky indexed sync raw-blocks
```

How to use:

```
goldsky indexed sync raw-blocks

Sync all blocks from a network

Options:
      --token    CLI Auth Token  [string] [default: ""]
      --color    Colorize output  [boolean] [default: true]
      --network  The network of indexed.xyz data to synchronize  [string] [default: "ethereum"]
  -h, --help     Show help  [boolean]

```

#### indexed sync raw-logs

```
goldsky indexed sync raw-logs
```

How to use:

```
goldsky indexed sync raw-logs

Sync all logs from a network

Options:
      --token             CLI Auth Token  [string] [default: ""]
      --color             Colorize output  [boolean] [default: true]
      --contract-address  The contract address you are interested in  [string] [default: ""]
      --network           The network of indexed.xyz data to synchronize  [string] [default: "ethereum"]
  -h, --help              Show help  [boolean]

```

#### indexed sync raw-transactions

```
goldsky indexed sync raw-transactions
```

How to use:

```
goldsky indexed sync raw-transactions

Sync all transactions from a network

Options:
      --token    CLI Auth Token  [string] [default: ""]
      --color    Colorize output  [boolean] [default: true]
      --network  The network of indexed.xyz data to synchronize  [string] [default: "ethereum"]
  -h, --help     Show help  [boolean]

```

## secret

```
goldsky secret
```

How to use:

```
goldsky secret

Commands related to secret management

Commands:
  goldsky secret create         create a secret
  goldsky secret list           list all secrets
  goldsky secret reveal <name>  reveal a secret
  goldsky secret update <name>  update a secret
  goldsky secret delete <name>  delete a secret

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### secret create

```
goldsky secret create
```

How to use:

```
goldsky secret create

create a secret

Options:
      --token        CLI Auth Token  [string] [default: ""]
      --color        Colorize output  [boolean] [default: true]
      --name         the name of the new secret  [string]
      --value        the value of the new secret in json  [string]
      --description  the description of the new secret  [string]
  -h, --help         Show help  [boolean]

```

### secret list

```
goldsky secret list
```

How to use:

```
goldsky secret list

list all secrets

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### secret reveal

```
goldsky secret reveal <name>
```

How to use:

```
goldsky secret reveal <name>

reveal a secret

Positionals:
  name  the name of the secret  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### secret update

```
goldsky secret update <name>
```

How to use:

```
goldsky secret update <name>

update a secret

Positionals:
  name  the name of the secret  [string] [required]

Options:
      --token        CLI Auth Token  [string] [default: ""]
      --color        Colorize output  [boolean] [default: true]
      --value        the new value of the secret  [string]
      --description  the new description of the secret  [string]
  -h, --help         Show help  [boolean]

```

### secret delete

```
goldsky secret delete <name>
```

How to use:

```
goldsky secret delete <name>

delete a secret

Positionals:
  name  the name of the secret to delete  [string] [required]

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -f, --force  Force the deletion without prompting for confirmation  [boolean] [default: false]
  -h, --help   Show help  [boolean]

```

## telemetry

```
goldsky telemetry
```

How to use:

```
goldsky telemetry

Commands related to CLI telemetry

Commands:
  goldsky telemetry status   Display the CLI telemetry status
  goldsky telemetry enable   Enable anonymous CLI telemetry
  goldsky telemetry disable  Disable anonymous CLI telemetry

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### telemetry status

```
goldsky telemetry status
```

How to use:

```
goldsky telemetry status

Display the CLI telemetry status

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### telemetry enable

```
goldsky telemetry enable
```

How to use:

```
goldsky telemetry enable

Enable anonymous CLI telemetry

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```

### telemetry disable

```
goldsky telemetry disable
```

How to use:

```
goldsky telemetry disable

Disable anonymous CLI telemetry

Options:
      --token  CLI Auth Token  [string] [default: ""]
      --color  Colorize output  [boolean] [default: true]
  -h, --help   Show help  [boolean]

```
