# Next Apollo AppSync
A fork of [next-apollo](https://github.com/adamsoffer/next-apollo) to work with AWS AppSync for SSR React Applications

_a fix issues of incorrectly fetching graphql data by using apollo-link for appsync client

![](https://s3.amazonaws.com/aws-mobile-hub-images/nextjs.jpg)

## Installation

```bash
npm i next-apollo-appsync-arron
```

## Documentation
Create an Apollo configuration object (check out the Apollo Client API for more configuration options). Pass the configuration object to the withAppSyncData higher-order component and export the returned component.

```js
// withData.js

import { withAppSyncData } from 'next-apollo-appsync-arron'

const config = {
  url: "https://<YOURAPI>.us-east-2.amazonaws.com/graphql",
  region: "us-east-2", // or whatever your region is
  auth: {
    type: "API_KEY",
    apiKey: "<YOURAPIKEY>",

    // Other auth use cases
    // Amazon Cognito Federated Identities using AWS Amplify
    //credentials: () => Auth.currentCredentials(),

    // Amazon Cognito user pools using AWS Amplify
    // type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    // jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  },
}

export default withAppSyncData(config)
```

Inside your Next.js page, wrap your component with your exported higher order component.

```js
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import withData from '../withData'

const query = gql`
  query listTodos {
    listTodos {
      items {
        id
        name
        completed
      }
    }
  }
`

class Todos extends React.Component {
  render() {
    return <div>
      <p>Hello World</p>
    </div>
  }
}

const TodosWithData = graphql(query, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({ todos: props.data.listTodos ? props.data.listTodos.items : [] })
})(Todos)

export default withData(TodosWithData)
```

## License

MIT
