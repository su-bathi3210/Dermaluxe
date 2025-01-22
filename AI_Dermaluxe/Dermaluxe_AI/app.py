from flask import Flask, request, jsonify, send_from_directory
import pickle
from flack_cros import CORS

app = Flask(__name__)
CORS(app)

# Load the model and encoders
with open('dermaluxe_skincare_producttt.pkl', 'rb') as file:
    data = pickle.load(file)

model = data["model"]
le_age = data["le_age"]
le_skin_type = data["le_skin_type"]
le_skin_tone = data["le_skin_tone"]
le_skin_concern = data["le_skin_concern"]
le_product_name = data["le_product_name"]
le_brand = data["le_brand"]
le_product_type = data["le_product_type"]
le_ingredients = data["le_ingredients"]
le_price = data["le_price"]
le_image_URL = data["le_image_URL"]
le_benefit = data["le_benefit"]
le_how_to_use = data["le_how_to_use"]

@app.route('/predict/product-images/<path:filename>')
def static_files(filename):
    return send_from_directory('product-images', filename)


@app.route('/favicon.ico')
def favicon():
    return '', 204  # Return No Content for the favicon request

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json
    try:
        # Transform input features
        age = le_age.transform([input_data["age"]])[0]
        skin_type = le_skin_type.transform([input_data["skin_type"]])[0]
        skin_tone = le_skin_tone.transform([input_data["skin_tone"]])[0]
        skin_concern = le_skin_concern.transform([input_data["skin_concern"]])[0]

        # Prepare feature array
        features = [[age, skin_type, skin_tone, skin_concern]]

        # Predict product attributes
        predictions = model.predict(features)

        # Ensure predictions output is valid
        if len(predictions[0]) < 8:
            raise ValueError("Model output does not have the expected 8 predictions.")

        # Extract predictions
        product_name_prediction = predictions[0][0]
        brand_prediction = predictions[0][1]
        product_type_prediction = predictions[0][2]
        ingredients_prediction = predictions[0][3]
        price_prediction = predictions[0][4]
        image_URL_prediction = predictions[0][5]
        benefit_prediction = predictions[0][6]
        how_to_use_prediction = predictions[0][7]

        # Decode predictions
        product_name = le_product_name.inverse_transform([int(product_name_prediction)])[0]
        brand = le_brand.inverse_transform([int(brand_prediction)])[0]
        product_type = le_product_type.inverse_transform([int(product_type_prediction)])[0]
        ingredients = le_ingredients.inverse_transform([int(ingredients_prediction)])[0]
        price = le_price.inverse_transform([int(price_prediction)])[0]
        image_URL = le_image_URL.inverse_transform([int(image_URL_prediction)])[0]
        benefit = le_benefit.inverse_transform([int(benefit_prediction)])[0]
        how_to_use = le_how_to_use.inverse_transform([int(how_to_use_prediction)])[0]

        # Prepend base URL for images
        base_url = "http://127.0.0.1:5000/predict/"
        if not image_URL.startswith("http"):
            if image_URL:  # Check if the image URL exists
                images_URL = base_url + image_URL
            else:
                images_URL = base_url + "0011.png"

        # Return predictions as JSON
        return jsonify({
            "Product Name": product_name,
            "Brand": brand,
            "Product Type": product_type,
            "Ingredients": ingredients,
            "Price": price,
            "Image_URL": images_URL,
            "Benefit": benefit,
            "How To Use": how_to_use,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
