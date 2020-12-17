// import * as React from "react";
// import { StyleProp, Text, TextStyle } from "react-native";

// interface Props {
//   style?: StyleProp<TextStyle>;
//   children: string;
// }

// export function MonoText(props: Props): JSX.Element {
//   const { children } = props;
//   return (
//     <Text {...props} style={[props.style, { fontFamily: "space-mono" }]}>
//       {children}
//     </Text>
//   );
// }
import * as React from "react";

import { Text, TextProps } from "./themed-text";

export function MonoText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}
