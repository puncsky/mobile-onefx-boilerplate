/* tslint:disable:no-any */
import { Button, Modal, Toast } from "@ant-design/react-native";
import gql from "graphql-tag";
import React, { Component } from "react";
import { Query, QueryResult } from "react-apollo";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { apolloClient } from "../../common/apollo-client";
import { AppState } from "../../common/store";
import { i18n } from "../../translations";
import { ThemeProps } from "../../types/theme-props";
import { LoginWebView } from "./login-web-view";
const GET_CONTACT = gql`
  query userProfile($userId: String!) {
    userProfile(userId: $userId) {
      email
    }
  }
`;

export const AccountHeader = connect((state: AppState) => ({
  userId: state.base.userId,
  authToken: state.base.authToken,
  currentTheme: state.base.currentTheme,
  // tslint:disable-next-line:no-non-null-assertion
  styles: getStyles(state.base.currentTheme!)
}))(
  ({
    userId,
    authToken,
    currentTheme,
    styles
  }: {
    userId: string;
    authToken: string;
    currentTheme: ThemeProps;
    styles: any;
  }) => {
    return (
      <View
        style={[
          styles.titleContainer,
          { backgroundColor: currentTheme.theme.primary }
        ]}
      >
        {userId && authToken ? (
          <>
            <Query
              query={GET_CONTACT}
              variables={{
                userId: userId
              }}
              client={apolloClient}
            >
              {({
                data,
                error,
                loading
              }: QueryResult<{
                userProfile: {
                  email: string;
                };
              }>) => {
                if (loading || error || !data || !data.userProfile) {
                  if (error) {
                    Toast.fail(`failed to fetch user: ${error}`, 5);
                  }

                  return <View />;
                }

                return (
                  <>
                    <View>
                      <Text style={styles.nameText} numberOfLines={1}>
                        {data.userProfile.email}
                      </Text>
                    </View>
                  </>
                );
              }}
            </Query>
          </>
        ) : (
          <LoginOrSignUp styles={styles}>
            <Text style={styles.loginSignUpText}>{i18n.t("login")}</Text>
          </LoginOrSignUp>
        )}
      </View>
    );
  }
);

type LoginOrSignUpProps = {
  children: JSX.Element;
  styles: any;
};

type LoginOrSignUpState = {
  shouldDisplayModal: boolean;
};

class LoginOrSignUp extends Component<LoginOrSignUpProps, LoginOrSignUpState> {
  public state: LoginOrSignUpState = {
    shouldDisplayModal: false
  };

  private readonly onCloseModal = () => {
    this.setState({ shouldDisplayModal: false });
  };

  public render(): JSX.Element {
    const { styles } = this.props;
    return (
      <View
        onTouchStart={() => {
          this.setState({ shouldDisplayModal: true });
        }}
      >
        <Modal
          popup
          transparent={false}
          visible={this.state.shouldDisplayModal}
          animationType="slide-up"
          onClose={this.onCloseModal}
        >
          <LoginWebView onClose={this.onCloseModal} isSignUp={false} />
          <Button style={styles.closeButton} onPress={this.onCloseModal}>
            <Text style={styles.closeText}>✕</Text>
          </Button>
        </Modal>

        {this.props.children}
      </View>
    );
  }
}

const getStyles = (currentTheme: ThemeProps) =>
  StyleSheet.create({
    titleContainer: {
      paddingHorizontal: 14,
      paddingTop: 28,
      paddingBottom: 28,
      flexDirection: "row",
      backgroundColor: currentTheme.theme.primary
    },
    nameText: {
      color: currentTheme.theme.white,
      fontWeight: "600",
      fontSize: 24
    },
    loginSignUpText: {
      fontSize: 24,
      color: currentTheme.theme.white,
      fontWeight: "600"
    },
    closeButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: currentTheme.theme.primary,
      position: "absolute",
      bottom: 10,
      right: 10
    },
    closeText: {
      color: currentTheme.theme.primary,
      fontSize: 24
    }
  });
