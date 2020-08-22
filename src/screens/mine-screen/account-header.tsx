/* tslint:disable:no-any */
import { Button, Modal, Toast } from "@ant-design/react-native";
import gql from "graphql-tag";
import * as React from "react";
import { Query, QueryResult } from "react-apollo";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { AppState } from "@/common/store";
import { theme } from "@/common/theme";
import { i18n } from "@/translations";
import { LoginWebView } from "@/screens/mine-screen/login-web-view";
import { useStateIfMounted } from "@/common/hooks/use-state-if-mounted";

const getStyles = () =>
  StyleSheet.create({
    titleContainer: {
      paddingHorizontal: 14,
      paddingTop: 28,
      paddingBottom: 28,
      flexDirection: "row",
      backgroundColor: theme.primary
    },
    nameText: {
      color: theme.white,
      fontWeight: "600",
      fontSize: 24
    },
    loginSignUpText: {
      fontSize: 24,
      color: theme.white,
      fontWeight: "600"
    },
    closeButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.primary,
      position: "absolute",
      bottom: 10,
      right: 10
    },
    closeText: {
      color: theme.white,
      fontSize: 24
    }
  });

const GET_CONTACT = gql`
  query userProfile($userId: String!) {
    userProfile(userId: $userId) {
      email
    }
  }
`;

export const AccountHeader = connect((state: AppState) => ({
  userId: state.base.userId,
  authToken: state.base.authToken
}))(({ userId, authToken }: { userId: string; authToken: string }) => {
  return (
    <View
      style={[getStyles().titleContainer, { backgroundColor: theme.primary }]}
    >
      {userId && authToken ? (
        <>
          <Query
            query={GET_CONTACT}
            variables={{
              userId
            }}
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
                    <Text style={getStyles().nameText} numberOfLines={1}>
                      {data.userProfile.email}
                    </Text>
                  </View>
                </>
              );
            }}
          </Query>
        </>
      ) : (
        <LoginOrSignUp>
          <Text style={getStyles().loginSignUpText}>{i18n.t("login")}</Text>
        </LoginOrSignUp>
      )}
    </View>
  );
});

const getLoginOrSignUpStyles = () =>
  StyleSheet.create({
    closeButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.primary,
      position: "absolute",
      bottom: 10,
      right: 10
    },
    closeText: {
      color: theme.white,
      fontSize: 24
    }
  });

type LoginOrSignUpProps = {
  children: JSX.Element;
  isSignUp?: boolean;
};

export function LoginOrSignUp(props: LoginOrSignUpProps): JSX.Element {
  const [shouldDisplayModal, setShouldDisplayModal] = useStateIfMounted(false);

  const onCloseModal = () => {
    setShouldDisplayModal(false);
  };

  const styles = getLoginOrSignUpStyles();
  return (
    <View
      onTouchStart={() => {
        setShouldDisplayModal(true);
      }}
    >
      <Modal
        popup
        transparent={false}
        visible={shouldDisplayModal}
        animationType="slide-up"
        onClose={onCloseModal}
      >
        <LoginWebView
          onClose={onCloseModal}
          isSignUp={Boolean(props.isSignUp)}
        />
        <Button style={styles.closeButton} onPress={onCloseModal}>
          <Text style={styles.closeText}>✕</Text>
        </Button>
      </Modal>

      {props.children}
    </View>
  );
}
