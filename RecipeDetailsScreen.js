import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = process.env.API_KEY;
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
        );

        if (response.ok) {
          const result = await response.json();
          setRecipeDetails(result);
        } else {
          throw new Error("Failed to fetch recipe details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetails();
  }, [recipe.id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {recipeDetails ? (
        <>
          <Text style={styles.title}>{recipeDetails.title}</Text>
          <Image source={{ uri: recipeDetails.image }} style={styles.image} />
          <Text style={styles.sectionTitle}>Instructions:</Text>
          <Text style={styles.instructions}>{recipeDetails.instructions}</Text>
          <Text style={styles.sectionTitle}>Missed Ingredients:</Text>
          {recipeDetails.extendedIngredients.map((ingredient) => (
            <View key={ingredient.id} style={styles.ingredientContainer}>
              <Text style={styles.ingredientName}>{ingredient.name}</Text>
              <Image
                source={{
                  uri: `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`,
                }}
                style={styles.ingredientImage}
              />
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FAEBD7",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#0C3E31",
  },
  instructions: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
    textAlign: "justify",
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  ingredientName: {
    fontSize: 16,
    marginLeft: 10,
  },
  ingredientImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 8,
    marginLeft: 50,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#333",
  },
});

export default RecipeDetailsScreen;
