---
title: "Subgraph webhooks"
---

# Subgraph webhooks

> Create webhooks that trigger on every subgraph entity change

When you need to execute code or update a backend based on webhooks, you can use subgraph webhooks to send a payload to an HTTP server for every subgraph entity change.

See the [webhook quick start](/subgraphs/guides/send-subgraph-driven-webhooks) for more a step by step guide in using this feature.

If you're using this feature to push and sync data to a database, consider using [mirror](/subgraphs/guides/create-a-multi-chain-subgraph) to sync subgraph data to your backend with guaranteed data delivery.

## How it works

When a subgraph handler does something like `entity.save()`, an update is written to an intermediate db which powers the subgraph API. This update is interpreted by a real-time watcher and set to your webhook handler, with an `UPDATE`, `INSERT`, or `DELETE` operation.

### Interpreting entity updates

If you're tracking an immutable entity (as in one that does not get updated), then this section is not applicable.

Subgraphs store all versions of entities, each with a `block_range` column which shows it's valid for each block range. This allows you to distinguish between an entity changing vs a change being rolled-back due to blockchain reorgs.

### Entity updates and removals

Updates (when an existing entity's `.save()` is called) in a subgraph entity system is denoted as a new version row being created, with a corresponding update on the last version's row.

There is an entity with the `id: 1` created at block 1. A webhook will fire:

```json
{
    op: "INSERT"
    data: {
        new: {
            id: 1,
            value: 1,
            vid: 2,
            block_range: "[1,)"
        },
        old: null
    }
}
```

In the following block number 2, the entity is updated again.

Two webhooks are then fired. One to track the new version being created,

```json
{
    op: "INSERT"
    data: {
        new: {
            id: 1,
            value: 2,
            vid: 2,
            block_range: "[2,)"
        },
        old: null
    }
}
```

Another to track the previous version being updated,

```json
{
    op: "UPDATE"
    data: {
        new: {
            id: 1,
            value: 1,
            vid: 1,
            block_range: "[1,2)"
        },
        old: {
            id: 1,
            value: 1,
            vid: 1,
            block_range: "[1,)"
        }
    }
}
```

Similar to updates, entity removal in a subgraph mapping handler simply involves updating the block range associated with the entity. There is no actual row deletion outside of blockchain reorganizations.

Entities with a "closed" block range (e.g., \[123, 1234)) can be removed if they aren't needed for historical state.

It is recommended to maintain a "deleted\_at" and "updated\_at" timestamp in the local representation of the entity and keep them updated accordingly.

### Tracking the latest state

If your goal is to track the latest state of an entity for the most recent block, when you see any `CREATE` or `UPDATE` webhook, you can do an `upsert` in your database for the `id`. The `id` always tracks a unique entity. The `vid` in the payload denotes the version of the `id`, where the highest `vid` is the latest version.

### Handling Updates and Race Conditions

It is important to note that there is no guarantee of ordering between the insert and update operation webhooks, as they are part of the same atomic operation when a subgraph mapping handler runs.

An effective strategy involves utilizing the "deleted\_at" and "updated\_at" flags in the local representation to manage any potential race conditions.

## Reference

### Create a new webhook

To create a new webhook for a subgraph entity:

```shell
goldsky subgraph webhook create my-subgraph/1.0.0 --name "" --url "" --entity ""
```

Optionally, you can also add `--secret "some-secret"` to have control over the secret you can use to identify valid traffic from goldsky.

### List webhooks

To see a list of already configured webhooks:

```shell
goldsky subgraph webhook list
```

## Delete a webhook

If you no longer need a webhook, you can delete it with the following command:

```shell
goldsky subgraph webhook delete <name>
```

### Webhook Payload

The webhook payload is a JSON object with the following fields:

```json
 {
  "op": "INSERT", // Can be either INSERT, UPDATE, or DELETE
  "data_source": "x2y2/v1", // The subgraph or indexer that is being tracked
  "data": {
    "old": null, // Entity Data, null if op is INSERT
    "new": { // Entity data, null if op is DELETE
      // This is an example from a subgraph tracking x2y2
      "amount": "1",
      "log_index": 268,
      "price_eth": "0.017",
      "strategy": "STANDARD_SALE",
      "collection": "0x7bdb0a896efacdd130e764f426e555d1ebb52f54",
      "seller": "0xd582a0530a1e5aee63052a68aa745657a8471504",
      "transaction_hash": "0x996d3c9cda22fa47e9bb16e4837a28fccbd5643c952ed687a80fd97ceafb69c6",
      "id": "0x996d3c9cda22fa47e9bb16e4837a28fccbd5643c952ed687a80fd97ceafb69c6-268",
      "block_number": "16322627",
      "vid": "1677156",
      "timestamp": "1672705139",
      "is_bundle": false,
      "buyer": "0x539ea5d6ec0093ff6401dbcd14d049c37a77151b",
      "block_range": "[16322627,)",
      "token_id": "383"
    }
  },
  "webhook_name": "x2y2-webhook", // Name of your webhook
  "webhook_id": "webhook_clcfdc9gb00i50hyd43qeeidu" // Uniquely generated ID for the webhook
  "id": "36a1a4a6-1411-4a13-939c-9dd6422b5674",  // Unique ID for the event
  "delivery_info": {
    "max_retries": 10,
    "current_retry": 0
  },
  "entity": "trade" // The subgraph entity being tracked
}
```
