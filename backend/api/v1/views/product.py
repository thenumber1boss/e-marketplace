#!/usr/bin/env python3.9

from backend.models.product import Product, product_categories
from backend.database import file_store
from backend.api.v1.views import app_views
from flask import jsonify

@app_views.route('products/categories', methods=['GET'], strict_slashes=False)
def categories():
    """ return product categories """
    return jsonify(product_categories)

# @app_views.route('products/all_products', methods=['GET'], strict_slashes=False)
# def all_objects():
#     """ return all products """
#     return jsonify(file_store.all())

@app_views.route('products/top-selling', methods=['GET'], strict_slashes=False)
def top_selling():
    """ return the top selling products """
    top = file_store.get_products()
    top_ten = {k:top[k] for k in list(top.keys())[:10]}
    return jsonify(top_ten)

@app_views.route('/products/', methods=['GET'], strict_slashes=False)
@app_views.route('/products/<cat_name>', methods=['GET'], strict_slashes=False)
def products(cat_name=None):
    """ retrieve products of a particular category """
    return jsonify(file_store.get_products(cat_name))

