#!/usr/bin/env/python3.9
""" Entry point for the application """
from flask import Flask, make_response, jsonify
from flask_cors import CORS
from backend.api.v1.views import app_views

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.register_blueprint(app_views)
cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

# Test route
@app.route('/')
def home() -> None:
    return ("Hello, Welcome to Farmers' Market API!")

@app.errorhandler(404)
def not_found(eror):
    """ 404 Error """
    return make_response(jsonify({"error": "Not found"}), 404)

if __name__ == "__main__":
    app.run(debug=True)