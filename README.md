# Project with events and Kafka

This project is a small example of a CQRS architecture.
You can add a product with a GraphQL mutation which will create an event queued in Kafka. A consumer script
will consume the event and create an entity in MongoDB. You will then be able to query
the new entity with a GraphQL query

## Pre-requisites
* Kafka (see [here](https://kafka.apache.org/quickstart) for tutorial)
* Node v10.22.0
* MongoDB (see [here](https://zellwk.com/blog/install-mongodb/) for tutorial)
* Yarn v1.22.10

## Usage

You will need to launch the API to be able to query it :
```shell
yarn start
```

A graphQL mutation query that can be done is the following :
```
mutation {
  addProduct(
    newProductData: {
      title: "titre"
      description: "autre description qu'il faut tester"
    }
  )
}
```

The response given by the API contains the id of the future entity :
```json
{
  "data": {
    "addProduct": "605adb2595e0894c6b9382a3"
  }
}
```

You can then launch the consumer by launching the following command in your terminal :
```shell
yarn consumer
```

After being notified that the event has been consumed, you can query the API with a GraphQL query : 
```
{
  products {
    _id,
    description,
    title
  }
}
```

An example result of the query above is : 
```json
{
  "data": {
    "products": [
      {
        "_id": "605ad28548dfd244b6dfc490",
        "description": "autre description qu'il faut tester",
        "title": "titre"
      },
      {
        "_id": "605ad6c4cf93f546899b4365",
        "description": "autre description qu'il faut tester",
        "title": "titre"
      },
      {
        "_id": "605ad6c4cf93f546899b4366",
        "description": "autre description qu'il faut tester",
        "title": "titre"
      }
    ]
  }
}
```
