#!/usr/bin/env python3.9

from backend.models.vendor import Vendor
from backend.database import file_store
from backend.api.v1.views import app_views
from flask import jsonify


@app_views.route('vendors/top-vendors', methods=['GET'], strict_slashes=False)
def top_vendors():
    """ return top vendors """
    return jsonify(file_store.get_vendors())
