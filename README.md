# SSKA_Web_Extension

# Data Collection
We first extracted data of Article 370 and US elections using the youtube api.Then wee made Tf-Idf vectors and Google Universal encoder vectors for the entire data.
The google colab for extraccting the data and generating its vectors is "".

# Running the Model
We then used K Means Clustering to generate clusters of the data.We observed that Google Universal encoder vectors generated more precise vectors as compared to Tfidf vectors.
The clustering algorithm gave the labels of 0,1 and 2 for the 3 clusters formed.The three clusters formed in Artcile 370 data displayed the three different opinions "For removal of Article 370","Against Removal of Article 370" and "Neutral" opinion.
The clusters fromed in US elections data displayed the three opinions as "Democrat","Republican" and "Neutral".All this work is done in the google colab named "Backend_Article370.ipynb" and "".
A final dataframe was generated which contained the videeo id,vide title,video url and the labels for all the videos.480 videos were collected for US elections and 534 videos weere colleccted for Article 370.These dataframes were then converted a csv and stored.This csv was further converted to a Javascript dictionary.
After that both these dictionary were imported in our final extension directory.

# Running the Final Extension
Clone the main directory and run the srcript.js in live server using the visual studio code.
