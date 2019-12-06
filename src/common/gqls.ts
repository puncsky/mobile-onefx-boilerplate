import gql from "graphql-tag";

export const ADD_PUSH_TOKEN = gql`
  mutation addPushToken($pushToken: String) {
    addPushToken(token: $pushToken)
  }
`;
