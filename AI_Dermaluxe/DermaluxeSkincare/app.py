from flask import Flask, request, jsonify, send_from_directory
import pickle
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB connection URI
app.config["MONGO_URI"] = "mongodb+srv://ksuba3210:Subathi123456@cluster1.ob9bh.mongodb.net/mydatabase?retryWrites=true&w=majority"
mongo = PyMongo(app)

# Load the model and encoders
with open('Dermaluxe_Skincare.pkl', 'rb') as file:
    data = pickle.load(file)

model = data["model"]
le_age = data["le_age"]
le_gender = data["le_gender"]
le_skin_type = data["le_skin_type"]
le_skin_tone = data["le_skin_tone"]
le_skin_concern = data["le_skin_concern"]
le_environmental_impact = data["le_environmental_impact"]
le_skin_goals = data["le_skin_goals"]
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
    return '', 204

@app.route('/predict', methods=['POST'])
def predict():
    input_data = request.json
    try:
        # Transform input features
        age = le_age.transform([input_data["age"]])[0]
        gender = le_gender.transform([input_data["gender"]])[0]
        skin_type = le_skin_type.transform([input_data["skin_type"]])[0]
        skin_tone = le_skin_tone.transform([input_data["skin_tone"]])[0]
        skin_concern = le_skin_concern.transform([input_data["skin_concern"]])[0]
        environmental_impact = le_environmental_impact.transform([input_data["environmental_impact"]])[0]
        skin_goals = le_skin_goals.transform([input_data["skin_goals"]])[0]

        # Prepare feature array
        features = [[age, gender, skin_type, skin_tone, skin_concern, environmental_impact, skin_goals]]

        # Predict product attributes
        predictions = model.predict(features)

        if len(predictions[0]) < 8:
            raise ValueError("Model output does not have the expected 8 predictions.")

        # Extract and decode predictions
        product_name = le_product_name.inverse_transform([int(predictions[0][0])])[0]
        brand = le_brand.inverse_transform([int(predictions[0][1])])[0]
        product_type = le_product_type.inverse_transform([int(predictions[0][2])])[0]
        ingredients = le_ingredients.inverse_transform([int(predictions[0][3])])[0]
        price = le_price.inverse_transform([int(predictions[0][4])])[0]
        image_URL = le_image_URL.inverse_transform([int(predictions[0][5])])[0]
        benefit = le_benefit.inverse_transform([int(predictions[0][6])])[0]
        how_to_use = le_how_to_use.inverse_transform([int(predictions[0][7])])[0]

        base_url = "http://127.0.0.1:5000/predict/"
        images_URL = base_url + image_URL if image_URL and not image_URL.startswith("http") else base_url + "0011.png"

        customer_data = {
            "name": input_data["name"],
            "email": input_data["email"],
            "age": input_data["age"],
            "gender": input_data["gender"],
            "skin_type": input_data["skin_type"],
            "skin_tone": input_data["skin_tone"],
            "skin_concern": input_data["skin_concern"],
            "environmental_impact": input_data["environmental_impact"],
            "skin_goals": input_data["skin_goals"],
            "predictions": {
                "product_name": product_name,
                "brand": brand,
                "product_type": product_type,
                "ingredients": ingredients,
                "price": price,
                "image_URL": images_URL,
                "benefit": benefit,
                "how_to_use": how_to_use
            }
        }
        mongo.db.customers.insert_one(customer_data)

        return jsonify(customer_data["predictions"])
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/admin/edit-predictions/<id>', methods=['PUT'])
def edit_predictions(id):
    try:
        updated_predictions = request.json.get('predictions')
        if not updated_predictions:
            return jsonify({"error": "Predictions data is required"}), 400

        result = mongo.db.customers.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"predictions": updated_predictions}}
        )

        return jsonify({"message": "Predictions updated successfully!"}) if result.matched_count > 0 else jsonify({"error": "Customer not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/admin/customers', methods=['GET'])
def get_customers():
    customers = list(mongo.db.customers.find())
    for customer in customers:
        customer["_id"] = str(customer["_id"])
    return jsonify(customers)

@app.route('/admin/customer/<id>', methods=['PUT'])
def update_customer(id):
    updated_data = request.json
    result = mongo.db.customers.update_one({"_id": ObjectId(id)}, {"$set": updated_data})
    return jsonify({"message": "Customer information updated successfully!"}) if result.matched_count > 0 else jsonify({"error": "Customer not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
