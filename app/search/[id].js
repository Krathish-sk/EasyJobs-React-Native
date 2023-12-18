import { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useGlobalSearchParams, Stack, useRouter } from "expo-router";
import axios from "axios";

import { ScreenHeaderBtn, NearbyJobCard } from "../../components";
import { COLORS, SIZES, icons } from "../../constants";
import styles from "../../styles/search";

export default function JobSearch() {
  const router = useRouter();
  const { id } = useGlobalSearchParams();

  const [searchResult, setSearchResult] = useState([]);
  const [searchLoader, setSearchLoader] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [page, setPage] = useState(1);

  async function handleSearch() {
    setSearchLoader(true);
    setSearchResult([]);

    try {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/search`,
        params: { query: id, num_pages: page.toString() },
        headers: {
          "X-RapidAPI-Key":
            "",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };

      const res = await axios.request(options);
      setSearchResult(res.data.data);
    } catch (error) {
      setSearchError(true);
      console.log(error);
    } finally {
      setSearchLoader(false);
    }
  }

  function handlePagination(direction) {
    if (direction === "left" && page > 1) {
      setPage(page - 1);
      handleSearch();
    } else if (direction === "right") {
      setPage(page + 1);
      handleSearch();
    }
  }

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),
        }}
      />
      <FlatList
        data={searchResult}
        keyExtractor={(item) => item}
        contentContainerStyle={{ padding: SIZES.medium, rowGap: SIZES.medium }}
        renderItem={(item) => (
          <NearbyJobCard
            job={item.item}
            handleNavigate={() =>
              router.push(`/job-details/${item.item.job_id}`)
            }
          />
        )}
        ListHeaderComponent={() => (
          <>
            <View style={styles.container}>
              <Text style={styles.searchTitle}>{id}</Text>
              <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
            </View>
            <View style={styles.loaderContainer}>
              {searchLoader ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                searchError && <Text>Oops something went wrong !!</Text>
              )}
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => handlePagination("left")}
              style={styles.paginationButton}
            >
              <Image
                source={icons.chevronLeft}
                resizeMode="contain"
                style={styles.paginationImage}
              />
            </TouchableOpacity>
            <View style={styles.paginationTextBox}>
              <Text style={styles.paginationText}>{page}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handlePagination("right")}
              style={styles.paginationButton}
            >
              <Image
                source={icons.chevronRight}
                style={styles.paginationImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
