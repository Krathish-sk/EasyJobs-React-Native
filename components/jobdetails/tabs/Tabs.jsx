import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SIZES } from "../../../constants";

import styles from "./tabs.style";

function TabButton({ name, activeTab, onHandleSearchType }) {
  return (
    <TouchableOpacity
      onPress={onHandleSearchType}
      style={styles.btn(name, activeTab)}
    >
      <Text style={styles.btnText(name, activeTab)}>{name}</Text>
    </TouchableOpacity>
  );
}

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={(item) => (
          <TabButton
            name={item.item}
            activeTab={activeTab}
            onHandleSearchType={() => setActiveTab(item.item)}
          />
        )}
        keyExtractor={(item) => item}
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Tabs;
