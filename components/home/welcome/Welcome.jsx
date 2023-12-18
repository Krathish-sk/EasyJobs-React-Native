import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { router, useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contract"];

export default function Welcome({ handleClick, searchTerm, setSearchTerm }) {
  const [activeJobType, setActiveJobType] = useState("Full-time");
  return (
    <View>
      {/* Heading */}
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Krathish K</Text>
        <Text style={styles.welcomeMessage}>Find your next perfect job</Text>
      </View>
      {/* Search section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            placeholder="What are you looking for ?"
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
          />
        </View>
        <TouchableOpacity onPress={handleClick} style={styles.searchBtn}>
          <Image
            source={icons.search}
            style={styles.searchBtnImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      {/* Job type section */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          keyExtractor={(item) => item}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.small }}
          renderItem={(item) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item.item);
                router.push(`/search/${item.item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>
                {item.item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
