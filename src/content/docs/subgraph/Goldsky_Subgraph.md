---
title: "Create no-code subgraphs"
---

# Create no-code subgraphs

## What you'll need

1. The contract address you're interested in indexing.
2. The ABI (Application Binary Interface) of the contract.

## Walkthrough

<Accordion title="Video walkthrough" icon="video">
  <iframe src="https://jumpshare.com/embed/Qs5rjmavZWFDI9pBCa7g?hideTitle=true" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen width="100%" height="450px" />
</Accordion>

<Steps>
  <Step title="Getting the ABI">
    If the contract you’re interested in indexing is a contract you deployed, then you’ll have the contract address and ABI handy. Otherwise, you can use a mix of public explorer tools to find this information. For example, if we’re interested in indexing the [friend.tech](http://friend.tech) contract…

    1. Find the contract address from [Dappradar](https://dappradar.com/)
    2. Click through to the [block explorer](https://basescan.org/address/0xcf205808ed36593aa40a44f10c7f7c2f67d4a4d4#code) where the ABI can be found under the `Contract ABI` section.

    Save the ABI to your local file system and make a note of the contract address. Also make a note of the block number the contract was deployed at, you’ll need this at a later step.
  </Step>

  <Step title="Creating the configuration file">
    The next step is to create the Instant Subgraph configuration file (e.g. `friendtech-config.json`). This file consists of five key sections:

    1. Config version number
    2. Config name
    3. ABIs
    4. Chains
    5. Contract instances

    ### Version number

    <Info>
      As of October 2023, our Instant Subgraph configuration system is on version 1.
      This may change in the future. This is **not the version number of your
      subgraph**, but of Goldsky's configuration file format.
    </Info>

    ### Config name

    This is a name of your choice that helps you understand what this config is for. It is only used for internal debugging. For this guide, we'll use `friendtech`.

    ### ABIs, chains, and contract instances

    These three sections are interconnected.

    1. Name your ABI and enter the path to the ABI file you saved earlier (relative to where this config file is located). In this case, `ftshares` and `abi.json`.
    2. Write out the contract instance, referencing the ABI you named earlier, address it's deployed at, chain it's on, the start block.

    ```json friendtech-config.json
    {
      "version": "1",
      "name": "friendtech",
      "abis": {
        "ftshares": {
          "path": "./abi.json"
        }
      },
      "instances": [
        {
          "abi": "ftshares",
          "address": "0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4",
          "startBlock": 2430440,
          "chain": "base"
        }
      ]
    }
    ```

    <Info>
      The abi name in `instances` should match a key in `abis`, in this example,
      `ftshares`. It is possible to have more than one `chains` and more than one
      ABI. Multiple chains will result in multiple subgraphs. The file `abi.json` in
      this example should contain the friendtech ABI [downloaded from
      here](https://api.basescan.org/api?module=contract\&action=getabi\&address=0xcf205808ed36593aa40a44f10c7f7c2f67d4a4d4\&format=raw).
    </Info>

    This configuration can handle multiple contracts with distinct ABIs, the same contract across multiple chains, or multiple contracts with distinct ABIs on multiple chains.

    **For a complete reference of the various properties, please see the [Instant Subgraphs references docs](/reference/config-file/instant-subgraph)**
  </Step>

  <Step title="Deploying the subgraph">
    With your configuration file ready, it's time to deploy the subgraph.

    1. Open the CLI and log in to your Goldsky account with the command: `goldsky login`.
    2. Deploy the subgraph using the command: `goldsky subgraph deploy name/version --from-abi <path-to-config-file>`, then pass in the path to the config file you created. Note - do NOT pass in the ABI itself, but rather the config file defined above. Example: `goldsky subgraph deploy friendtech/1.0 --from-abi friendtech-config.json`

    Goldsky will generate all the necessary subgraph code, deploy it, and return an endpoint that you can start querying.

    Clicking the endpoint link takes you to a web client where you can browse the schema and draft queries to integrate into your app.
  </Step>
</Steps>

## Extending your subgraph with enrichments

Enrichments are a powerful way to add additional data to your subgraph by performing eth calls in the middle of an event or call handler.

See the [enrichments configuration reference](/reference/config-file/instant-subgraph#instance-enrichment) for more information on how to define these enrichments, and for an [example configuration with enrichments](/reference/config-file/instant-subgraph#nouns-enrichment-with-balances-on-transfer).

### Concepts

* Enrichments are defined at the instance level, and executed at the trigger handler level. This means that you can have different enrichments for different data sources or templates and that all enrichment executions are isolated to the handler they are being called from.
  * any additional imports from `@graphprotocol/graph-ts` beyond `BigInt`, `Bytes`, and `store` can be declared in the `options.imports` field of the enrichment (e.g., `BigDecimal`).
* Enrichments always begin by performing all eth calls first, if any eth calls are aborted then the enrichment as a whole is aborted.
  * calls marked as `required` or having another call declare them as a `depends_on` dependency will abort if the call is not successful, otherwise the call output value will remain as `null`.
  * calls marked as `declared` will configure the subgraph to execute the call prior to invoking the mapping handler. This can be useful for performance reasons, but only works for eth calls that have no mapping handler dependencies.
  * calls support `pre` and `post` expressions for `conditions` to test before and after the call, if either fails the call is aborted. Since these are expressions, they can be dynamic or constant values.
  * call `source` is an expression and therefore allows for dynamic values using math or concatenations. If the `source` is simply a contract address then it will be automatically converted to an `Address` type.
  * call `params` is an expression list and can also be dynamic values or constants.
* Enrichments support defining new entities as well as updating existing entities. If the entity name matches the trigger entity name, then the entity field mappings will be applied to the existing entity.
  * entity names should be singular and capitalized, this will ensure that the generated does not produce naming conflicts.
  * entity field mapping values are expressions and can be dynamic or constant values.
  * new enrichment entities are linked to the parent (trigger) entity that created them, with the parent (trigger) entity also linking to the new entity or entities in the opposite direction (always a collection type).
  * note that while you can define existing entities that are not the trigger entity, you may not update existing entities only create new instances of that entity.
  * entities support being created multiple times in a single enrichment, but require a unique `id` expression to be defined for each entity, `id` can by a dynamic value or a constant. this `id` is appended to the parent entity `id` to create a unique `id` for each enrichment entity in the list.
  * entities can be made mutable by setting the `explicit_id` flag to `true`, this will use the value of `id` without appending it to the parent entity `id`, creating an addressable entity that can be updated.

### Snippets

Below are some various examples of configurations for different scenarios. To keep each example brief, we will only show the `enrich` section of the configuration, and in most cases only the part of the `enrich` section that is relevant. See the [enrichments configuration reference](/reference/config-file/instant-subgraph#instance-enrichment) for the full configuration reference.

#### Options

Here we are enabling debugging for the enrichment (this will output the enrichment steps to the subgraph log), as well as importing `BigDecimal` for use in a `calls` or `entities` section.

```json
"enrich": {
  "options": {
    "imports": ["BigDecimal"],
    "debugging": true
  }
}
```

#### Call self

Here we are calling a function on the same contract as the trigger event. This means we can omit the `abi` and `source` configuration fields, as they are implied in this scenario, we only need to include the `name` and `params` fields (if the function declares paramters). We can refer to the result of this call using `calls.balance`.

```json
"calls": {
  "balance": {
    "name": "balanceOf",
    "params": "event.params.owner"
  }
}
```

#### Call dependency

Here we are creating a 2-call dependency, where the second call depends on the first call (the params are `calls.owner` meaning we need the value of the `owner` call before we can invoke `balanceOf`). This means that if the first call fails, the second call will not be executed. Calls are always executed in the order they are configured, so the second call will have access to the output of the first call (in this example, we use that output as a parameter to the second call). We can list multiple calls in the `depends_on` array to create a dependency graph (if needed). Adding a call to the `depends_on` array will not automatically re-order the calls, so be sure to list them in the correct order.

```json
"calls": {
  "owner": {
    "name": "ownerOf",
    "params": "event.params.id"
  },
  "balance": {
    "depends_on": ["owner"],
    "name": "balanceOf",
    "params": "calls.owner"
  }
}
```

#### External contract call for known address

Here we are calling a function on an external contract, where we know the address of the contract ahead of time. In this case, we need to include the `abi` and `source` configuration fields.

```json
"calls": {
  "usdc_balance": {
    "abi": "erc20",
    "source": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "name": "balanceOf",
    "params": "event.params.owner"
  }
}
```

#### External contract call for dynamic address

Here we are setting up a 2 call chain to first determine the contract address, then call a function on that contract. In our example, the `contractAddress` function is returning an `Address` type so we can use the call result directly in the `source` field of the second call. If `contractAddress` was instead returning a `string` type, then we would use `"source": "Address.fromString(calls.contract_address)"`, though this would be an unusual case to observe.

```json
"calls": {
  "contract_address": {
    "name": "contractAddress",
    "params": "event.params.id"
  },
  "balance": {
    "depends_on": ["contract_address"],
    "abi": "erc20",
    "source": "calls.contract_address",
    "name": "balanceOf",
    "params": "event.params.owner"
  }
}
```

#### Required call

Here we are marking a call as required, meaning that if the call fails then the enrichment as a whole will be aborted. This is useful when you do not want to create a new entity (or enrich an existing entity) if the call does not return any meaningful data. Also note that when using `depends_on`, the dependency call is automatically marked as required. This should be used when the address of the contract being called may not always implement the function being called.

```json
"calls": {
  "balance": {
    "abi": "erc20",
    "name": "balanceOf",
    "source": "event.params.address",
    "params": "event.params.owner",
    "required": true
  }
}
```

#### Pre and post conditions

Here we are using conditions to prevent a call from being executed or to abort the enrichment if the call result is not satisfactory. Avoiding an eth call can have a big performance impact if the inputs to the call are often invalid. Avoiding the creation of an entity can save on entity counts if the entity is not needed or useful for various call results. Conditions are simply checked at their target site in the enrichment, and evaluated to its negation to check if an abort is necessary (e.g., `true` becomes `!(true)`, which is always false and therefore never aborts). In this example, we're excluding the call if the `owner` is in a deny list, and we're aborting the enrichment if the balance is `0`.

```json
"calls": {
  "balance": {
    "name": "balanceOf",
    "params": "event.params.owner",
    "conditions": {
      "pre": "![Address.zero().toHexString(), \"0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03\"].includes(event.params.owner.toHexString())",
      "post": "result.value.gt(BigInt.zero())"
    }
  }
}
```

#### Simple entity field mapping constant

Here were are simply replicating the `id` field from the event params into our enrichment entity. This can be useful if you want to filter or sort the enrichment entities by this field.

```json
  "MyEntity": {
    "id uint256": "event.params.id"
  },
```

#### Simple entity field mapping expression

Here we are applying a serialization function to the value of a call result. This is necessary as the enrichment code generator does not resolve the effective type of an expression, so if there is a type mismatch a serialization function must be applied (in this case `String` vs `Address`).

```json
  "MyEntity": {
    "owner address": "calls.owner.toHexString()"
  },
```

#### Complex entity field mapping expression

Here we are conditionally setting the value of `usd_balance` on whether or not the `usdc_balance` call was successful. If the call was not successful, then we set the value to `BigDecimal.zero()`, otherwise we divide the call result by `10^6` (USDC decimals) to convert the balance to a `USD` value.

```json
  "MyEntity": {
    "usd_balance fixed": "calls.usdc_balance === null ? BigDecimal.zero() : calls.usdc_balance!.divDecimal(BigInt.fromU32(10).pow(6).toBigDecimal())"
  },
```

<Snippet file="getting-help.mdx" />

#### Multiple entity instances

Here we are creating multiple instances of an entity in a single enrichment. Each entity id will be suffixed with the provided `id` value.

```json
  "MyEntity": [
    {
      "id": "'sender'",
      "mapping": {
        "balance fixed": "calls.balance"
      }
    },
    {
      "id": "'receiver'",
      "mapping": {
        "balance fixed": "calls.balance"
      }
    }
  ]
```

#### Addressable entity

Here we are creating an entity that is addressable by an explicit id. This means that we can update this entity with new values.

```json
  "MyEntity": [
    {
      "id": "calls.owner.toHexString()",
      "explicit_id": true,
      "mapping": {
        "current_balance fixed": "calls.balance"
      }
    }
  ]
```

<Tip>
  *We must use an array for our entity definition to allow setting the
  `explicit_id` flag.*
</Tip>

## Examples

Here are some examples of various instant subgraph configurations. Each example builds on the previous example.

Each of these examples can be saved locally to a file (e.g., `subgraph.json`) and deployed using `goldsky subgraph deploy nouns/1.0.0 --from-abi subgraph.json`.

### Simple NOUNS example

This is a basic instant subgraph configuration, a great starting point for learning about instant subgraphs.

```json5 simple-nouns-config.json
{
  version: "1",
  name: "nouns/1.0.0",
  abis: {
    nouns: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
    ],
  },
  instances: [
    {
      abi: "nouns",
      address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
      startBlock: 12985438,
      chain: "mainnet",
    },
  ],
}
```

### NOUNS enrichment with receiver balance on transfer

This example describes a very simple enrichment that adds a `balance` field to a `Balance` enrichment entity. This `balance` field is populated by calling the `balanceOf` function on the `to` address of the `Transfer` event.

```json5 nouns-balance-config.json
{
  version: "1",
  name: "nouns/1.0.0",
  abis: {
    nouns: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
  instances: [
    {
      abi: "nouns",
      address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
      startBlock: 12985438,
      chain: "mainnet",
      enrich: {
        handlers: {
          "Transfer(indexed address,indexed address,indexed uint256)": {
            calls: {
              balance: {
                name: "balanceOf",
                params: "event.params.to",
                required: true,
              },
            },
            entities: {
              Balance: {
                "owner address": "event.params.to.toHexString()",
                "balance uint256": "calls.balance",
              },
            },
          },
        },
      },
    },
  ],
}
```

### NOUNS enrichment with sender & receiver balance on transfer entities

This example alters our previous example by capturing the `balance` field on both `FromBalance` and `ToBalance` enrichment entities. This `balance` field is populated by calling the `balanceOf` function on both the `from` and `to` address of the `Transfer` event.

```json5 nouns-balance-config-2.json
{
  version: "1",
  name: "nouns/1.0.0",
  abis: {
    nouns: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
  instances: [
    {
      abi: "nouns",
      address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
      startBlock: 12985438,
      chain: "mainnet",
      enrich: {
        handlers: {
          "Transfer(indexed address,indexed address,indexed uint256)": {
            calls: {
              from_balance: {
                name: "balanceOf",
                params: "event.params.from",
                required: true,
              },
              to_balance: {
                name: "balanceOf",
                params: "event.params.to",
                required: true,
              },
            },
            entities: {
              FromBalance: {
                "owner address": "event.params.from.toHexString()",
                "balance uint256": "calls.from_balance",
              },
              ToBalance: {
                "owner address": "event.params.to.toHexString()",
                "balance uint256": "calls.to_balance",
              },
            },
          },
        },
      },
    },
  ],
}
```

### NOUNS enrichment with mutable current balance on transfer for both sender & receiver

This example alters our previous example balance entities to become a single mutable `Balance` entity, so that both sender and receiver use the same entity.

```json5 nouns-mutable-balance-config.json
{
  version: "1",
  name: "nouns/1.0.0",
  abis: {
    nouns: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
  instances: [
    {
      abi: "nouns",
      address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
      startBlock: 12985438,
      chain: "mainnet",
      enrich: {
        handlers: {
          "Transfer(indexed address,indexed address,indexed uint256)": {
            calls: {
              from_balance: {
                name: "balanceOf",
                params: "event.params.from",
                required: true,
              },
              to_balance: {
                name: "balanceOf",
                params: "event.params.to",
                required: true,
              },
            },
            entities: {
              Balance: [
                {
                  id: "event.params.from.toHexString()",
                  explicit_id: true,
                  mapping: {
                    "balance uint256": "calls.from_balance",
                  },
                },
                {
                  id: "event.params.to.toHexString()",
                  explicit_id: true,
                  mapping: {
                    "balance uint256": "calls.to_balance",
                  },
                },
              ],
            },
          },
        },
      },
    },
  ],
}
```

<Tip>
  We can now query the `Balance` entity by the owner address (`id`) to see the current balance.

  ```graphql
  {
    balance(id: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03") {
      id
      balance
    }
  }
  ```
</Tip>

### NOUNS enrichment with declared eth call

This example alters our previous example by adding the `declared` flag to boost performance of the `balanceOf` eth calls. declared calls only work for eth calls that have no mapping handler dependencies, in other words the call can be executed from the event params only. Also note that call handlers do not support delcared calls (yet), if `declared` is set on a call handler enrichment it will be ignored.

```json5 nouns-declared-calls-config.json
{
  version: "1",
  name: "nouns/1.0.0",
  abis: {
    nouns: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [{ internalType: "address", name: "owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ],
  },
  instances: [
    {
      abi: "nouns",
      address: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
      startBlock: 12985438,
      chain: "mainnet",
      enrich: {
        handlers: {
          "Transfer(indexed address,indexed address,indexed uint256)": {
            calls: {
              from_balance: {
                name: "balanceOf",
                params: "event.params.from",
                required: true,
                declared: true,
              },
              to_balance: {
                name: "balanceOf",
                params: "event.params.to",
                required: true,
                declared: true,
              },
            },
            entities: {
              Balance: [
                {
                  id: "event.params.from.toHexString()",
                  explicit_id: true,
                  mapping: {
                    "balance uint256": "calls.from_balance",
                  },
                },
                {
                  id: "event.params.to.toHexString()",
                  explicit_id: true,
                  mapping: {
                    "balance uint256": "calls.to_balance",
                  },
                },
              ],
            },
          },
        },
      },
    },
  ],
}
```
