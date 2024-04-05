import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [ingredients, setIngredients] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.API_KEY;

  const fetchRecipesByIngredients = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`
      );

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        throw new Error("Failed to fetch recipes");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ingredients) {
      fetchRecipesByIngredients();
    }
  }, [ingredients]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter ingredients (comma-separated)"
          onChangeText={(text) => setIngredients(text)}
          value={ingredients}
        />
      </View>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={fetchRecipesByIngredients}
      >
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RecipeDetails", { recipe: item })
              }
            >
              <View style={styles.recipeItem}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FAEBD7",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 10,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: "#0C3E31",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
  },
  recipeItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default DashboardScreen;
