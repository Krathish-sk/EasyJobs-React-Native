import { View, Text, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import { COLORS } from "../../../constants";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Nearbyjobs() {
  const router = useRouter();

  const { data, isLoading, error } = useFetch("search", {
    query: "Software engineer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Latest jobs</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong !!</Text>
        ) : (
          data?.map((item) => {
            return (
              <NearbyJobCard
                job={item}
                key={`nearby-job-${item?.job_id}`}
                handleNavigate={() =>
                  router.push(`/job-details/${item?.job_id}`)
                }
              />
            );
          })
        )}
      </View>
    </View>
  );
}
