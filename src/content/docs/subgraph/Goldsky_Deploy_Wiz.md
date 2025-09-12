---
title: "Subgraph deploy wizard"
---

# Subgraph deploy wizard

## What you'll need

1. The contract address(es) you're interested in indexing.
2. That's it! 🎉

## Walkthrough

We're going to build a subgraph to track the [Nouns contract](https://etherscan.io/address/0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03) on `mainnet`.

<Accordion title="Video walkthrough" icon="video">
  <video controls className="w-full aspect-video" src="https://mintlify.s3.us-west-1.amazonaws.com/goldsky-38/images/subgraphs/guides/subgraph-deploy-wizard-demo.mp4" />
</Accordion>

<Steps>
  <Step title="Launching the wizard CLI">
    ```
    goldsky subgraph init
    ```

    <Info>
      *Remember to run `goldsky login` first if you haven't already authenticated
      with Goldsky.*
    </Info>

    This will launch the wizard and guide you through the process of deploying a subgraph on Goldsky.

    ```
    ┍  Goldsky Subgraph configuration wizard
    ```
  </Step>

  <Step title="Choose a subgraph name">
    The name must start with a letter and contain only letters, numbers, underscores, and hyphens.

    e.g., `nouns-demo`

    ```
    │
    ◆  Subgraph name
    │  nouns-demo
    ┕
    ```

    <Tip>
      *see [related argument documentation](#nameandversion-positional-argument)*
    </Tip>
  </Step>

  <Step title="Define a subgraph version">
    This will default to `1.0.0`, but you can change this to anything as long as it starts with a letter or number and contains only letters, numbers, underscores, hyphens, pluses, and periods.

    e.g., `1.0.0-demo+docs`

    ```
    │
    ◆  Subgraph version
    │  1.0.0-demo+docs
    ┕
    ```

    <Tip>
      *see [related argument documentation](#nameandversion-positional-argument)*
    </Tip>
  </Step>

  <Step title="Set your target path">
    This must be any valid path on your system, and will default to subgraph name and version as parent and child directories respectively. The target path is where the no-code subgraph configuration will be written, as well as where any remotely fetched files will be saved. Target path is expanded, with `~` (user home directory) and environment variables being replaced accordingly.

    <Info>
      *If you have already run through this guide, or you already have created
      `~/my-subgraphs/nouns-demo/1.0.0-demo+docs` then this step will be followed
      with a prompt to confirm overwriting existing files.*
    </Info>

    e.g., `~/my-subgraphs/nouns-demo/1.0.0-demo+docs`

    ```
    │
    ◇  Subgraph path
    │  ~/my-subgraphs/nouns-demo/1.0.0-demo+docs
    ┕
    ```

    <Tip>*see [related argument documentation](#target-path)*</Tip>
  </Step>

  <Step title="Setup ABI sources">
    In most cases this can be left blank so that we automatically source ABIs from local and remote sources. If you have local path(s) that contain various ABIs, you can specify them here.

    e.g., `~/my-subgraphs/abis`

    <Info>
      *In this case, we'll leave this blank here because we haven't saved any ABIs
      locally to `~/my-subgraphs/abis` yet.*
    </Info>

    ```
    │
    ◆  Contract ABI source
    │  path/to/abi, leave blank to skip
    ┕
    ```

    <Tip>*see [related argument documentation](#abi)*</Tip>
  </Step>

  <Step title="Add contract addresses">
    You can add any number of contract addresses here (as long as you add at least one). After entering all details about a contract, you'll be asked if you want to add another contract. Contract addresses must begin with a `0x` and be exactly `42` characters long.

    e.g., `0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03`

    ```
    │
    ◆  Contract address
    │  0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03
    ┕
    ```

    <Tip>*see [related argument documentation](#contract)*</Tip>
  </Step>

  <Step title="Choose which network to index contract on">
    Decide which network you would like to index for this contract, refer to our [supported networks](/chains/supported-networks) for the full list of available options. If the wrong network is selected, your contract may not exist on that network and no data will indexed.

    e.g., `mainnet`

    ```
    │
    ◆  Contract network
    │  mainnet
    ┕
    ```

    <Tip>*see [related argument documentation](#network)*</Tip>
  </Step>

  <Step title="Choose which block to start indexing on">
    The start block will be automatically determined based on the network you specified in the previous step. A remote source is interrogated to determine this start block, but not all remote sources are able to respond with a valid start block value. If the remote source is unable to acquire a valid start block then the prompt will fallback to `0` and you'll be able to manually enter a start block. If you are unsure what the start block might be, using `0` is a safe bet but may result in a longer indexing time before any data is available.

    e.g., `12985438`

    <Info>
      *In this case, the wizard should have automatically determined the start block
      for our contract on `mainnet`. If there is a networking issue and the start
      block is not fetched automatically, please enter `12985438` manually.*
    </Info>

    <Warning>
      *On some networks, contracts deployed more than a year ago may not be possible
      to automatically determine the start block due to a default configuration
      option in a common RPC provider software.*
    </Warning>

    ```
    │
    ◇  Found start block: 12985438
    │
    ◆  Start block
    │  12985438
    ┕
    ```

    <Tip>*see [related argument documentation](#start-block)*</Tip>
  </Step>

  <Step title="Add another network for this contract?">
    In some cases, you may want to index the same contract on multiple networks. If this is the case, you can choose `Yes` and add another network here to repeat the past `2` steps for another network. If you only want to index this contract on one network, you can choose `No` and move on to the next step.

    <Info>
      *In this case, we only want to index this contract on the `mainnet` network,
      so we'll choose `No`.*
    </Info>

    ```
    │
    ◆  Add another network?
    │  ○ Yes / ● No
    ┕
    ```
  </Step>

  <Step title="Choose a contract name">
    The contract name will be used to produce generated subgraph code files. This should be a human-readable name that describes the contract you're indexing and must begin with a letter and contain ony letters, numbers, hypens, underscores, and spaces.

    e.g., `NOUNS`

    <Info>
      *The contract name does not need to be all caps, this is just a convention
      used in this example.*
    </Info>

    ```
    │
    ◆  Contract name
    │  NOUNS
    ┕
    ```

    <Tip>*see [related argument documentation](#contract-name)*</Tip>
  </Step>

  <Step title="Add another contract?">
    In some cases, you may want to index multiple contracts in the same subgraph. If this is the case, you can choose `Yes` and add another contract here to repeat all past steps since previously entering a contract for a new contract. If you only want to index this one contract, you can choose `No` and move on to the next step.

    <Info>
      *In this case, we only want to index this one contract, so we'll choose `No`.*
    </Info>

    ```
    │
    ◆  Add another contract?
    │  ○ Yes / ● No
    ┕
    ```
  </Step>

  <Step title="Add a description">
    The subgraph description is only for your own reference and will not be used in the generated subgraph code. This can be any text you like, or left empty if no description is desired. The wizard will start with a generic default description.

    e.g., `Goldsky Instant Subgraph for NOUNS`

    <Info>*In this case, we'll accept the generic default description.*</Info>

    ```
    │
    ◆  Subgraph description
    │  Goldsky Instant Subgraph for NOUNS
    ┕
    ```

    <Tip>*see [related argument documentation](#description)*</Tip>
  </Step>

  <Step title="Enable call handlers?">
    By enabling call handlers, the subgraph will index all contract calls in addition to events. This will increase the amount of data indexed and may result in a longer indexing time. Choose `Yes` to include calls, otherwise if you only want to index contract events you can choose `No` and move on to the next step.

    <Info>
      *In this case, we will include call handlers, so we'll choose `Yes`.*
    </Info>

    ```
    │
    ◆  Enable subgraph call handlers?
    │  ● Yes / ○ No
    ┕
    ```

    <Tip>*see [related argument documentation](#call-handlers)*</Tip>
  </Step>

  <Step title="Proceed with subgraph initialization?">
    We've finished collecting all the necessary information to initialize your subgraph. A brief summary of all your choices as well as a note on whether build and/or deploy is enabled by default is displayed (you will still have an option to cancel before building or deploying). If you're ready to proceed, choose `Yes` to generate the no-code subgraph configuration file. If anything doesn't look quite right you can choose `No` to abort the wizard and start over.

    <Info>
      *In this case, we're happy with all our choices and will choose `Yes` to
      proceed.*
    </Info>

    ```
    │
    ◇  Subgraph configuration summary
    │
    │  Build and deploy will be performed
    │
    │  Name: nouns-demo
    │  Description: Goldsky Instant Subgraph for NOUNS
    │  Version: 1.0.0-demo+docs
    │  TargetPath: /Users/someone/my-subgraphs/nouns-demo/1.0.0-demo+docs
    │  CallHandlers: enabled
    │  AbiSources:
    │    - /Users/someone/my-subgraphs/nouns-demo/1.0.0-demo+docs/abis
    │  Contracts:
    │    - Address: 0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03
    │      Name: NOUNS
    │      Networks:
    │        - Network: mainnet
    │          StartBlock: 12985438
    │
    ┝━━━
    │
    ◆  Proceed with subgraph initialization?
    │  ● Yes / ○ No
    ┕
    ```

    <Tip>This step is where we fetch any missing ABI's from remote sources.</Tip>
  </Step>

  <Step title="Proceed with subgraph build?">
    Once all no-code subgraph configuration files have been written to the target path, the wizard will ask if you would like to proceed with the build stage. This will compile the generated subgraph(s) into a deployable artifact. If you choose `Yes`, the wizard will run the build stage. If you choose `No`, the wizard will exit and all configuration files will remain in the target path.

    <Info>
      *In this case, we will choose `Yes` to proceed with the build stage.*
    </Info>

    <Tip>
      *If you haven't yet logged in with `goldsky login`, the build step will abort
      with guidance to login first.*
    </Tip>

    ```
    │
    ┕  Subgraph configuration complete!

    ┍  Initializing subgraph nouns-demo/1.0.0-demo+docs
    │
    ◇  Writing subgraph files to '/Users/someone/my-subgraphs/nouns-demo/1.0.0-demo+docs': All subgraph configuration files written!
    │
    ◆  Proceed with subgraph build?
    │  ● Yes / ○ No
    ┕
    ```
  </Step>

  <Step title="Proceed with subgraph deploy?">
    Once the build stage has completed, the wizard will ask if you would like to proceed with the deploy stage. This will deploy the built subgraph(s) to Goldsky for the networks configured (1 subgraph per network). If you choose `Yes`, the wizard will run the deploy stage. If you choose `No`, the wizard will exit and all configuration files will remain in the target path.

    <Info>
      *In this case, we will choose `Yes` to proceed with the deploy stage.*
    </Info>

    ```
    │
    ◇  Building subgraphs: 1 subgraph built!
    │
    ◆  Proceed with subgraph deploy?
    │  ● Yes / ○ No
    ┕
    ```
  </Step>

  <Step title="Subgraph initialization complete!">
    Our subgraph has now been successfully deployed to Goldsky. The wizard provides a summary of the files written locally, the builds and deploys that were performed, and links to the subgraph dashboard and the GraphiQL web interface to query the subgraph data.

    ```
    │
    ◇  Deploying 1 subgraphs
    │
    ◇  nouns-demo-mainnet/1.0.0-demo+docs deployed
    │
    ◇  Subgraph initialization summary
    │
    │  Configuration files:
    │
    │  • …/nouns-demo/1.0.0-demo+docs/abis/nouns.json
    │  • …/nouns-demo/1.0.0-demo+docs/nouns-demo-mainnet-subgraph.json
    │
    │  Build:
    │
    │  ✔  BUILT mainnet
    │
    │  Deploy:
    │
    │  ✔  DEPLOYED nouns-demo-mainnet/1.0.0-demo+docs
    │
    ┝━━━
    │
    ◇  Deployed subgraph summary
    │
    │  nouns-demo-mainnet/1.0.0-demo+docs
    │
    │  • Dashboard: https://app.goldsky.com/…/dashboard/subgraphs/nouns-demo-mainnet/1.0.0-demo+docs
    │  • Queries  : https://api.goldsky.com/api/public/…/subgraphs/nouns-demo-mainnet/1.0.0-demo+docs/gn
    │
    ┝━━━
    │
    ┕  Subgraph initialization complete!
    ```

    <Tip>
      *Most terminals will allow you to `Cmd+click` or `Ctrl+click` on the links to
      open them in your default browser.*
    </Tip>
  </Step>

  <Step title="Visit the subgraph dashboard">
    With our subgraph deployed we can now monitor its indexing progress and stats using the Goldsky Subgraph *Dashboard* link provided by the wizard. Over the next few minutes our subgraph will reach the edge of mainnet and our queryable data will be fully up to date.

    ![Instant Subgraph Indexing](https://mintlify.s3.us-west-1.amazonaws.com/goldsky-38/images/subgraphs/guides/instant-subgraph-indexing.png)

    <Info>*It could take up to a few hours for this subgraph to fully index.*</Info>
  </Step>

  <Step title="Query the subgraph data">
    We can now use the GraphiQL *Queries* web interface link provided by the wizard to query the subgraph data. The GraphiQL web interface allows us to test out queries and inspect the indexed data for our the subgraph. The GraphiQL link is also available from the Goldsky Subgraph dashboard. We can use the following query to monitor the latest (`5`) Nouns minted as the subgraph data is indexed.

    ```graphql
    query LatestNouns($count: Int = 5) {
      nounCreateds(first: $count, orderBy: tokenId, orderDirection: desc) {
        id
        block_number
        transactionHash_
        timestamp_
        tokenId
        seed_background
        seed_body
        seed_accessory
        seed_head
        seed_glasses
      }
    }
    ```

    <Tip>
      *We can query the data as it is being indexed, however until our indexing
      reaches the edge of the chain we won't be able to see the most recent on-chain
      data.*
    </Tip>
  </Step>
</Steps>

## Wizard CLI arguments

The wizard CLI has many optional arguments that you can use to reduce the amount of manual input required. If sufficient arguments are provided, the wizard will run in non-interactive mode and automatically generate the no-code subgraph configuration file without any prompting. If some arguments are provided but not enough for non-interactive mode, the wizard will run in interactive mode and prompt you for any missing information but automatically prepare the default response with any arguments provided so that you may hit enter to use your supplied argument value.

<Tip>
  All arguments are optional, if none are supplied then all information will be
  collected interactively.
</Tip>

### `nameAndVersion` positional argument

This is the only positional argument in the format `name`/`version`. It can be omitted completely, provided as only a `name`, or provided as the full `name` and `version` pair. If only the `name` is provided then the `/` should be omitted. It is not possible to only provide a `version` without a `name`.

* The `name` must start with a letter and contain only letters, numbers, underscores, and hyphens for the name portion.
* The `version` must start with a letter or number and contain only letters, numbers, underscores, hyphens, pluses, and periods

#### Examples

* `my-subgraph_2024/1.0.0`
* `my-subgraph_2024`

### `--target-path`

The target path can be an absolute or relative path to a local directory. If the directory does not yet exist then it will be created, if it does exist then the `--force` [argument](#force) must be provided to overwrite existing files.

#### Examples

All of these examples should result in the same target path (for a user named `someone`).

* `~/my-subgraphs`
* `$HOME/my-subgraphs`
* `/Users/someone/my-subgraphs`
* `$(pwd)/my-subgraphs`

### `--force`

This switch prevents the wizard from prompting you to confirm overwriting existing files, or aborting in non-interactive mode.

#### Examples

* `--force` or `--force true` to overwrite
* `--no-force` or `--force false` avoid overwriting

### `--from-config`

If you already have an existing no-code configuration file, you can provide the path to that file here. The wizard will use this file as a template and prompt you for any missing information as well as attempt to fetch any remote files that are not present. Both JSON and yaml formats are supported, and the file must conform to the [version 1 schema](#version-1).

#### Examples

* `~/my-subgraphs/my-subgraph_2024/1.0/subgraph_config.json`
* `~/my-subgraphs/my-subgraph_2024/1.0/subgraph_config.yaml`

### `--abi`

This argument provides the ABI sources, multiple sources can be provided by joining with a comma. Currently only local sources are supported. Known remote sources for ABI's on various supported networks will be automatically used if no local sources can provide an ABI.

#### Examples

* `~/my-subgraphs/abis`
* `~/my-subgraphs/abis,~/my-abis`

### `--contract`

This argument provides the contract address or addresses to index, multiple addresses can be provided by joining with a comma. Each address must begin with a `0x` and be exactly `42` characters long. When supplying multiple contract addresses, interactive mode will provide defaults for each supplied contract successively and default to adding more contracts until until all supplied contracts have been configured.

#### Examples

* `0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03`
* `0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03,0xA178b166bea52449d56895231Bb1194f20c2f102`

### `--contract-events`

This argument provides the contract events to index, multiple events can be provided by joining with a comma. Only valid event names for the contract ABI will be applied, any discrepancy will present the interactive event selector. When supplying no events the interactive event selector always appear.

#### Examples

* `NounCreated`
* `NounCreated,NounBurned`

### `--contract-calls`

This argument provides the contract calls to index, multiple calls can be provided by joining with a comma. Only valid calls names for the contract ABI will be applied, any discrepancy will present the interactive call selector. When supplying no calls the interactive call selector always appear.

#### Examples

* `approve`
* `approve,burn`

### `--network`

This argument provides the network to index the contract on. The network must be one of the supported networks, refer to our [supported networks](/chains/supported-networks) for the full list of available options. Multiple networks can be provided by joining with a comma. When supplying multiple networks, interactive mode will provide defaults for each supplied network successively and default to adding more networks until all supplied networks have been configured. Note that multiple networks will be applied to each contract supplied, so multiple networks and multiple contracts result in the cartesian product of networks and contracts.

#### Examples

* `mainnet`
* `mainnet,xdai` *(for a single contract, means 2 networks for the same contract are indexed)*
* `mainnet,xdai` *(for two contracts, means 2 contracts for each network, 4 contracts total indexed, 2 per network)*

### `--start-block`

This argument provides the start block to index from, multiple start blocks can be provided by joining with a comma. When supplying multiple start blocks, interactive mode will provide defaults for each supplied start block successively and default to adding more start blocks until all supplied start blocks have been configured. Because a start block is required for each contract and network combination, multiple contracts and multiple networks result in the cartesian product of start blocks. In cases where the start block is not known ahead of time for some contract and network pairs, it can be left empty with successive commas to allow the wizard to attempt to determine the start block from a remote source.

#### Examples

* `12985438`
* `12985438,20922867`
* `12985438,,20922867` *(for 2 contracts and 2 networks, where we know the start blocks for both contracts on the 1st network but not the 2nd network)*

### `--contract-name`

This argument provides the contract name to use in the generated subgraph code, multiple contract names can be provided by joining with a comma. If any contract names contain spaces, the whole argument must be wrapped in quotes. Each contract name must start with a letter and contain only letters, numbers, hypens, underscores, and spaces. When supplying multiple contract names, interactive mode will provide defaults for each supplied contract successively and default to adding more contracts until all supplied contracts have been configured.

#### Examples

* `My-Subgraph_Data`
* `"My Subgraph Data"`
* `"My Subgraph Data,My Other Subgraph Data"`
* `subgraph1,subgraph2`

### `--description`

This argument provides the description for the whole no-code subgraph deployment. If multiple networks are supplied the same description will be used for each subgraph deployuments on each network.

### `--call-handlers`

This switch enables call handlers for the subgraph. By default, call handlers are disabled and only events are indexed. Enabling call handlers will increase the amount of data indexed and may result in a longer indexing time but will provide more contract interaction data.

#### Examples

* `--call-handlers` or `--call-handlers true` to enable
* `--no-call-handlers` or `--call-handlers false` to disable

### `--build`

This switch enables the build stage after the wizard has completed writing the configuration files. By default, the build stage is enabled in interactive mode and disabled in non-interactive mode. Enabling the build stage will compile the generated subgraph(s) into a deployable artifact. Explicitly disabling the build stage will also prevent the deploy stage from running, `--no-build` is all that is required to stop after the write files stage.

#### Examples

* `--build` or `--build true` to enable
* `--no-build` or `--build false` to disable

### `--deploy`

This switch enables the deploy stage after the wizard has completed building the subgraph(s). By default, the deploy stage is enabled in interactive mode and disabled in non-interactive mode. Enabling the deploy stage will deploy the built subgraph(s) to the specified network(s). Enabling the deploy stage will implicitly enable the build stage, `--deploy` is all that is required to run both build and deploy stages.

#### Examples

* `--deploy` or `--deploy true` to enable
* `--no-deploy` or `--deploy false` to disable

## Non-interactive mode

If you're looking to automate the process of deploying a subgraph, you can use the wizard in non-interactive mode by passing all the necessary arguments as flags. This can be useful if you're looking to deploy a subgraph as part of a CI/CD pipeline or other automated process. The command will still write all the necessary files to your target path, but it won't prompt you for any input. If the wizard cannot determine a required input value, the command will abort.

It is recommended to use `--force` and `--build` or `--deploy` flags when running the wizard in non-interactive mode. This will ensure that existing files are overwritten and that the subgraph is built and/or deployed after initialization.

### Examples

1. Deploy the **NOUNS** subgraph on `mainnet`

```
goldsky subgraph init nouns-demo/1.0.0 \
  --contract 0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03 \
  --network mainnet \
  --start-block 12985438 \
  --contract-name NOUNS \
  --call-handlers \
  --deploy
```

2. Deploy the **NOUNS** subgraph on `mainnet` with the interactive event and call selectors

```
goldsky subgraph init nouns-demo/1.0.0 \
  --contract 0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03 \
  --contract-events \
  --contract-calls \
  --network mainnet \
  --start-block 12985438 \
  --contract-name NOUNS \
  --call-handlers \
  --deploy
```

3. Deploy the **Uniswap v3** subgraph on `mainnet`

```
goldsky subgraph init uniswap-v3/1.0.0 \
  --contract 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984 \
  --network mainnet \
  --start-block 10861674 \
  --contract-name UniswapV3 \
  --call-handlers \
  --deploy
```

## Configuration schemas

See the [Instant subgraph configuration reference](/reference/config-file/instant-subgraph) for more information on the configuration schema.
